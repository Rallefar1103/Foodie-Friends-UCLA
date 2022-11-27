import HTTPHandler from "./httpHandler";
import Restaurant from "../models/restaurant";

class RestaurantsHandler {
  _httpHandler;
  _restaurantParser;

  RestaurantsHandler(httpHandler, restaurantParser) {
    this._httpHandler = httpHandler;
    this._restaurantParser = restaurantParser;
  }

  getRestaurants() {
    var result = this._httpHandler.getRestaurants();
    var restaurants = [];

    if (result != null) {
      for (var res in result) {
        restaurants.push(Restaurant(res));
      }
    }

    return restaurants;
  }
}
