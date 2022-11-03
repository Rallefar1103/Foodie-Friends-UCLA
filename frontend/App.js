import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackView } from "@react-navigation/stack";
import LoginScreen from "./src/screens/login/LoginScreen";
import { useState, useEffect } from "react";
import HomeScreen from "./src/screens/home/HomeScreen";
import provideFirebaseApp  from "./src/firebase/firebase";

export default function App() {
  useEffect(() => {
    provideFirebaseApp();
  });

  const [isSignedIn, setIsSignedIn] = useState(false);

  const Stack = createStackNavigator();

  const signIn = (status) => {
    setIsSignedIn(status);
  };

  if (!isSignedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <HomeScreen></HomeScreen>;
  }
}
