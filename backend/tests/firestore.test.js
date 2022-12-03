const { addUser } = require("../firebase/firestore");

mockedUser = {
    email: "test@email.com",
    password: "password",
    location: "07751",
    matches: [],
    id: "12345",
    userAge: 21,
    useName: "test user",
    userNumber: "7321234567"
}

test('addUser success', () => {
    addUser()
});

test('addUser failure', () => {
    
}); 

test('getUserInformation success', () => {
    
}); 

test('getUserInformation failure', () => {
    
}); 

test('getMatchInformation success', () => {
    
}); 

test('getMatchInformation failure', () => {
    
});

test('getRestaurantInformation success', () => {
    
}); 

test('getRestaurantInformation failure', () => {
    
});

test('checkLocation exists', () => {
    
});

test("checkLocation doesn't exist", () => {
    
});

test("addLocation success", () => {
    
});

test("addLocation failure", () => {
    
});

test("getRestaurantsByZipFromDB success", () => {
    
});

test("getRestaurantsByZipFromDB failure", () => {
    
});

test("addRestaurantsToDB success", () => {
    
});

test("addRestaurantsToDB failure", () => {
    
});

test("recordUserSwipe success", () => {
    
});

test("recordUserSwipe failure", () => {
    
});