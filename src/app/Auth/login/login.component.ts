import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/Service/AuthService/auth.service';
import { NgZone } from '@angular/core';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
    [x: string]: any;
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    error = '';

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private tokenStorage: TokenStorageService
    ) {
        // redirect to home if already logged in

    }

    ngOnInit() {

    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    //   this.ngZone.run(() => this.router.navigateByUrl('/'));
    // }

    // *********************hey*****************/

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
        this.loginForm = this.formBuilder.group({
            username:    ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Auth/hod';


    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(): void {
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.role = data.roles;
        this.status = data.account_status;
        if(this.status != "Approved"){
          this._snackBar.open("Your account is locked, contact your HR!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
    this.ngZone.run(() => this.router.navigateByUrl('Auth/login'));
      }else{
        this.user_identity = data.user_identity;
        if(this.user_identity == "Administrator"){
          this.ngZone.run(() => this.router.navigateByUrl('administration'));
        }else if(this.user_identity == "User"){
          this.ngZone.run(() => this.router.navigateByUrl('portal'));
        }
      }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      },
      err => {

        this.loading = false;
        this.errorMessage = err;
        this.isLoginFailed = true;
        this._snackBar.open("Check your Credentials", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      }
    );
  }


    reloadPage(): void {
      window.location.reload();
    }
}
