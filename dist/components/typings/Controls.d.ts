import * as React from "react";
declare type Selected = string | number;
export interface FallbackOptionType {
  id: string | number;
  label?: string;
  name?: string;
}
export interface CommonControlsProps<OptionType> {
  data: OptionType[];
  allowToggle?: boolean;
  style?: any;
  name?: React.ReactText;
  ripple?: boolean;
  testIdPrefix?: string;
  keyExtractor?: (item: OptionType) => string | number;
  renderLabel?: (args: { item: OptionType }) => React.ReactNode;
  disabled?: boolean | (string | number)[];
}
export interface RadioControlsProps<OptionType>
  extends CommonControlsProps<OptionType> {
  type?: "radio";
  selected?: Selected;
  onChange: (
    args: {
      selected?: Selected;
    },
    props: RadioControlsProps<OptionType>
  ) => void;
  renderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
      renderLabel?: (args: { item: OptionType }) => React.ReactNode;
    },
    props: RadioControlsProps<OptionType>
  ) => React.ReactNode;
}
export interface CheckboxControlsProps<OptionType>
  extends CommonControlsProps<OptionType> {
  type: "checkbox";
  selected?: Selected[];
  onChange: (
    args: {
      selected: Selected[];
    },
    props: CheckboxControlsProps<OptionType>
  ) => void;
  renderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
      renderLabel?: (args: { item: OptionType }) => React.ReactNode;
    },
    props: CheckboxControlsProps<OptionType>
  ) => React.ReactNode;
}
export declare type ControlsProps<OptionType> =
  | RadioControlsProps<OptionType>
  | CheckboxControlsProps<OptionType>;
export {};
