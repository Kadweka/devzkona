import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserCardInterface } from 'src/app/shared/interfaces/user-card-interface';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent {
    isLoading = false;
  contractCode: any;
  currency:any;
  contractData: any;
  userCardData!: UserCardInterface;
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService,
    private toastr: ToasterService,

  ) {

    this.activatedRoute.params.subscribe(params => {
      this.contractCode = params.id;
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
this.getContracts()
this.currency=localStorage.getItem('currency')
  }
  getContracts(){
    const payload = {
      limit: 10,
      offset: 0,
      contract_id:this.contractCode,
      token: localStorage.getItem('access_token')
    };
    this.isLoading = true;
    // @ts-ignore
    this.employeeService.getContractDetails(payload).subscribe(res => {      
     if(res.result.code==200){
      this.userCardData = {
        id: 'Employee ID: Sample ID',
        institution: '',
        location: res.result.information.country,
        name: res.result.information.name,
        email: res.result.information.employee_email,
        phone: res.result.information.employee_phone,
      };
      this.contractData=res.result.information
      this.isLoading = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.isLoading = false;
      }
    });
  }
}
