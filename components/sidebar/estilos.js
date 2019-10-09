import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Colores from "../../ColoresAPP";
export default StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colores.secondary,
    minHeight: 150
  },
  containerImg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  darkBackGround: {
    backgroundColor: Colores.secondary
  },
  grayBackground: {
    backgroundColor: Colores.secondaryLighter
  },

  goldenText: {
    textAlign: "center",
    marginTop: 10,
    color: Colores.primary
  },

  goldenTextSecondary: {
    textAlign: "center",
    color: Colores.primary
  },

  logo: {
    maxWidth: 200,
    maxHeight: 200
  }
});
