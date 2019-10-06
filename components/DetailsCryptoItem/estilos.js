import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Colores from "../../ColoresAPP";

export default StyleSheet.create({
  estiloGrafico: {
    height: hp(20),
    width: wp(90),
    backgroundColor: Colores.secondary
  },
  estiloGraficoMitad: {
    height: hp(20),
    width: wp(50),
    backgroundColor: Colores.secondary
  },
  globalBackground: {
    backgroundColor: Colores.secondaryLighter
  },
  globalBadgeBackground: {
    color: Colores.primary,
    backgroundColor: Colores.secondary
  },
  separacionBadges: {
    marginHorizontal: 5
  },

  textoGrueso: {
    fontFamily: "Roboto",
    fontSize: wp(4),
    fontWeight: "bold",
    textAlign: "left",
    color: Colores.primary
  },
  textoGrueso: {
    fontFamily: "Roboto",
    fontSize: wp(4),
    textAlign: "left",
    color: Colores.primary
  },
  fondoCard: {
    backgroundColor: Colores.secondary
  },
  BotonCerrar: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Colores.secondary
  },
  textDerecha: {
    color: Colores.primary,
    textAlign: "right"
  },
  textIzquierdaClaro: {
    color: "white",
    textAlign: "left"
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
