import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { Alert } from '@mui/material';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  isLoading = false;
  userFormGroup!: UntypedFormGroup;
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<AddUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }
  onCloseDialog(dialogData?: any): any {
    const {reload = false, data = null} = dialogData || {};
    this.dialogRef.close({reload, data});
  }
  addNewUser(){
    const payload = {
      token:localStorage.getItem('access_token'),
      "name":this.userFormGroup.get("name")?.value,
      "email":this.userFormGroup.get("email")?.value,
      "mobile":this.userFormGroup.get("mobile")?.value,
    }
    this.isLoading=true
    if(this.userFormGroup.valid){
      this.authService.createUser(payload).subscribe(res=>{
        if(res.result.code==200){
          this.isLoading=false 
          this.onCloseDialog({reload:true})   
        }else{
          this.toastr.showError(res.result.Message,"SOMETHING WENT WRONG")
        }
      }) 
    }else{
      this.toastr.showWarning("FILL ALL INFORMATION","INFORMATION VALIDATION")
    }
    this.isLoading=false
  }
}
