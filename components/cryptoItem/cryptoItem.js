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
import estilos from "./estilos";
import VistaPreviaHistorico from "../graficos/vistaPreviaHistorico";
import DetailsCryptoItem from "../DetailsCryptoItem/detailsCryptoItem";

var BUTTONS = ["Look in depth", "Add to watchlist", "Cancel"];
var CANCEL_INDEX = 2;
export default class CryptoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarDescripcion: false
    };
    this.abrirActionShiiet = this.abrirActionShiiet.bind(this);
    this.cerrarDetalles = this.cerrarDetalles.bind(this);
  }

  pintarDependiendoDeRentabilidad(valor) {
    if (this.devolverTipoPorcentaje(valor) == 0) {
      return estilos.positivo;
    } else {
      return estilos.negativo;
    }
  }

  devolverTipoPorcentaje(porcentaje) {
    let rentabilidadParseada = parseFloat(porcentaje);
    if (rentabilidadParseada > 0) {
      return 0;
    } else {
      return 1;
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
        console.log(buttonIndex);
        switch (buttonIndex) {
          case 0:
            this.setState({ mostrarDescripcion: true });
            break;
          case 1:
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
                    {this.props.data.precioActual}
                  </Text>
                  <Text
                    style={this.pintarDependiendoDeRentabilidad(
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
                idCripto={this.props.data.id}
                tipoPorcentaje={this.devolverTipoPorcentaje(
                  this.props.data.porcentaje
                )}
              ></VistaPreviaHistorico>
            </CardItem>
          </Card>
        </TouchableOpacity>
        {this.state.mostrarDescripcion ? (
          <DetailsCryptoItem
            idCripto={this.props.data.id}
            cerrarDescripcion={this.cerrarDetalles}
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
