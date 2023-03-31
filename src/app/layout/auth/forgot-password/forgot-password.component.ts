import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from '../../../core/services/toaster.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  forgotPasswordFormGroup!: UntypedFormGroup;
  loading=false
  forgotPass=true
  setPass=false
  email=""
  // @ts-ignore
  constructor(
    private router: Router,
    private authService:AuthService,
    private toastr: ToasterService,
    private formBuilder: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.forgotPasswordFormGroup = this.formBuilder.group({
      email: [''],
      password: [''],
      code: [],
    });
  }



  forgotPassword(): void {
    const payload = {
      email: this.forgotPasswordFormGroup.get('email')?.value
    }
    console.log(this.forgotPasswordFormGroup.getRawValue,"testing");
    
    this.loading=true
    this.authService.forgotPassword(payload).subscribe(res=>{      
      if(res.result.code == 200){
        this.email=this.forgotPasswordFormGroup.get('email')?.value
        this.loading=false
        this.forgotPass=false
        this.setPass=true
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG!")
        this.loading=false
      }
    })
  }
  setPassword(): void {
    const payload = {
      code: this.forgotPasswordFormGroup.get('code')?.value,
      password: this.forgotPasswordFormGroup.get('password')?.value
    }    
    this.loading=true
    this.authService.setPassword(payload).subscribe(res=>{    
      console.log("TESTING THE VALUES............",res);
        
      if(res.result.code == 200){
        this.email=""
        this.loading=false
        this.forgotPass=true
        this.setPass=false
        this.router.navigate([`/auth`]);
      }else{
        this.toastr.showWarning(res.result.message,"SOMETHING WENT WRONG!")
        this.loading=false
      }
    })
  }
}
