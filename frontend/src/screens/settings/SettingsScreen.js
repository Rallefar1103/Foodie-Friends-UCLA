import React, { useReducer, useState } from "react";

import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Preference from "./preference";
import PreferenceItem from "../../components/settings/preferenceItem";
import { signOut } from "../../../../backend/firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen({ route, navigation }){

  const [user, setUser] = useState(route.params.user);
  
  const preferences = [
    { preference: new Preference("Keto"), id: Math.random().toString() },
    { preference: new Preference("Vegan"), id: Math.random().toString() },
    { preference: new Preference("Vegetarian"), id: Math.random().toString() },
    { preference: new Preference("Gluten-Free"), id: Math.random().toString() },
  ];

  return (
    <View style={styles.screenView}>
      <Text style={styles.headerText}> Settings </Text>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/blankuser.png")}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}> {user.userName} </Text>
        <View style={styles.editIcon}>
          <AntDesign name="edit" size={20} />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="md-location-sharp" size={34} color="#ff7900" />

        <Text style={styles.locationText}> {user.location} </Text>
      </View>
      <View style={styles.preferencesContainer}>
        <FlatList
          data={preferences}
          renderItem={(item) => {
            return (
              <PreferenceItem
                text={item.item.preference.getPreferenceType()}
                id={item.item.id}
              />
            );
          }}
        ></FlatList>
      </View>
      
      <TouchableOpacity
        onPress={() => {
          signOut()
          navigation.navigate("LogIn");
        }}
        style={styles.signOutButton}
      > 
        <Text style={styles.signOutText}> Sign Out!</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ff7900",
    paddingBottom: 10,
  },

  imageContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#ff7900",
  },

  nameContainer: {
    flexDirection: "row",
  },

  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },

  editIcon: {
    paddingTop: 10,
  },

  locationContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },

  locationText: {
    fontSize: 20,
    fontWeight: "500",
    paddingTop: 4,
  },

  preferencesContainer: {
    height: "35%",
    width: 200,
    alignItems: "center",
  },

  moreText: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "400",
    textDecorationLine: "underline",
  },
  signOutButton: {
    width: "30%",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  signOutText: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },
});


