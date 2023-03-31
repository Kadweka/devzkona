import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCardComponent } from 'src/app/shared/widgets/card-user/user-card.component';
import { ProfileComponent } from '../profile/profile.component';
import { UsersComponent } from '../users/users.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  activeLinkIndex = -1;
  navLinks = [
    {
      label:"My Profile",
      link: './profle',
      index: 0
    },
    {
      label:"Users",
      link: './system-users',
      index: 1
    },
    {
      label:"Departments",
      link: './departments',
      index: 2
    },
    {
      label:"Product Category",
      link: './product-categories',
      index: 3
    },
    {
      label:"Products",
      link: './products',
      index: 4
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