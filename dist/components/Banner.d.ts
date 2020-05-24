import * as React from "react";
import { ImageURISource } from "react-native";
interface BannerProps {
  title: string;
  description: string;
  image: ImageURISource;
  buttonText: string;
  imageStyle?: any;
  style?: any;
  onPress?: () => void;
}
declare const Banner: React.FunctionComponent<BannerProps>;
export default Banner;
