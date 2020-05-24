import { StyleSheet, View } from "react-native";
import * as React from "react";
import { colors } from "../theme";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";
import Touchable from "./shared/Touchable";
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: colors.white.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  title: { marginBottom: 6 }
});
// @ts-ignore
const Card = ({
  title,
  rightElement,
  description,
  onPress,
  style = {},
  ...otherProps
}) => {
  return React.createElement(
    Touchable,
    Object.assign({ onPress: onPress, disabled: !onPress }, otherProps),
    React.createElement(
      View,
      { style: [styles.container, style] },
      React.createElement(
        View,
        null,
        React.createElement(
          ConditionalComponent,
          { conditional: title },
          _title =>
            React.createElement(
              Text,
              { style: styles.title, size: 13, color: colors.gray.dark },
              _title
            )
        ),
        React.createElement(
          ConditionalComponent,
          { conditional: description },
          _description => React.createElement(Text, { size: 15 }, _description)
        )
      ),
      React.createElement(
        ConditionalComponent,
        { conditional: rightElement },
        _rightElement =>
          React.createElement(
            Text,
            { color: colors.violet.base, size: 13 },
            _rightElement
          )
      )
    )
  );
};
export default Card;
//# sourceMappingURL=Card.js.map
