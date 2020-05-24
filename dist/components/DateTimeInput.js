import * as React from "react";
import { TouchableWithoutFeedback, View, Platform } from "react-native";
import _RNDateTimePicker from "@react-native-community/datetimepicker";
import Input from "./Input";
import { format } from "date-fns";
const RNDateTimePicker = React.memo(_RNDateTimePicker);
const valueFormats = {
  date: "ddd, Do MMM YYYY",
  time: "hh:mm A",
  datetime: "ddd, Do MMM YYYY, hh:mm A"
};
class TimeInput extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      tempValue: undefined,
      mode: undefined
    };
    this.open = async () => {
      const { type } = this.props;
      if (Platform.OS === "ios") {
        this.setState({
          mode: type
        });
      } else {
        this.setState({
          mode: type === "time" ? "time" : "date"
        });
      }
      return;
    };
    this.onChange = (_event, date) => {
      if (
        Platform.OS === "android" &&
        this.props.type === "datetime" &&
        this.state.mode === "date" &&
        !!date
      ) {
        this.setState({
          mode: "time",
          tempValue: date
        });
        return;
      }
      this.setState({
        mode: undefined,
        tempValue: undefined
      });
      const selected = date || this.state.tempValue;
      if (selected) {
        this.props.onChange(selected.getTime());
      }
    };
  }
  render() {
    const {
      mode: propsMode,
      errorMessage,
      disabled,
      required,
      label,
      value,
      placeholder,
      type,
      minDate,
      maxDate,
      ...otherProps
    } = this.props;
    const { mode } = this.state;
    let _value;
    if (value) {
      _value = format(value, valueFormats[type]);
    }
    return React.createElement(
      TouchableWithoutFeedback,
      Object.assign({ onPress: this.open }, otherProps),
      React.createElement(
        View,
        null,
        React.createElement(Input, {
          errorMessage: errorMessage,
          disabled: disabled,
          required: required,
          placeholder: label,
          onChange: () => {},
          readOnly: true,
          value: _value || placeholder
        }),
        mode &&
          React.createElement(RNDateTimePicker, {
            mode: mode,
            // TODO: Aziz accept display for Android
            // display={propsMode}
            value:
              this.state.tempValue || (value ? new Date(value) : new Date()),
            minimumDate: minDate ? new Date(minDate) : undefined,
            maximumDate: maxDate ? new Date(maxDate) : undefined,
            onChange: this.onChange
          })
      )
    );
  }
}
export default TimeInput;
//# sourceMappingURL=DateTimeInput.js.map
