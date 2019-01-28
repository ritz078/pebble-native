import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { Popup } from "../../src/components";

storiesOf("Popup", module).add("basic", () => (
  <Popup visible onRequestClose={() => {}} />
));
