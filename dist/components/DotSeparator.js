import * as React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import colors from "../theme/colors";
import Icon from "pebble-shared/native/Icon";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingTop: 2
  }
});
const DotSeparator = ({
  style = {},
  texts,
  dotColor = colors.gray.light,
  dotSize = 4,
  textProps,
  color = colors.gray.dark
}) => {
  const _texts = texts.filter(Boolean);
  return React.createElement(
    View,
    { style: [styles.container, style] },
    React.createElement(
      React.Fragment,
      null,
      _texts.map((text, i) =>
        React.createElement(
          React.Fragment,
          { key: i },
          React.createElement(
            Text,
            Object.assign({ color: color }, textProps),
            text
          ),
          i < _texts.length - 1 &&
            React.createElement(
              View,
              { style: styles.dotContainer },
              React.createElement(Icon, {
                size: dotSize,
                color: dotColor,
                name: "dot"
              })
            )
        )
      )
    )
  );
};
export default DotSeparator;
//# sourceMappingURL=DotSeparator.js.map
