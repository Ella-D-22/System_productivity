import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HlvsmService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.apiUrl}/api/v1/parameters/configurations/interests/hlvsm/`;
    constructor(private http: HttpClient) { }
      // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
    console.log("service message", message)
  }
    // Check if it exists
    checkHlvsm(params: any): Observable<any> {
      console.log("service", params)
      let API_URL = `${this.baseURL}/check/by/InterestTableCode`;
      return this.http.post(API_URL, {}, {params:params, headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }


  // Add 
  createHlvsm(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getHlvsms() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
  // Get by id
  getHlvsmId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  checkEntryIfExist(params:any): Observable<any> {
    let API_URL = `${this.baseURL}/check/entry/if/exist`;
    return this.http.get(API_URL, { params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getHlvsmByHlvsm(int_tbl_code:any): Observable<any> {
    let API_URL = `${this.baseURL}/find/by/hlvsm/${int_tbl_code}`;
    return this.http.get(API_URL, {withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  
  updateHlvsm(Hlvsm: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${Hlvsm}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteHlvsm(id: any): Observable<any> {
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