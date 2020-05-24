import * as React from "react";
import { GestureResponderEvent } from "react-native";
import { ButtonProps } from "./typings/Button";
export interface SingleTapButtonState {
  loading: boolean;
}
export interface SingleTapButtonProps extends Omit<ButtonProps, "onPress"> {
  onPress: (e: GestureResponderEvent) => Promise<any>;
}
export default class SingleTapButton extends React.PureComponent<
  SingleTapButtonProps,
  SingleTapButtonState
> {
  state: Readonly<SingleTapButtonState>;
  private onPress;
  render(): JSX.Element;
}
