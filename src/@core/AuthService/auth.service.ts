

import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/@core/Models/user/user.model';

const AUTH_API = `${environment.logAPI}`;
const Auth_Api = `${environment.signAPI}`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  static getToken() {
      //throw new Error("Method not implemented.");
  }
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;

  }


  login(username: string, password: string) {
    return this.http.post<any>(AUTH_API, { username, password }, httpOptions)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
}
signup(username: string, email: string, password: string) {
  return this.http.post<any>(Auth_Api, { username, email, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
}

activate(token: string) {
  console.log("got activated");
  console.log("the backend", token);
  return this.http.post<any>(AUTH_API, {token})
  .pipe(map(res => {
    return res;
  }));
  
  
}

// logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
// }


validateOTP(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'verifyOTP',data,httpOptions);
}
// resetPasswordRequest(data:any): Observable<any> {
//   return this.http.post(AUTH_API + 'reset',data,httpOptions);
// }

resetPassword(data:any): Observable<any> {
  return this.http.post(AUTH_API + 'reset-password',data,httpOptions);
}

// getRoles(): Observable<any> {
//   return this.http.get(AUTH_API + 'roles', httpOptions);
// }

authenticateUser(data:any): Observable<any> {
  return this.http.post(AUTH_API, httpOptions );
}

// registerUser(data:any): Observable<any> {
//   return this.http.post(AUTH_API + 'signup',data,httpOptions);
// }

// allUsers(): Observable<any> {
//   return this.http.get(AUTH_API , httpOptions);
// }

// getUserByUsername(username:any): Observable<any> {
//   return this.http.get(AUTH_API+`account/${username}`, httpOptions);
// }


// getUserByUsername(username:any): Observable<any> {
//   let API_URL = `${environment.userAPI}/account/${username}`;
//   return this.http.get(API_URL, { headers: this.headers, withCredentials: false })
//     .pipe(
//       map((res) => {
//         return res || {}
//       }),
//       catchError(this.errorMgmt)
//     )
// }



// updateUser(data:any): Observable<any> {
//   console.log(data);
  
//   return this.http.put(AUTH_API + 'users/update',data,httpOptions);
// }

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
