import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { addUser } from "./addUser";

export default function SignUpScreen({ route, navigation }) {
    const { userId } = route.params;
    const [name, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");

  return (
    <View style={styles.screenContainer}>
         <TextInput
          id="name"
          style={styles.textInput}
          placeholder="Enter your preferred name..."
          onChangeText={(name) => setEmail(name)}
        ></TextInput>
        <TextInput
          id="age"
          keyboardType='numeric'
          style={styles.textInput}
          placeholder="Enter age..."
          onChangeText={(age) => setAge(age)}
        ></TextInput>
        <TextInput
          id="zipcode"
          keyboardType='numeric'
          style={styles.textInput}
          placeholder="Enter zipcode..."
          onChangeText={(zipcode) => setLocation(zipcode)}
        ></TextInput>
        <TouchableOpacity
            onPress={() => {
              addUser(userId, {userId, userName: name, userAge: age, location, prefList: {}}).then((addedUser) => {
                if (addedUser) {
                    navigation.navigate("HomeScreen");
                }
              })
            }}
            style={styles.signInButton}
          >
            <Text style={styles.signInText}> Create profile!</Text>
          </TouchableOpacity>
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
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    height: 50,
    width: 200,
    marginBottom: 5
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
});
