/// <reference types="react" />
export interface SearchInputProps {
  required?: boolean;
  disabled?: boolean;
  placeholder: string;
  errorMessage?: string;
  results: any[];
  searchBoxPlaceholder: string;
  onClose?: () => void;
  onSelect: (item: any) => void;
  onQueryChange: (query: string) => void;
  renderElement?: (
    args: {
      item: any;
    },
    props: SearchInputProps
  ) => React.ReactNode;
  keyExtractor: (item: any) => number | string;
  value?: string;
  rowLabelExtractor?: (item: any) => string | number;
  noResultsElement?: (queryValue: string) => React.ReactNode;
  renderLabel?: (props: SearchInputProps) => React.ReactNode;
  bottomSectionPlaceholder?: () => React.ReactNode;
  loading?: boolean;
  beforeSelect?: (item: any) => Promise<any>;
  testIdPrefix?: string;
  extraActionElement?: (query: string) => React.ReactNode;
}
