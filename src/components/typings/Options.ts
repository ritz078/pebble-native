import * as React from "react";

export interface FallbackOptionType {
  id: string | number;
  label?: string;
  name?: string;
}

type Selected = string | number;

export interface CommonOptionProps<OptionType> {
  options: OptionType[];
  width?: string | number;
  testIdPrefix?: string;
  keyExtractor: (item: OptionType) => number | string;
  rowLabelExtractor?: (item: OptionType) => React.ReactNode;
}

export interface RadioOptionProps<OptionType>
  extends CommonOptionProps<OptionType> {
  type?: "radio";
  onSelect: (suggestion: OptionType) => void;
  selected?: Selected;
  rowRenderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
    },
    props: RadioOptionProps<OptionType>
  ) => React.ReactNode;
}

export interface CheckboxOptionProps<OptionType>
  extends CommonOptionProps<OptionType> {
  type: "checkbox";
  onSelect: (suggestion: OptionType[]) => void;
  selected?: Selected[];
  rowRenderElement?: (
    args: {
      item: OptionType;
      isSelected: boolean;
    },
    props: CheckboxOptionProps<OptionType>
  ) => React.ReactNode;
}

export type OptionsProps<OptionType> =
  | RadioOptionProps<OptionType>
  | CheckboxOptionProps<OptionType>;
