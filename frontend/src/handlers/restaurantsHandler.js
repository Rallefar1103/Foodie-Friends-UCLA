import * as fireStore from "../firebase/firestore";
import Restaurant from "../models/restaurant";

class RestaurantsHandler {
  async getRestaurantsForDisplay(zipcode) {
    console.log("Helo from res handler");
    var result = await fireStore.getRestaurantsByZipFromDB(zipcode);
    var restaurants = [];

    if (result != null) {
      for (var res in result) {
        restaurants.push(Restaurant.from(res));
      }
    }

    return restaurants;
  }

  async getRestaurantInformation(resId) {
    var result = await fireStore.getRestaurantInformation(resId);

    if (result != null) {
      return Restaurant.from(result);
    }
    return null;
  }
}

export default RestaurantsHandler;
