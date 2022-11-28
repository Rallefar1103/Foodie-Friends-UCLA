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
   
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffb980",
  },
  scrollView:{
    backgroundColor: "#ffb980",
    paddingTop: 100,
    alignContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    height: 50,
    width: 200,
    marginBottom: 5,
    paddingLeft: 10,
  },
  signInButton: {
    width: "60%",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignSelf: "center",
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
