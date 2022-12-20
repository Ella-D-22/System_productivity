import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/@core/Models/user/user.model';
import { AuthService  } from 'src/@core/AuthService/auth.service';
import { NgZone } from '@angular/core';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    error = '';

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
  message: any;

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
      this.initLoginForm();
    }

    loginForm = this.formBuilder.group({
      username:    ['', Validators.required],
      password: ['', Validators.required]
  });

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      username:    ['', Validators.required],
      password: ['', Validators.required]
  });
  }

    removeUser(){
      localStorage.removeItem('currentUser');
      this.loginForm = this.formBuilder.group({
          username:    ['', Validators.required],
          password: ['', Validators.required],
      });
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(): void {
      console.log("Login details submitted");
      console.log(this.loginForm.valid);
      this.loading = true;
       //if(this.loginForm.valid){
      //   this.authService.login(this.f.username.value, this.f.password.value)
      //   .subscribe(result =>{
      //     if(result.success){
      //       console.log(result);
      //       alert(result.message); 
      //     }else{
      //       alert(result.message);
      //     };
      //     //this.router.navigate([`/system`]);
         
      //   }
      //     )
      // }
      if(this.loginForm.valid){
      this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([`/system`]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
              }

    this.authService.authenticateUser(this.loginForm.value).subscribe(
      data => {
        this.message = data;
        console.log("DATA", this.message);

//      Send to Message Medium
        this.authService.changeMessage(data)
        this._snackBar.open("Successful Redirecting...", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });

        this.tokenStorage.saveToken(this.message.accessToken);
      this.tokenStorage.saveUser(this.message);

        this.router.navigate(['/system']);

                // Call function to set Data to local storage

      // redirect to  respective module system
      if(this.message.roles[1]=="ROLE_ADMIN", "ROLE_MODERATOR"){
      this.ngZone.run(() => this.router.navigate(['/superuser']));
      }else{
        this.ngZone.run(() => this.router.navigate(['/system']));
      }
      //this.router.navigate(['/', 'page-name']);

        //this.loading = false;
        // To OTP Auth;
        // this.router.navigate(['/otp'], { skipLocationChange: true });
      },
      err => {
        this.loading = false;
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
