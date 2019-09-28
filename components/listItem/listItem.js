import React, { Component } from "react";
import Axios from "axios-observable";
import CryptoItem from "../cryptoItem/";
import { FlatList, View } from "react-native";
import { Container, Content, ListItem, List, Text, Header } from "native-base";

export default class listItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listadoCriptos: []
    };
  }

  componentDidMount() {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).subscribe(
      response => {
        this.actualizarEstado(response);
      },
      error => console.log(error)
    );
  }
  actualizarEstado(respuesta) {
    this.setState({
      listadoCriptos: respuesta.data.map(respuesta => {
        return {
          id: respuesta.id,
          nombre: respuesta.name,
          imagen: respuesta.image,
          precioActual: respuesta.current_price,
          maximo: respuesta.high_24h,
          minimo: respuesta.low_24h,
          porcentaje: respuesta.price_change_percentage_24h
        };
      })
    });
  }

  devolverLista() {
    return (
      <Container>
        <Content>
          <List keyExtractor={crypto => crypto.id}>
            {this.state.listadoCriptos.map(item => {
              return (
                <ListItem key={item.id}>
                  <CryptoItem data={item}></CryptoItem>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
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
