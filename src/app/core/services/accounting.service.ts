import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {QueryParams} from '../interfaces/iuser';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  baseUrl = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }
  getAccounts(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/accounts', query);
  }
  getJournals(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/journals', query);
  }
  getTaxes(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/taxes', query);
  }
  getAccountTypes(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/account_types', query);
  }

    getJournalItems(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/journal_items', query);
  }

  getJournalEntries(query: QueryParams): Observable<any> {
    // @ts-ignore
    return this.http.post(this.baseUrl + '/journal_entries', query);
  }



  createJournal(payload:any):Observable<any>{
    return this.http.post(this.baseUrl + '/create_journal', payload)
  }
  createChartAccount(payload:any):Observable<any>{
    return this.http.post(this.baseUrl + '/create_chart', payload)
  }
  createTax(payload:any):Observable<any>{
    return this.http.post(this.baseUrl + '/create_tax', payload)
  }
}
