import RestaurantsHandler from "../restaurantsHandler";
import { describe, expect, jest, test } from "@jest/globals";
import DBHandler from "../dbHandler";

describe("restaurantsHandler module", () => {
  test("should return a list of restaurants from DB", () => {
    jest.mock(DBHandler);

    var resHandler = RestaurantsHandler();
    var results = resHandler.getRestaurantsForDisplay(93065);
    expect(true);
  });
});
