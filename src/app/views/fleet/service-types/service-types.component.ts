import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FleetService } from 'src/app/core/services/fleet.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import { AddServiceTypeComponent } from '../_modal/add-service-type/add-service-type.component';

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.scss']
})
export class ServiceTypesComponent {
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
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getServiceTypes();

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
        name: 'CATEGORY',
        dataKey: 'categ',
        position: 'left',
        isSortable: true,
        searchKey: 'CATEGORY',
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
    this.router.navigate([`/trips/details-trip/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
  }
  // tslint:disable-next-line:typedef
  getServiceTypes(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
        // @ts-ignore
    this.fleetService.getServiceTypes(payload).subscribe(res => {
       if(res.result.code==200){
        this.generalTableDataArray = res.result.service_types;
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
    this.getServiceTypes()
  }
  addItem(event: any): any{
    const dialogRef = this.dialog.open(AddServiceTypeComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        this.getServiceTypes();
      }
    });
  }
}
