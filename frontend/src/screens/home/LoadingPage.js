import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function LoadingPage() {
  return (
    <View style={styles.screenContainer}>
         <Text style={styles.loadingText}>Loading restaurants for you!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffb980",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold"
  }
  
});
