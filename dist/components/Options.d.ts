import * as React from "react";
import { OptionsProps, FallbackOptionType } from "./typings/Options";
export default class Options<OptionType> extends React.Component<
  OptionsProps<OptionType>
> {
  static defaultProps: {
    type: string;
    keyExtractor: (item: FallbackOptionType) => React.ReactText;
    testIdPrefix: string;
  };
  private onRadioSelect;
  private onCheckboxSelect;
  private renderElement;
  render(): JSX.Element;
}
