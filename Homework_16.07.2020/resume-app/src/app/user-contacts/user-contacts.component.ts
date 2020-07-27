import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-contacts',
  templateUrl: './user-contacts.component.html',
  styleUrls: ['./user-contacts.component.scss']
})
export class UserContactsComponent implements OnInit {

  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  email: string;
  city: string;

  constructor() { }

  ngOnInit(): void {
    this.surname = 'Паскал';
    this.name = 'Андрей';
    this.patronymic = 'Константинович';
    this.phone = '0989999999';
    this.email = 'Paskalik1983@gmail.com';
    this.city = 'Dnipro';
  }

}
