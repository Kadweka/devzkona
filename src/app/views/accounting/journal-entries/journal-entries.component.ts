import { Component, OnInit } from '@angular/core';
import {ITableColumnInterface, ITableRowActions} from '../../../shared/interfaces/table-interface';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import {AddTaxesComponent} from '../_modals/add-taxes/add-taxes.component';
import { AccountingService } from 'src/app/core/services/accounting.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.scss']
})
export class JournalEntriesComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any [] = [
  ];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private accountService: AccountingService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getEntries()
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
        name: 'NUMBER',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
        searchKey: 'NUMBER'
      },
      {
        name: 'TYPE',
        dataKey: 'type',
        position: 'left',
        isSortable: true,
        searchKey: 'TYPE'
      },
      {
        name: 'CUSTOMER',
        dataKey: 'partner',
        position: 'left',
        isSortable: true,
        searchKey: 'PARTNER',
      },
      {
        name: 'TOTAL',
        dataKey: 'amount',
        position: 'left',
        isSortable: true,
        units: 'currency',
        searchKey: 'TOTAL'
      },
      {
        name: 'PAID',
        dataKey: 'paid',
        position: 'left',
        isSortable: true,
        units: 'currency',
        searchKey: 'PAID'
      },
      {
        name: 'BALANCE',
        dataKey: 'balance',
        position: 'left',
        isSortable: true,
        units: 'currency',
        searchKey: 'balance'
      },
      // {
      //   name: 'PAYMENT STATUS',
      //   dataKey: 'pay_state',
      //   position: 'left',
      //   isSortable: true,
      //   searchKey: 'STATUS'
      // },
      {
        name: 'STATUS',
        dataKey: 'state',
        position: 'left',
        isSortable: true,
        searchKey: 'STATE'
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
getEntries(){
  const payload = {
    limit: 10,
    offset: 0,
    move_type:["out_invoice","in_invoice"],
    name:"",
    token: localStorage.getItem('access_token')
  };
  this.isLoadingTableData=false
      // @ts-ignore
  this.accountService.getJournalEntries(payload).subscribe(res=>{
    if(res.result.code==200){
      this.generalTableDataArray = res.result.journal_entries;
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
  this.getEntries()
}
}
