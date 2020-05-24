import * as React from "react";
import { Text, Animated } from "react-native";
const GText = ({
  bold,
  size,
  color,
  style,
  children,
  animated,
  lineHeight,
  ...props
}) => {
  // @ts-ignore
  const Text_ = animated ? Animated.Text : Text;
  return React.createElement(
    Text_,
    Object.assign(
      {
        style: [
          {
            fontFamily: bold ? "anarock_medium" : "anarock_regular",
            fontSize: size,
            color,
            lineHeight
          },
          style
        ]
      },
      props
    ),
    children
  );
};
export default GText;
//# sourceMappingURL=Text.js.map
