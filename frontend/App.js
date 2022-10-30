import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import HomeScreen from "./src/screens/home/HomeScreen";

// Screen Names
const home = "Home";
const settings = "Settings";
const swipe = "Swipe";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === home) {
              iconName = focused ? "home" : "home-outline";
            } else if (routeName === settings) {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={home} component={HomeScreen} />
        <Tab.Screen name={settings} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
