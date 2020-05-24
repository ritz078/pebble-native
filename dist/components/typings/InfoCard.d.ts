/// <reference types="react" />
import { ImageSourcePropType } from "react-native";
export interface InfoCardProps {
  title: string;
  description?: string;
  linkText?: string;
  onPress?: () => void;
  image?: ImageSourcePropType;
  /**
   * @deprecated Use children instead of content.
   */
  content?: React.ReactNode;
  topRightElement?: React.ReactNode;
  expandable?: boolean;
  style?: {
    container?: any;
    topSection?: any;
    heading?: any;
    imageWrapper?: any;
  };
  disabled?: boolean;
}
export interface InfoCardState {
  isOpen: boolean;
}
