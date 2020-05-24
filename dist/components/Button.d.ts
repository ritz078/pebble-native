import * as React from "react";
import { ButtonProps, DoubleFooterButtonProps } from "./typings/Button";
import { SetRequired } from "type-fest";
declare class Button extends React.Component<
  SetRequired<ButtonProps, keyof typeof Button.defaultProps>
> {
  static FooterButton: React.FunctionComponent<ButtonProps>;
  static DoubleFooterButton: React.FunctionComponent<DoubleFooterButtonProps>;
  static defaultProps: {
    type: string;
  };
  render(): JSX.Element;
}
export default Button;
