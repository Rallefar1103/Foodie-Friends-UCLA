import {
  getRestaurantsByZipFromDB,
  getUserInformation,
} from "../firebase/firestore";

export default class DBHandler {
  async getRestaurants(zipcode) {
    return await getRestaurantsByZipFromDB(zipcode);
  }

  async getUserInfo(userId) {
    return await getUserInformation(userId);
  }
}
