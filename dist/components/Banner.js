import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import { colors } from "../theme";
import Button from "./Button";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf2da",
    width: "100%",
    position: "relative"
  },
  innerContainer: { padding: 25 },
  title: {
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.gray.darker,
    marginTop: 24,
    height: 40,
    width: "50%"
  },
  image: {
    position: "absolute",
    height: 100,
    right: 0,
    bottom: -6,
    width: 220,
    resizeMode: "contain"
  },
  desc: {
    marginTop: 4,
    width: "60%"
  }
});
// @ts-ignore
const Banner = ({
  title,
  description,
  image,
  buttonText,
  imageStyle = {},
  style = {},
  onPress
}) => {
  return React.createElement(
    View,
    { style: [styles.container, style] },
    React.createElement(
      View,
      { style: styles.innerContainer },
      !!image &&
        React.createElement(Image, {
          source: image,
          style: [styles.image, imageStyle]
        }),
      React.createElement(
        Text,
        { style: styles.title, size: 13, color: colors.gray.dark },
        title
      ),
      React.createElement(
        Text,
        {
          lineHeight: 21,
          bold: true,
          color: colors.gray.darker,
          style: styles.desc
        },
        description
      ),
      !!buttonText &&
        React.createElement(
          Button,
          { type: "primary", style: styles.button, onPress: onPress },
          React.createElement(
            Text,
            { color: colors.white.base, bold: true, size: 11 },
            buttonText
          )
        )
    )
  );
};
export default Banner;
//# sourceMappingURL=Banner.js.map
