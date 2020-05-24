import * as React from "react";
import { View, StyleSheet } from "react-native";
import CircularButton from "./CircularButton";
import { colors } from "../theme";
import Text from "./Text";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: { marginBottom: 0, marginRight: 12, marginTop: 4 },
  titleWrapper: { flexDirection: "row", justifyContent: "space-between" }
});
const List = ({
  title,
  description,
  iconName,
  iconColor = colors.gray.base,
  iconBackgroundColor,
  style = {},
  topRightElement,
  subBackgroundColor = colors.yellow.base,
  subLabel,
  subLabelColor = colors.white.base
}) => {
  return React.createElement(
    View,
    { style: style },
    React.createElement(
      View,
      { style: styles.row },
      !!iconName &&
        React.createElement(CircularButton, {
          iconName: iconName,
          color: iconColor,
          backgroundColor: iconBackgroundColor,
          style: styles.icon,
          subBackgroundColor: subBackgroundColor,
          subLabel: subLabel,
          subLabelColor: subLabelColor
        }),
      React.createElement(
        View,
        null,
        React.createElement(
          View,
          { style: styles.titleWrapper },
          React.createElement(
            Text,
            {
              numberOfLines: 1,
              ellipsizeMode: "tail",
              lineHeight: 22,
              size: 13,
              color: colors.gray.dark,
              style: {
                marginBottom: 1
              }
            },
            title
          ),
          topRightElement
        ),
        React.createElement(
          Text,
          { color: colors.gray.darker, lineHeight: 22, size: 13 },
          description
        )
      )
    )
  );
};
export default List;
//# sourceMappingURL=List.js.map
