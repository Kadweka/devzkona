import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ITableColumnInterface, ITableRowActions } from 'src/app/shared/interfaces/table-interface';
import {MatDialog} from '@angular/material/dialog';
import {AddUsersComponent} from '../_modals/add-users/add-users.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  generalTableColumns: ITableColumnInterface[] = [];
  isLoadingTableData = false;
  page = 1;
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  generalTableDataArray: any [] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToasterService,

  ) { }

  ngOnInit(): void {
    this.initializeColumns();
    this.getUsers();
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
        name: 'EMAIL',
        dataKey: 'email',
        position: 'left',
        isSortable: true,
        searchKey: 'EMAIL',
      },
      {
        name: 'MOBILE',
        dataKey: 'mobile',
        position: 'left',
        isSortable: true,
        searchKey: 'MOBILE'
      },
      {
        name: 'STATE',
        dataKey: 'state',
        position: 'left',
        isSortable: true,
        searchKey: 'STATE'
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
    const payload = {
      "token":localStorage.getItem('access_token'),
      "name":action.element.name,
      "email":action.element.email,
      "mobile":action.element.mobile,
      "user_id":action.element.id,
      "state":"archived"
    }
    if(action.action === 'DEACTIVATE') {
        if(action.element.state=="archived"){
          this.toastr.showWarning("This user is alread inactive","DEACTIVATION ERROR")
        }else{
          this.authService.updateMe(payload).subscribe(res=>{
            if(res.result.code==200){
              this.toastr.showSuccess(res.result.message,"SUCCESS")
              this.getUsers()
            }else{
              this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG")
            }
          })
        }
    }else if(action.action==="ACTIVATE"){
      const payload = {
        "token":localStorage.getItem('access_token'),
        "name":action.element.name,
        "email":action.element.email,
        "mobile":action.element.mobile,
        "user_id":action.element.id,
        "state":"active"
      }
      if(action.element.state=="active"){
        this.toastr.showWarning("This user is already active","ACTIVATION ERROR")
      }else{
        this.authService.updateMe(payload).subscribe(res=>{
          if(res.result.code==200){
            this.toastr.showSuccess(res.result.message,"SUCCESS")
            this.getUsers()
          }else{
            this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG")
          }
        })
      }
    }else if(action.action==="EDIT"){
      const dialogRef = this.dialog.open(AddUsersComponent, {
        panelClass: 'dialogClass',
        data: action.element,
      });
      dialogRef.afterClosed().subscribe(({reload, data}) => {
        if (reload) {
          this.getUsers();
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
  getUsers(){
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.isLoadingTableData = true;
    // @ts-ignore
    this.authService.getUsers(payload).subscribe(res => {
      if(res.result.code==200){
        this.generalTableDataArray = res.result.users;
        this.totalElements=res.result.total_items
        this.totalLength=res.result.total_items
        this.isLoadingTableData = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.isLoadingTableData = false;
      }
    });
  }
  addItem(event: any): any{
    const dialogRef = this.dialog.open(AddUsersComponent, {
      panelClass: 'dialogClass',
      data: event,
    });
    dialogRef.afterClosed().subscribe(({reload, data}) => {
      if (reload) {
        this.getUsers();
      }
    });
  }
  reload(){
    this.getUsers()
  }
}
