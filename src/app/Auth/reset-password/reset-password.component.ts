import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from 'src/@core/AuthService/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

    loading = false;
    submitted = false;
    error = '';
    success = '';
  params!: HttpParams;
  res: any;
  errorMessage: any;
  myForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _snackBar: MatSnackBar,
        private ngZone: NgZone,
        private http: HttpClient,
        private authService: AuthService
    ) {
        // redirect to home if already logged in

    }

    ngOnInit() {

      var password = Math.random().toString(36).slice(-8);

        this.myForm = this.formBuilder.group({
            email:    ['', Validators.required],
            password:    [password, Validators.required]
        });

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Auth/hod';


    }

    // convenience getter for easy access to form fields
    get f() { return this.myForm.controls; }


headers = new HttpHeaders().set('Content-Type', 'application/json');

onSubmit() {
this.loading = true;
var password = Math.random().toString(36).slice(-8);
const data = this.myForm.value;
this.params = new HttpParams()
.set('email', this.f.email.value)
.set('password', password);

let API_URL = `${environment.empAPI}/api/auth/password/reset/`;
return this.http.put(API_URL,{},{params: this.params, headers: this.headers, withCredentials: false }).subscribe(results  => {
this.loading = false;
            this._snackBar.open("Password Reset Successfully  Check your submited Email!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar','login-snackbar'],
            });
              this.ngZone.run(() => this.router.navigateByUrl('login'));

},error => {
  this.loading = false;
      this._snackBar.open(error, "X", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });

  });


}



// onResetPassword(id: any){
//   // initialize form
//   this.employeeAPI.getEmployeeId(id).subscribe(user => {
//     this.employee_id = user.id.toString();
//     this.employeeEmail = user.personalEmail;
//     var password = Math.random().toString(36).slice(-8);

//     this.formData = this.fb.group({
//       username: [this.employeeEmail, [Validators.required]],
//       employee_id: [this.employee_id , [Validators.required]],
//       password: [password, [Validators.required]]
//     });

//     if(this.formData.valid){

//       this.authAPI.resetPassword(this.formData.value).pipe(first())
//       .subscribe(
//         result => {
//             this._snackBar.open("Password Reset Successfully  Check your submited Email!", "X", {
//               horizontalPosition: this.horizontalPosition,
//               verticalPosition: this.verticalPosition,
//               duration: 3000,
//               panelClass: ['green-snackbar','login-snackbar'],
//             });
//               this.ngZone.run(() => this.router.navigateByUrl('login'));
//           },
//           error => {

//     this._snackBar.open(error, "X", {
//       horizontalPosition: this.horizontalPosition,
//       verticalPosition: this.verticalPosition,
//       duration: 3000,
//       panelClass: ['red-snackbar','login-snackbar'],
//     });
//           });

//         }else{
//     this._snackBar.open("Invalid Form data", "X", {
//       horizontalPosition: this.horizontalPosition,
//       verticalPosition: this.verticalPosition,
//       duration: 3000,
//       panelClass: ['red-snackbar','login-snackbar'],
//     });
//         }
//   });

// }


}
