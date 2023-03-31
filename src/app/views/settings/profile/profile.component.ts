import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { ToasterService } from 'src/app/core/services/toaster.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoadingUser = false;
  userFormGroup!: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private toastr: ToasterService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getMe()
  }
buildForm(): void{
    this.userFormGroup = this.formBuilder.group({
      name: new UntypedFormControl('', [Validators.required]),
      login: new UntypedFormControl({value: '', disabled: true}, [Validators.required]),
      mobile: new UntypedFormControl('', [Validators.required, Validators.email]),
    });
}
getMe(){
    const payload = {
      token: localStorage.getItem('access_token')
    };
    this.isLoadingUser = true;
    this.authService.getMe(payload).subscribe(res => {
      if(res.result.code == 200){
      this.userFormGroup.patchValue(res.result.me[0]);
      this.isLoadingUser=false
      }else{}
      this.isLoadingUser=false
    });
}
updateMe(){
  const payload = {
    token:localStorage.getItem("access_token"),
    email: this.userFormGroup.get('login')?.value,
    name: this.userFormGroup.get('name')?.value,
    mobile: this.userFormGroup.get('mobile')?.value,
  }
  this.isLoadingUser=true
  this.authService.updateMe(payload).subscribe(res=>{
    if(res.result.code == 200){
      this.toastr.showSuccess(res.result.message,"SUCCESS")
      this.isLoadingUser=false
    }else{
      this.toastr.showError(res.result.message,"SUCCESS")
    }
  })
}
}
