import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, QueryParams } from '../interfaces/iuser';
import { ToasterService } from './toaster.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.base_url;
  private userSubject: any;
  decodedToken: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToasterService,
    private jwtHelper: JwtHelperService
  ) {}

  login(payload: any): Observable<any> {
    localStorage.clear();
    return this.http.post(this.baseUrl + '/login', payload).pipe(
      map((data: any) => {
        console.log('--------------------------', data);
        if (!data.result.access_token) {
          return data;
        } else {
          this.userSubject = data.result;
          this.decodedToken = this.jwtHelper.decodeToken(
            data.result.access_token
          );
          return data;
        }
      })
    );
  }
  public isAuthenticated(): boolean {
    if (localStorage.getItem('access_token') != null) {
      return !this.jwtHelper.isTokenExpired(
        localStorage.getItem('access_token')
      );
    }
    return false;
  }
  logMeOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth').then();
  }
  createUser(payload: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/register', payload);
  }
  // tslint:disable-next-line:adjacent-overload-signatures
  getUsers(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/users', query);
  }
  getMe(payload: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/me', payload);
  }

  updateMe(payload: any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/update_me', payload);
  }

  forgotPassword(payload: any): Observable<any> {
    return this.http.post(this.baseUrl + '/forgot_password', payload);
  }
  setPassword(payload: any): Observable<any> {
    return this.http.post(this.baseUrl + '/set_password', payload);
  }
  public get getDecodedToken(): any {
    const token = localStorage.getItem('access_token');
    return this.jwtHelper.decodeToken(this.userSubject.access_token);
  }
  sessionTimeout(): void {
    const user = this.getDecodedToken;
    this.userSubject.next(null);
    this.router
      .navigateByUrl('/auth/expired-session?user=' + user?.user_name)
      .then();
    localStorage.clear();
  }
}
