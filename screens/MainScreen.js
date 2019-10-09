import React, { Component } from "react";
import PropTypes from "prop-types"; //ES6
import { Container } from "native-base";
import HeaderItem from "../components/header/index";
import ListITem from "../components/listItem/index";
import PantallaCarga from "../components/PantallaCarga/PantallaCarga";
import Sidebar from "../components/sidebar/Sidebar";
import Drawer from "react-native-drawer";
import ColoresAPP from "../ColoresAPP";

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    backgroundColor: ColoresAPP.secondary,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    padding: 0,
    margin: 0
  },
  drawerOverlay: {   },
  mainOverlay: {   },
  main: {  backgroundColor: ColoresAPP.secondary, }
};
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estadoCarga: true,
      mostrandoLogo: true,
      subs: []
    };
  }

  setearCargaHeader(estado) {
    if (!estado && this.state.mostrandoLogo) {
      this.setState({ mostrandoLogo: false });
    }
    this.setState({ estadoCarga: estado });
  }

  componentDidFocus(event) {
    this.refs.listaItems.refrescarDatosDeNuevo();
  }

  componentWillMount() {
    this.setState({
      subs: [
        this.props.navigation.addListener("didFocus", payload =>
          this.componentDidFocus(payload)
        )
      ]
    });
  }

  openControlPanel = () => {
    this.refs.myDrawer.open();
  };

  render() {
    return (
      <Drawer
        ref="myDrawer"
        type="static"
        styles={drawerStyles}
        content={
          <Sidebar
            style={{ padding: 0, margin: 0 }}
            abrirConfig={() => this.props.navigation.navigate("Config")}
            abrirWatchlist={() => this.props.navigation.navigate("WatchList")}
            abrirDonations={() => this.props.navigation.navigate("Donations")}
          />
        }
        openDrawerOffset={100}
        tapToClose={true}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        <Container>
          <Container
            style={
              this.state.mostrandoLogo
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            <PantallaCarga></PantallaCarga>
          </Container>
          <Container
            style={
              this.state.mostrandoLogo
                ? { display: "none" }
                : { display: "flex" }
            }
          >
            <HeaderItem
              titulo={"CryptoBoss"}
              activarSpinnerCarga={this.state.estadoCarga}
              abrirSidebar={this.openControlPanel}
            ></HeaderItem>
            <ListITem
              ref="listaItems"
              estadoCarga={event => this.setearCargaHeader(event)}
            ></ListITem>
          </Container>
        </Container>
      </Drawer>
    );
  }
}

MainScreen.propTypes = {};

export default MainScreen;
