import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { getRestaurantsForDisplay } from "../restaurantsHandler";

var list = [
  {
    id: 123,
    categories: ["asian", "american", "chinese"],
    distance: 23,
    location: "Westwood",
    name: "chick-fil-a",
    price: "expensive",
    rating: 4,
    image_url: "http://here.com",
  },
  {
    id: 124,
    categories: ["asian", "american", "chinese"],
    distance: 21,
    location: "Westwood",
    name: "chick-fil-a",
    price: "expensive",
    rating: 4,
    image_url: "http://here.com",
  },
  {
    id: 125,
    categories: ["asian", "american", "chinese"],
    distance: 26,
    location: "Westwood",
    name: "chick-fil-a",
    price: "expensive",
    rating: 4,
    image_url: "http://here.com",
  },
];

jest.mock("../restaurantsHandler", () => ({
  __esModule: true,
  getRestaurantsForDisplay: () => list,
}));

describe("restaurantsHandler module", () => {
  test("should return a list of restaurants from DB", async () => {
    var result = getRestaurantsForDisplay();

    expect(result).toBe(list);
  });
});
