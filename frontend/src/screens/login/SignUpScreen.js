import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { signUp } from "../../firebase/auth";
import { addUser } from "../../firebase/firestore";


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
    <View style={styles.screenContainer}>
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
        
        <TextInput
          id="number"
          style={styles.textInput}
          placeholder="Enter phone number..."
          keyboardType='numeric'
          onChangeText={(number) => setNumber(number)}
        ></TextInput>   
       
         <TextInput
          id="name"
          style={styles.textInput}
          placeholder="Enter your preferred name..."
          onChangeText={(name) => setName(name)}
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
              signUp(email, password).then((user) => {
                if(user){
                  var id = user.user.uid;
                  addUser(id, {id, userNumber: number, userName: name, userAge: age, location, prefList: {}}).then((addedUser) => {
                    if(addedUser){
                      navigation.navigate("HomeScreen", { user: addedUser });
                    }
                    else{
                      setLoginError("Failed to add User"); 
                    }
                      
                  })
                } else{
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
