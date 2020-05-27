import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  InteractionManager
} from "react-native";
import Input from "./Input";
import Options from "./Options";
import colors from "../theme/colors";
import Icon from "pebble-shared/native/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ActionModal from "./ActionModal";
const styles = StyleSheet.create({
  optionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  optionsWrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden"
  },
  modalWrapper: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1
  },
  overlay: {
    flex: 1
  },
  dropdownIcon: {
    position: "absolute",
    top: 26,
    right: 10
  }
});
function noop() {}
export default class Select extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showOptions: false,
      selectedCheckbox:
        this.props.selected && Array.isArray(this.props.selected)
          ? this.props.selected
          : []
    };
    this.isRadio = () => this.props.type === "radio";
    this.closeOptions = () =>
      this.setState({
        showOptions: false
      });
    this.onClose = e => {
      this.closeOptions();
      this.props.onClose && this.props.onClose(e);
    };
    this.onSingleSelecct = option => {
      const props = this.props;
      const { autoClose } = this.props;
      InteractionManager.runAfterInteractions(() => {
        if (props.type !== "checkbox") {
          props.onSelect(option);
          if (autoClose) this.closeOptions();
        }
      });
    };
    this.onMultiSelect = option => {
      const { keyExtractor } = this.props;
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          selectedCheckbox: option.map(keyExtractor)
        });
      });
    };
    this.getValue = () => {
      const { selected, options, keyExtractor } = this.props;
      let selectedLabel = "";
      const props = this.props;
      if (selected) {
        if (props.type === "checkbox") {
          selectedLabel = props.valueExtractor(
            options.filter(
              x =>
                Array.isArray(props.selected) &&
                props.selected.indexOf(keyExtractor(x)) >= 0
            )
          );
        } else {
          const selectedOption = options.find(
            x => selected === keyExtractor(x)
          );
          selectedLabel = selectedOption
            ? props.valueExtractor(selectedOption)
            : "";
        }
      }
      return selectedLabel;
    };
    this.toggle = () =>
      this.setState({
        showOptions: !this.state.showOptions
      });
  }
  render() {
    const {
      options,
      selected,
      placeholder,
      required,
      errorMessage,
      keyExtractor,
      type,
      disabled,
      label,
      footer,
      showFooterButton,
      testIdPrefix,
      rowRenderElement,
      ...rest
    } = this.props;
    const props = this.props;
    return React.createElement(
      View,
      null,
      React.createElement(
        TouchableWithoutFeedback,
        {
          testID: `${testIdPrefix}-label`,
          onPress: disabled
            ? undefined
            : () =>
                this.setState({
                  showOptions: true
                })
        },
        React.createElement(
          View,
          null,
          props.label
            ? props.type === "checkbox" // Both these conditions are the same, but they are there just to make Typescript happy
              ? props.label({
                  value: this.getValue(),
                  props: props,
                  toggle: this.toggle
                })
              : props.label({
                  value: this.getValue(),
                  props: props,
                  toggle: this.toggle
                })
            : React.createElement(Input, {
                fixLabelAtTop: true,
                placeholder: placeholder || "",
                value: this.getValue(),
                onChange: noop,
                required: required,
                errorMessage: errorMessage,
                readOnly: true,
                disabled: disabled
              }),
          !disabled &&
            !label &&
            React.createElement(
              View,
              { style: styles.dropdownIcon },
              React.createElement(Icon, {
                color: colors.gray.base,
                name: "arrow-drop-down",
                size: 10
              })
            )
        )
      ),
      React.createElement(
        ActionModal,
        {
          title: placeholder,
          buttonLabel: "Done",
          onButtonClick: () => {
            if (props.type === "checkbox") {
              props.onSelect(
                this.props.options.filter(option =>
                  this.state.selectedCheckbox.includes(keyExtractor(option))
                )
              );
            }
            this.closeOptions();
          },
          visible: this.state.showOptions,
          showFooterButton: !this.isRadio() || showFooterButton,
          onClose: this.onClose,
          footer: footer
        },
        React.createElement(
          KeyboardAwareScrollView,
          {
            keyboardShouldPersistTaps: "always",
            testID: `${testIdPrefix}-modal`
          },
          props.type === "checkbox"
            ? React.createElement(
                Options,
                Object.assign(
                  {
                    type: "checkbox",
                    selected: this.state.selectedCheckbox,
                    testIdPrefix: testIdPrefix,
                    options: options,
                    keyExtractor: keyExtractor,
                    rowRenderElement: props.rowRenderElement
                  },
                  rest,
                  { onSelect: this.onMultiSelect }
                )
              )
            : React.createElement(
                Options,
                Object.assign(
                  {
                    type: "radio",
                    selected: props.selected,
                    testIdPrefix: testIdPrefix,
                    options: options,
                    keyExtractor: keyExtractor,
                    rowRenderElement: props.rowRenderElement
                  },
                  rest,
                  { onSelect: this.onSingleSelecct }
                )
              )
        )
      )
    );
  }
}
Select.defaultProps = {
  valueExtractor: item => item && (item.label || item.name),
  keyExtractor: item => item.id,
  type: "radio",
  onClose: noop,
  autoClose: true,
  testIdPrefix: "select"
};
//# sourceMappingURL=Select.js.map
