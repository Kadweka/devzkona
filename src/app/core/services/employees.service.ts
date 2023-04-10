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
  createPayslips(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/run_payroll', payload);
  }
  createEmployee(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/create_employee', payload);
  }
  createContract(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/create_contract', payload);
  }
  getDepartments(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/departments', query);
  }
  getEmployees(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/employees', query);
  }
  get_batch_details(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/get_batch_details', query);
  }
  getContracts(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/contracts', query);
  }
  getStructure(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/structure', query);
  }
  get_batch(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/get_batch', query);
  }
  getEmployeeDetails(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/employee_details', query);
  }
  getContractDetails(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/contract_details', query);
  }
  getStructureDetails(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/structure_details', query);
  }
  updateDepartments(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/update_department', payload);
  }
  updateEmployees(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/update_employee', payload);
  }
  updateContracts(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/update_contract', payload);
  }
}
// employee_details