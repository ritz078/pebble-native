import * as React from "react";
import { SearchInputProps } from "./typings/SearchInput";
import { SetRequired } from "type-fest";
export default class SearchInput extends React.PureComponent<
  SetRequired<SearchInputProps, keyof typeof SearchInput.defaultProps>
> {
  static defaultProps: Partial<SearchInputProps>;
  state: {
    showModal: boolean;
  };
  closeModal: () => void;
  private onSelect;
  render(): JSX.Element;
}
