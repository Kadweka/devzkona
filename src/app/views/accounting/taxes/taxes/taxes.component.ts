import { Component, OnInit } from '@angular/core';
import {ITableColumnInterface, ITableRowActions} from '../../../../shared/interfaces/table-interface';
import {Router} from '@angular/router';
import {Sort} from '@angular/material/sort';
import {AddJournalComponent} from '../../_modals/add-journal/add-journal.component';
import {AddTaxesComponent} from '../../_modals/add-taxes/add-taxes.component';
import {MatDialog} from '@angular/material/dialog';
import {AccountingService} from '../../../../core/services/accounting.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
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
    this.getTaxes();
  }
  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'NAME',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
        searchKey: 'NAME',
      },
      {
        name: 'TYPE',
        dataKey: 'type_tax_use',
        position: 'left',
        isSortable: true,
        searchKey: 'TYPE',
      },
      {
        name: 'VALUE %',
        dataKey: 'amount',
        position: 'left',
        isSortable: true,
        searchKey: 'VALUE'
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
  addItem(event: any): any{
    const dialogRef = this.dialog.open(AddTaxesComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        this.getTaxes();
      }
    });
  }
  // tslint:disable-next-line:typedef
  getTaxes(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.accountService.getTaxes(payload).subscribe(res => {
     if(res.result.code==200){
        this.generalTableDataArray = res.result.taxes;
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
  this.getTaxes()
}
}
