import React from "react";
import { storiesOf } from "@storybook/react-native";
import Controls from "../../src/components/Controls";

storiesOf("Controls", module).add("Default", () => (
  <Controls
    type="checkbox"
    selected={[1]}
    data={[{ id: 1, name: "Hello" }, { id: 2, name: "World" }]}
    onChange={({ selected }) => alert(selected)}
  />
));
