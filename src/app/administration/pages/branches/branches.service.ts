import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL = `${environment.systemAPI}/branch`;
  constructor(private http: HttpClient) { }
  // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  // Add
  createBranch(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/add`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
      return res || {}
    }),
      catchError(this.errorMgmt)
    )
  }
  // Get all
  getBranchs() {
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
  getBranchId(id: any): Observable<any> {
    let API_URL = `${this.baseURL}/find/${id}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  // Get by Code
  getBranchBySolCode(code: any): Observable<any> {
    let API_URL = `${this.baseURL}/${code}`;
    return this.http.get(API_URL, { withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }
  updateBranch(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/update/`;
    return this.http.put(API_URL, data, { headers: this.headers, withCredentials: false })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  deleteBranch(id: any): Observable<any> {
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
