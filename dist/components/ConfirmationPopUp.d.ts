/// <reference types="react" />
import { ConfirmationPopUpProps } from "./typings/ConfirmationPopUp";
export default function ConfirmationPopUp({
  title,
  description,
  onConfirmPress,
  onRejectPress,
  confirmButtonText,
  rejectButtonText,
  visible,
  onClose,
  ...otherProps
}: ConfirmationPopUpProps): JSX.Element;
