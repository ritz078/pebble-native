import * as React from "react";
import Text from "../Text";
export default class Countdown extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      timeRemaining: this.props.time
    };
  }
  componentDidMount() {
    this.startCountdown();
  }
  startCountdown() {
    const { counter, onFinish, time } = this.props;
    const startTime = Date.now();
    this.timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const timeRemaining = Math.max(time - elapsedSeconds, 0);
      this.setState({ timeRemaining });
      if (!timeRemaining) {
        this.timer && clearInterval(this.timer);
        onFinish();
      }
    }, counter * 1000);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  render() {
    const { timeRemaining } = this.state;
    const { time, counter, onFinish, ...otherProps } = this.props;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return React.createElement(
      Text,
      Object.assign({ bold: true }, otherProps),
      `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    );
  }
}
Countdown.defaultProps = {
  time: 30,
  counter: 1
};
//# sourceMappingURL=Countdown.js.map
