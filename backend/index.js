const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
import DBHandler from "./handlers/dbHandler";
import RestaurantsHandler from "./handlers/restaurantsHandler";
const app = express();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getRestaurants', (req,res)=> {
    return res.send(DBHandler.getRestaurants(req.params.zipcode))
})

app.get('/getUserInfo', (req,res)=> {
  return res.send(DBHandler.getUserInfo(req.params.userId))
})

app.get('/getRestaurantsForDisplay', (req,res)=> {
  return res.send(RestaurantsHandler.getRestaurantsForDisplay(req.params.zipcode))
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});