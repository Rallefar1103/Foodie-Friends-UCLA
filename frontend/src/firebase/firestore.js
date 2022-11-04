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
