import {places} from "./geografic.js";
import {LoadPlaces} from "./domBuilder.js";
import {Check} from "./domBuilder.js";
import {User} from "./user.js";

document.addEventListener('DOMContentLoaded', () => {
    LoadPlaces.loadCountries(places);
});

let selCountryElem = document.getElementById('country');
selCountryElem.addEventListener('change', () => {
    LoadPlaces.clearCities();
    LoadPlaces.loadCities(places, selCountryElem.value);
});

let btnSave = document.getElementById('save');
btnSave.addEventListener('click', () => {
    if (!Check.check()) {
        return;
    }
    let user = new User();
    user.print();
})