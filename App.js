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

const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Config: {
    screen: ConfigComp
  },
  WatchList: {
    screen: WatchList
  }
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
      return <AppLoading />;
    }

    return (
      <Root>
        <Navigator></Navigator>
      </Root>
    );
  }
}
