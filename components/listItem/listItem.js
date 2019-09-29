import React, { Component } from "react";
import Axios from "axios-observable";
import CryptoItem from "../cryptoItem/";
import { ScrollView } from "react-native";
import { Container, Content, ListItem, List, Text, Header } from "native-base";
import styles from './estilos';
export default class listItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
      listadoCriptos: [],
      pagina_actual: 1,
      error: null,
      tieneMas: true
    };
  }

  recuperarCriptos() {
    if (this.state.cargando) {
      return;
    }
    this.setState({ cargando: true });

    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10&page=" +
        this.state.pagina_actual +
        "&sparkline=false"
    ).subscribe(
      response => {
        this.actualizarEstado(response);
      },
      error => this.setState({ error, loading: false })
    );
  }

  componentDidMount() {
    this.recuperarCriptos();
  }

  actualizarEstado(respuesta) {
    let listadoCriptosSiguiente = respuesta.data.map(respuesta => {
      return {
        id: respuesta.id,
        nombre: respuesta.name,
        imagen: respuesta.image,
        precioActual: respuesta.current_price,
        maximo: respuesta.high_24h,
        minimo: respuesta.low_24h,
        porcentaje: respuesta.price_change_percentage_24h
      };
    });

    this.setState({
      tieneMas:
        listadoCriptosSiguiente && listadoCriptosSiguiente.length > 0
          ? true
          : false,
      listadoCriptos: [
        ...this.state.listadoCriptos,
        ...listadoCriptosSiguiente
      ],
      cargando: false,
      pagina_actual: this.state.pagina_actual + 1
    });
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
 
    return (
      layoutMeasurement.height + contentOffset.y + 700 >= contentSize.height
    );
  }

  devolverLista() {
    return (
      <ScrollView style={styles.negroClaro}
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent) && this.state.tieneMas) {
            this.recuperarCriptos();
          }
        }}
      >
        {this.state.listadoCriptos.map(item => {
          return <CryptoItem data={item} key={item.id}></CryptoItem>;
        })}
      </ScrollView>
    );
  }

  render() {
    return this.state.listadoCriptos.length > 0 ? (
      this.devolverLista()
    ) : (
      <Text>Cargando..</Text>
    );
  }
}
