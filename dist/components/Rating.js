import * as React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "pebble-shared/native/Icon";
import { colors } from "../theme";
import Text from "./Text";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    marginLeft: 3
  },
  icon: {
    paddingHorizontal: 2
  }
});
// @ts-ignore
const Rating = ({ max = 3, value = 0, label }) => {
  return React.createElement(
    View,
    { style: styles.container },
    [...new Array(max)].map((_n, i) => {
      return React.createElement(Icon, {
        key: i,
        color: i + 1 <= value ? colors.red.base : colors.gray.light,
        style: styles.icon,
        name: "fire",
        size: 15
      });
    }),
    !!label &&
      React.createElement(
        Text,
        { style: styles.label, color: colors.gray.darker },
        label
      )
  );
};
export default Rating;
//# sourceMappingURL=Rating.js.map
