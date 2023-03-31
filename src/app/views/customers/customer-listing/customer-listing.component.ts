import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions} from 'src/app/shared/interfaces/table-interface';
import {CustomersService} from '../../../core/services/customers.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})

export class CustomerListingComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = [];
  constructor(
    private router: Router,
    private customerService: CustomersService,
        private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.getfiles();
    this.initializeColumns();
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
        name: 'EMAIL',
        dataKey: 'email',
        position: 'left',
        isSortable: true,
        searchKey: 'EMAIL',
      },
      {
        name: 'PHONE',
        dataKey: 'phone',
        position: 'center',
        isSortable: true,
        searchKey: 'PHONE'
      },
      {
        name: 'TYPE',
        dataKey: 'company_type',
        position: 'left',
        isSortable: true,
        searchKey: 'TYPE'
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
    this.router.navigate([`/customers/customer-details/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
    // this.generalTableDataArray = this.tableSortService.sortData(
    //   sortParameters,
    //   this.generalTableDataArray
    // );
  }
  getfiles(): void{
    const payload = {
      limit: 10,
      offset: 0,
      name:'',
      token:  localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.customerService.getCustomers(payload).subscribe(res => {
      if(res.result.code==200){
        this.generalTableDataArray = res.result.customers;
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
    this.getfiles()
  }
}
