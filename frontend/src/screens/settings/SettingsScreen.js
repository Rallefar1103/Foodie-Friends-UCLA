import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

const SettingsScreen = () => {
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
        <AntDesign name="edit" size={20} />
      </View>
      <View style={styles.locationContainer}>
        <Ionicons name="md-location-sharp" size={34} color="orange" />
        <Text style={styles.locationText}> Westwood, LA </Text>
      </View>
      <FlatList>
        <Ionicons name="checkbox" color="red" />
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "orange",
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
    fontSize: 25,
    fontWeight: "bold",
  },

  locationContainer: {
    flexDirection: "row",
  },

  locationText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default SettingsScreen;
