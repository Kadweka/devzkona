import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {SummaryDetailsInterface} from '../../interfaces/summary-details-interface';

@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss'],
})
export class SummaryDetailsComponent implements OnInit, OnChanges {
  @Input() LHSSummaryData: SummaryDetailsInterface[];
  @Input() RHSSummaryData: SummaryDetailsInterface[];
  @Input() dataSource: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.mapSummaryDetails(this.dataSource);
    }
  }

  private mapSummaryDetails(data: any): void {
    this.LHSSummaryData = this.LHSSummaryData.map((summary) => ({
      ...summary,
      value: data[summary.dataKey] || summary.defaultValue,
    }));
    this.RHSSummaryData = this.RHSSummaryData.map((summary) => ({
      ...summary,
      value: data[summary.dataKey] || summary.defaultValue,
    }));
  }

  getBackgroundColor(tag?: any, tagColors?: any): null | any {
    if (!tag || !Array.isArray(tagColors)) {
      return null;
    }
    return (
      tagColors.filter((tagColor) => tagColor.tag === tag)[0]?.color || null
    );
  }
}
