import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import { AddDepartmentComponent } from '../_modals/add-department/add-department.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
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
    private employeeService: EmployeesService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getDepartments();
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
        name: 'MANAGER',
        dataKey: 'manager',
        position: 'left',
        isSortable: true,
        searchKey: 'MANAGER',
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
  createDepartment(event: any): any{
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        this.getDepartments();
      }
    });
  }
  getDepartments(){
    const payload = {
      limit: 10,
      name:"",
      offset: 0,
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.employeeService.getDepartments(payload).subscribe(res => {
      if(res.result.code==200){
        this.generalTableDataArray = res.result.departments;
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
    this.getDepartments()
  }
}
