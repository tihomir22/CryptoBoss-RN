import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Colores from "../../ColoresAPP";
export default StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    backgroundColor: Colores.secondary
  },
  headerTitle: {
    textAlign: "left",
    fontFamily: "Roboto",
    marginLeft: "-20%",
    color: Colores.primary
  }
});
