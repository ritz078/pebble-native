import * as React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";
import Icon from "pebble-shared/native/Icon";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";
const styles = StyleSheet.create({
  iconWrapper: {
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  subLabel: {
    height: 22,
    width: 22,
    position: "absolute",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    right: -6,
    bottom: -6
  }
});
const CircularButton = ({
  backgroundColor = colors.white.base,
  iconName,
  color = colors.gray.base,
  style = {},
  label,
  small,
  subBackgroundColor = colors.yellow.base,
  subLabel,
  subLabelColor = colors.white.base,
  iconSize = 15,
  ...otherProps
}) => {
  const dimension = small ? 34 : 44;
  return React.createElement(
    View,
    Object.assign(
      {
        style: [
          styles.iconWrapper,
          {
            width: dimension,
            height: dimension,
            backgroundColor
          },
          style
        ]
      },
      otherProps
    ),
    !!iconName &&
      React.createElement(Icon, {
        size: iconSize,
        name: iconName,
        color: color
      }),
    React.createElement(ConditionalComponent, { conditional: label }, _label =>
      React.createElement(
        Text,
        { size: 13, lineHeight: 20, bold: true, color: color },
        _label
      )
    ),
    !!subLabel &&
      React.createElement(
        View,
        {
          style: [
            styles.subLabel,
            {
              backgroundColor: subBackgroundColor
            }
          ]
        },
        React.createElement(
          Text,
          { bold: true, size: 10, lineHeight: 12, color: subLabelColor },
          subLabel
        )
      )
  );
};
export default CircularButton;
//# sourceMappingURL=CircularButton.js.map
