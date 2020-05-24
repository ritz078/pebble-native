import * as React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../theme/colors";
import Controls from "./Controls";
import Text from "./Text";
import Icon from "pebble-shared/native/Icon";
const styles = StyleSheet.create({
  optionWrapper: {
    backgroundColor: colors.white.base
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%"
  }
});
const controlStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "column"
  },
  itemWrapper: {
    width: "100%"
  }
});
const rowLabelExtractor = item => item.label || item.name || "";
const rowRenderElement = ({ item, isSelected }, props) => {
  const icon =
    props.type === "radio"
      ? isSelected
        ? "radio-selected"
        : "radio"
      : isSelected
      ? "checkbox-selected"
      : "checkbox-unselected";
  return React.createElement(
    View,
    { style: styles.row },
    React.createElement(
      Text,
      {
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: { flex: 1, paddingRight: 20 },
        size: 15,
        color: colors.gray.darker
      },
      (props.rowLabelExtractor || rowLabelExtractor)(item)
    ),
    React.createElement(Icon, {
      name: icon,
      size: 20,
      color: isSelected ? colors.violet.base : colors.gray.light
    })
  );
};
export default class Options extends React.Component {
  constructor() {
    super(...arguments);
    this.onRadioSelect = ({ selected }) => {
      const { options, keyExtractor } = this.props;
      const props = this.props;
      if (props.type !== "checkbox") {
        const selectedOption = options.find(
          option => keyExtractor(option) === selected
        );
        selectedOption && props.onSelect(selectedOption);
      }
    };
    this.onCheckboxSelect = ({ selected }) => {
      const { options, keyExtractor } = this.props;
      const props = this.props;
      if (props.type === "checkbox") {
        const selectedOptions = options.filter(
          option =>
            Array.isArray(selected) &&
            selected.indexOf(keyExtractor(option)) >= 0
        );
        props.onSelect(selectedOptions);
      }
    };
    this.renderElement = args => {
      // @ts-ignore
      const renderElement = this.props.rowRenderElement || rowRenderElement;
      return renderElement && renderElement(args, this.props);
    };
  }
  render() {
    const { options, keyExtractor, width, testIdPrefix } = this.props;
    const props = this.props;
    const commonProps = {
      testIdPrefix,
      style: controlStyle,
      renderElement: this.renderElement,
      data: options,
      keyExtractor,
      ripple: true
    };
    return React.createElement(
      View,
      {
        style: [
          styles.optionWrapper,
          {
            width
          }
        ]
      },
      props.type === "checkbox"
        ? React.createElement(
            Controls,
            Object.assign(
              {
                type: "checkbox",
                selected: props.selected,
                onChange: this.onCheckboxSelect
              },
              commonProps
            )
          )
        : React.createElement(
            Controls,
            Object.assign(
              {
                type: "radio",
                selected: props.selected,
                onChange: this.onRadioSelect
              },
              commonProps
            )
          )
    );
  }
}
Options.defaultProps = {
  type: "radio",
  keyExtractor: item => item.id,
  testIdPrefix: "options"
};
//# sourceMappingURL=Options.js.map
