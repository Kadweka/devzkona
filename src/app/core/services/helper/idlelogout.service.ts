import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdlelogoutService {
  timeout = 60 * 10;
  timer: any;
  loggedOut = false;
  constructor(
    private authService: AuthService
  ) { }
  confirmTimeout(): any {
    const expTime = localStorage.getItem('_expiredTime9835983598fjgfskhkfksfhs');
    const expiredTime = parseInt(expTime || '0', 10); // TODO: You changed the method here. Refer back if there's an error
    if (expiredTime < Date.now() && this.authService.isAuthenticated()) {
      // console.log('------------------------------logging out--------------------------');
      this.authService.sessionTimeout();
    }
  }
  resetTimer(onLogin?: boolean): any {
    // console.log('------------------------------RESETING--------------------------');
    this.loggedOut = false;
    localStorage.setItem('_expiredTime9835983598fjgfskhkfksfhs', String(Date.now() + this.timeout * 1000));
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.confirmTimeout();
    }, !onLogin ? 2000 : 60 * 10 * 1000);
  }

  clearTimeout(): any {
    this.loggedOut = true;
    clearInterval(this.timer);
    this.authService.sessionTimeout();
  }
}
