import { Component, OnInit } from '@angular/core';
import {UserSocial} from '../interfaces/user-social'

@Component({
  selector: 'app-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss']
})
export class UserSocialComponent implements OnInit {
  links: UserSocial = {
    facebook: 'https://www.facebook.com/paskal1983/',
    In: 'https://www.linkedin.com/in/paskal-paskal-64494137/',
    github: 'https://github.com/Paskalik/'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
