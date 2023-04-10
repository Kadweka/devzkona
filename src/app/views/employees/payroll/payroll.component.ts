import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import {
  ITableColumnInterface,
  ITableRowActions,
} from 'src/app/shared/interfaces/table-interface';
import { RunningPayrollCenterComponent } from '../_modals/running-payroll-center/running-payroll-center.component';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
})
export class PayrollComponent {
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeColumns();
    this.get_batch();
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
        name: 'DATE FROM',
        dataKey: 'from',
        position: 'left',
        units: 'date',
        isSortable: true,
        searchKey: 'DATE FROM',
      },
      {
        name: 'DATE TO',
        dataKey: 'to',
        position: 'left',
        units: 'date',
        isSortable: true,
        searchKey: 'DATE TO',
      },
      {
        name: 'STATUS',
        dataKey: 'status',
        position: 'left',
        isSortable: true,
        searchKey: 'STATUS',
      },
    ];
  }

  onPageChange(data: any): any {
    this.page = data?.pageIndex + 1;
    this.pageSize = data?.pageSize;
  }

  doTableActions(action: ITableRowActions): void {
  }

  goToDetails(event: any): any {
    this.router.navigate([`/employees/calculate-payslips/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {}
  // tslint:disable-next-line:typedef
  get_batch() {
    const payload = {
      limit: 10,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token'),
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.employeeService.get_batch(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.generalTableDataArray = res.result.bacthes;
        this.totalElements = res.result.total_items;
        this.totalLength = res.result.total_items;
        this.isLoadingTableData = false;
      } else {
        this.toastr.showWarning(res.result.Message, 'SOMETHING IS WRONG');
        this.isLoadingTableData = false;
      }
    });
  }
  reload() {
    this.get_batch();
  }
  addItem(event: any): any {
    const dialogRef = this.dialog.open(RunningPayrollCenterComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({ reload, data }) => {
      if (reload) {
        this.get_batch();
      }
    });
  }
}
