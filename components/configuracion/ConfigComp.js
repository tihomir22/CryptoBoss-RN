import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import {
  Container,
  Header,
  Text,
  Button,
  Label,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Toast
} from "native-base";
class ConfigComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeframe: "timeframe:1",
      currency: "currency:usd",
      hasChanged: false
    };
    this.retrieveData();
  }

  async storeData(key, data) {
    try {
      await SecureStore.setItemAsync(key, data);
    } catch (error) {
      console.log(error);
    }
  }

  async retrieveData() {
    try {
      const timeframe = await SecureStore.getItemAsync("timeframe");
      if (timeframe !== null) {
        this.setState({ timeframe: "timeframe:" + timeframe });
      }
      const currency = await SecureStore.getItemAsync("currency");
      if (currency !== null) {
        this.setState({ currency: "currency:" + currency });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  saveData() {
    this.storeData(
      this.state.timeframe.split(":")[0],
      this.state.timeframe.split(":")[1]
    );
    this.storeData(
      this.state.currency.split(":")[0],
      this.state.currency.split(":")[1]
    );

    Toast.show({
      text: "Successfully saved!",
      buttonText: "Okay",
      position: "bottom"
    });
    this.setState({ hasChanged: false });
  }

  render() {
    return (
      <Content>
        <Form style={{ marginHorizontal: 10 }}>
          <Item picker>
            <Label>Timeframe</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: 10 }}
              placeholder="Select timeframe"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.timeframe}
              onValueChange={event =>
                this.setState({ timeframe: event, hasChanged: true })
              }
            >
              <Picker.Item label="1 day" value="timeframe:1" />
              <Picker.Item label="14 days" value="timeframe:14" />
              <Picker.Item label="30 days" value="timeframe:30" />
              <Picker.Item label="MAX" value="timeframe:max" />
            </Picker>
          </Item>

          <Item picker>
            <Label>Currency</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select currency"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.currency}
              onValueChange={event =>
                this.setState({ currency: event, hasChanged: true })
              }
            >
              <Picker.Item label="USD" value="currency:usd" />
              <Picker.Item label="EUR" value="currency:eur" />
              <Picker.Item label="GBP" value="currency:gbp" />
              <Picker.Item label="JPY" value="currency:jpy" />
            </Picker>
          </Item>
        </Form>
        {this.state.hasChanged ? (
          <Button full success onPress={() => this.saveData()}>
            <Text>Save changes</Text>
          </Button>
        ) : null}
      </Content>
    );
  }
}

ConfigComp.propTypes = {};

export default ConfigComp;
