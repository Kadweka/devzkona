import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryParams } from './customers.service';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  baseUrl = environment.base_url;
  constructor(
    private http: HttpClient,
  ) { }
  createTrips(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/department', payload);
  }
  getTrips(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/trips', query);
  }
}

