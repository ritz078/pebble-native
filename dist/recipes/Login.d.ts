import * as React from "react";
import { LoginProps, LoginState } from "./typings/Login";
declare enum LOGIN_PAGE {
  USER_PAGE = 1,
  OTP_PAGE = 2
}
export default class Login extends React.PureComponent<LoginProps, LoginState> {
  state: {
    loginPage: LOGIN_PAGE;
    otpTimeout: boolean;
    tenant: string;
    isTenantValid: boolean;
    fetchingTenantConfig: boolean;
    isSubmitButtonLoading: boolean;
    tenantConfigFetched: boolean;
  };
  onOtpSuccess: () => void;
  onOtpError: () => void;
  onSendOtp: () => void;
  onResendOtp: () => void;
  onEdit: () => void;
  onCountdownTimeUp: () => void;
  onSignIn: () => Promise<void>;
  getOtpPage: () => JSX.Element;
  onTenantChange: (value: string) => void;
  onTenantSubmit: () => Promise<void>;
  onTenantEdit: () => void;
  render(): JSX.Element;
}
export {};
