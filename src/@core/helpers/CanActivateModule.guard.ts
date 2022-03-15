import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../AuthService/auth.service';

@Injectable({ providedIn: 'root' })
export class CanActivateModuleGuard implements CanActivate {
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    routeRole: any;
    constructor(
        private router: Router,
        private _snackBar: MatSnackBar,
        private authServie: AuthService
    ) { }

    canActivate(){
        let currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
        if (currentUser  === null) {  
            this._snackBar.open("Kindly Provide your credentials!", "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000,
                panelClass: ['red-snackbar','login-snackbar'],
            });    
          this.router.navigateByUrl('sso');
          return false;
           
        }else{
           // authorised so return true
           return true;
        }
    }
}
