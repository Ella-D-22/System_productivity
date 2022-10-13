import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionExecutionService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private baseURL: string = `${environment.transactionexecutorAPI}/transactions/`;

  constructor(private http: HttpClient) { }

       // Message Medium
       private messageSource = new BehaviorSubject('default message');
       currentMessage = this.messageSource.asObservable();
       changeMessage(message: string) {
         this.messageSource.next(message)
       }
  
  
  // Add
  createTransaction(data: any): Observable<any> {
    let API_URL = `${this.baseURL}add-transaction`;
    console.log("server data", data);
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  verifyTransaction(data: any): Observable<any> {
    let API_URL = `${this.baseURL}verify`;
    console.log("server data", data);
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  updateTransaction(data: any): Observable<any> {
    let API_URL = `${this.baseURL}updateTransaction`;
    console.log("server data", data);
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
  // Get all
  getTransactions() {
    let API_URL = `${this.baseURL}`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  // Get by id transactions/by/100005
  getTransactionId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}by/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
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