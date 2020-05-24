import * as React from "react";
import { TextInput, ViewStyle, TextInputProps } from "react-native";
import { SetRequired } from "type-fest";
export interface OTPInputProps extends TextInputProps {
  editable?: boolean;
  containerStyle?: ViewStyle;
  cellStyle?: ViewStyle;
  tintColor?: string;
  offTintColor?: string;
  otpLength?: number;
  value: string;
  cellParentStyle: ViewStyle;
  showCellParentBorderColor: boolean;
}
export default class OTPInput extends React.Component<
  SetRequired<OTPInputProps, keyof typeof OTPInput.defaultProps>
> {
  static defaultProps: {
    otpLength: number;
    tintColor: string;
    offTintColor: string;
  };
  textInput: React.RefObject<TextInput>;
  componentDidMount(): void;
  inputRef(): TextInput | null;
  focus(): void;
  blur(): void;
  isFocused(): boolean | undefined;
  render(): JSX.Element;
}
