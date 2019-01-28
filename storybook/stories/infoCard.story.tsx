import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import CenterView from "./CenterView";
import { InfoCard, List, Text } from "../../src/components";
import { TouchableNativeFeedback, View } from "react-native";
import { colors } from "../../src/theme";

storiesOf("InfoCard", module)
  .add("Default", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <InfoCard
          onPress={() => {}}
          title="Hello Kiki"
          description="Kiki Do you love me?"
          linkText="Nopes. You are a loser."
          image={require("../../assets/contact.png")}
        />
      </View>
    </CenterView>
  ))
  .add("Custom content", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <InfoCard
          title="Additional Client Info"
          content={
            <View style={{ marginTop: 8 }}>
              <List
                style={{ paddingVertical: 8 }}
                title="Age"
                description="Below 25"
              />
            </View>
          }
          linkText="Hellllooooo"
          topRightElement={
            <TouchableNativeFeedback>
              <Text color={colors.violet.base} size={13}>
                Edit
              </Text>
            </TouchableNativeFeedback>
          }
        />
      </View>
    </CenterView>
  ))

  .add("Expandable content", () => (
    <CenterView style={{ paddingHorizontal: 0 }}>
      <View style={{ width: "100%" }}>
        <InfoCard
          title="Additional Client Info"
          content={
            <View>
              <View style={{ marginTop: 8 }}>
                <List
                  style={{ paddingVertical: 8 }}
                  title="Age"
                  description="Below 25"
                />
                <List
                  style={{ paddingVertical: 8 }}
                  title="Ethnicity"
                  description="Marathi"
                />
                <List
                  style={{ paddingVertical: 8 }}
                  title="Residential Address"
                  description="B-303, Piramal Ananya, Ambedkar Road, Worli"
                />
                <List
                  style={{ paddingVertical: 8 }}
                  title="Residential Address"
                  description="B-303, Piramal Ananya, Ambedkar Road, Worli"
                />
              </View>
            </View>
          }
          linkText="View More"
          topRightElement={
            <TouchableNativeFeedback>
              <Text color={colors.violet.base} size={13}>
                Edit
              </Text>
            </TouchableNativeFeedback>
          }
          expandable
        />
      </View>
    </CenterView>
  ));
