import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import SettingsScreen from "../settings/SettingsScreen";
import MatchesScreen from "../matches/MatchesScreen";
import SwipingScreen from "../swipe/SwipingScreen";

// Screen Names
const matches = "Matches";
const settings = "Settings";
const swipe = "Swipe";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={matches}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === matches) {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === settings) {
            iconName = focused ? "settings" : "settings-outline";
          }
          else if (routeName === swipe) {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={swipe} component={SwipingScreen} />
      <Tab.Screen name={matches} component={MatchesScreen} />
      <Tab.Screen name={settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
