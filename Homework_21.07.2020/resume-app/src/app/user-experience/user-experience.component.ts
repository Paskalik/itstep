import { Component, OnInit } from '@angular/core';
import {ExperienceDetail} from "../interfaces/experience-detail";

@Component({
  selector: 'app-user-experience',
  templateUrl: './user-experience.component.html',
  styleUrls: ['./user-experience.component.scss']
})
export class UserExperienceComponent implements OnInit {

  userExperience: Array<ExperienceDetail> = [
    {
      dateFrom: 'July 2020',
      dateTo: 'present',
      position: 'QA',
      organization: 'Haymarket',
      city: 'New York',
      type: 'IT',
      duties: ['Testing sites']
    },
    {
      dateFrom: 'July 2018',
      dateTo: 'April 2020',
      position: 'QA',
      organization: 'Reliability Technologies',
      city: 'Dnipro',
      type: 'IT',
      duties: [
        '•Control and implementation of testing: unit testing, integration testing, acceptance testing, support for BAT testing, regression testing;',
        '•Analysis, verification of requirements and technical documentation;',
        '•Writing and verifying test documentation: test plans, test cases, bug reports, test reports;',
        '•Writing sql-scripts needed for testing;',
        '•Testing of oracle procedures and functions;',
        '•Testing of SOAP-services with SoapUI;',
        '•Testing of API-services with Insomnia;',
        '•Using Fiddler to collect debugging information when testing web and net-applications'
      ]
    },
    {
      dateFrom: 'April 2013',
      dateTo: 'June 2018',
      position: 'Head of Test Automation and Not-Release Tasks Group',
      organization: 'HomeR Software House',
      city: 'Dnipro',
      type: 'IT',
      duties: [
        '•Organization of the work of employees;',
        '•Writing process plan of test automation and test report for non-release tasks;',
        '•Control quality of testing tasks and document analysis;',
        '•Control speed and quality of testing bugs in accordance with their priorities  and urgency;',
        '•The distribution of current (non-release) tasks and assigned for playback bugs (UAT/Integration/Production extemal);',
        '•Collection of the final quarterly/annual statistics based on data from JIRA;',
        '•Writing sql-scripts needed for testing;',
        '•Testing of SOAP-services with SoapUI;',
        '•Using Fiddler to collect debugging information when testing web and net-applications;',
        '•Organization of product patches: creating the list of patch tasks, monitoring the preparation of the final distribution of the patch, transferring the final patch distribution to the appropriate units'
        ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
