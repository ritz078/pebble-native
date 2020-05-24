import * as React from "react";
export interface ListProps {
  iconName?: string;
  iconColor?: string;
  iconBackgroundColor?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  topRightElement?: React.ReactNode;
  style?: any;
  subLabel?: string;
  subBackgroundColor?: string;
  subLabelColor?: string;
}
