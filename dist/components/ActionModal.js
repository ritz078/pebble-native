import * as React from "react";
import { Dimensions, StyleSheet, View, Modal } from "react-native";
import colors from "../theme/colors";
import Text from "./Text";
import Button from "./Button";
import Icon from "pebble-shared/native/Icon";
import Touchable from "./shared/Touchable";
import ConditionalComponent from "./shared/ConditionalComponent";
const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  overlay: {
    flex: 1
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white.base
  },
  container: {
    maxHeight: Math.min(472, Dimensions.get("window").height * 0.6),
    paddingHorizontal: 25,
    backgroundColor: colors.white.base
  },
  titleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: colors.white.base
  },
  header: {
    height: 54,
    paddingVertical: 20,
    paddingLeft: 25,
    alignItems: "center",
    flexDirection: "row"
  },
  children: {
    paddingTop: 30,
    paddingBottom: 50
  }
});
const headerTypeToColor = {
  success: {
    light: colors.emerald.lightest,
    dark: colors.emerald.base,
    icon: "radio-check-filled"
  },
  error: {
    light: colors.red.lightest,
    dark: colors.red.base,
    icon: "warning"
  },
  warning: {
    light: colors.yellow.light,
    dark: colors.yellow.base,
    icon: "warning"
  }
};
// @ts-ignore
const ActionModal = function ({
  onClose,
  title,
  children,
  onButtonClick,
  buttonLabel,
  showFooterButton,
  visible,
  header,
  headerType,
  style = {},
  footer,
  ...otherProps
}) {
  const { light, icon, dark } = headerType
    ? headerTypeToColor[headerType]
    : {
        light: undefined,
        icon: undefined,
        dark: undefined
      };
  return React.createElement(
    Modal,
    Object.assign(
      {
        animationType: "fade",
        visible: visible,
        transparent: true,
        onRequestClose: onClose
      },
      otherProps
    ),
    React.createElement(
      View,
      { style: [styles.modalContent, style.modalContent] },
      React.createElement(
        Touchable,
        { style: [styles.overlay, style.overlay], onPress: onClose },
        React.createElement(View, { style: [styles.overlay, style.overlay] })
      ),
      React.createElement(View, null),
      React.createElement(
        View,
        { style: [styles.wrapper, style.wrapper] },
        React.createElement(
          ConditionalComponent,
          { conditional: header },
          _header =>
            React.createElement(
              View,
              {
                style: [styles.header, { backgroundColor: light }, style.header]
              },
              icon &&
                React.createElement(Icon, {
                  name: icon,
                  color: dark,
                  size: 14
                }),
              React.createElement(
                Text,
                { color: dark, size: 15 },
                " " + _header
              )
            )
        ),
        React.createElement(
          View,
          { style: [styles.container, style.container] },
          !!title &&
            React.createElement(
              View,
              { style: [styles.titleWrapper, style.container] },
              React.createElement(
                Text,
                { size: 15, color: colors.gray.dark },
                title
              )
            ),
          React.createElement(
            View,
            { style: [styles.children, style.children] },
            children
          )
        ),
        showFooterButton &&
          (footer ||
            React.createElement(
              Button.FooterButton,
              { onPress: onButtonClick },
              buttonLabel
            ))
      )
    )
  );
};
export default ActionModal;
//# sourceMappingURL=ActionModal.js.map
