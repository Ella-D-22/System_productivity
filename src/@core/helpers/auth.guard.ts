import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../Service/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    routeRole: any;
    constructor(
        private router: Router,
        private _snackBar: MatSnackBar,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
    // this.currentUser = sessionStorage.getItem('auth-user');
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

    if (currentUser) {
        // check if route is restricted by role
        this.routeRole = route.data;
        if (this.routeRole.roles[0] != currentUser.user_identity) {
            // role not authorised so redirect to home page
                    this._snackBar.open("Sorry! No sufficient permissions to access! Kindly consult your higher level supervisor.", "X", {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: 5000,
                        panelClass: ['red-snackbar','login-snackbar'],
                    });
            // this.router.navigate(['/Auth/login']);
            return false;
        }
        // authorised so return true
        return true;
    }
  
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Auth/login']);
    return false;
 
  }


}


// import { Injectable } from '@angular/core';
// import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AuthenticationService } from '../Service/authentication.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     horizontalPosition: MatSnackBarHorizontalPosition = 'end';
//     verticalPosition: MatSnackBarVerticalPosition = 'top';
//     routeRole: any;
//     constructor(
//         private router: Router,
//         private _snackBar: MatSnackBar,
//         private authenticationService: AuthenticationService
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
//     // this.currentUser = sessionStorage.getItem('auth-user');
//     let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

//     if (currentUser) {
//         // check if route is restricted by role
//         this.routeRole = route.data;
//             for (let auth_role of this.routeRole.roles) {
//                 console.log(auth_role)
//                 if (auth_role != currentUser.roles[0] ) {
//                     // role not authorised so redirect to home page
//                             this._snackBar.open("Sorry! No sufficient permissions to access! Kindly consult your higher level supervisor.", "X", {
//                                 horizontalPosition: this.horizontalPosition,
//                                 verticalPosition: this.verticalPosition,
//                                 duration: 5000,
//                                 panelClass: ['red-snackbar','login-snackbar'],
//                             });
//                     // this.router.navigate(['/Auth/login']);
//                     return false;
//                 }
//                 // authorised so return true
//                 return true;

//             }


//     }
  
//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/Auth/login']);
//     return false;
 
//   }


// }

