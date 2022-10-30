import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

function PreferenceItem(props) {
  const [checkboxState, setCheckboxState] = useState(false);

  function toggleCheckboxHandler(id) {
    if (checkboxState) {
      _uncheckCheckBox(id);
    } else {
      _checkCheckBox(id);
    }
  }

  function _checkCheckBox(id) {
    setCheckboxState(true);
  }

  function _uncheckCheckBox(id) {
    setCheckboxState(false);
  }

  return (
    <Pressable onPress={toggleCheckboxHandler}>
      <View style={styles.preferenceContainer}>
        <View style={styles.checkbox}>
          {checkboxState ? (
            <Fontisto name="checkbox-active" color="#ff7900" size={25} />
          ) : (
            <Fontisto name="checkbox-passive" color="#ff7900" size={25} />
          )}
        </View>
        <Text style={styles.preferenceText}>{props.text}</Text>
      </View>
    </Pressable>
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
