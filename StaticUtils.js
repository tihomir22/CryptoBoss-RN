import { Container, Header, Content, Toast, Button, Text } from 'native-base';


export default class StaticUtils {
  static positivo = {
    textAlign: "right",
    color: "green"
  };

  static negativo = {
    textAlign: "right",
    color: "red"
  };

  static mostrarTostadita(mensaje,textoBoton){
    Toast.show({
      text: mensaje,
      buttonText: textoBoton
    })
  }

  static formatNumber(num, divisa) {
    let sufijo = "$";
    if (divisa.toUpperCase() == "USD") {
      sufijo = "$";
    } else if (divisa.toUpperCase() == "EUR") {
      sufijo = "€";
    } else if (divisa.toUpperCase() == "GBP") {
      sufijo = "£";
    } else if (divisa.toUpperCase() == "JPY") {
      sufijo = "¥";
    } else {
      sufijo = "";
    }
    return (
      num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
      sufijo
    );
  }

  static pintarDependiendoDeRentabilidad(valor) {
    if (this.devolverTipoPorcentaje(valor) == 0) {
      return StaticUtils.positivo;
    } else {
      return StaticUtils.negativo;
    }
  }

  static obtenerFechaDDMMYYYY(fecha) {
    let fecha1 = new Date(fecha);
    let date =
      fecha1.getDate() +
      "-" +
      parseInt(fecha1.getMonth() + 1) +
      "-" +
      fecha1.getFullYear();
    return date;
  }

  static devolverTipoPorcentaje(porcentaje) {
    let rentabilidadParseada = parseFloat(porcentaje);
    if (rentabilidadParseada > 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
