const { db } = require('./firebaseProvider');
 
const addUser = async (userId, data) => {
  console.log(userId);
  const docRef = db.collection('users').doc(userId); 
  return docRef.set(data)
    .then((res) => {
      return getUserInformation(userId);
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

const deleteUser = async (userId) => {
  console.log(userId);
  const docRef = db.collection('users').doc(userId); 
  return docRef.delete()
    .then((res) => {
      return true
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

const getUserInformation = async (userId) => {
  const docRef = db.collection('users').doc(userId); 
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getMatchInformation = async (matchId) => {
  const docRef = db.collection('matches').doc(matchId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getRestaurantInformation = async (resId) => {
  const docRef = db.collection('restaurants').doc(resId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const checkLocation = async (zipcode) => {
  console.log(zipcode);
  const docRef = db.collection('locations').doc(zipcode)
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return true;
  } else {
    console.log("No zipcode!");
    return false;
  }
};

const addLocation = async (zipcode) => {
  const docRef = db.collection('locations').doc(zipcode)
  return docRef.set({})
    .then((res) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

const deleteLocation = async (zipcode) => {
  const docRef = db.collection('locations').doc(zipcode)
  return docRef.delete()
    .then((res) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}

const getRestaurantsByZipFromDB = async (zipcode) => {
  const restaurants = [];
  const restaurantCollection = db.collection('restaurants');
  const querySnapshot = await restaurantCollection.where("location.zip_code", "==", zipcode).get();
  querySnapshot.forEach((doc) => {
    restaurants.push(doc.data());
  });
  console.log(restaurants);
  return restaurants;
};

const addRestaurantsToDB = async (restaurantData) => {
  console.log("adding restaurants", restaurantData);
  const batch = db.batch()
  restaurantData.forEach((restaurant) => {
    console.log(restaurant.id);
    var docRef = db.collection('restaurants').doc(restaurant.id)
    batch.set(docRef, restaurant);
  });
  await batch.commit();
  console.log("restaurants added!");
};

const addMatch = async (matchId, data) => {
  const docRef = db.collection('matches').doc(matchId)
  return docRef.set(data)
    .then((res) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

const createMatch = async (data) => {
  // create match with users, add match to user document, delete from tempTable
  data.users.sort();
  matchId = data.restaurantId + '-'  + data.users.join('-');
  users = data.users;
  restaurantId = data.restaurantId;
  restaurantInfo = await getRestaurantInformation(restaurantId);
  restaurantName = restaurantInfo.name;
  restaurantImageUrl = restaurantInfo.imageUrl;
  restaurantLocation = restaurantInfo.location.display_address.join(", ");

  await db.collection("matches").doc(matchId).set({
    id: matchId,
    users,
    restaurantId,
    restaurantName,
    restaurantImageUrl,
    restaurantLocation,
  });

  users.forEach(async (userId) => {
    await db.collection('users').doc(userId).update({
      matches: arrayUnion(matchId)
    })
  });
}

const recordUserSwipe = async (restaurantId, userId) => {
  // check if restaurant id exists, create if doesn't
  // check user count if >= 4, create match and assign users to it 
  // update user documents with match id

  console.log("RECORD USER SWIPE: ", userId, restaurantId); 
  const docRef = db.collection("tempMatches").doc(restaurantId);
  const docSnap = await docRef.get()

  if (docSnap.exists) {
    const data = docSnap.data();
    data.users.indexOf(userId) === -1 ? data.users.push(userId) : console.log("user in temp match");
    //update document
    if (data.users.length >= 2) {
      console.log("CREATING MATCH!")
      await createMatch(data);
      await docRef.delete();
    } 
    else {
      await docRef.update(data);
      console.log("User added to temp match")
    }

  } else {
    await db.collection('tempMatches').doc(restaurantId).set({
      restaurantId: restaurantId,
      users: [userId]
    })
  }
}

module.exports = {
  addUser,
  deleteUser,
  getUserInformation,
  getMatchInformation,
  getRestaurantInformation,
  checkLocation,
  addLocation,
  deleteLocation,
  getRestaurantsByZipFromDB,
  addRestaurantsToDB,
  recordUserSwipe,
  addMatch
}