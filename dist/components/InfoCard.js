import { Image, StyleSheet, View } from "react-native";
import * as React from "react";
import { colors } from "../theme";
import Text from "./Text";
import Icon from "pebble-shared/native/Icon";
import Touchable from "./shared/Touchable";
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white.base,
    marginBottom: 10
  },
  topSection: {
    paddingVertical: 20,
    paddingHorizontal: 25
  },
  bottomSection: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: colors.gray.lighter,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageWrapper: {
    height: 100,
    position: "absolute",
    bottom: -20,
    right: -30
  },
  descriptionText: {
    width: "60%",
    marginTop: 20
  },
  content: {
    maxHeight: 190,
    overflow: "hidden",
    zIndex: 1
  },
  row: { flexDirection: "row", justifyContent: "space-between" }
});
class InfoCard extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false
    };
    this.getFooter = () => {
      const { linkText, onPress, expandable, disabled } = this.props;
      const { isOpen } = this.state;
      if (expandable) {
        return React.createElement(
          Touchable,
          {
            onPress: !disabled
              ? () =>
                  this.setState({
                    isOpen: !isOpen
                  })
              : undefined
          },
          React.createElement(
            View,
            { style: styles.bottomSection },
            React.createElement(
              Text,
              { color: colors.violet.base },
              isOpen ? "View Less" : "View More"
            ),
            React.createElement(Icon, {
              name: isOpen ? "arrow-up" : "arrow-down"
            })
          )
        );
      }
      return (
        !!linkText &&
        React.createElement(
          Touchable,
          { disabled: disabled, onPress: onPress },
          React.createElement(
            View,
            { style: styles.bottomSection },
            React.createElement(
              Text,
              { color: disabled ? colors.gray.base : colors.violet.base },
              linkText
            )
          )
        )
      );
    };
  }
  render() {
    const {
      title,
      description,
      image,
      topRightElement,
      expandable,
      children,
      style = {},
      content
    } = this.props;
    const _children = content || children;
    return React.createElement(
      View,
      { style: [styles.container, style.container] },
      React.createElement(
        View,
        { style: [styles.topSection, style.topSection] },
        React.createElement(
          View,
          { style: [styles.row, style.heading] },
          React.createElement(
            Text,
            { size: 13, color: colors.gray.dark },
            title
          ),
          topRightElement
        ),
        _children
          ? React.createElement(
              View,
              {
                style:
                  expandable && !this.state.isOpen ? styles.content : undefined
              },
              _children
            )
          : React.createElement(
              View,
              null,
              !!image &&
                React.createElement(Image, {
                  style: [styles.imageWrapper, style.imageWrapper],
                  source: image,
                  resizeMode: "contain"
                }),
              !!description &&
                React.createElement(
                  Text,
                  { lineHeight: 22, style: styles.descriptionText },
                  description
                )
            )
      ),
      this.getFooter()
    );
  }
}
export default InfoCard;
//# sourceMappingURL=InfoCard.js.map
