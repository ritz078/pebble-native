import { ViewProps } from "react-native";
export interface CircularButtonProps extends ViewProps {
  backgroundColor?: string;
  iconName?: string;
  color?: string;
  style?: any;
  label?: string;
  small?: boolean;
  subLabel?: string;
  subBackgroundColor?: string;
  subLabelColor?: string;
  iconSize?: number;
}
