/// <reference types="react" />
import { GestureResponderEvent } from "react-native";
import {
  CommonOptionProps,
  RadioOptionProps,
  CheckboxOptionProps
} from "./Options";
export interface CommonSelectProps<OptionType>
  extends CommonOptionProps<OptionType> {
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  title?: string;
  onClose?: (e?: GestureResponderEvent) => void;
  label?: (args: {
    value: string;
    props: SelectProps<OptionType>;
    toggle: () => void;
  }) => React.ReactNode;
  showFooterButton?: boolean;
  autoClose?: boolean;
  footer?: React.ReactNode;
}
export interface RadioSelectProps<OptionType>
  extends RadioOptionProps<OptionType>,
    CommonSelectProps<OptionType> {
  valueExtractor: (item: OptionType) => string;
}
export interface CheckboxSelectProps<OptionType>
  extends CheckboxOptionProps<OptionType>,
    CommonSelectProps<OptionType> {
  valueExtractor: (items: OptionType[]) => string;
}
export declare type SelectProps<OptionType> =
  | RadioSelectProps<OptionType>
  | CheckboxSelectProps<OptionType>;
export interface SelectState {
  showOptions: boolean;
  selectedCheckbox: (string | number)[];
}
