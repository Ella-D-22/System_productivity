import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RetailCustomerService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  baseURL = `${environment.customerAPI}`;
    constructor(private http: HttpClient) { }
     // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  // Add
  createRetailCustomer(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/retail/register`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getRetailCustomers() {
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
  getRetailCustomerId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getRetailCustomerPerSolCode(params: any): Observable<any> {
    let API_URL = `${this.baseURL}/retail/all/by/solcode`;
    return this.http.get(API_URL, { params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  getCorporateCustomerPerSolCode(params: any): Observable<any> {
    let API_URL = `${this.baseURL}/retail/all/by/solcode`;
    return this.http.get(API_URL, { params:params, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

    // Get by Code
    getRetailCustomerByCode(customerCode: any): Observable<any> {
      let API_URL = `${this.baseURL}/retail/${customerCode}`;
      return this.http.get(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }


  updateRetailCustomer(data:any): Observable<any> {
    console.log("Got called", data);
    
    let API_URL = `${this.baseURL}/retail/update/`;
    return this.http.put(API_URL, data, {headers: this.headers, withCredentials: false})
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