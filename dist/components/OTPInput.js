import * as React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    borderWidth: 1.5
  }
});
export default class OTPInput extends React.Component {
  constructor() {
    super(...arguments);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.focus();
  }
  // public methods
  inputRef() {
    return this.textInput.current;
  }
  focus() {
    if (this.props.editable !== false) {
      this.inputRef()?.focus();
    }
  }
  blur() {
    this.inputRef()?.blur();
  }
  isFocused() {
    return this.inputRef()?.isFocused();
  }
  render() {
    const {
      containerStyle,
      cellStyle,
      tintColor,
      offTintColor,
      otpLength,
      value,
      cellParentStyle,
      showCellParentBorderColor,
      ...otherProps
    } = this.props;
    return React.createElement(
      View,
      null,
      React.createElement(
        TextInput,
        Object.assign(
          {
            ref: this.textInput,
            style: { width: 0, height: 0 },
            value: value,
            maxLength: otpLength,
            returnKeyType: "done",
            keyboardType: "numeric"
          },
          otherProps
        )
      ),
      React.createElement(
        View,
        { style: [styles.container, containerStyle] },
        Array(otpLength)
          .fill(0)
          .map((_, index) =>
            React.createElement(
              View,
              {
                key: index,
                style: [
                  cellParentStyle,
                  showCellParentBorderColor && {
                    borderColor:
                      index === ((value && value.length) || 0)
                        ? tintColor
                        : offTintColor
                  }
                ]
              },
              React.createElement(
                Text,
                {
                  style: [
                    styles.cell,
                    cellStyle,
                    {
                      borderColor:
                        index === ((value && value.length) || 0)
                          ? tintColor
                          : offTintColor
                    }
                  ],
                  onPress: () => this.textInput.current?.focus()
                },
                value && value.length > index ? value[index] : " "
              )
            )
          )
      )
    );
  }
}
OTPInput.defaultProps = {
  otpLength: 6,
  tintColor: "#FB6C6A",
  offTintColor: "#BBBCBE"
};
//# sourceMappingURL=OTPInput.js.map
