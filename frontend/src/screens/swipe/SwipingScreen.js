import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width



const SwipingScreen = () => {
    const Foods = [
        { id: "1", uri: require('frontend/assets/images/gene.png')},
        { id: "2", uri: require('frontend/assets/images/gene.png') }
      ]

    return (
        <View style={{ flex: 1 }}>
          <View style={{ height: 60 }}>
          </View>
          <View style={{ flex: 1 }}>
            {Foods.map((item, i ) => 
                <Animated.View
                style={{
                    key:{i},
                    height: SCREEN_HEIGHT - 300,
                    width: SCREEN_WIDTH,
                    padding: 10,
                    position:'absolute'
                }}
                >
                <Image
                    style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20
                    }}
                    source={item.uri}
                />
                </Animated.View>
            )}
          </View>
          <View style={{ height: 60 }}>
          </View>
        </View>
    );
};

export default SwipingScreen;