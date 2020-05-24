import * as React from "react";
import { ImageURISource } from "react-native";
import { TouchableProps } from "./shared/Touchable";
interface ImageThumbnailProps {
  image: ImageURISource;
  onPress?: () => void;
  title: string;
  subText: string;
  style?: any;
}
declare const ImageThumbnail: React.FunctionComponent<
  TouchableProps & ImageThumbnailProps
>;
export default ImageThumbnail;
