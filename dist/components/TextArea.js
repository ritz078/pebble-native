import * as React from "react";
import { StyleSheet } from "react-native";
import Input from "./Input";
const styles = StyleSheet.create({
  textArea: {
    marginTop: 30,
    minHeight: 60,
    lineHeight: 15,
    textAlignVertical: "top"
  }
});
const TextArea = ({
  inputProps,
  numberOfLines = 3,
  style,
  textInputStyles,
  ...passProps
}) => {
  return React.createElement(
    Input,
    Object.assign({}, passProps, {
      style: [style, { height: "auto" }],
      textInputStyles: [styles.textArea, textInputStyles],
      inputProps: {
        ...inputProps,
        multiline: true,
        numberOfLines
      }
    })
  );
};
export default TextArea;
//# sourceMappingURL=TextArea.js.map
