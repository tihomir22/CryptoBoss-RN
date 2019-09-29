import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Colores from "../../../ColoresAPP";

export default StyleSheet.create({
  estiloGrafico: {
    height: hp(15),
    width: wp(90),
    backgroundColor: Colores.secondary
  },
  spinnerDorado: {
    color: Colores.primary
  }
});
