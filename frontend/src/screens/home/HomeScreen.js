import * as React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeScreen({ navigation }) {
  function SignInHandler() {
    console.log("sign in");
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.iconsContainer}>
        <Ionicons name="ios-person-sharp" size={34} color="#ff7900" />
        <FontAwesome name="spoon" size={34} color="#ff7900" />
        <Ionicons name="ios-person-sharp" size={34} color="#ff7900" />
      </View>

      <Text style={styles.logoText}> Foodie Friends</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={SignInHandler} style={styles.signInButton}>
          <Text style={styles.signInText}> Sign in with Google</Text>
        </TouchableOpacity>
      </View>
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

  logoText: {
    fontSize: 40,
    fontWeight: "500",
    color: "#ff7900",
  },

  iconsContainer: {
    flexDirection: "row",
  },

  buttonContainer: {
    paddingTop: 10,
  },

  signInButton: {
    width: "60%",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  signInText: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
