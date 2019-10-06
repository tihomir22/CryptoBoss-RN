import React, { Component } from "react";
import PropTypes from "prop-types"; //ES6
import { Image, View, Text } from "react-native";
import styles from "./estilos";
import * as Progress from "react-native-progress";
import Colores from "../../ColoresAPP";

class PantallaCarga extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./logo.png")} />
        <Progress.Bar
          indeterminate={true}
          width={200}
          color={Colores.primary}
        />
      </View>
    );
  }
}

PantallaCarga.propTypes = {};

export default PantallaCarga;
