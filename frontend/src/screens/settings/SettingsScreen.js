import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <View style={styles.screen}>
      <Text> Hello from the settings screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    alignItems: "center",
  },
});

export default Settings;
