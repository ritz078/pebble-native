import * as React from "react";
import Select from "../components/Select";
import { ViewerProps, ViewerState, Agent } from "./typings/Viewer";
export default class extends React.PureComponent<ViewerProps, ViewerState> {
  selectRef: React.RefObject<Select<Agent>>;
  state: Readonly<ViewerState>;
  private toggleTransferConfirmationModal;
  toggleTransferAndFollowConfigurationModal: () => void;
  toggleUnfollowConfirmationModal: () => void;
  private isUser;
  render(): JSX.Element;
}
