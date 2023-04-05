import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import {FilesService} from '../../../core/services/files.service';
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
  generalTableDataArray: any [] = [];
  constructor(
    private router: Router,
    private fileService: FilesService

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getfiles();
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
        name: 'CLIENT',
        dataKey: 'client',
        position: 'left',
        isSortable: true,
        searchKey: 'CLIENT',
      },
      {
        name: 'BILL REF',
        dataKey: 'bill_ref',
        position: 'center',
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
        name: 'STATUS',
        dataKey: 'state',
        position: 'left',
        isSortable: true,
        searchKey: 'STATUS'
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
      let pdf=new jsPDF('p','pt','a4');
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
getfiles(): void{
  const payload = {
    limit: 10,
    offset: 0,
    token: localStorage.getItem('access_toekn')
  };
  this.isLoadingTableData = true;
  // @ts-ignore
  this.fileService.getFiles(payload).subscribe(res => {
    this.generalTableDataArray = res.result.files;
    this.isLoadingTableData = false;
  });
}
}
