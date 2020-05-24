import { StyleSheet, View } from "react-native";
import * as React from "react";
import { Button, Input, Select } from "../components";
import { colors } from "../theme";
import Touchable from "../components/shared/Touchable";
import Countdown from "../components/shared/Countdown";
import Text from "../components/Text";
import OTPInput from "../components/OTPInput";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25
  },
  loginSubHeader: {
    marginTop: 15
  },
  formContainer: {
    marginTop: 30,
    paddingTop: 30
  },
  loginUserInput: {
    flexDirection: "row"
  },
  userInfoWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  loginUserText: {
    flexGrow: 1
  },
  textButton: {
    padding: 10
  },
  countrySelect: {
    width: 100,
    marginRight: 30
  },
  phoneInput: {
    flex: 1
  },
  otpInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative"
  },
  cellStyle: {
    borderWidth: 0,
    margin: 0,
    paddingVertical: 0,
    fontFamily: "anarock_medium"
  },
  cellParentStyle: {
    borderBottomWidth: 1,
    marginRight: 20,
    paddingBottom: 5
  },
  otpInput: {
    top: 0,
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 2,
    fontSize: 1,
    color: "transparent"
  },
  resend: {
    color: colors.violet.base,
    fontWeight: "bold"
  },
  loginHelp: {
    marginBottom: 22,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  loginSupport: {
    alignSelf: "flex-end"
  },
  loginHelpText: {
    alignSelf: "flex-start"
  },
  otpPageLoginHelp: { marginTop: 35 }
});
var LOGIN_PAGE;
(function (LOGIN_PAGE) {
  LOGIN_PAGE[(LOGIN_PAGE["USER_PAGE"] = 1)] = "USER_PAGE";
  LOGIN_PAGE[(LOGIN_PAGE["OTP_PAGE"] = 2)] = "OTP_PAGE";
})(LOGIN_PAGE || (LOGIN_PAGE = {}));
export default class Login extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      loginPage: LOGIN_PAGE.USER_PAGE,
      otpTimeout: false,
      tenant: "",
      isTenantValid: true,
      fetchingTenantConfig: false,
      isSubmitButtonLoading: false,
      tenantConfigFetched: false
    };
    this.onOtpSuccess = () =>
      this.setState({
        isSubmitButtonLoading: false,
        loginPage: LOGIN_PAGE.OTP_PAGE
      });
    this.onOtpError = () => this.setState({ isSubmitButtonLoading: false });
    this.onSendOtp = () => {
      this.setState({ isSubmitButtonLoading: true });
      this.props.onSendOtp(this.onOtpSuccess, this.onOtpError);
    };
    this.onResendOtp = () => {
      this.setState({ otpTimeout: false });
      this.props.onResendOtp();
    };
    this.onEdit = () => {
      this.setState({
        loginPage: LOGIN_PAGE.USER_PAGE,
        otpTimeout: false
      });
      this.props.onOtpChange("");
    };
    this.onCountdownTimeUp = () => this.setState({ otpTimeout: true });
    this.onSignIn = async () => {
      this.setState({ isSubmitButtonLoading: true });
      try {
        await this.props.onSignIn();
      } catch (e) {}
      this.setState({ isSubmitButtonLoading: false });
    };
    this.getOtpPage = () => {
      const {
        loginUserValue,
        otpValue,
        onOtpChange,
        otpLength,
        countriesList,
        selectedCountry,
        onLoginHelp
      } = this.props;
      const { otpTimeout, isSubmitButtonLoading } = this.state;
      const country = countriesList.find(
        country => country.id === selectedCountry
      );
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          View,
          { style: styles.userInfoWrap },
          React.createElement(
            Text,
            {
              size: 15,
              bold: true,
              color: colors.gray.darker,
              style: styles.loginUserText
            },
            `${country?.country_code}-${loginUserValue}`
          ),
          React.createElement(
            Touchable,
            { onPress: this.onEdit, testID: "edit-otp" },
            React.createElement(
              Text,
              {
                style: styles.textButton,
                color: colors.violet.base,
                bold: true
              },
              "Edit"
            )
          )
        ),
        React.createElement(
          View,
          { style: { marginTop: 60 } },
          React.createElement(
            Text,
            { color: colors.gray.dark, size: 12 },
            "Enter OTP"
          ),
          React.createElement(
            View,
            { style: styles.otpInputWrap },
            React.createElement(OTPInput, {
              testID: "otp-input",
              value: otpValue,
              onChangeText: onOtpChange,
              tintColor: colors.violet.base,
              offTintColor: colors.gray.base,
              otpLength: otpLength,
              cellStyle: styles.cellStyle,
              cellParentStyle: styles.cellParentStyle,
              showCellParentBorderColor: true,
              style: styles.otpInput,
              selectionColor: "transparent",
              secureTextEntry: true,
              keyboardType: "number-pad",
              caretHidden: !!otpValue,
              textContentType: "oneTimeCode"
            }),
            React.createElement(
              View,
              { style: { padding: 10 } },
              otpTimeout &&
                React.createElement(
                  Touchable,
                  { onPress: this.onResendOtp, testID: "resend-otp" },
                  React.createElement(Text, { style: styles.resend }, "Resend")
                ),
              !otpTimeout &&
                React.createElement(Countdown, {
                  onFinish: this.onCountdownTimeUp
                })
            )
          )
        ),
        React.createElement(
          Text,
          {
            testID: "support-link",
            bold: true,
            color: colors.violet.base,
            style: [styles.otpPageLoginHelp, styles.loginHelp],
            onPress: onLoginHelp
          },
          "Get support for login"
        ),
        React.createElement(
          Button,
          {
            loading: isSubmitButtonLoading,
            onPress: this.onSignIn,
            disabled: otpLength !== otpValue.length,
            testID: "sign-in"
          },
          "Sign in"
        )
      );
    };
    this.onTenantChange = value => {
      this.setState({
        isTenantValid: true,
        tenant: value
      });
    };
    this.onTenantSubmit = async () => {
      this.setState({ isSubmitButtonLoading: true });
      try {
        await this.props.onTenantSubmit(this.state.tenant);
        this.setState({
          tenantConfigFetched: true,
          isSubmitButtonLoading: false
        });
      } catch {
        this.setState({
          isTenantValid: false,
          isSubmitButtonLoading: false
        });
      }
    };
    this.onTenantEdit = () => {
      this.setState({
        tenantConfigFetched: false
      });
    };
  }
  render() {
    const {
      loginPage,
      tenant,
      isTenantValid,
      isSubmitButtonLoading,
      tenantConfigFetched
    } = this.state;
    const {
      onLoginUserChange,
      loginUserValue,
      countriesList,
      onCountryChange,
      selectedCountry,
      getFooter = () => undefined,
      onLoginHelp,
      phoneInputProps,
      isPhoneValid,
      tenantInputProps,
      helpText
    } = this.props;
    const isButtonDisabled = !loginUserValue || !isPhoneValid;
    return React.createElement(
      View,
      { style: styles.container },
      React.createElement(
        Text,
        { bold: true, size: 27, color: colors.gray.darker },
        "Glad to see you!"
      ),
      React.createElement(
        Text,
        { size: 15, color: colors.gray.dark, style: styles.loginSubHeader },
        "Sign in to continue"
      ),
      React.createElement(
        View,
        { style: styles.formContainer },
        loginPage === LOGIN_PAGE.USER_PAGE &&
          React.createElement(
            React.Fragment,
            null,
            !tenantConfigFetched &&
              React.createElement(
                Input,
                Object.assign(
                  {
                    readOnly: tenantConfigFetched,
                    value: tenant,
                    placeholder: "Company code",
                    onChange: this.onTenantChange,
                    errorMessage: !isTenantValid
                      ? "Please check the company code"
                      : "",
                    inputProps: {
                      autoFocus: true,
                      testID: "company-input"
                    }
                  },
                  tenantInputProps
                )
              ),
            tenantConfigFetched &&
              React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  View,
                  { style: styles.companyInfo },
                  React.createElement(
                    Text,
                    { size: 15 },
                    React.createElement(
                      Text,
                      { color: colors.gray.dark },
                      "Company Code: "
                    ),
                    React.createElement(
                      Text,
                      {
                        bold: true,
                        color: colors.gray.darker,
                        style: styles.loginUserText
                      },
                      tenant.toUpperCase()
                    )
                  ),
                  React.createElement(
                    Touchable,
                    { onPress: this.onTenantEdit, testID: "edit-company" },
                    React.createElement(
                      Text,
                      {
                        style: styles.textButton,
                        color: colors.violet.base,
                        bold: true
                      },
                      "Edit"
                    )
                  )
                ),
                React.createElement(
                  View,
                  { style: styles.loginUserInput },
                  React.createElement(
                    View,
                    { style: styles.countrySelect },
                    React.createElement(Select, {
                      type: "radio",
                      testIdPrefix: "countries",
                      options: countriesList,
                      valueExtractor: item => item && item.country_code,
                      rowLabelExtractor: item =>
                        `${item.name} (${item.country_code})`,
                      keyExtractor: item => item.id,
                      placeholder: "ISD Code",
                      onSelect: onCountryChange,
                      selected: selectedCountry
                    })
                  ),
                  React.createElement(
                    View,
                    { style: styles.phoneInput },
                    React.createElement(
                      Input,
                      Object.assign(
                        {
                          placeholder: "Phone",
                          value: loginUserValue,
                          keyboardType: "phone-pad",
                          onChange: onLoginUserChange,
                          errorMessage: isPhoneValid ? "" : "Invalid Phone",
                          inputProps: {
                            autoFocus: true,
                            testID: "phone-input"
                          }
                        },
                        phoneInputProps
                      )
                    )
                  )
                )
              ),
            React.createElement(
              View,
              { style: styles.loginHelp },
              helpText &&
                React.createElement(
                  Text,
                  {
                    color: colors.gray.base,
                    bold: true,
                    style: styles.loginHelpText,
                    onPress: onLoginHelp
                  },
                  helpText
                ),
              React.createElement(
                Text,
                {
                  color: colors.violet.base,
                  bold: true,
                  style: styles.loginSupport,
                  onPress: onLoginHelp
                },
                "Get support for login"
              )
            ),
            React.createElement(
              Button,
              {
                testID: "submit-btn",
                onPress: tenantConfigFetched
                  ? this.onSendOtp
                  : this.onTenantSubmit,
                disabled: tenantConfigFetched
                  ? isButtonDisabled
                  : !isTenantValid,
                loading: isSubmitButtonLoading
              },
              tenantConfigFetched ? "Send OTP" : "Submit"
            )
          ),
        loginPage === LOGIN_PAGE.OTP_PAGE && this.getOtpPage()
      ),
      getFooter(this.state)
    );
  }
}
//# sourceMappingURL=Login.js.map
