const {
  checkLocation,
  addLocation,
  getRestaurantsByZipFromDB,
  addRestaurantsToDB,
} = require("../firebase/firestore");

const getRestaurantsByZip = async (zipcode) => {
  const findLocation = await checkLocation(zipcode);
  console.log(findLocation);
  if (findLocation) {
    console.log("retrieve from db");
    return getRestaurantsByZipFromDB(zipcode);
  } else {
    console.log("add to db");
    await addLocation(zipcode);
    await getNewRestaurants(zipcode);
  }
};

const getNewRestaurants = (zipcode) => {
  const url = `https://api.yelp.com/v3/businesses/search?location=${zipcode}&limit=50`;
  console.log(url);
  fetch(url, {
    headers: {
      Authorization:
        "Bearer FZ8e9ga7HDdTbuMPC8Qbp02mBK0XrOmzWRQNOVof_f0p0RXABGesdXBacmGIfLVsSl3vjAjbHmbeZKR8EFOO-vhVAg2-aSAC_FbYjgBHJ3a8Dx1ppvXy4SOEGdZjY3Yx",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return parseResponse(data);
    })
    .then((ret) => {
      addRestaurantsToDB(ret);
      return ret;
    })
    .catch((error) => {
      console.log(error);
      console.log("Yelp API request failed.");
      return null;
    });
};

const parseResponse = (data) => {
  const { businesses } = data;
  const parsedData = businesses.map(
    ({
      id,
      categories,
      distance,
      image_url,
      location,
      name,
      price,
      rating,
    }) => ({
      id,
      categories: categories ?? [],
      distance: distance ?? -1,
      imageUrl: image_url ?? "",
      location: location ?? {},
      name: name ?? "",
      price: price ?? "",
      rating: rating ?? -1,
    })
  );

  return parsedData;
};

module.exports = {
  getRestaurantsByZip,
};
