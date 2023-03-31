import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  isLoading = false
  loadingCountries=false
  employeeFormGroup!: UntypedFormGroup;
  employees!:any[]
  countries:any[]=[]
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private employeesService:EmployeesService,
    private toastr: ToasterService,
    private settingService:SettingsService
  ) { }

  ngOnInit(): void {
    this.employeeFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      country_id: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      employee_department: ['', Validators.required],
      employee_manager: ['', Validators.required],

    });
    this.getCountries()
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
  addEmployee(){
    const payload = {
      name: this.employeeFormGroup.get("name")?.value,
      country_id: this.employeeFormGroup.get("country_id")?.value,
      city: this.employeeFormGroup.get("city")?.value,
      phone: this.employeeFormGroup.get("phone")?.value,
      email: this.employeeFormGroup.get("email")?.value,
      employee_department: this.employeeFormGroup.get("employee_department")?.value,
      employee_manager: this.employeeFormGroup.get("employee_manager")?.value,
      default_account_id: this.employeeFormGroup.get("default_account_id")?.value,
      token:localStorage.getItem("access_token")
    }

    this.isLoading=true
    if(this.employeeFormGroup.valid){
      this.employeesService.createEmployee(payload).subscribe(res=>{
        if(res.result.code==200){
          this.isLoading=false
          this.toastr.showSuccess(res.result.message,"SUCCESS")
          this.router.navigate([`/employees`])
          // this.onCloseDialog({reload:true})
        }else{
          this.toastr.showWarning(res.result.message,"VALIDATION ERROR")
        }
      })
    }else{
      this.toastr.showWarning("Fill all information","VALIDATION ERROR")
    }
  }

}
