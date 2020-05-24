import * as React from "react";
interface ConditionalComponentProps {
  conditional?: React.ReactNode;
  children: (conditional: React.ReactNode) => React.ReactNode;
}
declare const ConditionalComponent: React.FunctionComponent<ConditionalComponentProps>;
export default ConditionalComponent;
