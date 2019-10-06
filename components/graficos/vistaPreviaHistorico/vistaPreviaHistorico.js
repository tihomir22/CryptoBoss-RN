import React, { Component } from "react";
import { LineChart, Circle } from "react-native-svg-charts";
import estilos from "./estilos";
import { Content, Spinner } from "native-base";
import Colores from "../../../ColoresAPP";

export default class VistaPreviaHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    if (this.props.data.length == 0) {
      return (
        <Content>
          <Spinner style={estilos.spinnerDorado}></Spinner>
        </Content>
      );
    } else {
      return (
        <LineChart
          style={estilos.estiloGrafico}
          data={this.props.data}
          showGrid={false}
          animate={true}
          svg={{
            stroke: this.props.tipoPorcentaje == 0 ? Colores.green : Colores.red
          }}
        ></LineChart>
      );
    }
  }
}
