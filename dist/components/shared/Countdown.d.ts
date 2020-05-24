/// <reference types="node" />
import * as React from "react";
import { TextProps } from "../typings/Text";
import { Omit } from "utility-types";
import { SetRequired } from "type-fest";
interface CountdownProps extends Omit<TextProps, "children"> {
  time?: number;
  counter?: number;
  onFinish: () => void;
}
interface CountdownState {
  timeRemaining: number;
}
export default class Countdown extends React.PureComponent<
  SetRequired<CountdownProps, keyof typeof Countdown.defaultProps>,
  CountdownState
> {
  static defaultProps: {
    time: number;
    counter: number;
  };
  state: {
    timeRemaining: number;
  };
  timer: NodeJS.Timeout | undefined;
  componentDidMount(): void;
  startCountdown(): void;
  componentWillUnmount(): void;
  render(): JSX.Element;
}
export {};
