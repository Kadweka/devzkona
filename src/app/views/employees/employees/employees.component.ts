import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
activeLinkIndex = -1;
  navLinks = [
    {
      label:"Employees",
      link: './list',
      index: 0
    },
    {
      label:"Employee Contracts",
      link: './contracts',
      index: 1
    },
    {
      label:"Salary Structures",
      link: './salary-structures',
      index: 2
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      // @ts-ignore
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
    // this.setTitleService.setTitle('Finance');
  }

}


