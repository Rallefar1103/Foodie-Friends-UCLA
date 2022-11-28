import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Tile } from "react-native-elements";
import Swiper from "react-native-deck-swiper";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
import { useState } from "react";
import { recordUserSwipe } from "../../firebase/firestore";
import * as WebBrowser from "expo-web-browser";

const styles = StyleSheet.create({
  CardContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH - 20,
    borderRadius: 20,
    overflow: "hidden", // this does magic
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 300,
    marginLeft: 5,
    color: "white",
    fontSize: "30%",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 10,
  },

  caption: {
    paddingTop: 20,
    marginLeft: 5,
    paddingLeft: 2,
    color: "white",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 10,
  },

  categories: {
    paddingTop: 20,
    marginLeft: 5,
    paddingLeft: 6,
    color: "white",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 10,
  },

  container: {
    flex: 1,
  },
  stack: {
    marginTop: 40
  },
  card: {
    flex: 1,
    borderRadius: 20,
    paddingBottom: 150,
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffb980",
    overflow: "hidden",
  },
  signInButton: {
    width: "35%",
    marginTop: 20,
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignContent: "center",
    marginLeft: 10
  },
  buttonText: {
    alignSelf: 'center'
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: '10%',
    paddingLeft: '2%',
    alignContent: "flex-start",
  }
});

const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};

const Restaurants = [];

const SwipingScreen = (props, { navigation }) => {
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const input_data = props.data;
  const user = props.user;
  const data = input_data["_z"]["_z"];

  const getRestaurantFormats = (json_data) => {
    var temp_arr = [];
    for (var restaurant in json_data) {
      var sub_info = json_data[restaurant];
      console.log(sub_info);
      var replace_to_miles =
        Math.round((sub_info["distance"] / 1609.344) * 10) / 10;
      var arr = {
        uri: sub_info["imageUrl"],
        name: sub_info["name"],
        distance: replace_to_miles,
        price: sub_info["price"],
        rating: sub_info["rating"],
        id: sub_info["id"],
        categories: sub_info["categories"],
        url: sub_info["url"],
        rating: sub_info["rating"],
      };
      temp_arr.push(arr);
    }
    return temp_arr;
  };

  return (
    <React.Fragment>
      {restaurantInfo ? (
        <View style={styles.container}>
        <View style={styles.stack}>
          <Swiper
            cards={restaurantInfo}
            renderCard={(card) => {
              return (
                <View style={styles.card}>
                  <ImageBackground
                    style={styles.image}
                    source={{ uri: card.uri }}
                  >
                    <View style={styles.infoContainer}>
                      <Text style={styles.title}> {card.name} </Text>
                      <Text style={styles.categories}>
                        {card.categories
                          .map((category) => category.title)
                          .join(", ")}
                      </Text>
                      <Text style={styles.caption}>
                        {" "}
                        {card.distance} miles away | {card.price} | {card.rating}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          _handlePressButtonAsync(card.url);
                        }}
                        style={styles.signInButton}
                      >
                      <Text styles={styles.buttonText}>View on Yelp!</Text>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
                
              );
            }}
            onSwiped={(cardIndex) => {}}
            onSwipedRight={(cardIndex) =>
              recordUserSwipe(restaurantInfo[cardIndex].id, user.id)
            }
            onSwipedLeft={(cardIndex) => {
              console.log(restaurantInfo[cardIndex]);
            }}
            cardIndex={0}
            infinite
            useNativeDriver="true"
            disableTopSwipe="true"
            disableBottomSwipe="true"
            backgroundColor={"#fff"}
            stackSize={5}
          ></Swiper>
        </View>
        </View>
      ) : (
        setRestaurantInfo(getRestaurantFormats(data))
      )}
    </React.Fragment>
  );
};

export default SwipingScreen;
