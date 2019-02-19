import { StyleSheet, View, Text } from "react-native";
import * as React from "react";
import { Button, Icon, colors, Controls, Input } from "../";
import Touchable from "../components/shared/Touchable";
// import OtpPage from "./OtpPage";

interface LoginProps {
  loginUserValue: string;
  onLoginUserChange: (value: string) => void;
  onSendOtp: () => void;
  otpValue: string;
  onOtpChange: (value: string) => void;
  onResendOtp: () => void;
  onSignIn: () => void;
}

interface LoginState {
  loginMethod: number;
  loginPage: number;
  sendingOTP: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25
  },
  loginHeader: {
    fontSize: 27,
    fontWeight: "bold"
  },
  loginSubHeader: {
    marginTop: 17,
    fontSize: 15,
    color: colors.gray.dark
  },
  formContainer: {
    marginTop: 30
  },
  loginUserInput: {
    marginTop: 60
  }
});

enum LOGIN_OPTIONS {
  PHONE = 1,
  EMAIL
}

enum LOGIN_PAGE {
  USER_PAGE = 1,
  OTP_PAGE
}

const LOGIN_METHODS = [
  { id: LOGIN_OPTIONS.PHONE, name: "Phone Number" },
  { id: LOGIN_OPTIONS.EMAIL, name: "Email Address" }
];

export default class Login extends React.PureComponent<LoginProps, LoginState> {
  state = {
    loginMethod: LOGIN_OPTIONS.PHONE,
    loginPage: LOGIN_PAGE.USER_PAGE,
    sendingOTP: false
  };

  onSendOtp = async () => {
    this.setState({ sendingOTP: true });
    await this.props.onSendOtp();
    this.setState({
      sendingOTP: false,
      loginPage: LOGIN_PAGE.OTP_PAGE
    });
  };

  getOtpPage = () => {
    const {
      loginUserValue,
      otpValue,
      onOtpChange,
      onResendOtp,
      onSignIn
    } = this.props;

    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold", flexGrow: 1 }}>
            {loginUserValue}
          </Text>
          <Touchable
            onPress={() => {
              this.setState({ loginPage: LOGIN_PAGE.USER_PAGE });
              onOtpChange("");
            }}
          >
            <Text
              style={{
                padding: 10,
                color: colors.violet.base,
                fontWeight: "bold"
              }}
            >
              Edit
            </Text>
          </Touchable>
        </View>
        <View style={{ flexDirection: "row", marginTop: 70 }}>
          <Input
            placeholder="Enter OTP"
            onChange={onOtpChange}
            value={otpValue}
            style={{ marginRight: 20, flexShrink: 1, marginBottom: 0 }}
          />
          <View>
            <Touchable onPress={onResendOtp}>
              <Text
                style={{
                  color: colors.violet.base,
                  fontWeight: "bold",
                  padding: 10
                }}
              >
                Resend
              </Text>
            </Touchable>
          </View>
        </View>
        <Button style={{ marginTop: 50 }} onPress={onSignIn}>
          Sign in
        </Button>
      </>
    );
  };

  render() {
    const { loginMethod, loginPage, sendingOTP } = this.state;
    const { onLoginUserChange, loginUserValue } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.loginHeader}>Glad to see you!</Text>
        <Text style={styles.loginSubHeader}>Sign in to continue</Text>
        <View style={styles.formContainer}>
          {loginPage === LOGIN_PAGE.USER_PAGE && (
            <>
              <Controls
                type="radio"
                selected={loginMethod}
                data={LOGIN_METHODS}
                onChange={({ selected }) => {
                  onLoginUserChange("");
                  this.setState({ loginMethod: selected as number });
                }}
              />
              <Input
                placeholder={
                  LOGIN_METHODS.find(option => option.id === loginMethod)!.name
                }
                onChange={onLoginUserChange}
                value={loginUserValue}
                style={styles.loginUserInput}
                keyboardType={
                  loginMethod === LOGIN_OPTIONS.PHONE
                    ? "number-pad"
                    : "email-address"
                }
              />
              <Button
                type="primary"
                onPress={this.onSendOtp}
                disabled={!loginUserValue}
                loading={sendingOTP}
              >
                Send OTP
              </Button>
            </>
          )}
          {loginPage === LOGIN_PAGE.OTP_PAGE && this.getOtpPage()}
        </View>
      </View>
    );
  }
}
