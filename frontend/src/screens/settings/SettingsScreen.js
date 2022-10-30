import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import Preference from "./preference";

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
      <View>
        <Text style={styles.nameText}> Gene Block </Text>
      </View>
      <FlatList></FlatList>
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

  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
