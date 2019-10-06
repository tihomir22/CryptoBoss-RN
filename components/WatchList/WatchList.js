import React, { Component } from "react";
import { Text } from "native-base";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import PropTypes from "prop-types"; //ES6
import ListItem from "../listItem/index";

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: []
    };
    this.recuperarCriptosVigiladas();
  }

  async recuperarCriptosVigiladas() {
    console.log("vamos a checkearnos");
    try {
      const watchlist = await SecureStore.getItemAsync("watchlist");
      if (watchlist != null) {
        this.setState({ ids: JSON.parse(watchlist) });
        console.log(this.state.ids);
      } else {
        console.log("No hay nada");
      }
    } catch (error) {}
  }

  render() {
    return <ListItem listaCriptosFiltradas={this.state.ids}></ListItem>;
  }
}

WatchList.propTypes = {};

export default WatchList;
