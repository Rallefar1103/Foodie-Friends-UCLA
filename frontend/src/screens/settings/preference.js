class Preference {
  _preferenceType;
  _preferenceSelected = false;

  Preference(newPreferenceType) {
    this._preferenceType = newPreferenceType;
  }

  getPreferenceType() {
    return this._preferenceType;
  }

  togglePreference() {
    this._preferenceSelected = !this._preferenceSelected;
    return this._preferenceSelected;
  }
}
