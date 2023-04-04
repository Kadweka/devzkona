import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import { AddProductComponent } from '../_modals/add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData=false
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!:number
  generalTableDataArray: any [] = []
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private categoryService:SettingsService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getProducts()
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
        name: 'TYPE',
        dataKey: 'detailed_type',
        position: 'left',
        isSortable: true,
        searchKey: 'TYPE',
      },
      {
        name: 'CATEGORY',
        dataKey: 'categ_id',
        position: 'left',
        isSortable: true,
        searchKey: 'CATEGORY'
      },
      {
        name: 'PRICE',
        dataKey: 'list_price',
        position: 'left',
        units:'currency',
        isSortable: true,
        searchKey: 'AMOUNT'
      },

      {
        name: 'UOM',
        dataKey: 'uom',
        position: 'left',
        isSortable: true,
        searchKey: 'UOM'
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
    if (action.action === 'EDIT') {
      const dialogRef = this.dialog.open(AddProductComponent, {
        panelClass: 'dialogClass',
        data: action.element,
      });
      dialogRef.afterClosed().subscribe(({reload, data}) => {
        if (reload) {
          this.getProducts();
        }
      });
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
  addItem(event: any): any{
    const dialogRef = this.dialog.open(AddProductComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        this.getProducts();
      }
    });
  }
  getProducts(){
    const payload = {
      name:"",
      limit:10,
      token:localStorage.getItem('access_token'),
      offset:0
    }
    this.isLoadingTableData=true
        // @ts-ignore
    this.categoryService.getProducts(payload).subscribe(res=>{
      if(res.result.code==200){
        this.generalTableDataArray = res.result.products;
        this.totalElements=res.result.total_items
        this.totalLength=res.result.total_items
        this.isLoadingTableData = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.isLoadingTableData = false;
      }
    })
  }
  reload(){
    this.getProducts()
  }
}

