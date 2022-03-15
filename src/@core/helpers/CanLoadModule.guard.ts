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
}




