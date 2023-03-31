import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SummaryCardInterface } from '../../interfaces/summary-card-interface';

@Component({
  selector: 'app-card-summary',
  templateUrl: './card-summary.component.html',
  styleUrls: ['./card-summary.component.scss'],
})
export class CardSummaryComponent implements OnInit, OnChanges {
  @Input() summaryCardData: SummaryCardInterface;
  @Input() isCurrency = false;
  @Input() isLitres = false;
  @Input() isNumber = false;
  @Input() isNumberExtra = false;

  constructor() {}

  ngOnChanges(changes) {
    // console.log('Changed', changes.isCurrency.currentValue, changes.isCurrency.previousValue);
  }

  ngOnInit() {}
}
