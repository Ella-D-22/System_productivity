

import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/@core/Models/user/user.model';

const AUTH_API = `${environment.userAPI}/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  static getToken() {
      throw new Error("Method not implemented.");
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;

  }


validateOTP(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'verifyOTP',data,httpOptions);
}
resetPasswordRequest(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'reset',data,httpOptions);
}

resetPassword(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'reset-password',data,httpOptions);
}

getRoles(): Observable<any> {
  return this.http.get(AUTH_API + 'roles', httpOptions);
}

authenticateUser(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'signin',data,httpOptions);
}

registerUser(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'signup',data,httpOptions);
}

allUsers(): Observable<any> {
  return this.http.get(AUTH_API + 'users', httpOptions);
}

getUserByUsername(username:any): Observable<any> {
  return this.http.get(AUTH_API + `users​/${username}`, httpOptions);
}
updateUser(data:any): Observable<any> {
  return this.http.put(AUTH_API + 'update',data,httpOptions);
}

  getToken(){
       return localStorage.getItem('jwtToken');
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }

  // Message Medium
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
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
