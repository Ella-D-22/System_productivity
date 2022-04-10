import { CanLoad, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../AuthService/auth.service';
@Injectable()
export class CanLoadModuleGuard implements CanLoad {
  routeRole: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {
  }
  canLoad(route: Route){
    let currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
    if (currentUser  === null) {      
      this.router.navigateByUrl('sso');
      return false;
    }else{
       // authorised so return true
       return true;
    }
}



// canLoad(route: Route){
        
//   // this.currentUser = sessionStorage.getItem('auth-user');
//   let currentUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

//   if (currentUser) {
//       // check if route is restricted by role
//       this.routeRole = route.data;
//       if (this.routeRole.roles[0] != currentUser.user_identity ) {
//           // role not authorised so redirect to home page
//                   this._snackBar.open("Sorry! No sufficient permissions to access!.", "X", {
//                       horizontalPosition: this.horizontalPosition,
//                       verticalPosition: this.verticalPosition,
//                       duration: 5000,
//                       panelClass: ['red-snackbar','login-snackbar'],
//                   });
//           // this.router.navigate(['/Auth/login']);
//           return false;
//       }
//       // authorised so return true
//       return true;
//   }

//   // not logged in so redirect to login page with the return url
//   this.router.navigate(['/Auth/login']);
//   return false;

// }

}
