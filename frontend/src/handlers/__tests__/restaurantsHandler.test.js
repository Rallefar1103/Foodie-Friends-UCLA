import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import RestaurantsHandler from "../restaurantsHandler";
import * as fs from "fs";
import * as mockFirestore from "../../firebase/firestore";

mockFirestore.getRestaurantsByZipFromDB.mockImplementation(() =>
  Promise.resolve({ data: "mock_result" })
);

describe("restaurantsHandler module", () => {
  test("should return a list of restaurants from DB", async () => {
    var resHandler = new RestaurantsHandler();
    var result = await resHandler.getRestaurantsForDisplay("93065");

    var expected = JSON.parse(
      fs
        .readFileSync(
          "/Users/rasmushenriksen/Desktop/CS130-Fall-2022-Project/frontend/src/handlers/__tests__/listOfRes.json"
        )
        .toString()
    );

    // expect(result).toBe(expected);
    expect(mockFirestore.getRestaurantsByZipFromDB).toHaveBeenCalled(1);
  });
});
