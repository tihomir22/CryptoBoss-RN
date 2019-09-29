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
    backgroundColor: Colores.secondaryLighter
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
  }
});
