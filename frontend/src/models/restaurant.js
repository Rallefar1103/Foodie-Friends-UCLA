export default class Restaurant {
  _id;
  _categories;
  _distance;
  _location;
  _name;
  _price;
  _rating;
  _image_url;

  Restaurant(
    id,
    categories,
    distance,
    location,
    name,
    price,
    rating,
    image_url
  ) {
    this._id = id;
    this._categories = categories;
    this._distance = distance;
    this._location = location;
    this._name = name;
    this._price = price;
    this._rating = rating;
    this._image_url = image_url;
  }

  get id() {
    return this._id;
  }

  get categories() {
    return this._categories;
  }

  get distance() {
    return this._distance;
  }

  get location() {
    return this._location;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get rating() {
    return this._rating;
  }

  get image_url() {
    return this._image_url;
  }

  static from(json) {
    var obj = JSON.parse(json);
    return Object.assign(new Restaurant(), obj);
  }
}
