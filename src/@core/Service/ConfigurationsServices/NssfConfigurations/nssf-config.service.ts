import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Organization } from 'src/@core/Models/organization/organization.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NssfConfigService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/configurations/nssf`;
    constructor(private http: HttpClient) { }
  // Add
  createNssf(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get all
  getNssf() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  getLimitedNssf() {
    let API_URL = `${this.baseURL}/find/limited`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


  getLastNssf() {
    let API_URL = `${this.baseURL}/fetch/last/max`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


  getNssfById(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  updateNssf(id: any, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    console.log("hey data", data)
    return this.http.put(API_URL,data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Delete Property
  deleteNssf(id: any): Observable<any> {
    var API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
