import * as React from "react";
import { StyleSheet, View } from "react-native";
import {
  CircularButton,
  ConfirmationPopUp,
  InfoCard,
  Text
} from "../components";
import { colors } from "../theme";
import Icon from "pebble-shared/native/Icon";
import Select from "../components/Select";
import Button from "../components/Button";
import nI from "name-initials";
const styles = StyleSheet.create({
  circButton: {
    marginBottom: 0,
    marginRight: 15
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10
  },
  textPadding: {
    paddingVertical: 10,
    paddingLeft: 10
  },
  rowLeft: { flex: 1, flexDirection: "row", alignItems: "center" },
  fixPad: {
    paddingHorizontal: 25,
    paddingBottom: 25
  },
  flexOne: {
    flex: 1
  },
  phone: {
    paddingVertical: 10,
    paddingLeft: 20
  }
});
const viewerInfoCard = StyleSheet.create({
  container: {
    marginBottom: 0
  },
  topSection: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  heading: {
    marginBottom: 5
  }
});
export default class extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.selectRef = React.createRef();
    this.state = {
      showUnfollowConfirmation: false,
      selectedAgentId: undefined,
      showTransferConfirmation: false,
      showTransferAndFollowConfiguration: false
    };
    this.toggleTransferConfirmationModal = () =>
      this.setState({
        showTransferConfirmation: !this.state.showTransferConfirmation
      });
    this.toggleTransferAndFollowConfigurationModal = () =>
      this.setState({
        showTransferAndFollowConfiguration: !this.state
          .showTransferAndFollowConfiguration
      });
    this.toggleUnfollowConfirmationModal = () =>
      this.setState({
        showUnfollowConfirmation: !this.state.showUnfollowConfirmation
      });
    this.isUser = id => id === this.props.userId;
  }
  render() {
    const {
      onTranferRequest,
      onUnfollowRequest,
      viewers,
      owner,
      onCall,
      disabled
    } = this.props;
    const {
      showUnfollowConfirmation,
      selectedAgentId,
      showTransferConfirmation,
      showTransferAndFollowConfiguration
    } = this.state;
    return React.createElement(
      View,
      { style: { width: "100%" } },
      React.createElement(
        InfoCard,
        { title: "Current Owner" },
        React.createElement(
          View,
          { style: styles.container },
          React.createElement(
            View,
            { style: styles.rowLeft },
            React.createElement(CircularButton, {
              style: styles.circButton,
              label: nI(owner.name),
              color: colors.white.base,
              backgroundColor: owner.color
            }),
            React.createElement(
              View,
              { style: styles.flexOne },
              React.createElement(
                Text,
                { color: colors.gray.darker, size: 15 },
                this.isUser(owner.id) ? "You" : owner.name
              ),
              owner.subText
            ),
            this.isUser(owner.id)
              ? React.createElement(Select, {
                  type: "radio",
                  options: viewers,
                  disabled: disabled,
                  ref: this.selectRef,
                  label: () =>
                    React.createElement(
                      Text,
                      {
                        color: disabled
                          ? colors.violet.lighter
                          : colors.violet.base,
                        style: styles.textPadding
                      },
                      "Transfer Ownership"
                    ),
                  onSelect: ({ id }) =>
                    this.setState({
                      selectedAgentId: id
                    }),
                  placeholder: "Choose whom to transfer",
                  selected: selectedAgentId,
                  showFooterButton: true,
                  autoClose: false,
                  footer: React.createElement(
                    View,
                    { style: styles.fixPad },
                    React.createElement(Button.DoubleFooterButton, {
                      leftButtonLabel: "Transfer & Follow",
                      rightButtonLabel: "Transfer",
                      onLeftButtonPress: () => {
                        this.selectRef.current?.toggle();
                        this.toggleTransferAndFollowConfigurationModal();
                      },
                      onRightButtonPress: () => {
                        this.selectRef.current?.toggle();
                        this.toggleTransferConfirmationModal();
                      },
                      leftDisabled: !selectedAgentId,
                      rightDisabled: !selectedAgentId
                    })
                  )
                })
              : React.createElement(Icon, {
                  name: "phone-filled",
                  color: colors.violet.base,
                  size: 18,
                  style: styles.phone,
                  onPress: () => onCall(owner.phone)
                })
          )
        ),
        viewers &&
          React.createElement(
            InfoCard,
            { style: viewerInfoCard, title: "Viewers" },
            viewers.map(viewer =>
              React.createElement(
                View,
                {
                  key: viewer.id,
                  style: [
                    styles.container,
                    {
                      paddingVertical: 15
                    }
                  ]
                },
                React.createElement(
                  View,
                  { style: styles.rowLeft },
                  React.createElement(CircularButton, {
                    style: styles.circButton,
                    label: nI(viewer.name),
                    color: colors.white.base,
                    backgroundColor: viewer.color
                  }),
                  React.createElement(
                    View,
                    { style: styles.flexOne },
                    React.createElement(
                      Text,
                      { color: colors.gray.darker, size: 15 },
                      this.isUser(viewer.id) ? "You" : viewer.name
                    ),
                    viewer.subText
                  ),
                  this.isUser(viewer.id)
                    ? React.createElement(
                        Text,
                        {
                          color: disabled
                            ? colors.violet.lighter
                            : colors.violet.base,
                          onPress: !disabled
                            ? this.toggleUnfollowConfirmationModal
                            : undefined,
                          style: styles.textPadding
                        },
                        "Unfollow"
                      )
                    : React.createElement(Icon, {
                        name: "phone-filled",
                        color: colors.violet.base,
                        size: 18,
                        onPress: () => onCall(viewer.phone),
                        style: styles.phone
                      })
                )
              )
            )
          )
      ),
      React.createElement(ConfirmationPopUp, {
        onRejectPress: this.toggleUnfollowConfirmationModal,
        onConfirmPress: onUnfollowRequest,
        confirmButtonText: "Confirm",
        rejectButtonText: "Cancel",
        title: "Unfollow Lead",
        description:
          "you would no longer have access to view or edit this lead.",
        onClose: this.toggleUnfollowConfirmationModal,
        visible: showUnfollowConfirmation
      }),
      React.createElement(ConfirmationPopUp, {
        onRejectPress: this.toggleTransferConfirmationModal,
        onConfirmPress: () => {
          this.toggleTransferConfirmationModal();
          return (
            selectedAgentId &&
            onTranferRequest({
              agentId: selectedAgentId,
              follow: false
            })
          );
        },
        confirmButtonText: "Confirm",
        rejectButtonText: "Cancel",
        title: "Transfer",
        description:
          "On transfer of this lead to another agent,  you would no longer have access to view or edit this lead.",
        onClose: this.toggleTransferConfirmationModal,
        visible: showTransferConfirmation
      }),
      React.createElement(ConfirmationPopUp, {
        onRejectPress: this.toggleTransferAndFollowConfigurationModal,
        onConfirmPress: () => {
          this.toggleTransferAndFollowConfigurationModal();
          return (
            selectedAgentId &&
            onTranferRequest({
              agentId: selectedAgentId,
              follow: true
            })
          );
        },
        confirmButtonText: "Confirm",
        rejectButtonText: "Cancel",
        title: "Transfer & follow lead",
        description:
          "You will no longer be able to edit this lead and your access would be limited view only. You will still get status change updates about of this lead.",
        onClose: this.toggleTransferAndFollowConfigurationModal,
        visible: showTransferAndFollowConfiguration
      })
    );
  }
}
//# sourceMappingURL=Viewer.js.map
