import * as React from "react";
import debounce from "just-debounce-it";
import Button from "./Button";
export default class SingleTapButton extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      loading: false
    };
    this.onPress = debounce(
      e => {
        this.setState({ loading: true });
        // Using function form of finally as want to error out if not returned a Promise
        this.props.onPress(e).finally(() => {
          this.setState({ loading: false });
        });
      },
      2000,
      true
    );
  }
  render() {
    return React.createElement(
      Button,
      Object.assign({}, this.props, {
        loading: this.props.loading || this.state.loading,
        onPress: this.onPress
      })
    );
  }
}
//# sourceMappingURL=SingleTapButton.js.map
