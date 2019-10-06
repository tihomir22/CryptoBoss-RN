import React, { Component } from "react";

import { Container, Header, Content, List, ListItem, Text } from "native-base";

import PropTypes from "prop-types"; //ES6

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem onPress={this.props.abrirConfig}>
              <Text>Configuration</Text>
            </ListItem>
            <ListItem onPress={this.props.abrirWatchlist}>
              <Text>Watchlist</Text>
            </ListItem>
            <ListItem>
              <Text>Donate</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
