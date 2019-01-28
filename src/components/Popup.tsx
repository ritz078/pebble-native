import * as React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { colors } from "../theme";
import { Icon } from "../index";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    backgroundColor: colors.white.base,
    borderRadius: 4
  }
});

interface PopupProps {
  visible: boolean;
  onRequestClose: () => void;
}

export default class Popup extends React.PureComponent<PopupProps> {
  render() {
    const { visible, onRequestClose, children } = this.props;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose} transparent>
        <View style={styles.wrapper}>
          <Icon name="close" color={colors.white.base} />
          <View>{children}</View>
        </View>
      </Modal>
    );
  }
}
