import {Results} from "./domBuilder.js";

export class User {
    constructor() {
        this.firstname = document.getElementById('fName').value;
        this.lastname = document.getElementById('lName').value;
        this.birthday = document.getElementById('birth').value;
        let genderVal = document.getElementsByName('gender');
        for (let i = 0; i < genderVal.length; ++i) {
            if (genderVal[i].checked) {
                this.gender = genderVal[i].value;
                break
            }
        }
        this.Country = document.getElementById('country').value;
        this.City = document.getElementById('city').value;
        let checkboxes = document.getElementsByName('skills');
        this.Skills = '';
        for (let i = 0; i < checkboxes.length; ++i) {
            if (checkboxes[i].checked) {
                this.Skills += `${checkboxes[i].value} `;
            }

        }
        this.Skills = this.Skills.trim();
        this.Skills = this.Skills.replace(/\s/g, ', ');
    }

    print() {
        Results.genData(this);
    }
}