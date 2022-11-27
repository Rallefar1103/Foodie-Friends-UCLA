import {
  getRestaurantsByZipFromDB,
  getUserInformation,
} from "../firebase/firestore";

export default class DBHandler {
  getRestaurants(zipcode) {
    return getRestaurantsByZipFromDB(zipcode);
  }

  getUserInfo(userId) {
    return getUserInformation(userId);
  }
}
