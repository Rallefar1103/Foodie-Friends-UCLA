const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  addUser,
  getMatchInformation,
  getUserInformation,
  getRestaurantInformation,
  checkLocation,
  getRestaurantsByZipFromDB,
  addRestaurantsToDB,
  recordUserSwipe,
} = require("./firebase/firestore");

const {
  getRestaurantsByZip
} = require("./yelp/yelp");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/users/add-user", async (req, res) => {
  const body = req.body;
  const { userId, data } = body;
  const ret = addUser(userId, data);
  return res.send(ret);
});

app.get("/users/get-user/:id", async (req, res) => {
  const userId = req.params.id;
  const ret = await getUserInformation(userId);
  return res.send(ret);
});

app.get("/matches/get-match/:id", async (req, res) => {
  const matchId = req.params.id;
  const ret = await getMatchInformation(matchId);
  return res.send(ret);
});


app.get("/restaurants/get-restaurant/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const ret = await getRestaurantInformation(restaurantId);
  return res.send(ret);
});

app.get("/restaurants/get-restaurants/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  const ret = await getRestaurantsByZipFromDB(zipcode);
  return res.send(ret);
});

app.post("/restaurants/add-restaurants", async (req, res) => {
  const body = req.body;
  const { restaurantData } = body;
  const ret = addRestaurantsToDB(restaurantData);
  return res.send(ret);
});

app.get("/locations/check-location/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  const ret = await checkLocation(zipcode);
  return res.send(ret);
});

app.post("/locations/add-location", async (req, res) => {
  const body = req.body;
  const { zipcode } = body;
  const ret = addLocation(zipcode);
  return res.send(ret);
});

app.post("/swipe/right", async (req, res) => {
  const body = req.body;
  const { userId, restaurantId } = body;
  const ret = recordUserSwipe(restaurantId, userId);
  return res.send(ret);
});

app.get("/yelp/get-restaurants/:zipcode", async (req, res) => {
  const zipcode = req.params.zipcode;
  const ret = await getRestaurantsByZip(zipcode);
  return res.send(ret);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
