import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {QueryParams} from '../interfaces/iuser';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  baseUrl = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }
  getModels(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/models', query);
  }
  getManufacturers(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/manufacture', query);
  }
  getVehicles(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/vehicles', query);
  }
  getServices(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/services', query);
  }
  createVehicle(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/create_fleet', payload);
  }
  createFleetService(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/create_service', payload);
  }

  createServiceTypes(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/create_service_type', payload);
  }

  getServiceTypes(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/service_types', payload);
  }
}
