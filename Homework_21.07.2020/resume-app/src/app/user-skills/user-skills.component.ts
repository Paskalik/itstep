import { Component, OnInit } from '@angular/core';
import { Skills } from "../interfaces/skills";

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss']
})
export class UserSkillsComponent implements OnInit {
  skills: Skills = {
    skill:
    [
      'Experienced user of MS Office, MS Project, Jira',
      'Experience in testing web / net applications',
      'Integration, functional, Regress, Isolated testing of SOAP services, UAT',
      'Writing TRD: test-case, bug-report',
      'HTML/CSS (basic level)'
    ],
    language: [
      'Ukrainian and Russian (native)',
      'English (intermediate)'
    ],
    knowledge: [
      'Knowledge of the methodology and principles of testing;',
      'Knowledge of the basics of the DBMS (writing sql-queries)'

]
  }


  constructor() { }

  ngOnInit(): void {
  }

}
