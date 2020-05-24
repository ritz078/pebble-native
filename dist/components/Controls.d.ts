import * as React from "react";
import {
  ControlsProps,
  FallbackOptionType,
  CommonControlsProps,
  RadioControlsProps,
  CheckboxControlsProps
} from "./typings/Controls";
import { SetRequired } from "type-fest";
declare function ControlView({
  item,
  isSelected,
  type,
  renderLabel
}: {
  item: FallbackOptionType;
  isSelected: boolean;
  type?: "radio" | "checkbox";
  renderLabel?: CommonControlsProps<FallbackOptionType>["renderLabel"];
}): JSX.Element;
declare type RequiredKeys = keyof typeof Controls.defaultProps;
export default class Controls<OptionType> extends React.PureComponent<
  | SetRequired<CheckboxControlsProps<OptionType>, RequiredKeys>
  | SetRequired<RadioControlsProps<OptionType>, RequiredKeys>
> {
  static ControlView: typeof ControlView;
  static defaultProps: {
    keyExtractor: (item: FallbackOptionType) => React.ReactText;
    type: string;
    renderElement: (
      {
        item,
        isSelected,
        renderLabel
      }: {
        item: FallbackOptionType;
        isSelected: boolean;
        renderLabel:
          | ((args: { item: FallbackOptionType }) => React.ReactNode)
          | undefined;
      },
      props: ControlsProps<FallbackOptionType>
    ) => JSX.Element;
    style: {};
    testIdPrefix: string;
  };
  private handlePress;
  private isSelected;
  render(): JSX.Element;
}
export {};
