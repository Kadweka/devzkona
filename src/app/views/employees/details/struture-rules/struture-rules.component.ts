import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface } from 'src/app/shared/interfaces/table-interface';
import { UserCardInterface } from 'src/app/shared/interfaces/user-card-interface';

@Component({
  selector: 'app-struture-rules',
  templateUrl: './struture-rules.component.html',
  styleUrls: ['./struture-rules.component.scss'],
})
export class StrutureRulesComponent {
  isLoading = false;
  structureCode: any;
  currency: any;
  structureData: any;
  generalTableColumns: ITableColumnInterface[] = [];
  userCardData!: UserCardInterface;
  isLoadingTableData = false;
  generalTableDataArray: any[] = [];
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService,
    private toastr: ToasterService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.structureCode = params.id;
    });
  }

  ngOnInit(): void {
    this.userCardData = {
      id: 'Employee ID: Sample ID',
      institution: '',
      location: 'Sample',
      name: 'Sample Name',
      email: 'example@gmail.com',
      phone: '',
    };
    this.initializeColumns();
    this.getStructure();
    this.currency = localStorage.getItem('currency');
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
        name: 'CODE',
        dataKey: 'code',
        position: 'left',
        isSortable: true,
        searchKey: 'CODE',
      },
      {
        name: 'MOBILE',
        dataKey: 'category_id',
        position: 'left',
        isSortable: true,
        searchKey: 'MOBILE'
      },
      {
        name: 'ACTIONS',
        dataKey: 'actions',
        position: 'left',
        isSortable: false,
      }
    ];
  }
  getStructure() {
    const payload = {
      limit: 10,
      offset: 0,
      structure_id: this.structureCode,
      token: localStorage.getItem('access_token'),
    };
    this.isLoading = true;
    // @ts-ignore
    this.employeeService.getStructureDetails(payload).subscribe((res) => {
      if (res.result.code == 200) {
        this.userCardData = {
          id: 'Employee ID: BASE',
          institution: '',
          location: res.result.information.country,
          name: res.result.information.name,
          email: res.result.information.employee_email,
          phone: res.result.information.employee_phone,
        };
        this.structureData = res.result.information;
        this.generalTableDataArray=res.result.rules
        this.isLoading = false;
      } else {
        this.toastr.showWarning(res.result.Message, 'SOMETHING IS WRONG');
        this.isLoading = false;
      }
    });
  }
  sortData(sortParameters: Sort): any {
  }
    onPageChange(data: any): any {
    this.page = data?.pageIndex + 1;
    this.pageSize = data?.pageSize;
  }
}
