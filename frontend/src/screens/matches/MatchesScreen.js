import * as React from "react";
import {useState} from "react";
import { Modal, FlatList, StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, Image } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MatchModal from "./MatchModal";
import { getUserInformation, getMatchInformation, getRestaurantInformation } from "../../firebase/firestore";


const populateMatch = async (matchIds, arr) => {
  for (let i=0; i<matchIds.length; i++) {
    const matchData = await getMatchInformation(matchIds[i]);
    let nameList = ""
    for (let j=0; j<matchData.users.length; j++) {
      const usr = await getUserInformation(matchData.users[j]);
      nameList += usr.userName + ", ";
    }
    matchData.nameList = nameList.slice(0, nameList.length - 2);
    arr.push(matchData);
  }
  return arr;
};

export default function MatchesScreen({ route, navigation }) {
  const [modalOn, setModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState({
    id: null,
    restaurantId: null,
    restaurantImageUrl: null,
    restaurantLocation: null,
    restaurantName: null,
    users: null,
    nameList: null,
    numbers: null,
  });
  const [matches, setMatches] = useState({
    matches: null,
  });

  const {user} = route.params;

  const matchIds = user.matches;

  let matchArr = []

  if (isLoading)
  {
    populateMatch(matchIds, matchArr).then(res => {
      const currMatch = {matches: res}
      setMatches(currMatch);
      count = 10;
      console.log(matches);
      setLoading(false);
    });
  }

  let onPressMatch = (item) => {
    setModal(!modalOn);
    console.log(item.name);
    setSelectedRestaurant(item);
  }

  const match = ({ item }) => (
    <View style={ styles.item }>
      <TouchableOpacity onPress={ () => { onPressMatch(item) } }
      style={ styles.background }>
        <View style={ styles.imageContainer }>
          <Image source={ {uri: item.restaurantImageUrl} } style={ styles.img } />
        </View>
        <View>
          <Text style={styles.name}>{ item.restaurantName }</Text>
          <Text/>
          <Text style={styles.info}>with...</Text>
          <Text style={styles.info}>{ item.nameList }</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  itemSeparator = () => {
    return <View style={ styles.separator }/>
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <MatchModal showModal={modalOn} restaurantData={selectedRestaurant}></MatchModal>
      <FlatList
        data = { matches.matches }
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