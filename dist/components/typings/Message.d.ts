/// <reference types="react" />
export interface MessageProps {
  backgroundColor: string;
  title?: React.ReactNode;
  description: React.ReactNode;
  linkText?: string;
  onPress?: () => void;
}
