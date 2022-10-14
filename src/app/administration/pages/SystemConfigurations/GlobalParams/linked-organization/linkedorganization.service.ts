import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkedorganizationService {

  headers = new HttpHeaders().set('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Access-Control-Allow-Origin: *', 'application/json');
  // API endpoint
  baseURL = `${environment.productAPI}/api/v1/organization`;
  constructor(private http: HttpClient) { }
  // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  // Add
  createLinkedorganization(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  create(data: any): Observable<any> {
    let CREATE_URL = `${this.baseURL}/add`;
    return this.http.post(CREATE_URL, data, {
      headers: this.headers, withCredentials: false
    }).pipe(map(res => {
      return res || {}
    }), catchError(this.errorMgmt))
  }
  //Fetch
  read(): Observable<any> {
    let API_URL = `${this.baseURL}`;
    console.log("Info", API_URL);
    
    return this.http.get(API_URL, {
      headers: this.headers, withCredentials: false
    }).pipe(map(res => res || {}),
      catchError(this.errorMgmt))
  }
  // Get all
  getLinkedorganizations() {
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
  getLinkedorganizationId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  updateLinkedorganization(id: string | null, data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteLinkedorganization(id: any): Observable<any> {
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
