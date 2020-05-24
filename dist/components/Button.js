import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Text from "./Text";
import colors from "../theme/colors";
import Touchable from "./shared/Touchable";
const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    minWidth: 150,
    paddingHorizontal: 20,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white.base,
    borderTopColor: colors.gray.lighter,
    borderTopWidth: 1
  },
  doubleFooterBtnWrapper: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between"
  },
  dfButton: {
    flex: 1
  },
  separator: {
    width: 10
  }
});
const buttonBackgroundColor = {
  primary: colors.violet.base,
  secondary: colors.gray.lighter,
  link: "transparent"
};
const buttonBackgroundDisabledColor = {
  primary: colors.violet.lighter,
  secondary: colors.gray.lightest,
  link: "transparent"
};
const fontColor = {
  primary: colors.white.base,
  secondary: colors.gray.darker,
  link: colors.violet.base
};
const disabledFontColor = {
  ...fontColor,
  secondary: colors.gray.light
};
const FooterButton = ({ children, ...rest }) => {
  return React.createElement(
    View,
    { style: styles.buttonWrapper },
    React.createElement(Button, Object.assign({}, rest), children)
  );
};
const DoubleFooterButton = ({
  leftButtonLabel,
  rightButtonLabel,
  leftButtonType = "secondary",
  rightButtonType,
  onLeftButtonPress,
  onRightButtonPress,
  leftDisabled,
  rightDisabled
}) => {
  return React.createElement(
    View,
    { style: styles.doubleFooterBtnWrapper },
    React.createElement(
      Button,
      {
        disabled: leftDisabled,
        style: styles.dfButton,
        type: leftButtonType,
        onPress: onLeftButtonPress
      },
      leftButtonLabel
    ),
    React.createElement(View, { style: styles.separator }),
    React.createElement(
      Button,
      {
        disabled: rightDisabled,
        type: rightButtonType,
        style: styles.dfButton,
        onPress: onRightButtonPress
      },
      rightButtonLabel
    )
  );
};
class Button extends React.Component {
  render() {
    let {
      children,
      onPress,
      type,
      loading,
      disabled,
      style,
      onLongPress,
      transparent,
      radius,
      ...otherProps
    } = this.props;
    const _disabled = disabled || loading;
    const textColor = transparent
      ? disabled
        ? buttonBackgroundDisabledColor[type]
        : buttonBackgroundColor[type]
      : disabled
      ? disabledFontColor[type]
      : fontColor[type];
    return React.createElement(
      Touchable,
      Object.assign(
        {
          onPress: _disabled ? undefined : onPress,
          disabled: _disabled,
          onLongPress: _disabled ? undefined : onLongPress
        },
        otherProps
      ),
      React.createElement(
        View,
        {
          style: [
            styles.buttonStyle,
            {
              backgroundColor: disabled
                ? buttonBackgroundDisabledColor[type]
                : buttonBackgroundColor[type]
            },
            type === "link"
              ? {
                  justifyContent: "flex-start"
                }
              : undefined,
            transparent
              ? {
                  backgroundColor: "transparent",
                  borderColor: buttonBackgroundColor[type],
                  borderWidth: 1,
                  ...(disabled
                    ? {
                        borderColor: buttonBackgroundDisabledColor[type]
                      }
                    : {})
                }
              : undefined,
            radius
              ? {
                  borderRadius: 25
                }
              : undefined,
            style
          ]
        },
        loading
          ? React.createElement(ActivityIndicator, { color: textColor })
          : React.createElement(
              Text,
              { size: 15, bold: true, color: textColor },
              children
            )
      )
    );
  }
}
Button.FooterButton = FooterButton;
Button.DoubleFooterButton = DoubleFooterButton;
Button.defaultProps = {
  type: "primary"
};
export default Button;
//# sourceMappingURL=Button.js.map
