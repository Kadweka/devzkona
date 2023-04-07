import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import { FilesService } from '../../../core/services/files.service';
import jsPDF from 'jspdf';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-file-listing',
  templateUrl: './file-listing.component.html',
  styleUrls: ['./file-listing.component.scss']
})
export class FileListingComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any[] = [];
  constructor(
    private router: Router,
    private fileService: FilesService,
    private toastr: ToasterService

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getFiles();
  }
  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'CLIENT',
        dataKey: 'client',
        position: 'left',
        isSortable: true,
        searchKey: 'CLIENT',
      },
      {
        name: 'CONTAINER DEPARTURE',
        dataKey: 'dep_date',
        position: 'left',
        isSortable: true,
        searchKey: 'CONTAINER DEPARTURE',
      },
      {
        name: 'CONTAINER ARRIVAL',
        dataKey: 'arr_date',
        position: 'left',
        isSortable: true,
        searchKey: 'CONTAINER ARRIVAL',
      },
      {
        name: 'BILL OF LADING',
        dataKey: 'bill_ref',
        position: 'left',
        isSortable: true,
        searchKey: 'BILL REF'
      },
      {
        name: 'COUNTRY',
        dataKey: 'country_id',
        position: 'left',
        isSortable: true,
        searchKey: 'COUNTRY'
      },
      {
        name: 'FILE OPENING',
        dataKey: 'date',
        position: 'left',
        isSortable: true,
        searchKey: 'FILE OPENING'
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
    if (action.action === 'DN') {
      let pdf = new jsPDF('p', 'pt', 'a4');
      pdf.save()
      // pdf.html(this.)
    }
  }
  goToDetails(event: any): any {
    this.router.navigate([`/home/file-details/${event.id}`]);
  }

  sortData(sortParameters: Sort): any {
    // this.generalTableDataArray = this.tableSortService.sortData(
    //   sortParameters,
    //   this.generalTableDataArray
    // );
  }
  getFiles(): void {
    const payload = {
      limit: 10,
      offset: 0,
      name: '',
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.fileService.getFiles(payload).subscribe(res => {
      if (res.result.code == 200) {
        this.generalTableDataArray = res.result.files;
        this.totalElements = res.result.total_items
        this.totalLength = res.result.total_items
        this.isLoadingTableData = false;
      } else {
        this.toastr.showWarning(res.result.Message, "SOMETHING IS WRONG")
        this.isLoadingTableData = false;
      }
    });
  }
  reload() {
    this.getFiles()
  }
}
