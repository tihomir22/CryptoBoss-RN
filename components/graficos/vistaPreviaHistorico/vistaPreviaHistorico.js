import React, { Component } from "react";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Container, Text } from "native-base";
import estilos from "./estilos";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as vistaPreviaHistoricoActions from "../../store/vistaPreviaHistorico/actions";
export default class VistaPreviaHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ];

    return (
      <LineChart
        style={estilos.estiloGrafico}
        data={data}
        showGrid={false}
        animate={true}
        svg={{ stroke: "rgb(134, 65, 244)" }}
      >
      </LineChart>
    );
  }
}
// export default connect(
//     ({ vistaPreviaHistorico }) => ({ ...vistaPreviaHistorico }),
//     dispatch => bindActionCreators({ ...vistaPreviaHistoricoActions }, dispatch)
//   )( vistaPreviaHistorico );
