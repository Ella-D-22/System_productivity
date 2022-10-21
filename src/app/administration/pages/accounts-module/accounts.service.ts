import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL = `${environment.accoutOpening}/accounts`;
  constructor(private http: HttpClient) { }
  // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  // Add
  createAccount(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/open`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getAllCustomers() {
    let API_URL = `${this.baseURL}/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Get Current accounts
  getCurrentAccounts() {
    let API_URL = `${this.baseURL}/ca/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getCurrentAccountByCustCode(customerCode: any): Observable<any> {
    let API_URL = `${this.baseURL}/ca/customer/${customerCode}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(
      map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //Savings Accounts
  getSavingAccounts() {
    let API_URL = `${this.baseURL}/sb/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getSavingsAccountByCustCode(customerCode: any): Observable<any> {
    let API_URL = `${this.baseURL}/customer/${customerCode}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(
      map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //Loan Accounts
  getLoanAccounts() {
    let API_URL = `${this.baseURL}/la/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getLoanAccountByCustCode(customerCode: any): Observable<any> {
    let API_URL = `${this.baseURL}/la/customer/${customerCode}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(
      map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //Overdraft 
  getODAccounts() {
    let API_URL = `${this.baseURL}/od/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  //Office Accounts
  getOfficeAccounts() {
    let API_URL = `${this.baseURL}/oa/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  //Getting Sol accounts
  getSolAccount(solCode: any): Observable<any> {
    let API_URL = `${this.baseURL}/sol/${solCode}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(
      map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )

  }
  //Updating Accounts
  updateAccounts(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update`
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(
      map(res => {
        return res || {}
      })
    )
  }
  sumCustomerAccountBalance() {
    let API_URL = `${this.baseURL}/sum/customer/account/balance`
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(
      map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  //Retrieving an Account
  retrieveAccount(acid: any): Observable<any> {
    let API_URL = `${this.baseURL}/${acid}`
    return this.http.get(API_URL, { withCredentials: false }).pipe(map(
      res => {
        return res || {}
      }
    ))
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