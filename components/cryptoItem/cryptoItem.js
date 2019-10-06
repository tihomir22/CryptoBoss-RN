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

var BUTTONS = ["Look in depth", "Add to watchlist", "Cancel"];
var CANCEL_INDEX = 2;
export default class CryptoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      precios: [],
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
          console.log("añadido exitosamente");
        } else {
          console.log("ya existe esta wea");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  abrirActionShiiet() {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Choose an option"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.setState({ mostrarDescripcion: true });
            break;
          case 1:
            this.addToWatchList(this.props.data.nombre);
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
                      this.props.data.porcentaje
                    )}
                  >
                    {this.props.data.porcentaje + "%"}
                  </Text>
                </Col>
              </Row>
            </CardItem>
            <CardItem style={estilos.fondoCard}>
              <VistaPreviaHistorico
                data={this.state.precios}
                tipoPorcentaje={StaticUtils.devolverTipoPorcentaje(
                  this.props.data.porcentaje
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
              this.props.data.porcentaje
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
