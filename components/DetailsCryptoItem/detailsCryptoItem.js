import React, { Component } from "react";
import estilos from "./estilos";
import { LineChart, Grid } from "react-native-svg-charts";
import { TouchableOpacity } from "react-native";
import Axios from "axios-observable";
import Colores from "../../ColoresAPP";
import { Row, Col } from "react-native-easy-grid";
import { Badge, Text, Content } from "native-base";

export default class DetailsCryptoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: []
    };
  }

  recuperarHistoricos() {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/" +
        this.props.idCripto +
        "/market_chart?vs_currency=usd&days=1"
    ).subscribe(
      response => {
        this.setState({
          datos: response.data.prices.map(precios => precios[1])
        });
      },
      error => this.setState({ error, loading: false })
    );
  }

  componentDidMount() {
    this.recuperarHistoricos();
  }

  render() {
    return (
      // <TouchableOpacity onPress={this.props.cerrarDescripcion}>
      <Content style={estilos.globalBackground}>
        <Row style={{ marginVertical: 5 }}>
          {["24h", "7days", "14days", "30days", "MAX"].map(badge => {
            return (
              <TouchableOpacity>
                <Col style={estilos.separacionBadges}>
                  <Badge style={estilos.globalBadgeBackground}>
                    <Text>{badge}</Text>
                  </Badge>
                </Col>
              </TouchableOpacity>
            );
          })}
        </Row>

        <LineChart
          style={estilos.estiloGrafico}
          data={this.state.datos}
          showGrid={false}
          animate={true}
          svg={{
            stroke: Colores.red
          }}
        ></LineChart>
      </Content>
      //  </TouchableOpacity>
    );
  }
}
