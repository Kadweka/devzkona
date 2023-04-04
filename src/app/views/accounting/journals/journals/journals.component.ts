import { Component, OnInit } from '@angular/core';
import {ITableColumnInterface, ITableRowActions} from '../../../../shared/interfaces/table-interface';
import {Router} from '@angular/router';
import {Sort} from '@angular/material/sort';
import {AddJournalComponent} from '../../_modals/add-journal/add-journal.component';
import {MatDialog} from "@angular/material/dialog";
import {AccountingService} from "../../../../core/services/accounting.service";
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {
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
    this.getJournals();
  }
  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'SHORT CODE',
        dataKey: 'code',
        position: 'left',
        isSortable: true,
        searchKey: 'MOBILE'
      },
      {
        name: 'JOURNAL NAME',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
        searchKey: 'NAME',
      },
      {
        name: 'TYPE',
        dataKey: 'type',
        position: 'left',
        isSortable: true,
        searchKey: 'EMAIL',
      },
      // {
      //   name: 'CURRENCY',
      //   dataKey: 'currency_id',
      //   position: 'left',
      //   isSortable: true,
      //   searchKey: 'CURRENCY'
      // },
      // {
      //   name: 'DEFAULT ACCOUNT',
      //   dataKey: 'default_account',
      //   position: 'left',
      //   isSortable: true,
      //   searchKey: 'COUNTRY'
      // },
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
addItem(event: any): any{
  console.log(event, 'TESTING THE DIALOG!!!!!!!1');
  const dialogRef = this.dialog.open(AddJournalComponent, {
    panelClass: 'dialogClass',
    data: event,
  });
  dialogRef.afterClosed().subscribe(({reload, data}) => {
    if (reload) {
      this.getJournals();
    }
  });
}

  // tslint:disable-next-line:typedef
  getJournals(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.accountService.getJournals(payload).subscribe(res => {
      if(res.result.code==200){
        this.generalTableDataArray = res.result.journals;
        this.totalElements=res.result.total_items
        this.totalLength=res.result.total_items
        this.isLoadingTableData = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.isLoadingTableData = false;
      }
    });
  }
  reload(){
    this.getJournals()
  }
}
