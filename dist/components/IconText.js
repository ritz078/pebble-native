import { StyleSheet, View } from "react-native";
import * as React from "react";
import CircularButton from "./CircularButton";
import { colors } from "../theme";
import Text from "./Text";
import Touchable from "./shared/Touchable";
const iconTextStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    alignItems: "center",
    paddingVertical: 4
  },
  iconWrapper: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
});
const IconText = ({
  iconName,
  color,
  backgroundColor,
  label,
  onPress,
  ...otherProps
}) => {
  return React.createElement(
    Touchable,
    Object.assign({ onPress: onPress, disabled: !onPress }, otherProps),
    React.createElement(
      View,
      {
        style: [
          iconTextStyles.container,
          {
            opacity: !onPress ? 0.3 : 1
          }
        ]
      },
      React.createElement(CircularButton, {
        color: color,
        backgroundColor: backgroundColor,
        iconName: iconName
      }),
      React.createElement(Text, { color: colors.gray.darker }, label)
    )
  );
};
export default IconText;
//# sourceMappingURL=IconText.js.map
