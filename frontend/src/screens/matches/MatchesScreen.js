import * as React from "react";
import { FlatList, StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MatchesScreen({ navigation }) {
  const matches = [
    {
      id: 1,
      name: 'Fat Sals',
      people: 'Joe B., Josie B., Jack S.',
      image: require('../../../assets/images/fatsals.png'),
    },
    {
      id: 2,
      name: 'In-N-Out',
      people: 'Joe B., Josie B., Jack S.',
      image: require('../../../assets/images/innout.png'),
    },
    {
      id: 3,
      name: 'Bruin Plate',
      people: 'Joe B., Josie B., Jack S.',
      image: require('../../../assets/images/bplate.png'),
    },
    {
      id: 4,
      name: 'Fat Sals',
      people: 'Joe B., Josie B., Jack S.',
      image: require('../../../assets/images/fatsals.png'),
    },
    {
      id: 5,
      name: 'In-N-Out',
      people: 'Joe B., Josie B., Jack S.',
      image: require('../../../assets/images/innout.png'),
    },
    {
      id: 6,
      name: 'Bruin Plate',
      people: 'Joe B., Josie B., Jack S.',
      image: require('../../../assets/images/bplate.png'),
    },
  ];

  const match = ({ item }) => (
    <View style={ styles.item }>
      <View style={ styles.background }>
        <View style={ styles.imageContainer }>
          <Image source={ item.image } style={ styles.img } />
        </View>
        <View>
          <Text style={styles.name}>{ item.name }</Text>
          <Text/>
          <Text style={styles.info}>with...</Text>
          <Text style={styles.info}>{ item.people }</Text>
        </View>
      </View>
    </View>
  )

  itemSeparator = () => {
    return <View style={ styles.separator }/>
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data = { matches }
        renderItem = { match }
        ItemSeparatorComponent = { itemSeparator }
        ListEmptyComponent = { <Text>You have no matches :(</Text> }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   marginHorizontal: 21,
  },
  separator: {
    height: 0,
    width: '100%',
    backgroundColor: '#ff7900',
  },
  item: {
    flex: 1,
    flexDirections: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    backgroundColor: '#606060',
    borderRadius: 30,
    height: 89,
    width: 89,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17,
  },
  img: {
    width: 89,
    height: 89,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "#606060",
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
    color: "#f4f4f4",
    marginLeft: 15,
  },
  info: {
    fontWeight: '500',
    fontSize: 15,
    color: '#e5e5e5',
    marginLeft: 15,
  },
  background: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aaaaaa',
    borderRadius: 20,
    height: 130,
    width: '90%'
  },
});