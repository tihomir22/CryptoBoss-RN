import React, { Component } from "react";
import { AppLoading } from "expo";
import { Root } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import MainScreen from "./screens/MainScreen";
import { createAppContainer } from "react-navigation";
import ConfigComp from "./components/configuracion/ConfigComp";
import { createStackNavigator } from "react-navigation-stack";
import WatchList from "./components/WatchList/WatchList";
import Colores from "./ColoresAPP";
import PantallaCarga from "./components/PantallaCarga/PantallaCarga";
const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Config: {
    screen: ConfigComp,
    navigationOptions: {
      title: "Configuration",
      headerTintColor: Colores.primary,
      headerStyle: {
        backgroundColor: Colores.secondary,
        borderBottomColor: Colores.secondaryLighter,
        borderBottomWidth: 3
      },
      headerTitleStyle: {
        fontSize: 18
      }
    }
  },
  WatchList: {
    screen: WatchList,
    navigationOptions: {
      title: "Watchlist",
      headerTintColor: Colores.primary,
      headerStyle: {
        backgroundColor: Colores.secondary,
        borderBottomColor: Colores.secondaryLighter,
        borderBottomWidth: 3
      },
      headerTitleStyle: {
        fontSize: 18
      }
    }
  },
});

export const Navigator = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <PantallaCarga />;
    }

    return (
      <Root>
        <Navigator></Navigator>
      </Root>
    );
  }
}
