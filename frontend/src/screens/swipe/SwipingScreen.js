import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import {Tile } from 'react-native-elements'
import Swiper from 'react-native-deck-swiper'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import { useState } from "react";
import { recordUserSwipe } from "../../firebase/firestore";

const styles = StyleSheet.create({
    CardContainer : {
        height: SCREEN_HEIGHT  ,
        width: SCREEN_WIDTH - 20,
        borderRadius: 20,
        overflow: 'hidden', // this does magic
        alignItems: 'center',
        justifyContent:'center'
    },

    title: {
        position: 'absolute',
        bottom: 30,
        left:7,
        color: 'white',
        fontSize: '30%',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 10
    },

    caption: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        color: 'white',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 10
      },

    container: {
        flex: 1,
      },
      card: {
        flex: 1,
        borderRadius: 20,
        paddingBottom: 150,
        justifyContent: "center",
        overflow:'hidden'
      },
    image : {
        height: "100%",
        width: "100%",
        borderRadius: 20,
        overflow:'hidden'
    }
})


const Restaurants = [

]

const getRestaurantFormats = (json_data) =>{
    for (var restaurant in json_data) {
        var sub_info = json_data[restaurant];
        console.log(sub_info);
        var replace_to_miles = Math.round( (sub_info["distance"] / 1609.344) * 10) / 10;
        var arr = {uri: sub_info["imageUrl"], name: sub_info["name"],distance: replace_to_miles, price: sub_info["price"], rating: sub_info["rating"], id: sub_info["id"]};
        Restaurants.push(arr);
    }
}
const SwipingScreen = (props, {navigation}) => {
    console.log("hi")
    const input_data = props.data;
    const user = props.user;
    const data = input_data["_z"]["_z"]
    getRestaurantFormats(data)
    return (
        <View style={styles.container}>
            <Swiper
                cards={Restaurants}
                renderCard={(card) =>{
                    
                    return (
                        <View style ={styles.card}>                    
                            <ImageBackground style={styles.image}
                                source={{uri: card.uri}}>
                                <Text style={styles.title}> {card.name} </Text> 
                                <Text style={styles.caption}> {card.distance} miles away ({card.price}) </Text> 

                            </ImageBackground>

                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedRight={(cardIndex) => recordUserSwipe(Restaurants[cardIndex].id, user.id)}
                onSwipedLeft={(cardIndex) => {console.log(Restaurants[cardIndex])}}
                cardIndex={0}
                infinite
                useNativeDriver= 'true'
                disableTopSwipe='true'
                disableBottomSwipe='true'
                backgroundColor={'#FFF'}
                stackSize= {1}></Swiper>
        </View>
    );
};

export default SwipingScreen;