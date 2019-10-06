import React, { Component } from "react";
import {
  Content,
  Header,
  Text,
  Body,
  Title,
  Button,
  Spinner,
  Left,
  Icon,
  Right
} from "native-base";
import estilos from "./estilos";
export default class HeaderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Header style={estilos.header}>
        <Left>
          <Button transparent onPress={this.props.abrirSidebar}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title style={estilos.headerTitle}>{this.props.titulo}</Title>
        </Body>
        <Right>{this.props.activarSpinnerCarga ? <Spinner /> : null}</Right>
      </Header>
    );
  }
}

// export default connect(
//     ({ header }) => ({ ...header }),
//     dispatch => bindActionCreators({ ...headerActions }, dispatch)
//   )( header );
