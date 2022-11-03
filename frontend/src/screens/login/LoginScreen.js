import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { authenticate, signUp } from "../../firebase/auth";

export default function LoginScreen({ navigation }) {
  const [loginError, setLoginError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.screenContainer}>
      <View style={styles.iconsContainer}>
        <Ionicons name="ios-person-sharp" size={34} color="#ff7900" />
        <FontAwesome name="spoon" size={34} color="#ff7900" />
        <Ionicons name="ios-person-sharp" size={34} color="#ff7900" />
      </View>

      <Text style={styles.logoText}> Foodie Friends</Text>
      <View style={styles.buttonContainer}>
        <TextInput
          id="email"
          style={styles.textInput}
          placeholder="Enter email..."
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
        <TextInput
          id="password"
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Enter password..."
          onChangeText={(password) => setPassword(password)}
        ></TextInput>

        <View flexDirection="row">
          <TouchableOpacity
            onPress={() => {
              authenticate(email, password).then((user) => {
                if (user) {
                  setLoginError(null);
                  navigation.navigate("HomeScreen");
                } else {
                  setLoginError("Failed to log in.");
                }
              });
            }}
            style={styles.signInButton}
          >
            <Text style={styles.signInText}> Log In!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              signUp(email, password).then((user) => {
                if (user) {
                  setLoginError(null);
                  navigation.navigate("HomeScreen");
                } else {
                  setLoginError("Failed to sign up.");
                }
              });
            }}
            style={styles.signInButton}
          >
            <Text style={styles.signInText}> Sign Up!</Text>
          </TouchableOpacity>
        </View>
        
        {loginError ? (
          <Text style={styles.errorText}>{loginError}</Text>
        ) : (
          <React.Fragment></React.Fragment>
        )}
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
    width: "30%",
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
  },

  errorText: {
    fontSize: 13,
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    height: 50,
    width: 200,
    marginBottom: 5
  },
});
