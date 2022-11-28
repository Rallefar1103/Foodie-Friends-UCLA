import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { signUp } from "../../firebase/auth";
import { addUser } from "../../firebase/firestore";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Sae } from "react-native-textinput-effects";

export default function SignUpScreen({ navigation }) {
  //const { userId } = route.params;
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setuserId] = useState("");
  const [loginError, setLoginError] = useState(null);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.scrollView}>
        <Sae
          label={"Email"}
          iconClass={FontAwesome}
          iconName={"pencil"}
          iconColor={"white"}
          inputPadding={10}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
          labelStyle={{ color: "#ff7900" }}
          style={styles.textInput}
        />

        <Sae
          label={"Password"}
          iconClass={FontAwesome}
          iconName={"pencil"}
          iconColor={"white"}
          inputPadding={10}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          labelStyle={{ color: "#ff7900" }}
        />

        <Sae
          label={"Number"}
          iconClass={FontAwesome}
          iconName={"pencil"}
          iconColor={"white"}
          inputPadding={10}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={"none"}
          autoCorrect={false}
          labelStyle={{ color: "#ff7900" }}
          keyboardType="numeric"
          onChangeText={(number) => setNumber(number)}
        />

        <Sae
          label={"Age"}
          iconClass={FontAwesome}
          iconName={"pencil"}
          iconColor={"white"}
          inputPadding={10}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={"none"}
          autoCorrect={false}
          keyboardType="numeric"
          onChangeText={(age) => setAge(age)}
          labelStyle={{ color: "#ff7900" }}
        />

        <Sae
          label={"Zipcode"}
          iconClass={FontAwesome}
          iconName={"pencil"}
          iconColor={"white"}
          inputPadding={10}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={"none"}
          autoCorrect={false}
          keyboardType="numeric"
          onChangeText={(zipcode) => setLocation(zipcode)}
          labelStyle={{ color: "#ff7900" }}
        />

        <Sae
          label={"Preferred Name"}
          iconClass={FontAwesome}
          iconName={"pencil"}
          iconColor={"white"}
          inputPadding={10}
          labelHeight={24}
          // active border height
          borderHeight={2}
          // TextInput props
          autoCapitalize={"none"}
          autoCorrect={false}
          onChangeText={(name) => setName(name)}
          labelStyle={{ color: "#ff7900" }}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => {
            signUp(email, password).then((user) => {
              if (user) {
                var id = user.user.uid;
                addUser(id, {
                  id,
                  userNumber: number,
                  userName: name,
                  userAge: age,
                  location,
                  prefList: {},
                }).then((addedUser) => {
                  if (addedUser) {
                    navigation.navigate("HomeScreen", { user: addedUser });
                  } else {
                    setLoginError("Failed to add User");
                  }
                });
              } else {
                setLoginError("Failed to sign up ");
              }
            });
          }}
          style={styles.signInButton}
        >
          <Text style={styles.signInText}> Create profile!</Text>
        </TouchableOpacity>

        {loginError ? (
          <Text style={styles.errorText}>{loginError}</Text>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 25,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffb980",
  },
  scrollView: {
    backgroundColor: "#ffb980",
    paddingTop: 100,
    alignContent: "center",
  },
  textInput: {
    width: 200,
  },
  signInButton: {
    width: "60%",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginTop: 5,
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
    textAlign: "center",
  },
});
