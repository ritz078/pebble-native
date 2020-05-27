import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import Text from "./Text";
import Icon from "pebble-shared/native/Icon";
import colors from "../theme/colors";
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  itemWrapper: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center"
  },
  defaulLabel: {
    marginLeft: 10
  }
});
const defaultLabelRenderer = ({ item }) =>
  React.createElement(
    Text,
    { color: colors.gray.darker, size: 15, style: styles.defaulLabel },
    item.label || item.name
  );
function ControlView({
  item,
  isSelected,
  type,
  renderLabel = defaultLabelRenderer
}) {
  const icon =
    type === "checkbox"
      ? isSelected
        ? "radio-selected"
        : "radio"
      : isSelected
      ? "checkbox-selected"
      : "checkbox-unselected";
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Icon, {
      color: isSelected ? colors.violet.base : colors.gray.light,
      size: 18,
      name: icon
    }),
    renderLabel({ item })
  );
}
export default class Controls extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.handlePress = id => {
      const props = this.props;
      const { allowToggle } = this.props;
      if (props.type === "checkbox") {
        if (props.selected && !Array.isArray(props.selected)) return;
        const set = new Set(props.selected);
        if (set.has(id)) {
          set.delete(id);
        } else {
          set.add(id);
        }
        props.onChange({ selected: [...set] }, props);
      } else {
        props.onChange(
          { selected: allowToggle && props.selected === id ? undefined : id },
          props
        );
      }
    };
    this.isSelected = item => {
      const { keyExtractor, type, selected } = this.props;
      const key = keyExtractor(item);
      return type === "radio"
        ? key === selected
        : Array.isArray(selected) && selected.indexOf(key) >= 0;
    };
  }
  render() {
    const {
      data,
      keyExtractor,
      style,
      ripple,
      disabled,
      renderLabel,
      testIdPrefix
    } = this.props;
    const props = this.props;
    const Touchable =
      ripple && Platform.OS === "android"
        ? TouchableNativeFeedback
        : TouchableWithoutFeedback;
    return React.createElement(
      View,
      { style: [styles.wrapper, style.wrapper] },
      data.map((item, i) => {
        const key = keyExtractor(item);
        const _disabled = Array.isArray(disabled)
          ? disabled.includes(key)
          : disabled;
        return React.createElement(
          Touchable,
          {
            testID: `${testIdPrefix}-${i}`,
            key: key,
            onPress: () => this.handlePress(key),
            disabled: _disabled
          },
          React.createElement(
            View,
            { style: [styles.itemWrapper, style.itemWrapper] },
            props.type === "checkbox"
              ? props.renderElement(
                  {
                    item,
                    isSelected: this.isSelected(item),
                    renderLabel
                  },
                  props
                )
              : props.renderElement(
                  {
                    item,
                    isSelected: this.isSelected(item),
                    renderLabel
                  },
                  props
                )
          )
        );
      })
    );
  }
}
Controls.ControlView = ControlView;
Controls.defaultProps = {
  keyExtractor: item => item.id,
  type: "radio",
  renderElement: ({ item, isSelected, renderLabel }, props) =>
    React.createElement(ControlView, {
      item: item,
      isSelected: isSelected,
      type: props.type,
      renderLabel: renderLabel
    }),
  style: {},
  testIdPrefix: "controls"
};
//# sourceMappingURL=Controls.js.map
