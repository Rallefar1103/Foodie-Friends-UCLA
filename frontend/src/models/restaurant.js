class Restaurant {
  constructor(
    id,
    categories,
    distance,
    location,
    name,
    price,
    rating,
    image_url
  ) {
    this.id = id;
    this.categories = categories;
    this.distance = distance;
    this.location = location;
    this.name = name;
    this.price = price;
    this.rating = rating;
    this.image_url = image_url;
  }

  static from(json) {
    var obj = JSON.parse(json);
    return Object.assign(new Restaurant(), obj);
  }
}

export default Restaurant;
