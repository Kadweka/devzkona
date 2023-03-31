import { Component, OnInit } from '@angular/core';
import {ITableColumnInterface, ITableRowActions} from '../../../shared/interfaces/table-interface';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import {AddTaxesComponent} from '../_modals/add-taxes/add-taxes.component';
import { AccountingService } from 'src/app/core/services/accounting.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-journal-items',
  templateUrl: './journal-items.component.html',
  styleUrls: ['./journal-items.component.scss']
})
export class JournalItemsComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any [] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountingService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getJournalItems()
  }
  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'DATE',
        dataKey: 'date',
        position: 'left',
        isSortable: true,
        searchKey: 'DATE',
      },
      {
        name: 'JOURNAL ENTRY',
        dataKey: 'name',
        position: 'center',
        isSortable: true,
        searchKey: 'NUMBER'
      },
      {
        name: 'ACCOUNT',
        dataKey: 'account',
        position: 'center',
        isSortable: true,
        searchKey: 'ACCOUNT'
      },
      {
        name: 'PARTNER',
        dataKey: 'partner',
        position: 'left',
        isSortable: true,
        searchKey: 'PARTNER',
      },
      {
        name: 'DEBIT',
        dataKey: 'debit',
        position: 'left',
        isSortable: true,
        units: 'currency',
        searchKey: 'TOTAL'
      },
      {
        name: 'CREDIT',
        dataKey: 'credit',
        position: 'left',
        isSortable: true,
        units: 'currency',
        searchKey: 'TOTAL'
      },
      {
        name: 'ACTIONS',
        dataKey: 'actions',
        position: 'left',
        isSortable: false,
      }
    ];
  }
  onPageChange(data: any): any {
    this.page = data?.pageIndex + 1;
    this.pageSize = data?.pageSize;
  }
  doTableActions(action: ITableRowActions): void {
    if (action.action === 'View') {
      this.router.navigate([`/member/member-details/${action.element.code}`]);
    }
  }
  goToDetails(event: any): any {
    this.router.navigate([`/home/file-details/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
    // this.generalTableDataArray = this.tableSortService.sortData(
    //   sortParameters,
    //   this.generalTableDataArray
    // );
  }
  getJournalItems(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData=false
        // @ts-ignore
    this.accountService.getJournalItems(payload).subscribe(res=>{
      if(res.result.code==200){
        this.generalTableDataArray = res.result.journal_items;
        this.totalElements=res.result.total_items
        this.totalLength=res.result.total_items
        this.isLoadingTableData = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.isLoadingTableData = false;
      }
    })
  }
  reload(){
    this.getJournalItems()
  }
  }
