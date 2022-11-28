import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  writeBatch,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { v4 as uuid } from 'uuid';

const db = getFirestore();

export const addUser = async (userId, data) => {
  console.log(userId);
  return setDoc(doc(db, "users", userId), data)
    .then((res) => {
      return getUserInformation(userId);
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getUserInformation = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const checkLocation = async (zipcode) => {
  console.log(zipcode);
  const docRef = doc(db, "locations", zipcode);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    console.log("No zipcode!");
    return false;
  }
};

export const addLocation = async (zipcode) => {
  return setDoc(doc(db, "locations", zipcode), {})
    .then((res) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

export const getRestaurantsByZipFromDB = async (zipcode) => {
  const restaurants = [];
  const restaurantCollection = collection(db, "restaurants");
  const q = query(
    restaurantCollection,
    where("location.zip_code", "==", zipcode)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    restaurants.push(doc.data());
  });
  console.log(restaurants);
  return restaurants;
};

export const addRestaurantsToDB = async (restaurantData) => {
  console.log("adding restaurants", restaurantData);
  const batch = writeBatch(db);
  restaurantData.forEach((restaurant) => {
    console.log(restaurant.id);
    var docRef = doc(db, "restaurants", restaurant.id);
    batch.set(docRef, restaurant);
  });
  await batch.commit();
  console.log("restaurants added!");
};

export const getRestaurantById = async (restaurantId) => {
  const docRef = doc(db, "restaurants", restaurantId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No resaurant!");
    return null;
  }
}

export const getUserById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No user!");
    return null;
  }
}

export const createMatch = async (docRef, data) => {
  // create match with users, add match to user document, delete from tempTable
  matchId = uuid();
  users = data.users;
  restaurantId = data.restaurantId;
  restaurantInfo = await getRestaurantById(restaurantId);
  restaurantName = restaurantInfo.name;
  restaurantImageUrl = restaurantInfo.imageUrl;
  restaurantLocation = restaurantData.location.display_address.join(", ");

  return setDoc(doc(db, "matches", matchId), {
    id: matchId,
    users,
    restaurantId,
    restaurantName,
    restaurantImageUrl,
    restaurantLocation,
  })
}

export const recordUserSwipe = async (restaurantId, userId) => {
  // check if restaurant id exists, create if doesn't
  // check user count if >= 4, create match and assign users to it 
  // update user documents with match id

  const docRef = doc(db, "tempMatches", restaurantId);
  const docSnap = await getDoc(docRef);
  const userData = await getUserById(userId);
  const {userName, userNumber} = userData;
  const userObj = {
    userId,
    userName,
    userNumber
  };

  if (docSnap.exists()) {
    //update document
    data = docSnap.data();
    data.users.push(userObj);
    if (data.users.length >= 3) {
      await createMatch(docRef, data);
    } 
    else {
      await updateDoc(docRef, data);
      console.log("User added to temp match")
    }

  } else {
    setDoc(doc(db, "tempMatches", restaurantId), {
      restaurantId: restaurantId,
      users: [userObj]
    })
    .catch((error) => {
      console.log("Couldn't create document!");
    });
  }
}