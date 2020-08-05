import { Component, OnInit } from '@angular/core';
import {userInfo} from '../interfaces/user-info';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.scss']
})
export class UserContactsComponent implements OnInit {

  userInfo: userInfo = {
    surname: 'Pascal',
    name: 'Andrey',
    phone: '0989999999',
    email: 'Paskalik1983@gmail.com',
    city: 'Dnipro'
  };

  constructor() { }

  ngOnInit(): void { }

}
