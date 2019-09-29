import React, { Component } from "react";
import { LineChart, Grid } from "react-native-svg-charts";
import estilos from "./estilos";
import Axios from "axios-observable";
import { Content, Spinner } from "native-base";
import Colores from "../../../ColoresAPP";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as vistaPreviaHistoricoActions from "../../store/vistaPreviaHistorico/actions";
export default class VistaPreviaHistorico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      criptodivisa: this.props.idCripto,
      divisaDefecto: "usd",
      dias: 1
    };
  }

  recuperarHistoricos() {
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/" +
        this.state.criptodivisa +
        "/market_chart?vs_currency=" +
        this.state.divisaDefecto +
        "&days=" +
        this.state.dias
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
    if (this.state.datos.length == 0) {
      return (
        <Content>
          <Spinner style={estilos.spinnerDorado}></Spinner>
        </Content>
      );
    } else {
      return (
        <LineChart
          style={estilos.estiloGrafico}
          data={this.state.datos}
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
// export default connect(
//     ({ vistaPreviaHistorico }) => ({ ...vistaPreviaHistorico }),
//     dispatch => bindActionCreators({ ...vistaPreviaHistoricoActions }, dispatch)
//   )( vistaPreviaHistorico );
