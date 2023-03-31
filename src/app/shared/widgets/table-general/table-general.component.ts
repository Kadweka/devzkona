import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {ITableColumnInterface, ITableRowActions, ITableSearchFiltersInterface} from '../../interfaces/table-interface';
import {ActivatedRoute, Router} from "@angular/router";
import { rowsAnimation } from 'src/app/core/animations/row-animations.animations';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss'],
  animations: [rowsAnimation]
})
export class TableGeneralComponent implements OnInit, AfterViewInit, OnChanges {

  cardData: any[] = [];
  tableDataArray: any[] = [];
  public tableDataSource = new MatTableDataSource<any>([]);
  public displayedColumns!: string[];

  pageSize = 10;
  currentPageBehaviourSubject = new BehaviorSubject<number>(0);
  @ViewChild(MatPaginator)
  matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  @Input() tableTitle!: string;
  @Input() tableFilters!: ITableSearchFiltersInterface[];
  @Input() hasStatusFilter = true;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() hasSearch = true;
  @Input() tableColumns!: ITableColumnInterface[];
  @Input() currentPage = 0;
  @Input() paginationSizes: number[] = [10, 50, 100];
  @Input() totalLength!: number;
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() pageRouterLink!: string;
  @Input() statusFilters: any[] = [];
  @Input() buttonRouterLink!: string;
  @Input() hasNoLink = true;
  @Input() hasButton = false;
  @Input() isLoading = false;
  @Input() hideEmptyMessage = false;
  @Input() tableActions: string[] = [];
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() tableRowActions: EventEmitter<any> = new EventEmitter<any>();
  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    if (data) {
      this.cardData = data;
      this.tableDataArray = data;
      this.setTableDataSource(data);
    }
  }

  selection = new SelectionModel<any>(true, []);
  selectedFilter!: string;
  searchText = '';
  activateSearch = true;
  searched = false;
  selectedFiltersFromURL: any[] = [];
    @Output() searchAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() historyAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() statusAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() statusFilterAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChangedAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() openSearch: EventEmitter<any> = new EventEmitter<any>();

  redItems = ['INACTIVE', 'REJECTED', 'EXPIRED', 'ERROR', 'DEACTIVATED', 'FALSE'];
  greenItems = ['ACTIVE', 'APPROVED', 'PROCESSED', 'TRUE'];
  orangeItems = ['PENDING', 'UNAVAILABLE'];
  removeActionButtonOn: any[] = ['CLOSED', 'RECONCILED', 'PAID', 'REJECTED', 'APPROVED'];

  constructor(
    public datePipe: DatePipe,
    public currencyPipe: CurrencyPipe,
    public decimalPipe: DecimalPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    activatedRoute.queryParams.subscribe(
      res => {
        const arr: any = [];
        Object.keys(res).map((key) => {
          arr.push(
            {
              name: [key][0],
              value: res[key]
            });
          return arr;
        });
        this.selectedFiltersFromURL = arr;
      }
    );
  }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((tableColumn: ITableColumnInterface) => tableColumn.name);
    // setTimeout(() => this.tableDataSource.paginator = this.matPaginator);
  }

  // we need this, in order to make pagination work with *ngIf


  ngAfterViewInit(): void {
    // this.tableDataSource.paginator = this.matPaginator;
  }

  ngOnChanges(): void {
    if (this.tableDataArray) {
      this.cardData = this.tableDataArray;
      this.setTableDataSource(this.tableDataArray);
    }
  }

  setTableDataSource(data: any): void {
    this.tableDataSource = new MatTableDataSource<any>(data);
    // this.tableDataSource.paginator = this.matPaginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): void {
    // defining name of data property, to sort by, instead of column name
    // @ts-ignore
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active).dataKey;
    this.sort.emit(sortParameters);
    if (this.tableDataArray.length > 0) {
      this.cardData = this.tableDataArray;
      this.setTableDataSource(this.tableDataArray);
    }
  }

  emitRowAction(row: any): any {
    this.rowAction.emit(row);
    // this.dataService.cacheUser(row);
  }

  emitTableAction(action: ITableRowActions): any {
    this.tableRowActions.emit(action);
  }

  checkString(val: any): boolean {
    return typeof val === 'string';
  }

  onFilterSelect(): any {
    this.activateSearch = false;
  }

  handleSubmit(e: any): void {
    e.preventDefault();
    const data = {
      filter: this.selectedFilter,
      search: this.searchText
    };
    this.searchAction.emit(data);
  }

  openSearchEmitter(e: any): void {
    this.openSearch.emit();
  }

  handleKeyUp(e: KeyboardEvent): void {
    // e.keyCode === 13
    if (e.key === 'Enter') {
      this.searched = true;
      // this.handleSubmit(e);
      const data = {
        filter: this.selectedFilter,
        search: this.searchText
      };
      this.searchAction.emit(data);
    }
  }

  search(): any {
    if (!!this.selectedFilter) {
      this.searched = true;
      const data = {
        filter: this.selectedFilter,
        search: this.searchText
      };
      this.searchAction.emit(data);
    }
  }

  clearSearchHistory(): any {
    const data = {
      filter: this.selectedFilter,
      search: this.searchText
    };
    this.searched = false;
    this.activateSearch = true;
    this.selectedFilter = '';
    this.searchText = '';
    this.clearSearch.emit(data);
  }

  pageChanged(event: PageEvent): void {
    this.pageChangedAction.emit(event);

    const pageFilter: any = {
      page: this.currentPage,
      pageSize: event.pageSize
    };
  }

  checkStatus(element: any): string {
    for (const status of this.redItems) {
      if (element.status === status) {
        return 'red';
      }
    }
    for (const status of this.greenItems) {
      if (element.status === status) {
        return 'green';
      }
    }
    for (const status of this.orangeItems) {
      if (element.status === status) {
        return 'orange';
      }
    }
    return 'green';
  }

  checkIfActionButtonShouldBeRemoved(element: any): boolean {
    for (const status of this.removeActionButtonOn) {
      if (element.status === status) {
        return true;
      }
    }
    return false;
  }

  removeChip(item: any): void {
    const index = this.selectedFiltersFromURL.indexOf(item);

    if (index >= 0) {
      const deletedParam = this.selectedFiltersFromURL[index].name;
      this.selectedFiltersFromURL.splice(index, 1);
      const snapshot = this.activatedRoute.snapshot;
      const params = {...snapshot.queryParams};
      delete params[deletedParam];
      this.router.navigate([], {queryParams: params});
      this.clearSearch.emit();
    }
  }

  reloadTable(): void {
    this.setTableDataSource([]);
    // this.table.renderRows();
    this.changeDetectorRefs.detectChanges();
  }

  renderTableRows(): void {
    this.table.renderRows();
  }
}
