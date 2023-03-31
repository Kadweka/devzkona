import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  isLoading = false;
  loadindData=false
  departmentrFormGroup!: UntypedFormGroup;
  employees:any [] = []
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService:EmployeesService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.departmentrFormGroup = this.formBuilder.group({
      manager_id: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.getEmployees()
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  getEmployees(){
    const payload={
      limit:100000,
      offset:0,
      name:"",
      token:localStorage.getItem('access_token')
    }
    this.loadindData=true
        // @ts-ignore
    this.employeeService.getEmployees(payload).subscribe(res=>{
      this.employees=res.result.employee
      this.loadindData=false
    })
  }
  addNewDepartment(){
    const payload = {
      token:localStorage.getItem('access_token'),
      "name":this.departmentrFormGroup.get("name")?.value,
      "manager_id":this.departmentrFormGroup.get("manager_id")?.value,
    }
    this.isLoading=true
    if(this.departmentrFormGroup.valid){
      this.employeeService.createDepartment(payload).subscribe(res=>{
      if(res.result.code==200){
        this.isLoading=false 
        this.toastr.showSuccess(res.result.message,"SOMETHING WENTNWRONG")
        this.onCloseDialog({reload:true})
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENTNWRONG")
      }
      }) 
    }else{
      this.toastr.showWarning("Please fill in all information","VALIDATION ERROR!")
    }
    this.isLoading=false
  }
}