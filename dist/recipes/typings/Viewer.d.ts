/// <reference types="react" />
export interface Agent {
  id: number;
  name: string;
  subText: React.ReactNode;
  phone: string;
  color: string;
}
export interface ViewerProps {
  onTranferRequest: (args: { agentId: number; follow: boolean }) => void;
  onUnfollowRequest: () => void;
  viewers: Agent[];
  owner: Agent;
  userId: number;
  onCall: (phone: string) => void;
  disabled?: boolean;
}
export interface ViewerState {
  showUnfollowConfirmation: boolean;
  selectedAgentId?: number;
  showTransferConfirmation: boolean;
  showTransferAndFollowConfiguration: boolean;
}
