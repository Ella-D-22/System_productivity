import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Organization } from 'src/@core/Models/organization/organization.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KraConfigService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/configurations/kra`;
    constructor(private http: HttpClient) { }
  // Add
  createKra(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getKra() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // getLastKra() {
  //   let API_URL = `${this.baseURL}/fetch/last/max`;
  //   return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
  //   .pipe(
  //     map((res) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }
  getKraById(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  updateKra(id: any, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL,data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Delete Property
  deleteKra(id: any): Observable<any> {
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

