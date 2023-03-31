import {Component, OnInit, ViewChild} from '@angular/core';
import {TaxesComponent} from '../taxes/taxes/taxes.component';
import {JournalsComponent} from '../journals/journals/journals.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {JournalEntriesComponent} from '../journal-entries/journal-entries.component';
import {JournalItemsComponent} from '../journal-items/journal-items.component';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {
  activeLinkIndex = -1;
  navLinks = [
    {
      label:"Journals",
      link: './journal',
      index: 0
    },
    {
      label:"Charts Of Account",
      link: './chart-of-accounts',
      index: 1
    },
    {
      label:"Taxes",
      link: './taxes',
      index: 2
    },
    {
      label:"Invoices",
      link: './invoices',
      index: 3
    },
    {
      label:"Bills",
      link: './bills',
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

