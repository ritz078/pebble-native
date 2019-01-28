import * as React from "react";

interface ConditionalComponentProps {
  conditional?: React.ReactText | JSX.Element;
  children: (conditional: React.ReactText | JSX.Element) => JSX.Element;
}

// @ts-ignore
const ConditionalComponent: React.FunctionComponent<
  ConditionalComponentProps
> = ({ conditional, children }) => {
  if (!conditional) return null;
  if (typeof conditional === "number" || typeof conditional === "string") {
    return children(conditional);
  } else {
    return conditional;
  }
};

export default ConditionalComponent;
