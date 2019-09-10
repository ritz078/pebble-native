import * as React from "react";
import { Component } from "react";
import { Font } from "expo";
import Main from "./storybook";

interface AppState {
  fontsLoaded: boolean;
}

export default class App extends Component<{}, AppState> {
  state = {
    fontsLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      anarock_medium: require("./assets/fonts/anarock_medium.ttf"),
      anarock_regular: require("./assets/fonts/anarock_regular.ttf"),
      pebble: require("./node_modules/pebble-shared/dist/fonts/pebble.ttf")
    });

    this.setState({
      fontsLoaded: true
    });
  }

  render() {
    return this.state.fontsLoaded && <Main />;
  }
}
