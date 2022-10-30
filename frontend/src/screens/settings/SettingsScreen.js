import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import Preference from "./preference";
import PreferenceItem from "../../components/settings/preferenceItem";

const SettingsScreen = () => {
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
          source={require("../../../assets/images/gene.png")}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}> Gene Block </Text>
        <View style={styles.editIcon}>
          <AntDesign name="edit" size={20} />
        </View>
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="md-location-sharp" size={34} color="orange" />

        <Text style={styles.locationText}> Westwood, LA </Text>
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
      <Text style={styles.moreText}> More </Text>
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
    color: "orange",
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
    borderColor: "orange",
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
    height: "25%",
    width: 200,
    alignItems: "center",
  },

  moreText: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});

export default SettingsScreen;
