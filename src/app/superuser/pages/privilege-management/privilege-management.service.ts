import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeManagementService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL = `${environment.userAPI}/privileges`;
  roleURL = `${environment.userAPI}/auth`;

    constructor(private http: HttpClient) { }
     // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  // Add
  createPrivilege(data: any): Observable<any> {
    let API_URL = `${this.baseURL}/rolePrivilege`;
    return this.http.post(API_URL, data, { headers: this.headers, withCredentials: false }).pipe(map(res => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
    // Get all Roles
    getRoles() {
      let API_URL = `${this.roleURL}/roles`;
      return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
      .pipe(
        map((res) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

  // Get all
  getPrivileges(params:any) {
    let API_URL = `${this.baseURL}/module/access`;
    return this.http.get(API_URL,{params:params, headers: this.headers, withCredentials: false })
    .pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get by id
  getPrivilegeId(id: any): Observable<any> {
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
    getPrivilegeByCode(groupCode: any): Observable<any> {
      let API_URL = `${this.baseURL}/find/${groupCode}`;
      return this.http.get(API_URL, { withCredentials: false })
        .pipe(
          map((res) => {
            return res || {}
          }),
          catchError(this.errorMgmt)
        )
    }


  updatePrivilege(data:any): Observable<any> {
    let API_URL = `${this.baseURL}/update/`;
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