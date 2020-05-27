import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import {
  ControlsProps,
  FallbackOptionType,
  CommonControlsProps,
  RadioControlsProps,
  CheckboxControlsProps
} from "./typings/Controls";
import Text from "./Text";
import Icon from "pebble-shared/native/Icon";
import colors from "../theme/colors";
import { SetRequired } from "type-fest";

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

const defaultLabelRenderer = ({ item }: { item: FallbackOptionType }) => (
  <Text color={colors.gray.darker} size={15} style={styles.defaulLabel}>
    {item.label || item.name}
  </Text>
);

function ControlView({
  item,
  isSelected,
  type,
  renderLabel = defaultLabelRenderer
}: {
  item: FallbackOptionType;
  isSelected: boolean;
  type?: "radio" | "checkbox";
  renderLabel?: CommonControlsProps<FallbackOptionType>["renderLabel"];
}) {
  const icon =
    type === "checkbox"
      ? isSelected
        ? "radio-selected"
        : "radio"
      : isSelected
      ? "checkbox-selected"
      : "checkbox-unselected";
  return (
    <React.Fragment>
      <Icon
        color={isSelected ? colors.violet.base : colors.gray.light}
        size={18}
        name={icon}
      />
      {renderLabel({ item })}
    </React.Fragment>
  );
}

type RequiredKeys = keyof typeof Controls.defaultProps;

export default class Controls<OptionType> extends React.PureComponent<
  | SetRequired<CheckboxControlsProps<OptionType>, RequiredKeys>
  | SetRequired<RadioControlsProps<OptionType>, RequiredKeys>
> {
  static ControlView = ControlView;

  static defaultProps = {
    keyExtractor: (item: FallbackOptionType) => item.id,
    type: "radio",
    renderElement: (
      {
        item,
        isSelected,
        renderLabel
      }: {
        item: FallbackOptionType;
        isSelected: boolean;
        renderLabel: CommonControlsProps<FallbackOptionType>["renderLabel"];
      },
      props: ControlsProps<FallbackOptionType>
    ) => (
      <ControlView
        item={item}
        isSelected={isSelected}
        type={props.type}
        renderLabel={renderLabel}
      />
    ),
    style: {},
    testIdPrefix: "controls"
  };

  private handlePress = (id: string | number) => {
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

  private isSelected = (item: OptionType) => {
    const { keyExtractor, type, selected } = this.props;
    const key = keyExtractor(item);
    return type === "radio"
      ? key === selected
      : Array.isArray(selected) && selected.indexOf(key) >= 0;
  };

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
    return (
      <View style={[styles.wrapper, style.wrapper]}>
        {data.map((item, i) => {
          const key = keyExtractor(item);
          const _disabled = Array.isArray(disabled)
            ? disabled.includes(key)
            : disabled;
          return (
            <Touchable
              testID={`${testIdPrefix}-${i}`}
              key={key}
              onPress={() => this.handlePress(key)}
              disabled={_disabled}
            >
              <View style={[styles.itemWrapper, style.itemWrapper]}>
                {props.type === "checkbox"
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
                    )}
              </View>
            </Touchable>
          );
        })}
      </View>
    );
  }
}
