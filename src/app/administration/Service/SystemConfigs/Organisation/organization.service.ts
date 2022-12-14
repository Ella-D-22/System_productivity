import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //baseURL2 = `${environment.logAPI}`;
   baseURL = `${environment.empAPI}`;
   //baseURL3 = `${environment.signAPI}`;

  constructor(private http: HttpClient) { }

  //Add
   create(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/employee/add`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
   //Fetch
   get(): Observable<any> {
    let API_URL = `${this.baseURL}/employee/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }

  update(data: any, id: number): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
   //Edit 
  //  update(data: any, id: number): Observable<any> {
  //   let API_URL = `${this.baseURL}/update/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
  //     return res || {}
  //   }),
  //     catchError(this.errorMgmt)
  //   )
  // }
  //Delete 
  delete(id: number): Observable<any> {
    let API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
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



//CRUD operations for Report 

  //create report
  createReport(data: any, userId: any): Observable<any> {
    let API_URL = `${this.baseURL}/create/report/${userId}`;
    return this.http.post(API_URL,data, { headers: this.headers, withCredentials: false }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
   //Fetch
   getReport(): Observable<any> {
    let API_URL = `${this.baseURL}/report/all`;
    return this.http.get(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  

   //Edit 
   updateReport(data: any, id: number): Observable<any> {
    let API_URL = `${this.baseURL}/updateReport/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
   //Delete 
   deleteReport(id: number): Observable<any> {
    let API_URL = `${this.baseURL}/delete/${id}`;
    return this.http.delete(API_URL, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
}

//login and sign up
//create-account
// createAccount(data: any, userId: any): Observable<any> {
//   let API_URL = `${this.baseURL2}`;
//   return this.http.post(API_URL,data, { headers: this.headers, withCredentials: false }).pipe(
//     map((res) => {
//       return res || {};
//     }),
//     catchError(this.errorMgmt)
//   );
// }