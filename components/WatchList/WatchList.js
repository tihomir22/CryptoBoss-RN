import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import ListItem from "../listItem/index";
import StaticUtils from "../../StaticUtils";
import { Container, Toast } from "native-base";
import Colores from "../../ColoresAPP";

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: []
    };
    this.recuperarCriptosVigiladas();
    this.setearNuevaLista = this.setearNuevaLista.bind(this);
  }

  setearNuevaLista(lista) {
    this.setState({ ids: lista });
  }

  async recuperarCriptosVigiladas() {
    try {
      const watchlist = await SecureStore.getItemAsync("watchlist");
      let watchlist2 = JSON.parse(watchlist);
      if (watchlist2 != null && watchlist2.length > 0) {
        this.setState({ ids: watchlist2 });
      } else {
        Toast.show({
          text: "Your watchlist is empty!",
          buttonText: "Okay",
          type: "danger",
          duration: 100000
        });
      }
    } catch (error) {}
  }

  render() {
    return (
      <Container style={{ backgroundColor: Colores.secondary }}>
        <ListItem
          setearNuevaLista={this.setearNuevaLista}
          listaCriptosFiltradas={this.state.ids}
          permitirEliminar={true}
        ></ListItem>
      </Container>
    );
  }
}

WatchList.propTypes = {};

export default WatchList;
