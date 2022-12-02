import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  writeBatch,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc
} from "firebase/firestore";

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

export const getMatchInformation = async (matchId) => {
  const docRef = doc(db, "matches", matchId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getRestaurantInformation = async (resId) => {
  const docRef = doc(db, "restaurants", resId);
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

export const createMatch = async (data) => {
  // create match with users, add match to user document, delete from tempTable
  data.users.sort();
  matchId = data.restaurantId + '-'  + data.users.join('-');
  users = data.users;
  restaurantId = data.restaurantId;
  restaurantInfo = await getRestaurantInformation(restaurantId);
  restaurantName = restaurantInfo.name;
  restaurantImageUrl = restaurantInfo.imageUrl;
  restaurantLocation = restaurantInfo.location.display_address.join(", ");

  await setDoc(doc(db, "matches", matchId), {
    id: matchId,
    users,
    restaurantId,
    restaurantName,
    restaurantImageUrl,
    restaurantLocation,
  });

  users.forEach(async (userId) => {
    await updateDoc(doc(db, "users", userId), {
      matches: arrayUnion(matchId)
    });
  });
}

export const recordUserSwipe = async (restaurantId, userId) => {
  // check if restaurant id exists, create if doesn't
  // check user count if >= 4, create match and assign users to it 
  // update user documents with match id

  console.log("RECORD USER SWIPE: ", userId, restaurantId); 
  const docRef = doc(db, "tempMatches", restaurantId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    data.users.indexOf(userId) === -1 ? data.users.push(userId) : console.log("user in temp match");
    //update document
    if (data.users.length >= 2) {
      console.log("CREATING MATCH!")
      await createMatch(data);
      await deleteDoc(docRef);
    } 
    else {
      await updateDoc(docRef, data);
      console.log("User added to temp match")
    }

  } else {
    await setDoc(doc(db, "tempMatches", restaurantId), {
      restaurantId: restaurantId,
      users: [userId]
    })
  }
}