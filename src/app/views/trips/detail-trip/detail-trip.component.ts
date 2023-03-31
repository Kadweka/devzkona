import { Component, OnInit } from '@angular/core';
import { UserCardInterface } from "../../../shared/interfaces/user-card-interface";
import { ActivatedRoute } from "@angular/router";
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ITableColumnInterface, ITableRowActions, ITableSearchFiltersInterface } from 'src/app/shared/interfaces/table-interface';
import { TableColumnInterface } from 'src/app/shared/interfaces/table-interfaces';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const obj = {
  national_id: "378118888",
  address: "Ngong Road",
  dob: "2023-07-01",
  gender: "Male",
  registration_date: "2023-07-01",
  nssf: "NSF4774",
  nhif: "NHIF881",
  kra_pin: "KRA001367",
  huduma_number: "0137781",
  department_name: "TECHNICAL",
  job_title: "DEVELOPER",
}

@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.scss']
})

export class DetailTripComponent implements OnInit {
  isLoading = false;
  employeeCode: any;
  employeeData: any = obj;
  userCardData!: UserCardInterface;
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = [
    { id: 1, servicetype: 'Internal', description: 'Administrator', vendor: 'John Doe', cost: 'John Doe', date: 'John Doe', odometer: 'John Doe' },
    { id: 2, servicetype: 'Internal', description: 'Administrator', vendor: 'John Doe', cost: 'John Doe', date: 'John Doe', odometer: 'John Doe' },
    { id: 3, servicetype: 'Internal', description: 'Administrator', vendor: 'John Doe', cost: 'John Doe', date: 'John Doe', odometer: 'John Doe' },

  ]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,


  ) {

    this.activatedRoute.params.subscribe(params => {
      this.employeeCode = params.id;
    });

  }

  ngOnInit(): void {

    this.initializeColumns();

    this.userCardData = {
      id: 'Vehicle Plate',
      institution: '',
      location: 'Sample',
      name: 'Sample Name',
      email: 'example@gmail.com',
      phone: '',
    };


  }

  initializeColumns(): void {
    this.generalTableColumns = [

      {
        name: 'SERVICE TYPE',
        dataKey: 'servicetype',
        position: 'left',
        isSortable: true,
        searchKey: 'SERVICE TYPE',
      },
      {
        name: 'DESCRIPTION',
        dataKey: 'description',
        position: 'left',
        isSortable: true,
        searchKey: 'DESCRIPTION'
      },
      {
        name: 'VENDOR',
        dataKey: 'vendor',
        position: 'left',
        isSortable: true,
        searchKey: 'VENDOR'
      },
      {
        name: 'COST',
        dataKey: 'cost',
        position: 'left',
        isSortable: true,
        searchKey: 'COST'
      },
      {
        name: 'DATE',
        dataKey: 'date',
        position: 'left',
        isSortable: true,
        searchKey: 'DATE'
      },
      {
        name: 'ODOMETER',
        dataKey: 'odometer',
        position: 'left',
        isSortable: true,
        searchKey: 'ODOMETER'
      },
      {
        name: 'ACTIONS',
        dataKey: 'actions',
        position: 'left',
        isSortable: false,
      }
    ]
  }

  onPageChange(data: any): any {
    this.page = data?.pageIndex + 1;
    this.pageSize = data?.pageSize;
  }

  sortData(sortParameters: Sort): any {
  }

}
