import * as React from "react";
import { SelectProps, SelectState } from "./typings/Select";
declare function noop(): void;
interface FallbackOptionType {
  label: string;
  name: string;
  id: string | number;
}
export default class Select<OptionType> extends React.PureComponent<
  SelectProps<OptionType>,
  SelectState
> {
  static defaultProps: {
    valueExtractor: (item: FallbackOptionType) => string;
    keyExtractor: (item: FallbackOptionType) => React.ReactText;
    type: string;
    onClose: typeof noop;
    autoClose: boolean;
    testIdPrefix: string;
  };
  state: {
    showOptions: boolean;
    selectedCheckbox: React.ReactText[];
  };
  private isRadio;
  private closeOptions;
  private onClose;
  private onSingleSelecct;
  private onMultiSelect;
  private getValue;
  toggle: () => void;
  render(): JSX.Element;
}
export {};
