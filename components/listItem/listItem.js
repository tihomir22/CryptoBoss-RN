import React, { Component } from "react";
import axios from "axios";
import CryptoItem from "../cryptoItem/";
import { ScrollView, RefreshControl, SafeAreaView } from "react-native";
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
      currency: "currency:usd",
      refrescando: false
    };
    this.retrieveData(true);
    this.refrescar = this.refrescar.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listaCriptosFiltradas) {
      this.retrieveData(true);
    }
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
        this.recuperarCriptos(this.returnFilteredListOfCoinsIfStorage(), true);
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
      : [];
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

  parsearValor(valorDesdeLocalStorage) {
    if (valorDesdeLocalStorage == "1") {
      return { nombreKey: "price_change_percentage_24h", valor: "1d" };
    } else if (valorDesdeLocalStorage == "14") {
      return {
        nombreKey: "price_change_percentage_14d_in_currency",
        valor: "14d"
      };
    } else if (valorDesdeLocalStorage == "30") {
      return {
        nombreKey: "price_change_percentage_30d_in_currency",
        valor: "30d"
      };
    } else {
      return {
        nombreKey: "price_change_percentage_1y_in_currency",
        valor: "1y"
      };
    }
  }

  recuperarCriptos(listaCriptosIds, reiniciar) {
    if (this.state.cargando) {
      return;
    }
    if (
      this.props.listaCriptosFiltradas &&
      this.props.listaCriptosFiltradas.length == 0
    ) {
      return;
    }
    this.setState({ cargando: true });
    if (this.props.estadoCarga) {
      this.props.estadoCarga(true);
    }
    let valorResultanteParseado = this.parsearValor(
      this.state.timeframe.split(":")[1]
    );
    console.log(valorResultanteParseado);

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
          this.state.currency.split(":")[1].toUpperCase() +
          this.returnCsV(listaCriptosIds) +
          "&order=market_cap_desc&per_page=25&page=" +
          this.state.pagina_actual +
          "&sparkline=false&price_change_percentage=" +
          valorResultanteParseado.valor
      )
      .then(response => {
        if (reiniciar) {
          this.setState({ listadoCriptos: [] });
        }
        this.actualizarEstado(response, valorResultanteParseado.nombreKey);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  componentWillMount() {}

  actualizarEstado(respuesta, nombreKeyEspecial) {
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
        volumenTotal: respuesta.total_volume,
        porcentajeReal:
          respuesta[nombreKeyEspecial] != null
            ? respuesta[nombreKeyEspecial]
            : 0
      };
    });

    console.log(listadoCriptosSiguiente);

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
      pagina_actual: this.state.pagina_actual + 1,
      refrescando: false
    });
  }

  isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return (
      layoutMeasurement.height + (contentOffset.y + 2000) >=
      contentSize.height - 50
    );
  }

  refrescar() {
    this.setState({ refrescando: true });
    this.retrieveData(true);
  }

  devolverLista() {
    return (
      <SafeAreaView style={styles.negroClaro}>
        <ScrollView
          style={styles.negroClaro}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refrescando}
              onRefresh={this.refrescar}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent) && this.state.tieneMas) {
              this.recuperarCriptos(this.returnFilteredListOfCoinsIfStorage());
            }
          }}
        >
          {this.state.listadoCriptos.map(item => {
            return (
              <CryptoItem
                setearNuevaLista={this.props.setearNuevaLista}
                timeframe={this.state.timeframe.split(":")[1]}
                currency={this.state.currency.split(":")[1]}
                permitirEliminar={this.props.permitirEliminar}
                data={item}
                key={item.id}
              ></CryptoItem>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  render() {
    return this.state.listadoCriptos.length > 0 ? this.devolverLista() : null;
  }
}
