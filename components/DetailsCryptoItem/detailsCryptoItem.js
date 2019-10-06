import React, { Component } from "react";
import estilos from "./estilos";
import { AreaChart, ProgressCircle } from "react-native-svg-charts";
import { Linking, View } from "react-native";
import { Row, Col } from "react-native-easy-grid";
import * as shape from "d3-shape";
import {
  Badge,
  Text,
  Content,
  Card,
  CardItem,
  Body,
  Button,
  Icon
} from "native-base";
import Colores from "../../ColoresAPP";
import { List, ListItem } from "native-base";
import Divider from "react-native-divider";
import StaticUtils from "../../StaticUtils";

export default class DetailsCryptoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Content style={estilos.globalBackground}>
        <Card header>
          <CardItem header style={estilos.fondoCard}>
            <Row>
              <Col size={6}>
                <Text style={estilos.textoGrueso}>Total market cap</Text>
                <Text style={estilos.textoGrueso}>
                  {StaticUtils.formatNumber(
                    this.props.data.market_cap,
                    this.props.divisa
                  )}
                </Text>
              </Col>
              <Col size={6}>
                <Text
                  style={StaticUtils.pintarDependiendoDeRentabilidad(
                    this.props.data.cambio_market_cap_24h_porcentaje
                  )}
                >
                  {StaticUtils.formatNumber(
                    this.props.data.cambio_market_cap_24h,
                    this.props.divisa
                  )}
                </Text>
                <Text
                  style={StaticUtils.pintarDependiendoDeRentabilidad(
                    this.props.data.cambio_market_cap_24h_porcentaje
                  )}
                >
                  {this.props.data.cambio_market_cap_24h_porcentaje + "%"}
                </Text>
              </Col>
            </Row>
          </CardItem>

          <CardItem style={estilos.fondoCard}>
            <AreaChart
              style={estilos.estiloGrafico}
              data={this.props.market_cap}
              curve={shape.curveNatural}
              svg={{
                fill:
                  this.props.tipoPorcentaje == 0
                    ? Colores.greenLighter
                    : Colores.redLighter,
                stroke:
                  this.props.tipoPorcentaje == 0 ? Colores.green : Colores.red
              }}
            />
          </CardItem>
          <View style={estilos.fondoCard}>
            <Divider borderColor={Colores.primary} color={Colores.primary}>
              Coin Supply
            </Divider>
          </View>

          <CardItem style={estilos.fondoCard}>
            <Row>
              <Col size={6}>
                <CardItem style={estilos.fondoCard}>
                  <Col size={6}>
                    <Text style={estilos.textoGrueso}>Total Supply</Text>
                    <Text style={estilos.textIzquierdaClaro}>
                      {this.props.data.unidadesTotales != null
                        ? StaticUtils.formatNumber(
                            this.props.data.unidadesTotales,
                            ""
                          )
                        : "Unknown"}
                    </Text>
                    <Text style={estilos.textoGrueso}>Circulant Supply</Text>
                    <Text style={estilos.textIzquierdaClaro}>
                      {StaticUtils.formatNumber(
                        this.props.data.unidadesCirculantes,
                        ""
                      )}
                    </Text>
                    <Text style={estilos.textoGrueso}>C.Supply in %</Text>
                    <Text style={estilos.textIzquierdaClaro}>
                      {this.props.data.unidadesTotales != null
                        ? (
                            (this.props.data.unidadesCirculantes /
                              this.props.data.unidadesTotales) *
                            100
                          ).toFixed(2) + " %"
                        : "Unknown"}
                    </Text>
                  </Col>
                </CardItem>
              </Col>
              <Col size={6}>
                <ProgressCircle
                  style={estilos.estiloGraficoMitad}
                  progress={
                    this.props.data.unidadesCirculantes /
                    this.props.data.unidadesTotales
                  }
                  progressColor={"rgb(134, 65, 244)"}
                  startAngle={-Math.PI * 0.8}
                  endAngle={Math.PI * 0.8}
                />
              </Col>
            </Row>
          </CardItem>
          <View style={estilos.fondoCard}>
            <Divider borderColor={Colores.primary} color={Colores.primary}>
              Advanced data
            </Divider>
          </View>
          <List style={estilos.fondoCard}>
            <ListItem>
              <Body>
                <Text style={estilos.textoGrueso}>Volume </Text>
                <Text style={estilos.textDerecha}>
                  {StaticUtils.formatNumber(
                    this.props.data.volumenTotal,
                    this.props.divisa
                  )}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={estilos.textoGrueso}>ATH Price</Text>
                <Text style={estilos.textDerecha}>
                  {StaticUtils.formatNumber(
                    this.props.data.ath,
                    this.props.divisa
                  )}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={estilos.textoGrueso}>ATH Date </Text>
                <Text style={estilos.textDerecha}>
                  {StaticUtils.obtenerFechaDDMMYYYY(this.props.data.ath_fecha)}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text style={estilos.textoGrueso}>% from ATH </Text>
                <Text
                  style={StaticUtils.pintarDependiendoDeRentabilidad(
                    this.props.data.ath_porcentaje
                  )}
                >
                  {this.props.data.ath_porcentaje.toFixed(2) + "%"}
                </Text>
              </Body>
            </ListItem>
          </List>
          <Row style={estilos.BotonCerrar}>
            <Col size={4}>
              <Button
                bordered
                success
                onPress={() => {
                  Linking.openURL("https://www.coinbase.com/join/stoych_d");
                }}
              >
                <Text style={{ textAlign: "center" }}>Buy</Text>
              </Button>
            </Col>
            <Col size={4} style={{ marginHorizontal: 10 }}>
              <Button bordered onPress={this.props.cerrarDescripcion}>
                <Text style={{ textAlign: "center" }}>Close</Text>
              </Button>
            </Col>
            <Col size={4}>
              <Button
                bordered
                danger
                onPress={() => {
                  Linking.openURL("https://www.coinbase.com/join/stoych_d");
                }}
              >
                <Text style={{ textAlign: "center" }}>Sell</Text>
              </Button>
            </Col>
          </Row>
        </Card>
      </Content>
    );
  }

  /*
    <Row style={{ marginVertical: 5 }}>
          {["24h", "7days", "14days", "30days", "MAX"].map(badge => {
            return (
              <TouchableOpacity key={badge}>
                <Col style={estilos.separacionBadges}>
                  <Badge style={estilos.globalBadgeBackground}>
                    <Text>{badge}</Text>
                  </Badge>
                </Col>
              </TouchableOpacity>
            );
          })}
        </Row> */
}
