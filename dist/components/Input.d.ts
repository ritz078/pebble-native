import * as React from "react";
import { InputProps, InputState } from "./typings/Input";
declare class Input extends React.PureComponent<InputProps, InputState> {
  state: InputState;
  static getDerivedStateFromProps(
    newProps: InputProps
  ): Partial<InputState> | null;
  handleFocus: () => void;
  handleBlur: () => void;
  render(): JSX.Element;
}
export default Input;
