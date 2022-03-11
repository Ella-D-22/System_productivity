import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService  } from 'src/@core/AuthService/auth.service';
import { NgZone } from '@angular/core';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  loading = false;
  submitted = false;
  error: any;
  subscription!: Subscription

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
    this.redirectToLogin();
    this.initLoginForm();
  }

  redirectToLogin(){
    this.subscription =  this.authService.currentMessage.subscribe(message=>{
      this.message = message;
      if(this.message == "default message"){
        this.ngZone.run(() => this.router.navigateByUrl('sso'));
      }
    }
   );
  }

  formData = this.formBuilder.group({
    username:['', Validators.required],
    otp:    ['', Validators.required]
  });

  initLoginForm(){
    this.subscription =  this.authService.currentMessage.subscribe(message=>{
      this.message = message;
      this.formData = this.formBuilder.group({
        username:[this.message.username, Validators.required],
        otp:    ['', Validators.required]
      });
    });
  }

  removeUser(){
    localStorage.removeItem('currentUser');
    this.formData = this.formBuilder.group({
      otp:    ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  setUserToLocalStorage(){
    this.subscription =  this.authService.currentMessage.subscribe(message=>{
      this.message = message;
      if( this.message == "default message"){
        this._snackBar.open("Kindly Sign in!", "X", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
        this.ngZone.run(() => this.router.navigateByUrl('sso'));
      }else{
        // Call function to set Data to local storage
      this.tokenStorage.saveToken(this.message.accessToken);
      this.tokenStorage.saveUser(message);
    
      this._snackBar.open("Signin Successfull!", "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      // redirect to system
      this.ngZone.run(() => this.router.navigateByUrl('system'));
      }

    })
  }
  onSubmit(): void {
  this.loading = true;
  this.authService.validateOTP(this.formData.value).subscribe(
    data => {
      this.setUserToLocalStorage();
      this.loading = false;
    },
    err => {
      this.error = err;
      this.loading = false;
      this._snackBar.open(this.error.error.message, "X", {
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

