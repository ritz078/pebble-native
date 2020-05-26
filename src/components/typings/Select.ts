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
  showFooterButton?: boolean;
  autoClose?: boolean;
  footer?: React.ReactNode;
}

export interface RadioSelectProps<OptionType>
  extends RadioOptionProps<OptionType>,
    CommonSelectProps<OptionType> {
  valueExtractor: (item: OptionType) => string;
  label?: (args: {
    value: string;
    props: RadioSelectProps<OptionType>;
    toggle: () => void;
  }) => React.ReactNode;
}

export interface CheckboxSelectProps<OptionType>
  extends CheckboxOptionProps<OptionType>,
    CommonSelectProps<OptionType> {
  valueExtractor: (items: OptionType[]) => string;
  label?: (args: {
    value: string;
    props: CheckboxSelectProps<OptionType>;
    toggle: () => void;
  }) => React.ReactNode;
}

export type SelectProps<OptionType> =
  | RadioSelectProps<OptionType>
  | CheckboxSelectProps<OptionType>;

export interface SelectState {
  showOptions: boolean;
  selectedCheckbox: (string | number)[];
}
