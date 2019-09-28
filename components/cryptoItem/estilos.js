import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
  textoGrueso: {
    fontFamily: "Roboto",
    fontSize: wp(6),
    marginLeft: 6,
    fontWeight: "bold",
    textAlign: "right"
  },
  textoDerecha: {
    textAlign: "right"
  }
});
