import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  gender=[
    {code:"male",name:"Male"},
    {code:"female",name:"Female"},
    {code:"other",name:"Other"},
  ]
  employment_type=[
    {code:"employee",name:"Employee"},
    {code:"student",name:"student"},
    {code:"trainee",name:"Trainee"},
    {code:"contractor",name:"Contractor"},
    {code:"freelancer",name:"Freelancer"},
  ]
  marital_status=[
    {code:"single",name:"Single"},
    {code:"married",name:"Married"},
    {code:"widower",name:"Widower"},
    {code:"divorced",name:"divorced"},
  ]
  isLoading = false
  employeeFormGroup1!: UntypedFormGroup;
  employeeFormGroup2!: UntypedFormGroup;
  loadingEmployees=false
  employees:any[]=[]
  loadingDep=false
  departments:any[]=[]
  loadingCountry=false
  country:any[]=[]
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private employeeService:EmployeesService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToasterService,
    private settingService:SettingsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.employeeFormGroup1 = this.formBuilder.group({
      name: ['', Validators.required],
      mobile_phone: ['', [Validators.required]],
      employee_type: [''],
      work_email: [''],
      department_id: [''],
      parent_id: [''],
      gender:[],
      marital:[]

    });
    this.employeeFormGroup2 = this.formBuilder.group({
      country_id: [''],
      identification_id: [''],
      passport_id: [''],
      birthday: [''],
    });
    this.getEmployees()
    this.getDepartments()
    this.getCountries()
  }
  getEmployees(){
    const payload = {
      limit: 1000,
      offset: 0,
      name:"",
      token: localStorage.getItem('access_token')
    };
    this.loadingEmployees = true;
    // @ts-ignore
    this.employeeService.getEmployees(payload).subscribe(res => {
     if(res.result.code==200){
        this.employees = res.result.employee;
        this.loadingEmployees = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.loadingEmployees = false;
      }
    });
  }
  getDepartments(){
    const payload = {
      limit: 1000,
      name:"",
      offset: 0,
      token: localStorage.getItem('access_token')
    };
    this.loadingDep = true;
    // @ts-ignore
    this.employeeService.getDepartments(payload).subscribe(res => {
      if(res.result.code==200){
        this.departments = res.result.departments;
        this.loadingDep = false;
      }else{
        this.toastr.showWarning(res.result.Message,"SOMETHING IS WRONG")
        this.loadingDep = false;
      }
    });
  }
  addEmployee(){
    console.log(this.employeeFormGroup1.getRawValue(),this.employeeFormGroup2.getRawValue(),"THE ROW VALUES!!!!!!!11");
    const payload={
      mobile_phone:this.employeeFormGroup1.get('mobile_phone')?.value,
      name:this.employeeFormGroup1.get('name')?.value,
      employee_type:this.employeeFormGroup1.get('employee_type')?.value,
      work_email:this.employeeFormGroup1.get('work_email')?.value,
      department_id:this.employeeFormGroup1.get('department_id')?.value,
      parent_id:this.employeeFormGroup1.get('parent_id')?.value,
      country_id:this.employeeFormGroup1.get('country_id')?.value,
      identification_id:this.employeeFormGroup1.get('identification_id')?.value,
      passport_id:this.employeeFormGroup1.get('passport_id')?.value,
      birthday:this.employeeFormGroup1.get('birthday')?.value,
      token:localStorage.getItem('access_token')
    }
    if(this.employeeFormGroup1.valid && this.employeeFormGroup2.valid){
      this.isLoading=true
      this.employeeService.createEmployee(payload).subscribe(res=>{
        if(res.result.code==200){
          this.toastr.showSuccess(res.result.message,"SUCCESS")
          this.isLoading=false
          this.onCloseDialog({reload:true})
          this.router.navigate([`/employees`])
        }
      })
    }else{
      this.toastr.showWarning("Invalid form","VALIDATION ERROR")
    }
  }
    onCloseDialog(dialogData?: any): any {
    const { reload = false, data = null } = dialogData || {};
    this.dialogRef.close({ reload, data });
  }
  getCountries(){
    const payload = {
      limit: 1000,
      name:"",
      offset: 0,
      token: localStorage.getItem('access_token')
    };
    this.loadingCountry=true
            // @ts-ignore
    this.settingService.getCountries(payload).subscribe(res=>{
      if(res.result.code==200){
        this.country=res.result.countries
        this.loadingCountry=false
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG")
        this.loadingCountry=false
      }
    })
  }
}
