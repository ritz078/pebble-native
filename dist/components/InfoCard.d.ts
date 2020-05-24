import * as React from "react";
import { InfoCardProps, InfoCardState } from "./typings/InfoCard";
declare class InfoCard extends React.Component<InfoCardProps, InfoCardState> {
  state: InfoCardState;
  private getFooter;
  render(): JSX.Element;
}
export default InfoCard;
