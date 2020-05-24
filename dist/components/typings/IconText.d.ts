import { TouchableProps } from "../shared/Touchable";
import { CircularButtonProps } from "./CircularButton";
interface IconTextBaseProps
  extends Pick<CircularButtonProps, "iconName" | "color" | "backgroundColor"> {
  label: string;
  onPress?: () => void;
}
export declare type IconTextProps = TouchableProps & IconTextBaseProps;
export {};
