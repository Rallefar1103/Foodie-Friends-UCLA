class User {
  _userId;
  _userName;
  _userAge;
  _location;
  _preferencesList;

  User(newUserId, newUserName, newUserAge, newLocation, newPreferencesList) {
    this._userId = newUserId;
    this._userName = newUserName;
    this._userAge = newUserAge;
    this._location = newLocation;
    this._preferencesList = newPreferencesList;
  }

  getUserId() {
    return this._userId;
  }

  getUserName() {
    return this._userName;
  }

  getUserAge() {
    return this._userAge;
  }

  getLocation() {
    return this._location;
  }

  getPreferences() {
    return this._preferencesList;
  }
}
