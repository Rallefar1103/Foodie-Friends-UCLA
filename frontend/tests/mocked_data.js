import { mockFirebase } from 'ts-mock-firebase';
 
const firebase = mockFirebase();

mocked_email = "email"
mocked_password = "pasword"
mocked_user_data = {
    location: "90024",
    preflist: {},
    userAge: 21,
    userId: "id",
    userName: "name"
}

mocked_yelp_response = {
    businesses: [
        {
            "id": "piXuRfZ81xFGA64WFJrKkQ",
            "alias": "diddy-riese-cookies-los-angeles-2",
            "name": "Diddy Riese Cookies",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/fLFDrCUwt0zkDJjkm12FWw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/diddy-riese-cookies-los-angeles-2?adjust_creative=2PaQOY5aNmxcNqA5sOcoPw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=2PaQOY5aNmxcNqA5sOcoPw",
            "review_count": 5670,
            "categories": [
                {
                    "alias": "desserts",
                    "title": "Desserts"
                },
                {
                    "alias": "bakeries",
                    "title": "Bakeries"
                },
                {
                    "alias": "icecream",
                    "title": "Ice Cream & Frozen Yogurt"
                }
            ],
            "rating": 4.5,
            "coordinates": {
                "latitude": 34.063065,
                "longitude": -118.446859
            },
            "transactions": [
                "pickup",
                "delivery"
            ],
            "price": "$",
            "location": {
                "address1": "926 Broxton Ave",
                "address2": "",
                "address3": "",
                "city": "Los Angeles",
                "zip_code": "90024",
                "country": "US",
                "state": "CA",
                "display_address": [
                    "926 Broxton Ave",
                    "Los Angeles, CA 90024"
                ]
            },
            "phone": "+13102080448",
            "display_phone": "(310) 208-0448",
            "distance": 1039.126447959642
        }
    ]
}

mocked_parsed_restaurant = {
    categories: mocked_yelp_response.categories,
    distance: mocked_yelp_response.distance,
    id: mocked_yelp_response.id,
    imageUrl: mocked_yelp_response.imageUrl,
    location: {
        address1: mocked_yelp_response.location.address1,
        address2: mocked_yelp_response.location.address2,
        city: mocked_yelp_response.location.city,
        country: mocked_yelp_response.location.country,
        displayAddress: mocked_yelp_response.location.displayAddress,
        state: mocked_yelp_response.location.state,
        zipcode: mocked_yelp_response.location.zipcode,
    },
    name: "name",
    price: "$",
    rating: 4.5
}