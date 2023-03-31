import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FleetService } from 'src/app/core/services/fleet.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import { AddCarServiceComponent } from '../_modal/add-car-service/add-car-service.component';

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.scss']
})
export class CarServicesComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = []

  constructor(
    private router: Router,
    private fleetService: FleetService,
    private toastr: ToasterService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getServices()
  } 

  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'DATE',
        dataKey: 'date',
        position: 'left',
        isSortable: true,
        searchKey: 'DATE',
      },
      {
        name: 'LICENSE PLATE',
        dataKey: 'vehicle',
        position: 'left',
        isSortable: true,
        searchKey: 'REFERENCE FILE',
      },
      {
        name: 'SERVICE',
        dataKey: 'service',
        position: 'left',
        isSortable: true,
        searchKey: 'SERVICE',
      },
      {
        name: 'DRIVER',
        dataKey: 'driver',
        position: 'left',
        isSortable: true,
        searchKey: 'TRANSPORT TYPE'
      },
      {
        name: 'ODOMETER',
        dataKey: 'odometer',
        position: 'left',
        isSortable: true,
        units:'number',
        searchKey: 'ODOMETER'
      },
      {
        name: 'AMOUNT',
        dataKey: 'cost',
        position: 'left',
        isSortable: true,
        units:'currency',
        searchKey: 'AMOUNT'
      },
      {
        name: 'STATE',
        dataKey: 'state',
        position: 'left',
        isSortable: true,
        searchKey: 'STATE',
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
  getServices(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
        // @ts-ignore
    this.fleetService.getServices(payload).subscribe(res => {
       if(res.result.code==200){
        this.generalTableDataArray = res.result.service;
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
    this.getServices()
  }
  addItem(event: any): any{
    const dialogRef = this.dialog.open(AddCarServiceComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        this.getServices();
      }
    });
  }
}
