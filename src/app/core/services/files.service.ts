import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { QueryParams } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  baseUrl = environment.base_url;

  constructor(
    private http: HttpClient
  ) { }
  getFiles(query: QueryParams): Observable<any> {
    console.log(query , 'the payload');
    // @ts-ignore
    return this.http.post(this.baseUrl + '/files', query);
  }

}
