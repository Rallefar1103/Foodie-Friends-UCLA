import HTTPHandler from "./httpHandler";
import Restaurant from "../models/restaurant";
import DBHandler from "./dbHandler";

class RestaurantsHandler {
  _httpHandler;
  _dbHandler;

  constructor() {
    this._httpHandler = new HTTPHandler();
    this._dbHandler = new DBHandler();
  }

  getRestaurants(zipcode) {
    var result = this._dbHandler.getRestaurants(zipcode);
    var restaurants = [];

    if (result != null) {
      for (var res in result) {
        restaurants.push(Restaurant.from(res));
      }
    }

    return restaurants;
  }
}
