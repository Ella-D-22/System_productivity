// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // add authorization header with basic auth credentials if available
//         let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
       
//         if (currentUser) {
//           const accessToken = currentUser.accessToken
//             request = request.clone({
//                 setHeaders: {
//                     Authorization: `${'Bearer' + accessToken}`,
//                 },
//             });
//         }
     

//         return next.handle(request);
//     }

//     errorMgmt(error: HttpErrorResponse) {
//         console.log("the error is", error);
//           let errorMessage = '';
//           if (error.error instanceof ErrorEvent) {
//             // Get client-side error
//             errorMessage = error.error.message;
//           } else {
//             // Get server-side error
//             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//           }
//           console.log(errorMessage);
//           return throwError(errorMessage);
//         }
// }
