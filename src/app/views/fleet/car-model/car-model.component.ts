import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import {FleetService} from '../../../core/services/fleet.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss']
})
export class CarModelComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = [];

  constructor(
    private router: Router,
    private fleetService: FleetService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getModels();
  }

  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'NAME',
        dataKey: 'name',
        position: 'left',
        isSortable: true,
        searchKey: 'REFERENCE FILE',
      },
      {
        name: 'BRAND',
        dataKey: 'brand',
        position: 'left',
        isSortable: true,
        searchKey: 'CLIENT',
      },
      {
        name: 'TYPE',
        dataKey: 'type',
        position: 'left',
        isSortable: true,
        searchKey: 'CLIENT',
      },
      // {
      //   name: 'DRIVER',
      //   dataKey: 'driver',
      //   position: 'left',
      //   isSortable: true,
      //   searchKey: 'TRANSPORT TYPE'
      // },
      // {
      //   name: 'ODOMETER',
      //   dataKey: 'odometre',
      //   position: 'left',
      //   isSortable: true,
      //   searchKey: 'DRIVER'
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
    this.router.navigate([`/trips/details-trip/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
  }
  // tslint:disable-next-line:typedef
  getModels(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.fleetService.getModels(payload).subscribe(res => {
      if(res.result.code==200){
        this.generalTableDataArray = res.result.model;
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
    this.getModels()
  }
}
