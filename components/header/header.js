import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as headerActions from "../../store/header/actions";
import { Content, Header, Body, Title, Button, Left, Icon } from "native-base";
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
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title style={estilos.headerTitle}>{this.props.titulo}</Title>
        </Body>
      </Header>
    );
  }
}

// export default connect(
//     ({ header }) => ({ ...header }),
//     dispatch => bindActionCreators({ ...headerActions }, dispatch)
//   )( header );
