/// <reference types="react" />
import { GestureResponderEvent, ModalProps, ViewStyle } from "react-native";
export interface ActionModalStyles {
  children: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  modalContent: ViewStyle;
  overlay: ViewStyle;
  titleWrapper: ViewStyle;
  wrapper: ViewStyle;
}
export interface ActionModalProps extends ModalProps {
  onClose: (e?: GestureResponderEvent) => void;
  title?: string;
  buttonLabel?: string;
  onButtonClick?: (e: GestureResponderEvent) => void;
  showFooterButton?: boolean;
  visible: boolean;
  header?: React.ReactNode;
  headerType?: "success" | "error" | "warning";
  style?: Partial<ActionModalStyles>;
  footer?: React.ReactNode;
}
