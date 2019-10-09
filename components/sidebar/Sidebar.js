import React, { Component } from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Card,
  Thumbnail,
  CardItem,
  Body
} from "native-base";
import { Image,View } from "react-native";
import estilos from "./estilos";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "../../logoCryptoBoss.png"
    };
  }

  render() {
    return (
      <Container>
        <CardItem style={estilos.darkBackGround}>
          <Body style={estilos.container}>
            <Image
              style={estilos.logo}
              source={require("../../logoCryptoBoss.png")}
            />
            <Text style={estilos.goldenText}>CryptoBoss - The smartest fox</Text>
          </Body>
        </CardItem>

        <Content>
          <List>
            <ListItem onPress={this.props.abrirConfig}>
              <Text>Configuration</Text>
            </ListItem>
            <ListItem onPress={this.props.abrirWatchlist}>
              <Text>Watchlist</Text>
            </ListItem>
          </List>
        </Content>
        <Text style={estilos.goldenTextSecondary}>Proudly powered by</Text>
        <View style={estilos.containerImg}>
          <Thumbnail small source={require("./gecko.png")} />
        </View>
      </Container>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
