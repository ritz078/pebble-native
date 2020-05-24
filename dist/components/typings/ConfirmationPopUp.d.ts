import { ActionModalProps } from "./ActionModal";
export interface ConfirmationPopUpProps extends ActionModalProps {
  onConfirmPress: () => void;
  onRejectPress: () => void;
  confirmButtonText: string;
  rejectButtonText: string;
  title: string;
  description: string;
  visible: boolean;
  onClose: () => void;
}
