import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions, ITableSearchFiltersInterface } from 'src/app/shared/interfaces/table-interface';
import { TableColumnInterface } from 'src/app/shared/interfaces/table-interfaces';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss']
})
export class EmployeeListingComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeesService,
        private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getEmployees();
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
        dataKey: 'work_email',
        position: 'left',
        isSortable: true,
        searchKey: 'EMAIL',
      },
      {
        name: 'MOBILE',
        dataKey: 'work_phone',
        position: 'left',
        isSortable: true,
        searchKey: 'MOBILE'
      },
      {
        name: 'DEPARTMENT',
        dataKey: 'department',
        position: 'left',
        isSortable: true,
        searchKey: 'DEPARTMENT'
      },
      {
        name: 'MANAGER',
        dataKey: 'manager',
        position: 'left',
        isSortable: true,
        searchKey: 'MANAGER'
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
    this.router.navigate([`/employees/employee-details/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
  }
  // tslint:disable-next-line:typedef
  getEmployees(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.employeeService.getEmployees(payload).subscribe(res => {
     if(res.result.code==200){
        this.generalTableDataArray = res.result.employee;
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
    this.getEmployees()
  }
}
