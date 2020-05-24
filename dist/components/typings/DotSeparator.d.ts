import * as React from "react";
import { ViewStyle } from "react-native";
import { TextProps } from "./Text";
export interface DotSeparatorProps {
  texts: React.ReactNode[];
  dotColor?: string;
  color?: string;
  textProps?: TextProps;
  dotSize?: number;
  style?: ViewStyle;
}
