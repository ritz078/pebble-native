import * as React from "react";
import { TouchableProps } from "../shared/Touchable";
interface CardBaseProps {
  title: React.ReactNode;
  rightElement?: React.ReactNode;
  description: React.ReactNode;
  onPress?: () => void;
  style?: any;
}
export declare type CardProps = TouchableProps & CardBaseProps;
export {};
