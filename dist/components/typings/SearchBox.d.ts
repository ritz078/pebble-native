import * as React from "react";
export interface FallbackOptionType {
  id: string | number;
  label?: string;
  name?: string;
}
export interface SearchBoxProps<OptionType = FallbackOptionType> {
  onQueryChange: (query: string) => void;
  results: OptionType[];
  renderElement: (
    args: {
      item: OptionType;
    },
    props: SearchBoxProps<OptionType>
  ) => React.ReactNode;
  placeholder: string;
  keyExtractor: (item: OptionType) => string | number;
  onSelect: (item: OptionType) => void;
  rowLabelExtractor: (item: OptionType) => string | number;
  noResultsElement?: (queryValue: string) => React.ReactNode;
  onClose?: () => void;
  bottomSectionPlaceholder?: () => React.ReactNode;
  loading?: boolean;
  testIdPrefix?: string;
  extraActionElement?: (query: string) => React.ReactNode;
}
export interface SearchBoxState {
  queryValue: string;
}
