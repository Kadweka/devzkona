import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  loading = false;
  signInFormGroup!: UntypedFormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    // private store: Store,
    private toastr: ToasterService
  ) // private idleLogoutService: IdleLogoutService
  {}

  ngOnInit(): void {
    this.signInFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
    });
  }

  signInUser(): void {
    const payload = {
      email: this.signInFormGroup.get('username')?.value,
      password: this.signInFormGroup.get('password')?.value,
    };
    this.loading = true;
    this.authService.login(payload).subscribe((res) => {
      if (res.result.code == 200) {
        localStorage.setItem('access_token', res.result.access_token);
        localStorage.setItem('userName', res.result.user_name);
        localStorage.setItem('company_name', res.result.company_name);
        this.router.navigate([`/dashboard`]);
        this.loading = false;
        this.toastr.showSuccess('Your successful logged in', 'Welcome');
      } else {
        this.toastr.showError(res.result.message, 'CREDENTIALS ERROR');
        this.loading = false;
      }
    });
  }
}
// this.router.navigate([`/member/member-details/${action.element.code}`]);
