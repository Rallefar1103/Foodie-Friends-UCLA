const {
  addUser,
  getUserInformation,
  getMatchInformation,
  getRestaurantInformation,
  checkLocation,
  addLocation,
  deleteLocation,
  addRestaurantsToDB,
  getRestaurantsByZipFromDB,
  addMatch,
} = require("../firebase/firestore");
const { getRestaurantsByZip } = require("../yelp/yelp");

mockedUser = {
  location: "12345",
  matches: [],
  id: "userid",
  userAge: 21,
  useName: "test user",
  userNumber: "7321234567",
};

mockedRestaurant = {
  imageUrl:
    "https://s3-media4.fl.yelpcdn.com/bphoto/4QqzRCN1lO3CAJK5UOwfeA/o.jpg",
  distance: 968.5062661496542,
  name: "Skylight Gardens",
  rating: 4,
  categories: [
    {
      alias: "italian",
      title: "Italian",
    },
    {
      alias: "venues",
      title: "Venues & Event Spaces",
    },
    {
      title: "Cocktail Bars",
      alias: "cocktailbars",
    },
  ],
  url: "https://www.yelp.com/biz/skylight-gardens-los-angeles?adjust_creative=2PaQOY5aNmxcNqA5sOcoPw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2PaQOY5aNmxcNqA5sOcoPw",
  location: {
    state: "CA",
    zip_code: "12345",
    city: "Los Angeles",
    address3: "",
    country: "US",
    address1: "1139 Glendon Ave",
    display_address: ["1139 Glendon Ave", "Los Angeles, CA 90024"],
    address2: null,
  },
  id: "restaurantId",
  price: "$$",
};

mockedMatch = {
  restaurantName: "Skylight Gardens",
  restaurantLocation: "1139 Glendon Ave, Los Angeles, CA 90024",
  restaurantImageUrl:
    "https://s3-media4.fl.yelpcdn.com/bphoto/4QqzRCN1lO3CAJK5UOwfeA/o.jpg",
  restaurantId: "restaurantId",
  id: "matchId",
  users: ["userId"],
};

mockedZipcode = "12345";

beforeAll(() => {
    addUser(mockedUser.id, mockedUser);
    addLocation(mockedZipcode);
    addRestaurantsToDB([mockedRestaurant]);
    addMatch(mockedMatch.id, mockedMatch)
  });
  

test("addUser success", async () => {
  await expect(addUser(mockedUser.id, mockedUser)).resolves.toStrictEqual(
    mockedUser
  );
});

test("getUserInformation success", async () => {
  await expect(getUserInformation(mockedUser.id)).resolves.toStrictEqual(
    mockedUser
  );
});

test("getUserInformation failure", async () => {
  await expect(getUserInformation("id doesn't exist")).resolves.toBeNull();
});

test("getMatchInformation success", async () => {
  await expect(getMatchInformation(mockedMatch.id)).resolves.toStrictEqual(
    mockedMatch
  );
});

test("getMatchInformation failure", async () => {
  await expect(getMatchInformation("match doesn't exist")).resolves.toBeNull();
});

test("getRestaurantInformation success", async () => {
  await expect(
    getRestaurantInformation(mockedRestaurant.id)
  ).resolves.toStrictEqual(mockedRestaurant);
});

test("getRestaurantInformation failure", async () => {
  await expect(
    getMatchInformation("restaurant doesn't exist")
  ).resolves.toBeNull();
});

test("checkLocation exists", async () => {
  await expect(checkLocation("90024")).resolves.toStrictEqual(true);
});

test("checkLocation doesn't exist", async () => {
  await expect(checkLocation("zipcode doesn't exist")).resolves.toBe(false);
});

test("addLocation success", async () => {
  await expect(addLocation(mockedZipcode)).resolves.toStrictEqual(true);
});

test("addRestaurantsToDB success", async () => {
    await expect(addRestaurantsToDB([mockedRestaurant])).resolves.not.toBeNull();
});

test("getRestaurantsByZipFromDB success", async () => {
    await expect(getRestaurantsByZipFromDB(mockedUser.location)).resolves.not.toBeNull();
});

test("getRestaurantsByZipFromDB failure", async () => {
    await expect(getRestaurantsByZipFromDB("location doesn't exist")).resolves.toStrictEqual([]);
});

test("getRestaurantByZip Yelp", async () => {
    await expect(getRestaurantsByZip(mockedUser.location)).resolves.not.toBeNull();
});