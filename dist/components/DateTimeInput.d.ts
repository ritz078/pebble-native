import * as React from "react";
import {
  AndroidNativeProps,
  IOSNativeProps
} from "@react-native-community/datetimepicker";
import { DateTimeInputProps } from "./typings/DateTimeInput";
interface State {
  tempValue?: Date;
  mode?: AndroidNativeProps["mode"] | IOSNativeProps["mode"];
}
declare class TimeInput extends React.PureComponent<DateTimeInputProps, State> {
  state: Readonly<State>;
  private open;
  private onChange;
  render(): JSX.Element;
}
export default TimeInput;
