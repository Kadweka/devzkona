import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  isEditing=false
  loadingPayable=false
  customerCode=""
  loadingReceivable=false
  customerFormGroup!: UntypedFormGroup;
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
    private activatedRoute: ActivatedRoute,
    private accountService:AccountingService
  ) { }

  ngOnInit(): void {
    console.log(this.isEditing,"CHECKING AT THE EDITING STATUS!!!!!!!!!!!!!!!!!!!!!!!11");
    
    this.activatedRoute.params.subscribe(params => {
      console.log(params,"LETS CHECK AT THE PARAMS!!!!!!1");
      
      if (params.id) {
        this.isEditing=true
        this.customerCode = params.id;
      }else{
        this.isEditing=false
      }
    });    
    this.customerFormGroup = this.formBuilder.group({
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
    this.getCustomerDetails()
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
    type:"asset_receivable",
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
    type:"liability_payable",
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

    this.isLoading=true
    if(this.customerFormGroup.valid){
      if(this.isEditing){
        const payload = {
          name: this.customerFormGroup.get("name")?.value,
          company_type: this.customerFormGroup.get("company_type")?.value,
          country_id: this.customerFormGroup.get("country_id")?.value,
          city: this.customerFormGroup.get("city")?.value,
          phone: this.customerFormGroup.get("phone")?.value,
          email: this.customerFormGroup.get("email")?.value,
          property_account_receivable_id: this.customerFormGroup.get("property_account_receivable_id")?.value,
          property_account_payable_id: this.customerFormGroup.get("property_account_payable_id")?.value,
          token:localStorage.getItem("access_token"),
          partner_id:this.customerCode
        }
        this.customerService.updateCustomer(payload).subscribe(res=>{
          if(res.result.code==200){
            this.isLoading=false
            this.toastr.showSuccess(res.result.message,"SUCCESS")
            this.router.navigate([`/customers`])
          }else{
            this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
          }
        })
      }else{
        const payload = {
          name: this.customerFormGroup.get("name")?.value,
          company_type: this.customerFormGroup.get("company_type")?.value,
          country_id: this.customerFormGroup.get("country_id")?.value,
          city: this.customerFormGroup.get("city")?.value,
          phone: this.customerFormGroup.get("phone")?.value,
          email: this.customerFormGroup.get("email")?.value,
          property_account_receivable_id: this.customerFormGroup.get("property_account_receivable_id")?.value,
          property_account_payable_id: this.customerFormGroup.get("property_account_payable_id")?.value,
          token:localStorage.getItem("access_token")
        }
        this.customerService.createCustomer(payload).subscribe(res=>{
          if(res.result.code==200){
            this.isLoading=false
            this.toastr.showSuccess(res.result.message,"SUCCESS")
            this.router.navigate([`/customers`])
          }else{
            this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
          }
        })
      }
    }else{
      this.toastr.showWarning("Fill all information","VALIDATION ERROR")
    }
  }
getCustomerDetails(){
  const payload={
    token:localStorage.getItem("access_token"),
    customer_id:this.customerCode,
  }
  if(this.isEditing){
    this.isLoading=true
    this.customerService.getCustomersDetails(payload).subscribe(res=>{
      if(res.result.code==200){
        this.customerFormGroup.patchValue({
          company_type: res.result.information.type,
          country_id: res.result.information.country_id,
          city: res.result.information.city,
          name: res.result.information.name,
          phone: res.result.information.mobile,
          email: res.result.information.email,
          property_account_receivable_id: res.result.information.receivable_id,
          property_account_payable_id: res.result.information.payable_id,
        })
      }else{
       
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG")
        this.isLoading=false
      }
    })
    this.isLoading=false
  }else{
  
  }
}
}
