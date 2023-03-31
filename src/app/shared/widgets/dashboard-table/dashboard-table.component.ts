import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DoCheck,
  EventEmitter,
  Input, IterableDiffers, OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {TableColumnInterface} from '../../interfaces/table-interfaces';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {rowsAnimation} from '../../../core/animations/row-animation.animations';
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
  animations: [rowsAnimation]
})

export class DashboardTableComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {

  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];
  @ViewChild(MatPaginator, {static: false}) matPaginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort: MatSort;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumnInterface[];
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() isCurrency = false;

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  cardData = [];
  changedTableData = [];

  // this property needs to have a setter, to dynamically get changes from parent component
  private iterableDiffer: any;

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
    this.changedTableData = data;
  }

  ngDoCheck(): any {
    const changes = this.iterableDiffer.diff(this.tableData);
    if (changes) {
      console.log('Changes detected!');
    }
  }

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((tableColumn: TableColumnInterface) => tableColumn.name);
  }

  // we need this, in order to make pagination work with *ngIf

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.matPaginator;
    this.changeDetectorRefs.detectChanges();
  }


  setTableDataSource(data: any): any {
    this.cardData = data;
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): any {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any): any {
    this.rowAction.emit(row);
  }

  ngOnChanges(changes: SimpleChanges): any {
    this.setTableDataSource(this.changedTableData);
    console.log('------------------changes');
    // changes.prop contains the old and the new value...
  }


}
