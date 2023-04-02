import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-tabs',
  templateUrl: './employee-tabs.component.html',
  styleUrls: ['./employee-tabs.component.scss']
})
export class EmployeeTabsComponent {
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
    },
    {
      label:"Payroll & Payslips",
      link: './payroll',
      index: 3
    },
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