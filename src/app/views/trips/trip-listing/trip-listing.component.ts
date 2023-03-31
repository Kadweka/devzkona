import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { TripsService } from 'src/app/core/services/trips.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.scss']
})

export class TripListingComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = [];
  // tslint:disable-next-line:variable-name
  constructor(
    private router: Router,
    private tripService: TripsService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.initializeColumns();
    this.getTrips();
  }

  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'REFERENCE FILE',
        dataKey: 'referencefile',
        position: 'left',
        isSortable: true,
        searchKey: 'REFERENCE FILE',
      },
      {
        name: 'CLIENT',
        dataKey: 'partner_id',
        position: 'left',
        isSortable: true,
        searchKey: 'CLIENT',
      },
      {
        name: 'TRANSPORT TYPE',
        dataKey: 'type',
        position: 'left',
        isSortable: true,
        searchKey: 'TRANSPORT TYPE'
      },
      {
        name: 'DRIVER',
        dataKey: 'driver',
        position: 'left',
        isSortable: true,
        searchKey: 'DRIVER'
      },
      {
        name: 'VEHICLE',
        dataKey: 'truck',
        position: 'left',
        isSortable: true,
        searchKey: 'VEHICLE'
      },
      {
        name: 'ACTIONS',
        dataKey: 'actions',
        position: 'left',
        isSortable: false,
      }
    ];
  }
// tslint:disable-next-line:typedef
getTrips(){
  const payload = {
    limit: 10,
    offset: 0,
    name:"",
    token: localStorage.getItem('access_token')
  };
  this.isLoadingTableData = true;
      // @ts-ignore
  this.tripService.getTrips(payload).subscribe(res => {
    if(res.result.code==200){
      this.generalTableDataArray = res.result.trips;
      this.totalElements=res.result.total_items
      this.totalLength=res.result.total_items
      this.isLoadingTableData = false;
    }else{
      this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
      this.isLoadingTableData = false;
    }
  });
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
  reload(){
    this.getTrips()
  }
}
