import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryParams } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }
  createDepartment(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/department', payload);
  }
  createEmployee(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/department', payload);
  }
  createContract(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/department', payload);
  }
  getDepartments(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/departments', query);
  }
  getEmployees(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/employees', query);
  }
  getContracts(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/contracts', query);
  }
  getStructure(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/structure', query);
  }
}
