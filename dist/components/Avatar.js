import * as React from "react";
import { View, StyleSheet } from "react-native";
import CircularButton from "./CircularButton";
import { colors } from "../theme";
const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center"
  }
});
const Avatar = ({ label, backgroundColor }) => {
  return React.createElement(
    View,
    { style: [styles.container] },
    React.createElement(CircularButton, {
      small: true,
      color: colors.white.base,
      backgroundColor: backgroundColor,
      label: label
    })
  );
};
export default Avatar;
//# sourceMappingURL=Avatar.js.map
