import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import { colors } from "../theme";
import Text from "./Text";
import Touchable from "./shared/Touchable";
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray.lighter,
    width: 160,
    height: 110,
    padding: 5,
    borderRadius: 3
  },
  image: {
    overflow: "hidden",
    height: "50%",
    width: "100%"
  },
  text: {
    paddingHorizontal: 10
  },
  title: {
    marginTop: 2
  }
});
// @ts-ignore
const ImageThumbnail = ({
  image,
  onPress,
  title,
  subText,
  style = {},
  ...otherProps
}) => {
  return React.createElement(
    Touchable,
    Object.assign({ onPress: onPress }, otherProps),
    React.createElement(
      View,
      { style: [styles.container, style] },
      React.createElement(Image, {
        resizeMode: "cover",
        resizeMethod: "resize",
        source: image,
        style: styles.image
      }),
      React.createElement(
        Text,
        {
          lineHeight: 24,
          numberOfLines: 1,
          ellipsizeMode: "tail",
          size: 13,
          bold: true,
          style: [styles.text, styles.title]
        },
        title
      ),
      React.createElement(
        Text,
        {
          lineHeight: 16,
          numberOfLines: 1,
          ellipsizeMode: "tail",
          size: 11,
          color: colors.gray.dark,
          bold: true,
          style: styles.text
        },
        subText
      )
    )
  );
};
export default ImageThumbnail;
//# sourceMappingURL=ImageThumbnail.js.map
