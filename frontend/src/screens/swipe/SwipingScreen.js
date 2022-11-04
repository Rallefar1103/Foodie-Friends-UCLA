import * as React from "react";
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import {Tile } from 'react-native-elements'
import Swiper from 'react-native-deck-swiper'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const styles = StyleSheet.create({
    CardContainer : {
        height: SCREEN_HEIGHT -200,
        width: SCREEN_WIDTH - 20,
        borderRadius: 20,
        overflow: 'hidden', // this does magic
        alignItems: 'center',
        justifyContent:'center'
    },

    title: {
        position: 'absolute',
        left: 10,
        bottom: 30,
        color: 'white',
        fontSize: 40
    },

    caption: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        color: 'white',
        fontSize: 20
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

const Foods = [
    { pic: require('frontend/assets/images/gene.png'), title: "my name is gene block",  caption: "20 miles away"},
    { pic: require('frontend/assets/images/gene.png'), title: "gene", caption: "1 mile away" }
  ]

const SwipingScreen = () => {

    return (
        <View style={styles.container}>
            <Swiper
                cards={Foods}
                renderCard={(card) =>{
                    
                    return (
                        <View style ={styles.card}>
                            <ImageBackground style={styles.image}
                                source={card.pic}>
                                <Text style={styles.title}> {card.title} </Text> 
                                <Text style={styles.caption}> {card.caption} </Text> 

                            </ImageBackground>
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {console.log(cardIndex)}}
                onSwipedAll={() => {console.log('onSwipedAll')}}
                cardIndex={0}
                infinite
                useNativeDriver= 'true'
                disableTopSwipe='true'
                disableBottomSwipe='true'
                backgroundColor={'#FFF'}
                stackSize= {2}></Swiper>
        </View>
    );
};

export default SwipingScreen;