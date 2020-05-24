import * as React from "react";
import ActionModal from "./ActionModal";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import Text from "./Text";
const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between"
  },
  button: {
    width: "49%"
  }
});
const actionModalStyle = StyleSheet.create({
  children: {
    paddingBottom: 30
  }
});
export default function ConfirmationPopUp({
  title,
  description,
  onConfirmPress,
  onRejectPress,
  confirmButtonText,
  rejectButtonText,
  visible,
  onClose,
  ...otherProps
}) {
  return React.createElement(
    ActionModal,
    Object.assign(
      {
        style: actionModalStyle,
        title: title,
        visible: visible,
        onClose: onClose
      },
      otherProps
    ),
    React.createElement(
      React.Fragment,
      null,
      React.createElement(Text, { size: 15, lineHeight: 22 }, description),
      React.createElement(
        View,
        { style: styles.buttonWrapper },
        React.createElement(
          Button,
          { style: styles.button, type: "secondary", onPress: onRejectPress },
          rejectButtonText
        ),
        React.createElement(
          Button,
          { style: styles.button, onPress: onConfirmPress },
          confirmButtonText
        )
      )
    )
  );
}
//# sourceMappingURL=ConfirmationPopUp.js.map
