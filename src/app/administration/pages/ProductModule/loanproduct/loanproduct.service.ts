import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanproductService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
    // API endpoint
  baseURL = `${environment.productAPI}/api/v1/product/laa`;
    constructor(private http: HttpClient) { }
      // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
    console.log("service message", message)
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
  createLoanproduct(data: any): Observable<any> {
    console.log("data", data);
    
    let API_URL = `${this.baseURL}/add/`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getLoanproducts() {
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
  getLoanproductId(id: any): Observable<any> {
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
  getLoanproductByLoanproduct(params:any): Observable<any> {
    let API_URL = `${this.baseURL}/find/by/event_id`;
    return this.http.get(API_URL, { params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  
  updateLoanproduct(Loanproduct: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${Loanproduct}`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteLoanproduct(id: any): Observable<any> {
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
