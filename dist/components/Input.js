import * as React from "react";
import { View, StyleSheet, TextInput, Animated, Platform } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 68,
    paddingHorizontal: 1,
    marginBottom: 22
  },
  textStyle: {
    marginBottom: 0,
    paddingBottom: 0,
    color: colors.gray.darker,
    fontSize: 15,
    marginTop: 8,
    paddingHorizontal: 0,
    fontFamily: "anarock_regular"
  },
  highlight: {
    height: 1,
    backgroundColor: colors.gray.light,
    width: "100%"
  },
  placeholder: {
    position: "absolute",
    left: 1
  },
  messageStyle: {
    paddingTop: 12,
    lineHeight: 10
  },
  readOnly: {
    marginTop: 20,
    marginBottom: 4
  },
  iosStyles: {
    paddingTop: 10,
    paddingBottom: 5
  }
});
function getColor(error, success, isUnderlineColor) {
  let color = colors.gray.dark;
  if (error) {
    color = colors.red.base;
  } else if (success) {
    color = colors.emerald.base;
  } else if (isUnderlineColor) {
    color = colors.violet.base;
  }
  return color;
}
class Input extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: false,
      placeholderMarginTop: new Animated.Value(20)
    };
    this.handleFocus = () => {
      this.setState(
        {
          isFocused: true
        },
        () => {
          Animated.timing(this.state.placeholderMarginTop, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
          }).start();
        }
      );
    };
    this.handleBlur = () =>
      this.setState(
        {
          isFocused: false
        },
        () => {
          if (!this.props.value)
            Animated.timing(this.state.placeholderMarginTop, {
              toValue: 20,
              duration: 200,
              useNativeDriver: false
            }).start();
        }
      );
  }
  static getDerivedStateFromProps(newProps) {
    if (newProps.value) {
      return {
        placeholderMarginTop: new Animated.Value(0)
      };
    }
    return null;
  }
  render() {
    const {
      value,
      placeholder,
      errorMessage,
      successMessage,
      message,
      onChange,
      style,
      readOnly,
      required,
      keyboardType,
      disabled,
      inputProps,
      textInputStyles
    } = this.props;
    const _message = errorMessage || successMessage || message;
    return React.createElement(
      View,
      { style: [styles.wrapper, style] },
      React.createElement(
        Text,
        {
          animated: true,
          color: this.state.placeholderMarginTop.interpolate({
            inputRange: [0, 20],
            outputRange: [colors.gray.dark, colors.gray.base]
          }),
          size: this.state.placeholderMarginTop.interpolate({
            inputRange: [0, 20],
            outputRange: [13, 15]
          }),
          style: [
            styles.placeholder,
            {
              top: this.state.placeholderMarginTop
            }
          ]
        },
        placeholder,
        " ",
        required &&
          !disabled &&
          React.createElement(Text, { color: colors.red.base }, "*")
      ),
      readOnly
        ? React.createElement(
            Text,
            {
              color: colors.gray.darker,
              size: 15,
              style: [
                styles.readOnly,
                !value ? { marginBottom: 15 } : undefined
              ],
              numberOfLines: 1,
              ellipsizeMode: "tail"
            },
            React.createElement(React.Fragment, null, value)
          )
        : React.createElement(
            TextInput,
            Object.assign(
              {
                style: [
                  styles.textStyle,
                  {
                    color: disabled ? colors.gray.base : colors.gray.darker
                  },
                  Platform.OS === "ios" && styles.iosStyles,
                  textInputStyles
                ],
                onChangeText: onChange,
                underlineColorAndroid: "transparent",
                value: value ? value.toString() : undefined,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                autoCorrect: false,
                selectionColor: colors.violet.base,
                editable: !(readOnly || disabled),
                keyboardType: keyboardType
              },
              inputProps
            )
          ),
      React.createElement(View, {
        style: [
          styles.highlight,
          this.state.isFocused || _message
            ? {
                height: 2,
                backgroundColor: getColor(errorMessage, successMessage, true),
                marginTop: -1
              }
            : {},
          disabled && { backgroundColor: "transparent" }
        ]
      }),
      _message &&
        React.createElement(
          Text,
          {
            size: 13,
            style: [
              styles.messageStyle,
              { color: getColor(errorMessage, successMessage) }
            ]
          },
          _message
        )
    );
  }
}
export default Input;
//# sourceMappingURL=Input.js.map
