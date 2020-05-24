import * as React from "react";
import { SetRequired } from "type-fest";
import {
  SearchBoxProps,
  SearchBoxState,
  FallbackOptionType
} from "./typings/SearchBox";
export default class SearchBox<
  OptionType = FallbackOptionType
> extends React.PureComponent<
  SetRequired<SearchBoxProps<OptionType>, keyof typeof SearchBox.defaultProps>,
  SearchBoxState
> {
  static defaultProps: {
    keyExtractor: (item: FallbackOptionType) => React.ReactText;
    rowLabelExtractor: (item: FallbackOptionType) => string | undefined;
    renderElement: (
      {
        item
      }: {
        item: FallbackOptionType;
      },
      props: SearchBoxProps<FallbackOptionType>
    ) => JSX.Element;
    testIdPrefix: string;
  };
  state: {
    queryValue: string;
  };
  private debouncedChange;
  private onChange;
  private renderNoResultState;
  render(): JSX.Element;
}
