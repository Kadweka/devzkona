import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ITableColumnInterface } from 'src/app/shared/interfaces/table-interface';
import { UserCardInterface } from 'src/app/shared/interfaces/user-card-interface';

@Component({
  selector: 'app-payslips-run',
  templateUrl: './payslips-run.component.html',
  styleUrls: ['./payslips-run.component.scss']
})
export class PayslipsRunComponent {
  isLoading = false;
  batchData: any;
  loadBatch=false
  currency: any;
  structureData: any;
  generalTableColumns: ITableColumnInterface[] = [];
  userCardData!: UserCardInterface;
  loadingNew =false;
  isLoadingTableData = false;
  generalTableDataArray: any[] = [];
  page = 1;
  batchCode=""
  pageSize = 50;
  totalLength!: number;
  totalElements!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService,
    private toastr: ToasterService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.batchCode = params.id;
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
    this.currency = localStorage.getItem('currency');
    this.getBatch()
  }
  initializeColumns(): void {
    this.generalTableColumns = [
      {
        name: 'NAME',
        dataKey: 'employee',
        position: 'left',
        isSortable: true,
        searchKey: 'NAME',
      },
      {
        name: 'BASIC',
        dataKey: 'basic',
        position: 'left',
        isSortable: true,
        searchKey: 'BASIC',
      },
      {
        name: 'GROSS',
        dataKey: 'gross',
        position: 'left',
        isSortable: true,
        searchKey: 'GROSS'
      },
      {
        name: 'NET',
        dataKey: 'net',
        position: 'left',
        isSortable: true,
        searchKey: 'NET'
      },
      {
        name: 'STATUS',
        dataKey: 'status',
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
  getBatch(){    
    const payload = {
      limit: 10,
      offset: 0,
      name:"",
      batch_id:this.batchCode,
      token: localStorage.getItem('access_token')
    };
    this.loadBatch=true
        // @ts-ignore
    this.employeeService.get_batch_details(payload).subscribe(res=>{
      if(res.result.code==200){
         this.batchData=res.result.batch
         this.generalTableDataArray=res.result.batchValues
         this.totalElements=res.result.total_items
         this.totalLength=res.result.total_items
         this.isLoading=false
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG")
        this.isLoading=false
      }
    })
  }
  sortData(sortParameters: Sort): any {
  }
    onPageChange(data: any): any {
    this.page = data?.pageIndex + 1;
    this.pageSize = data?.pageSize;
  }
  reload(){
    this.getBatch()
  }
  createPayslips(value:any){
    const payload={
      "batch_id":this.batchCode,
      "token":localStorage.getItem('access_token'),
      "type":value
    }
    this.loadingNew=true
    this.employeeService.createPayslips(payload).subscribe(res=>{
      if(res.result.code == 200){
        this.toastr.showSuccess(res.result.message,"PAYSLIPS CREATED")
        this.loadingNew=false
        this.getBatch()
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG!!")
        this.loadingNew=false
      }
    })
  }
}