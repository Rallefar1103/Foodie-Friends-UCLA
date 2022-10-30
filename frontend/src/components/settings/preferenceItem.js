import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

function PreferenceItem(props) {
  return (
    <View style={styles.preferenceContainer}>
      <View style={styles.checkbox}>
        <Fontisto name="checkbox-passive" color="orange" size={25} />
      </View>
      <Text style={styles.preferenceText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  preferenceContainer: {
    flexDirection: "row",
    padding: 8,
  },

  preferenceText: {
    fontSize: 20,
    fontWeight: "500",
  },

  checkbox: {
    paddingRight: 8,
  },
});

export default PreferenceItem;
