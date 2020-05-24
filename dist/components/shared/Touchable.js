import * as React from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight
} from "react-native";
const Touchable = ({ children, ...props }) => {
  if (Platform.OS === "android") {
    return React.createElement(
      TouchableNativeFeedback,
      Object.assign({}, props),
      children
    );
  }
  return React.createElement(
    TouchableHighlight,
    Object.assign({ underlayColor: "transparent" }, props),
    children
  );
};
export default Touchable;
//# sourceMappingURL=Touchable.js.map
