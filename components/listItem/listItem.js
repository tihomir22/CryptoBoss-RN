import React, { Component } from "react";
import axios from "axios";
import CryptoItem from "../cryptoItem/";
import { ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import styles from "./estilos";

export default class listItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
      listadoCriptos: [],
      pagina_actual: 1,
      error: null,
      tieneMas: true,
      timeframe: "timeframe:1",
      currency: "currency:usd"
    };
    this.retrieveData(true);
  }

  async retrieveData(forzar) {
    let necesarioActualizarValores = false;
    try {
      const timeframe = await SecureStore.getItemAsync("timeframe");
      if (
        timeframe !== null &&
        timeframe.toLowerCase() !=
          this.state.timeframe.split(":")[1].toLowerCase()
      ) {
        this.setState({ timeframe: "timeframe:" + timeframe });
        necesarioActualizarValores = true;
      }
      const currency = await SecureStore.getItemAsync("currency");
      if (
        currency !== null &&
        currency.toLowerCase() !=
          this.state.currency.split(":")[1].toLowerCase()
      ) {
        this.setState({ currency: "currency:" + currency });
        necesarioActualizarValores = true;
      }
      if (necesarioActualizarValores || forzar) {
        this.setState({ pagina_actual: 1 });
        this.setState({ listadoCriptos: [] });
        this.recuperarCriptos(this.returnFilteredListOfCoinsIfStorage());
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  refrescarDatosDeNuevo() {
    this.retrieveData(false);
  }

  returnFilteredListOfCoinsIfStorage() {
    return this.props.listaCriptosFiltradas &&
      this.props.listaCriptosFiltradas.length > 0
      ? this.props.listaCriptosFiltradas
      : null;
  }

  returnCsV(arrayParseado) {
    let res = "";
    if (arrayParseado != null) {
      for (let i = 0; i < arrayParseado.length; i++) {
        res = res + arrayParseado[i] + ",";
      }
    }

    return res.length > 0 ? "&ids=" + res : "";
  }

  recuperarCriptos(listaCriptosIds) {
    if (this.state.cargando) {
      return;
    }
    this.setState({ cargando: true });
    if (this.props.estadoCarga) {
      this.props.estadoCarga(true);
    }
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
          this.state.currency.split(":")[1].toUpperCase() +
          this.returnCsV(listaCriptosIds) +
          "&order=market_cap_desc&per_page=25&page=" +
          this.state.pagina_actual +
          "&sparkline=false"
      )
      .then(response => {
        this.actualizarEstado(response);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  componentWillMount() {}

  actualizarEstado(respuesta) {
    if (this.props.estadoCarga) {
      this.props.estadoCarga(false);
    }
    let listadoCriptosSiguiente = respuesta.data.map(respuesta => {
      return {
        id: respuesta.id,
        nombre: respuesta.name,
        imagen: respuesta.image,
        precioActual: respuesta.current_price,
        maximo: respuesta.high_24h,
        minimo: respuesta.low_24h,
        porcentaje: respuesta.price_change_percentage_24h,

        ath: respuesta.ath,
        ath_porcentaje: respuesta.ath_change_percentage,
        ath_fecha: respuesta.ath_date,
        unidadesCirculantes: respuesta.circulating_supply,
        unidadesTotales: respuesta.total_supply,
        ultima_actualizacion: respuesta.last_updated,
        minimo_24: respuesta.low_24h,
        market_cap: respuesta.market_cap,
        cambio_market_cap_24h: respuesta.market_cap_change_24h,
        cambio_market_cap_24h_porcentaje:
          respuesta.market_cap_change_percentage_24h,
        numero_market_cap: respuesta.market_cap_rank,
        roi: respuesta.roi,
        volumenTotal: respuesta.total_volume
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
      layoutMeasurement.height + (contentOffset.y + 2000) >=
      contentSize.height - 50
    );
  }

  devolverLista() {
    return (
      <ScrollView
        style={styles.negroClaro}
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent) && this.state.tieneMas) {
            this.recuperarCriptos(this.returnFilteredListOfCoinsIfStorage());
          }
        }}
      >
        {this.state.listadoCriptos.map(item => {
          return (
            <CryptoItem
              timeframe={this.state.timeframe.split(":")[1]}
              currency={this.state.currency.split(":")[1]}
              data={item}
              key={item.id}
            ></CryptoItem>
          );
        })}
      </ScrollView>
    );
  }

  render() {
    return this.state.listadoCriptos.length > 0 ? this.devolverLista() : null;
  }
}
