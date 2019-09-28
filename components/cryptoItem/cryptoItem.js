import React, { Component } from "react";

import { Content, Card, CardItem, Text, Body, Thumbnail } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as listItemActions from "../../store/listItem/actions";
import estilos from "./estilos";
import VistaPreviaHistorico from "../graficos/vistaPreviaHistorico";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as cryptoItemActions from "../../store/cryptoItem/actions";
export default class CryptoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Content>
        <Card>
          <CardItem header bordered>
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
              <Col size={4} >
                <Text style={estilos.textoDerecha}>{this.props.data.precioActual}</Text>
                <Text style={estilos.textoDerecha}>{this.props.data.porcentaje}</Text>
              </Col>
            </Row>
          </CardItem>
          <CardItem bordered>
            <Body>
              <VistaPreviaHistorico></VistaPreviaHistorico>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
// export default connect(
//     ({ cryptoItem }) => ({ ...cryptoItem }),
//     dispatch => bindActionCreators({ ...cryptoItemActions }, dispatch)
//   )( cryptoItem );
