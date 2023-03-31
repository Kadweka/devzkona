import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>, 
    next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      const shouldAuthenticateAPI = !request.url.includes('/login');
      if (localStorage.getItem('access_token') != null) {
        const token = localStorage.getItem('access_token');
        if (token && shouldAuthenticateAPI) {
          request = request.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
          });
        }
      }
    return next.handle(request);
  }
}
