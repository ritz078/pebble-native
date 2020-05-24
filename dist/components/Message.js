import * as React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import ConditionalComponent from "./shared/ConditionalComponent";
const styles = StyleSheet.create({
  container: {
    paddingVertical: 35,
    paddingHorizontal: 25
  },
  title: {
    marginBottom: 12
  },
  linkText: {
    textDecorationLine: "underline"
  }
});
const Message = ({
  backgroundColor,
  title,
  description,
  linkText,
  onPress
}) => {
  return React.createElement(
    TouchableNativeFeedback,
    { onPress: onPress, disabled: !onPress },
    React.createElement(
      View,
      {
        style: [
          styles.container,
          {
            backgroundColor
          }
        ]
      },
      React.createElement(
        ConditionalComponent,
        { conditional: title },
        _title =>
          React.createElement(
            Text,
            {
              bold: true,
              style: styles.title,
              size: 15,
              lineHeight: 22,
              color: colors.gray.darker
            },
            _title
          )
      ),
      React.createElement(
        Text,
        null,
        React.createElement(
          ConditionalComponent,
          { conditional: description },
          _description =>
            React.createElement(
              Text,
              { size: 13, lineHeight: 18, color: colors.gray.darker },
              React.createElement(React.Fragment, null, _description, " ")
            )
        ),
        React.createElement(
          Text,
          {
            style: styles.linkText,
            size: 13,
            lineHeight: 18,
            color: colors.gray.darker
          },
          linkText
        )
      )
    )
  );
};
export default Message;
//# sourceMappingURL=Message.js.map
