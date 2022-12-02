import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";

// Screens
import SettingsScreen from "../settings/SettingsScreen";
import MatchesScreen from "../matches/MatchesScreen";
import LoadingPage from "./LoadingPage";
import { getRestaurantsByZip } from "../../yelp/yelp";
import SwipingScreen from "../swipe/SwipingScreen";

// Screen Names
const matches = "Matches";
const settings = "Settings";
const swipe = "Swipe";

const Tab = createBottomTabNavigator();

export default function HomeScreen({ route, navigation }) {
  const { user } = route.params;
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  
  const getRestaurants = () => {
    return getRestaurantsByZip(user.location);
  }

  return (
    <React.Fragment>
      {restaurantInfo ? (
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
                iconName = focused ? "play" : "play-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name={swipe}>
            {() => <SwipingScreen data={restaurantInfo} user={user} />}          
          </Tab.Screen>
          <Tab.Screen name={matches} component={MatchesScreen} initialParams={ {user: user} }/>
          <Tab.Screen name={settings} component={SettingsScreen} initialParams={ {user: user} }/>
        </Tab.Navigator>
      ) : (
        <React.Fragment>
            <LoadingPage />
            {setRestaurantInfo(getRestaurants())}
        </React.Fragment>
      )}
    </React.Fragment>

  );
}
