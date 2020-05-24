// @ts-ignore
const ConditionalComponent = ({ conditional, children }) => {
  if (!conditional) return null;
  if (typeof conditional === "number" || typeof conditional === "string") {
    return children(conditional);
  } else {
    return conditional;
  }
};
export default ConditionalComponent;
//# sourceMappingURL=ConditionalComponent.js.map
