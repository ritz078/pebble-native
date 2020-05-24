import {
  DatePickerAndroidOpenOptions,
  TouchableWithoutFeedbackProps
} from "react-native";
import { Omit } from "utility-types";
export interface DateTimeInputProps
  extends Omit<DatePickerAndroidOpenOptions, "date">,
    TouchableWithoutFeedbackProps {
  onChange: (timestamp: number) => void;
  value?: Date | number;
  type: "date" | "time" | "datetime";
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  label: string;
  placeholder: string;
}
