import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SavingschemeService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.productAPI}/api/v1/product/sba`;
    constructor(private http: HttpClient) { }
      // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
    // Check event Id
    checkExistence(params: any): Observable<any> {
      let API_URL = `${this.baseURL}/check/by/InterestTableCode`;
      return this.http.post(API_URL, {}, { params:params,   headers: this.headers, withCredentials: false }).pipe(map(res => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }
  // Add
  createSavingscheme(data: any): Observable<any> {
    
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getSavingschemes() {
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
  getSavingschemeId(id: any): Observable<any> {
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
  getSavingschemeBySavingscheme(params:any): Observable<any> {
    let API_URL = `${this.baseURL}/find/by/event_id`;
    return this.http.get(API_URL, { params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  
  updateSavingscheme(Savingscheme: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${Savingscheme}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteSavingscheme(id: any): Observable<any> {
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
