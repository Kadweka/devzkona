import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FleetService } from 'src/app/core/services/fleet.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-service-type',
  templateUrl: './add-service-type.component.html',
  styleUrls: ['./add-service-type.component.scss']
})
export class AddServiceTypeComponent {

  isLoading = false;
  serviceTypeFormGroup!: UntypedFormGroup;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddServiceTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fleetService:FleetService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.serviceTypeFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      category: [{value:'service',disabled:true}]
    });
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  addNewCategory(){
    const payload = {
      token:localStorage.getItem("access_token"),
      name: this.serviceTypeFormGroup.get('name')?.value,
      category: this.serviceTypeFormGroup.get('category')?.value,
    }
    if(this.serviceTypeFormGroup.valid){
      this.isLoading=true
      this.fleetService.createServiceTypes(payload).subscribe(res=>{
      if(res.result.code==200){
        this.isLoading=false 
        this.toastr.showSuccess(res.result.message,"SUCCESS")
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
``