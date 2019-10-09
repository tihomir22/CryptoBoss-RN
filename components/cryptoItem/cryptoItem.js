import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  ActionSheet
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Axios from "axios-observable";
import * as SecureStore from "expo-secure-store";
import estilos from "./estilos";
import StaticUtils from "../../StaticUtils";
import VistaPreviaHistorico from "../graficos/vistaPreviaHistorico";
import DetailsCryptoItem from "../DetailsCryptoItem/detailsCryptoItem";

var CANCEL_INDEX = 2;
export default class CryptoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      precios: [],
      BUTTONS: [
        "Look in depth",
        this.props.permitirEliminar
          ? "Delete from watchlist"
          : "Add to watchlist",
        "Cancel"
      ],

      market_cap: [],
      criptodivisa: this.props.data.id
    };

    this.abrirActionShiiet = this.abrirActionShiiet.bind(this);
    this.cerrarDetalles = this.cerrarDetalles.bind(this);
  }

  componentDidMount() {
    this.recuperarHistoricos();
  }

  recuperarHistoricos() {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/" +
        this.props.data.id +
        "/market_chart?vs_currency=" +
        this.props.currency +
        "&days=" +
        this.props.timeframe
    ).subscribe(
      response => {
        this.setState({
          precios: response.data.prices.map(precios => precios[1]),
          market_cap: response.data.market_caps.map(
            market_caps => market_caps[1]
          )
        });
      },
      error => this.setState({ error, loading: false })
    );
  }

  async addToWatchList(criptoName) {
    try {
      SecureStore.getItemAsync("watchlist").then(watchlist => {
        let c = watchlist ? JSON.parse(watchlist) : [];
        if (c.indexOf(criptoName.toLowerCase()) == -1) {
          c.push(criptoName.toLowerCase());
          SecureStore.setItemAsync("watchlist", JSON.stringify(c));
          StaticUtils.mostrarTostadita("Succesfully added", "Close");
        } else {
          StaticUtils.mostrarTostadita(
            "This crypto was already added!",
            "Close"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFromWatchList(criptoName) {
    try {
      SecureStore.getItemAsync("watchlist").then(watchlist => {
        let c = watchlist ? JSON.parse(watchlist) : [];
        let indice = c.indexOf(criptoName.toLowerCase());
        if (indice != -1) {
          c = c.filter(item => item != criptoName.toLowerCase());
          SecureStore.setItemAsync("watchlist", JSON.stringify(c));
          StaticUtils.mostrarTostadita("Succesfully deleted", "Close");
          this.props.setearNuevaLista(c);
        } else {
          console.log("no existe esta wea");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  abrirActionShiiet() {
    ActionSheet.show(
      {
        options: this.state.BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Choose an option"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.setState({ mostrarDescripcion: true });
            break;
          case 1:
            this.props.permitirEliminar
              ? this.deleteFromWatchList(this.props.data.nombre)
              : this.addToWatchList(this.props.data.nombre);
            break;

          default:
            break;
        }
      }
    );
  }

  cerrarDetalles() {
    this.setState({ mostrarDescripcion: false });
  }

  render() {
    return (
      <Content>
        <TouchableOpacity onPress={this.abrirActionShiiet}>
          <Card transparent>
            <CardItem header style={estilos.fondoCard}>
              <Row>
                <Col size={6}>
                  <Row>
                    <Thumbnail
                      small={true}
                      source={{
                        uri: this.props.data.imagen
                      }}
                    />
                    <Text style={estilos.textoGrueso}>
                      {this.props.data.nombre}
                    </Text>
                  </Row>
                </Col>
                <Col size={4}>
                  <Text style={estilos.textDerecha}>
                    {StaticUtils.formatNumber(
                      this.props.data.precioActual,
                      this.props.currency
                    )}
                  </Text>
                  <Text
                    style={StaticUtils.pintarDependiendoDeRentabilidad(
                      this.props.data.porcentajeReal
                    )}
                  >
                    {(this.props.data.porcentajeReal < 0 ? "" : "+") +
                      this.props.data.porcentajeReal.toFixed(2) +
                      "%"}
                  </Text>
                </Col>
              </Row>
            </CardItem>
            <CardItem style={estilos.fondoCard}>
              <VistaPreviaHistorico
                data={this.state.precios}
                tipoPorcentaje={StaticUtils.devolverTipoPorcentaje(
                  this.props.data.porcentajeReal
                )}
              ></VistaPreviaHistorico>
            </CardItem>
          </Card>
        </TouchableOpacity>
        {this.state.mostrarDescripcion ? (
          <DetailsCryptoItem
            market_cap={this.state.market_cap}
            data={this.props.data}
            divisa={this.props.currency}
            cerrarDescripcion={this.cerrarDetalles}
            tipoPorcentaje={StaticUtils.devolverTipoPorcentaje(
              this.props.data.porcentajeReal
            )}
          ></DetailsCryptoItem>
        ) : null}
      </Content>
    );
  }
}
// export default connect(
//     ({ cryptoItem }) => ({ ...cryptoItem }),
//     dispatch => bindActionCreators({ ...cryptoItemActions }, dispatch)
//   )( cryptoItem );
