import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
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
    this.getContracts();
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
        name: 'EMPPLOYEE',
        dataKey: 'employee_id',
        position: 'left',
        isSortable: true,
        searchKey: 'EMAIL',
      },
      {
        name: 'START DATE',
        dataKey: 'date_start',
        position: 'left',
        isSortable: true,
        searchKey: 'START DATE'
      },
      {
        name: 'END DATE',
        dataKey: 'date_start',
        position: 'left',
        isSortable: true,
        searchKey: 'START DATE'
      },
      {
        name: 'CONTRACT TYPE',
        dataKey: 'contract_type_id',
        position: 'left',
        isSortable: true,
        searchKey: 'CONTRACT TYPE'
      },
      {
        name: 'STATE',
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
    this.router.navigate([`/employees/employee-details/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
  }
  // tslint:disable-next-line:typedef
  getContracts(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.employeeService.getContracts(payload).subscribe(res => {

    if(res.result.code==200){
        this.generalTableDataArray = res.result.contracts;
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
    this.getContracts()
  }
}
