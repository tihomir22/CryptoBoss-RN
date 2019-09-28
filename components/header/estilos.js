import { StyleSheet } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 25
  },
  headerTitle: {
    textAlign: "left",
    fontFamily: "Roboto",
    marginLeft: "-20%"
  }
});
