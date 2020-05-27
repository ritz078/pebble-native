import * as React from "react";
import { StyleSheet, View } from "react-native";
import { OptionsProps, FallbackOptionType } from "./typings/Options";
import colors from "../theme/colors";
import Controls from "./Controls";
import Text from "./Text";
import Icon from "pebble-shared/native/Icon";
import { CheckboxControlsProps, RadioControlsProps } from "./typings/Controls";

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

const rowLabelExtractor = (item: FallbackOptionType) =>
  item.label || item.name || "";

const rowRenderElement = (
  { item, isSelected }: { item: FallbackOptionType; isSelected: boolean },
  props: OptionsProps<FallbackOptionType>
) => {
  const icon =
    props.type === "radio"
      ? isSelected
        ? "radio-selected"
        : "radio"
      : isSelected
      ? "checkbox-selected"
      : "checkbox-unselected";

  return (
    <View style={styles.row}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{ flex: 1, paddingRight: 20 }}
        size={15}
        color={colors.gray.darker}
      >
        {(props.rowLabelExtractor || rowLabelExtractor)(item)}
      </Text>

      <Icon
        name={icon}
        size={20}
        color={isSelected ? colors.violet.base : colors.gray.light}
      />
    </View>
  );
};

export default class Options<OptionType> extends React.Component<
  OptionsProps<OptionType>
> {
  static defaultProps = {
    type: "radio",
    keyExtractor: (item: FallbackOptionType) => item.id,
    testIdPrefix: "options"
  };

  private onRadioSelect = ({ selected }: { selected?: string | number }) => {
    const { options, keyExtractor } = this.props;
    const props = this.props;
    if (props.type !== "checkbox") {
      const selectedOption = options.find(
        option => keyExtractor(option) === selected
      );
      selectedOption && props.onSelect(selectedOption);
    }
  };

  private onCheckboxSelect = ({
    selected
  }: {
    selected: (string | number)[];
  }) => {
    const { options, keyExtractor } = this.props;
    const props = this.props;
    if (props.type === "checkbox") {
      const selectedOptions = options.filter(
        option =>
          Array.isArray(selected) && selected.indexOf(keyExtractor(option)) >= 0
      );
      props.onSelect(selectedOptions);
    }
  };

  // private renderElement: ControlsProps<OptionType>["renderElement"] = args => {
  //   const renderElement = this.props.rowRenderElement || rowRenderElement;

  //   return renderElement && renderElement(args, this.props);
  // };

  private checkboxRenderElement: CheckboxControlsProps<
    OptionType
  >["renderElement"] = args => {
    const props = this.props;
    if (props.type === "checkbox") {
      // prettier-ignore
      return props.rowRenderElement
        ? props.rowRenderElement(args, props)
        : (
          // @ts-ignore
          rowRenderElement(args, props)
        );
    }
  };

  private radioRenderElement: RadioControlsProps<
    OptionType
  >["renderElement"] = args => {
    const props = this.props;
    if (props.type !== "checkbox") {
      // prettier-ignore
      return props.rowRenderElement
        ? props.rowRenderElement(args, props)
        : (
          // @ts-ignore
          rowRenderElement(args, props)
        );
    }
  };

  render() {
    const { options, keyExtractor, width, testIdPrefix } = this.props;
    const props = this.props;
    const commonProps = {
      testIdPrefix,
      style: controlStyle,
      data: options,
      keyExtractor,
      ripple: true
    };
    return (
      <View
        style={[
          styles.optionWrapper,
          {
            width
          }
        ]}
      >
        {props.type === "checkbox" ? (
          <Controls<OptionType>
            type="checkbox"
            selected={props.selected}
            onChange={this.onCheckboxSelect}
            renderElement={this.checkboxRenderElement}
            {...commonProps}
          />
        ) : (
          <Controls<OptionType>
            type="radio"
            selected={props.selected}
            onChange={this.onRadioSelect}
            renderElement={this.radioRenderElement}
            {...commonProps}
          />
        )}
      </View>
    );
  }
}
