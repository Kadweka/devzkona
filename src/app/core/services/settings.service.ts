import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryParams } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  baseUrl = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }
  getCategories(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/category', query);
  }
  createCategories(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/new_category', payload);
  }
  getProducts(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/products', query);
  }
  createProduct(payload:any): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/new_product', payload);
  }
}