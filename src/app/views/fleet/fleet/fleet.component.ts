import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  activeLinkIndex = -1;
  navLinks = [
    {
      label:"Vehicles",
      link: './list',
      index: 0
    },
    {
      label:"Manufacturers",
      link: './manufacturer',
      index: 1
    },
    {
      label:"Models",
      link: './models',
      index: 2
    },
    {
      label:"Services",
      link: './services',
      index: 3
    },
    {
      label:"Service Types",
      link: './service-types',
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