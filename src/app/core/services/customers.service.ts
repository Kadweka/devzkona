import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
export interface QueryParams{
  limit: number;
  offset: number;
  name?: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  baseUrl = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }
  getCustomers(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/customers', query);
  }
  createCustomer(payload:any):Observable<any>{
    return this.http.post(this.baseUrl + '/new_customer', payload)
  }

}
