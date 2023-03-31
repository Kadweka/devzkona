import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { AccountingService } from 'src/app/core/services/accounting.service';
import { CustomersService } from 'src/app/core/services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  isLoading = false
  loadingCountries=false
  loadingPayable=false
  loadingReceivable=false
  employeeFormGroup!: UntypedFormGroup;
  employees!:any[]
  receivable:any[]=[]
  payable:any[]=[]
  countries:any[]=[]
types=[
  {code:"person",name:"Individual"},
  {code:"company",name:"Company"},
]
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private customerService:CustomersService,
    private toastr: ToasterService,
    private settingService:SettingsService,
    private accountService:AccountingService
  ) { }

  ngOnInit(): void {
    this.employeeFormGroup = this.formBuilder.group({
      company_type: ['', Validators.required],
      country_id: ['', Validators.required],
      city: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      property_account_receivable_id: ['', Validators.required],
      property_account_payable_id: ['', Validators.required],

    });
    this.getCountries()
    this.getPayableCountries()
    this.getReceivable()
  }
getCountries(){
  const payload = {
    token:localStorage.getItem("access_token"),
    name:"",
    limit:100000,
    offset:0
  }
  this.loadingCountries=true
          // @ts-ignore
  this.settingService.getCountries(payload).subscribe(res=>{
    if(res.result.code==200){
      this.countries=res.result.countries
      this.loadingCountries=false
    }
    else{
      this.toastr.showWarning(res.result.message,"SOMETHING IS WRONG")
    }
  })
}
getReceivable(){
  const payload = {
    token:localStorage.getItem("access_token"),
    name:"",
    limit:100000,
    type:"receivable",
    offset:0
  }
  this.loadingReceivable=true
          // @ts-ignore
  this.accountService.getAccounts(payload).subscribe(res=>{
    if(res.result.code==200){
      this.receivable=res.result.account
      this.loadingReceivable=false
    }
    else{
      this.toastr.showWarning(res.result.message,"SOMETHING IS WRONG")
      this.loadingReceivable=false
    }
  })
}
getPayableCountries(){
  const payload = {
    token:localStorage.getItem("access_token"),
    name:"",
    type:"payable",
    limit:100000,
    offset:0
  }
  this.loadingPayable=true
          // @ts-ignore
  this.accountService.getAccounts(payload).subscribe(res=>{   
    if(res.result.code==200){
      this.payable=res.result.account
      this.loadingPayable=false
    }
    else{
      this.toastr.showWarning(res.result.message,"SOMETHING IS WRONG")
      this.loadingPayable=false
    }
  })
}
addCustomer(){
    const payload = {
      name: this.employeeFormGroup.get("name")?.value,
      company_type: this.employeeFormGroup.get("company_type")?.value,
      country_id: this.employeeFormGroup.get("country_id")?.value,
      city: this.employeeFormGroup.get("city")?.value,
      phone: this.employeeFormGroup.get("phone")?.value,
      email: this.employeeFormGroup.get("email")?.value,
      property_account_receivable_id: this.employeeFormGroup.get("property_account_receivable_id")?.value,
      property_account_payable_id: this.employeeFormGroup.get("property_account_payable_id")?.value,
      token:localStorage.getItem("access_token")
    }

    this.isLoading=true
    if(this.employeeFormGroup.valid){
      this.customerService.createCustomer(payload).subscribe(res=>{
        if(res.result.code==200){
          this.isLoading=false
          this.toastr.showSuccess(res.result.message,"SUCCESS")
          this.router.navigate([`/customers`])
        }else{
          this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
        }
      })
    }else{
      this.toastr.showWarning("Fill all information","VALIDATION ERROR")
    }
  }

}
