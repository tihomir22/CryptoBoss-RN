import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Colores from "../../ColoresAPP";

export default StyleSheet.create({
  textoGrueso: {
    fontFamily: "Roboto",
    fontSize: wp(6),
    marginLeft: 6,
    fontWeight: "bold",
    textAlign: "right",
    color: Colores.primary
  },
  fondoCard:{
    backgroundColor:Colores.secondary
  },
  textDerecha: {
    color: Colores.primary,
    textAlign: "right"
  },
  positivo: {
    textAlign: "right",
    color: "green"
  },
  negativo: {
    textAlign: "right",
    color: "red"
  }
});
