import * as React from "react";
export interface FallbackOptionType {
  id: string | number;
  label?: string;
  name?: string;
}
declare type Selected = string | number;
export interface CommonOptionProps<OptionType> {
  options: OptionType[];
  width?: string | number;
  testIdPrefix?: string;
  keyExtractor: (item: OptionType) => number | string;
  rowLabelExtractor?: (item: OptionType) => React.ReactNode;
  rowRenderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
    },
    props: OptionsProps<OptionType>
  ) => React.ReactNode;
}
export interface RadioOptionProps<OptionType>
  extends CommonOptionProps<OptionType> {
  type?: "radio";
  onSelect: (suggestion: OptionType) => void;
  selected?: Selected;
}
export interface CheckboxOptionProps<OptionType>
  extends CommonOptionProps<OptionType> {
  type: "checkbox";
  onSelect: (suggestion: OptionType[]) => void;
  selected?: Selected[];
}
export declare type OptionsProps<OptionType> =
  | RadioOptionProps<OptionType>
  | CheckboxOptionProps<OptionType>;
export {};
