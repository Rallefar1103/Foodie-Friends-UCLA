import Restaurant from "../restaurant.js";
import { describe, expect, test } from "@jest/globals";

describe("Restaurant model test", () => {
  test("should return a Restaurant object from JSON", () => {
    var json = {
      id: 123,
      categories: ["asian", "american", "chinese"],
      distance: 23,
      location: "Westwood",
      name: "chick-fil-a",
      price: "expensive",
      rating: 4,
      image_url: "http://here.com",
    };

    var expectedObject = new Restaurant(
      123,
      ["asian", "american", "chinese"],
      23,
      "Westwood",
      "chick-fil-a",
      "expensive",
      4,
      "http://here.com"
    );

    var jsonString = JSON.stringify(json);

    let actualObject = Restaurant.from(jsonString);

    expect(actualObject).toStrictEqual(expectedObject);
  });
});
