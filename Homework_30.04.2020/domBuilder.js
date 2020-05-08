export class LoadPlaces {
    static countries = document.getElementById('country');
    static cities = document.getElementById('city');

    static loadCountries(countries) {
        for (let key in countries) {
            let country = document.createElement('option');
            country.className = 'someCountry';
            country.value = country.innerText = key;
            this.countries.appendChild(country);
            this.countries.value = '';
        }
    }

    static loadCities(countries, selectedCountry) {
        countries[selectedCountry].forEach(el => {
            let city = document.createElement('option');
            city.className = 'someCity';
            city.value = city.innerText = el;
            this.cities.appendChild(city);
            this.cities.value = '';
        });
    }

    static clearCities() {
        while (this.cities.children.length > 0) {
            this.cities.children[0].remove();
        }
    }
}

export class Check {
    static check() {
        let inputs = document.getElementsByTagName('input');
        let resultCheck = true;
        for (let i = 0; i < inputs.length; ++i) {
            if (!inputs[i].reportValidity()) {
                inputs[i].style.border = '3px solid red';
                resultCheck = false;
            } else {
                inputs[i].style.border = '1px solid gray';
            }
        }
        return resultCheck;
    }
}

export class Results {
    static genData(user) {
        this.clearData();
        let results = document.getElementById('results');
        let table = document.createElement('table');
        table.className = 'resultTable';
        results.appendChild(table);
        for (let key in user) {
            if (user.hasOwnProperty(key)) {
                let tr = document.createElement('tr');
                table.appendChild(tr);
                let tdLabel = document.createElement('td');
                tdLabel.innerText = key;
                tr.appendChild(tdLabel);
                let tdData = document.createElement('td');
                tdData.innerText = user[key];
                tr.appendChild(tdData);
            }
        }
        results.style.display = 'block';
    }

    static clearData() {
        let elements = document.getElementsByClassName('resultTable');
        while (elements.length > 0) {
            elements[0].remove();
        }
    }
}