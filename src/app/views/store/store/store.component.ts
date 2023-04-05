import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {
  activeLinkIndex = -1;
  navLinks = [
    {
      label:"Products",
      link: './products',
      index: 0
    },
    {
      label:"Categories",
      link: './categories',
      index: 1
    },
    // {
    //   label:"Departments",
    //   link: './categories',
    //   index: 2
    // }
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