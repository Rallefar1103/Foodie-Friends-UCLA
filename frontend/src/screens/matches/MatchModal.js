import * as React from "react";
import {useState, useEffect} from "react";
import * as SMS from "expo-sms";
import { Modal, FlatList, StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const sendSMS = ( numbers ) => SMS.sendSMSAsync(
  numbers,
  'Hi guys! Let\'s eat together!',
);

export default function MatchModal(props) {
  const [showModal, setModal] = useState(true);
  const [restaurantData, setRestaurantData] = useState(props.restaurantData);

  useEffect( () => {
      console.log('modal toggled');
      setModal(!showModal);
  }, [props.showModal])

  useEffect( () => {
      console.log('new restaurant toggled');
      setRestaurantData(props.restaurantData);
      console.log(restaurantData.name);
  }, [props.restaurantData])

  return (
      <Modal animationType="slide"
      visible={showModal}
      transparent={false}
      onRequestClose={() => {
          console.warn("closed");
      }}>
        <View style={styles.container}>
          <View style={styles.background}>
            <View style={ styles.imageContainer }>
                <Image source={ {uri: restaurantData.restaurantImageUrl} } style={ styles.img } />
            </View>
            <Text style={styles.name}>{restaurantData.restaurantName}</Text>
            <Text style={styles.info}>with...</Text>
            <Text style={styles.info}>{restaurantData.nameList}</Text>
            <View style={styles.locationSeparator}/>
            <Text style={styles.info}>at...</Text>
            <Text style={styles.info}>{restaurantData.restaurantLocation}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={ () => { sendSMS(restaurantData.numbers) }} style={styles.chatButton}>
                <Text style={styles.buttonText}>Start a Chat!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.closeButton}>
          <Button title="Close"
            onPress={()=>{setModal(!showModal)}}/>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#aaaaaa',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
  },
  imageContainer: {
      backgroundColor: '#606060',
      borderRadius: 30,
      height: "50%",
      width: "90%",
      justifyContent: 'center',
      alignItems: 'center',
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "#606060",
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
    color: "#f4f4f4",
    paddingVertical: 10,
  },
  info: {
    fontWeight: '500',
    fontSize: 15,
    color: '#e5e5e5',
  },
  buttonContainer: {
    height: 40,
    width: 120,
    paddingTop: 20,
  },
  chatButton: {
    width: 120,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 15,
    color: '#bcbcbc',
    textAlign: 'center',
  },
  closeButton: {
    paddingBottom: 20,
  },
  locationSeparator: {
    height: 10,
  }
});