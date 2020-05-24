import * as React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import colors from "../theme/colors";
import Icon from "pebble-shared/native/Icon";
import debounce from "just-debounce-it";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Text from "./Text";
import Touchable from "./shared/Touchable";
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.gray.lighter,
    flex: 1
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.white.base,
    marginBottom: 1
  },
  textInput: {
    backgroundColor: colors.white.base,
    fontSize: 15,
    flex: 1
  },
  clearIcon: {
    backgroundColor: colors.gray.light,
    borderRadius: 32,
    padding: 5
  },
  icon: {
    marginRight: 10,
    padding: 10
  },
  row: {
    backgroundColor: colors.white.base,
    paddingVertical: 20,
    justifyContent: "center",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.lighter
  },
  optionContainer: {
    flexGrow: 1,
    backgroundColor: colors.white.base
  },
  result: {
    lineHeight: 21
  },
  close: {
    padding: 15
  }
});
function noop() {}
export default class SearchBox extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      queryValue: ""
    };
    this.debouncedChange = debounce(this.props.onQueryChange, 500);
    this.onChange = text => {
      this.setState(
        {
          queryValue: text
        },
        () => this.debouncedChange(text)
      );
    };
  }
  renderNoResultState(query) {
    const {
      noResultsElement = noop,
      bottomSectionPlaceholder = noop
    } = this.props;
    return !query ? bottomSectionPlaceholder() : noResultsElement(query);
  }
  render() {
    const {
      placeholder,
      results,
      onSelect,
      renderElement,
      keyExtractor,
      onClose,
      loading,
      testIdPrefix,
      extraActionElement
    } = this.props;
    return React.createElement(
      View,
      { style: styles.wrapper },
      React.createElement(
        View,
        { style: styles.textWrapper },
        React.createElement(
          TouchableWithoutFeedback,
          { onPress: onClose, testID: `${testIdPrefix}-close` },
          React.createElement(Icon, {
            name: "back",
            color: colors.gray.darker,
            size: 22,
            style: styles.icon
          })
        ),
        React.createElement(TextInput, {
          style: styles.textInput,
          selectionColor: colors.violet.base,
          onChangeText: this.onChange,
          value: this.state.queryValue,
          placeholder: placeholder,
          placeholderTextColor: colors.gray.light,
          autoFocus: true,
          underlineColorAndroid: colors.white.base,
          testID: `${testIdPrefix}-search`
        }),
        loading &&
          React.createElement(ActivityIndicator, {
            color: colors.violet.base,
            size: "small"
          }),
        !!this.state.queryValue &&
          React.createElement(
            Touchable,
            {
              testID: `${testIdPrefix}-clear`,
              onPress: () =>
                this.setState(
                  {
                    queryValue: ""
                  },
                  () => this.debouncedChange("")
                )
            },
            React.createElement(
              View,
              { style: styles.close },
              React.createElement(Icon, {
                name: "close",
                color: colors.gray.darker,
                size: 8,
                style: styles.clearIcon
              })
            )
          )
      ),
      React.createElement(
        KeyboardAwareScrollView,
        {
          keyboardShouldPersistTaps: "always",
          contentContainerStyle: styles.optionContainer
        },
        results.map((result, i) => {
          return React.createElement(
            Touchable,
            {
              testID: `${testIdPrefix}-result-${i}`,
              key: keyExtractor(result),
              onPress: () => onSelect(result)
            },
            React.createElement(
              View,
              null,
              renderElement({ item: result }, this.props)
            )
          );
        }),
        !extraActionElement &&
          !results.length &&
          this.renderNoResultState(this.state.queryValue)
      ),
      extraActionElement && extraActionElement(this.state.queryValue)
    );
  }
}
SearchBox.defaultProps = {
  keyExtractor: item => item.id,
  rowLabelExtractor: item => item.label || item.name,
  renderElement: ({ item }, props) =>
    React.createElement(
      View,
      { style: styles.row },
      React.createElement(
        Text,
        {
          color: colors.gray.darker,
          size: 15,
          style: styles.result,
          numberOfLines: 3,
          ellipsizeMode: "tail"
        },
        props.rowLabelExtractor(item)
      )
    ),
  testIdPrefix: "sb"
};
//# sourceMappingURL=SearchBox.js.map
