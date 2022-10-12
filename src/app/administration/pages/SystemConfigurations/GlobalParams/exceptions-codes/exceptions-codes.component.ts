import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExceptionsCodesServiceService } from './exceptions-codes-service.service';

@Component({
  selector: 'app-exceptions-codes',
  templateUrl: './exceptions-codes.component.html',
  styleUrls: ['./exceptions-codes.component.scss']
})
export class ExceptionsCodesComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  subscription!:Subscription;
  canVerify = false;
  canDeleted = false;
  prioritizationArray: any = [
    'Customer Level','Account Level','Charge Level','Contract Level'
  ]
  messageData: any;
  sol_id: any;
  subhead_code: any;
  ccy: any;
  message: any;
  function_type: any;
  exception_code: any;
  isEnabled =  false;
  results: any;
  error: any;
  isLookupDisabled = false;
  submitted = false;
  isDeleting = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private exceptionCodeApi: ExceptionsCodesServiceService,
    ) { }
    ngOnInit() {
      // this.redirectToMaintenancePage();
      this.getPage();
    }
      formData = this.fb.group({
        id:[''],
        exception_code: ['', [Validators.required]],
        exce_description:[''],
        exce_code_type:[''],
        exce_work_class_role:[''],
        exce_ignore_exce_overriding_events:[''],
        is_verified:['Y'],
        is_deleted:['N'],
      });

    get f() { return this.formData.controls; }
      disabledFormControll(){
        this.formData.disable()
      }
      getPage(){
        this.subscription = this.exceptionCodeApi.currentMessage.subscribe(message =>{
          this.messageData = message;      
          this.function_type = this.messageData.function_type
          this.exception_code = this.messageData.exception_code
        if(this.function_type == "A-Add"){
          this.canVerify = false;
          this.canDeleted = false;
          this.isEnabled = true;
          this.isLookupDisabled = true;
          // open empty forms
          this.formData = this.fb.group({
            id:[''],
            exception_code: [this.exception_code],
            exce_description:[''],
            exce_code_type:[''],
            exce_work_class_role:[''],
            exce_ignore_exce_overriding_events:[''],
            is_verified:['Y'],
            is_deleted:['N'],
          });
        }
        else if(this.function_type == "I-Inquire"){
          this.canVerify = false;
          this.canDeleted = false;
          this.isEnabled = false;
          this.isLookupDisabled = false;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.exceptionCodeApi.getException_codeId(this.exception_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              id:[this.results.id],
              exception_code:[this.results.exception_code],
              exce_description:[this.results.exce_description],
              exce_code_type:[this.results.exce_code_type],
              exce_work_class_role:[this.results.exce_work_class_role],
              exce_ignore_exce_overriding_events:[this.results.exce_ignore_exce_overriding_events],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
          this.router.navigate([`/system/configurations/global/exceptions-codes/maintenance`], { skipLocationChange: true });
          })
        }
        else if(this.function_type == "M-Modify"){
          this.canVerify = false;
          this.canDeleted = false;
          this.isLookupDisabled = false;
          this.isEnabled = true;
          this.subscription = this.exceptionCodeApi.getException_codeId(this.exception_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              id:[this.results.id],
              exception_code:[this.exception_code],
              exce_description:[this.results.exce_description],
              exce_code_type:[this.results.exce_code_type],
              exce_work_class_role:[this.results.exce_work_class_role],
              exce_ignore_exce_overriding_events:[this.results.exce_ignore_exce_overriding_events],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted],
            });
          }, err=>{
            this.error = err;
          this.router.navigate([`/system/configurations/global/exceptions-codes/maintenance`], { skipLocationChange: true });
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "V-Verify"){
          this.canVerify = false;
          this.canDeleted = false;
          this.isLookupDisabled = false;
          this.isEnabled = true;
          this.subscription = this.exceptionCodeApi.getException_codeId(this.exception_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              id:[this.results.id],
              exception_code:[this.results.exception_code],
              exce_description:[this.results.exce_description],
              exce_code_type:[this.results.exce_code_type],
              exce_work_class_role:[this.results.exce_work_class_role],
              exce_ignore_exce_overriding_events:[this.results.exce_ignore_exce_overriding_events],
              is_verified:[true],
              is_deleted:[this.results.is_deleted]
            });
          }, err=>{
            this.error = err;
          this.router.navigate([`/system/configurations/global/exceptions-codes/maintenance`], { skipLocationChange: true });
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "X-Delete"){
          this.isDeleting = true;
          this.isLookupDisabled = false;
          this.disabledFormControll()
          // should open a page with data and show remove button
          this.subscription = this.exceptionCodeApi.getException_codeId(this.exception_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              id:[this.results.id],
              exception_code:[this.results.exception_code],
              exce_description:[this.results.exce_description],
              exce_code_type:[this.results.exce_code_type],
              exce_work_class_role:[this.results.exce_work_class_role],
              exce_ignore_exce_overriding_events:[this.results.exce_ignore_exce_overriding_events],
              is_verified:[this.results.is_verified],
              is_deleted:['Y'],
            });
          }, err=>{
            this.error = err;
          this.router.navigate([`/system/configurations/global/exceptions-codes/maintenance`], { skipLocationChange: true });
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        } 
      })
      }
      // convenience getter for easy access to form fields
      onSubmit() {
          this.submitted = true;
          console.log("all data ",this.formData.value)
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.exceptionCodeApi.createException_code(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
            },err=>{
              this.error = err;
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
            })
            }else if(this.function_type == "M-Modify"){
              this.subscription = this.exceptionCodeApi.updateException_code(this.exception_code, this.formData.value).subscribe(res=>{
                this.results = res;
                  this._snackBar.open("Record Updated Successfully!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
          this.router.navigate([`/system/configurations/global/exceptions-codes/maintenance`], { skipLocationChange: true });
              },err=>{
                this.error = err;
                this._snackBar.open(this.error, "Try again!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar','login-snackbar'],
                });
              })  
            } else if(this.function_type == "X-Delete"){
               this.isDeleting = true;
               this.isEnabled = false;
                this.subscription = this.exceptionCodeApi.updateException_code(this.exception_code, this.formData.value).subscribe(res=>{
                  this.results = res;
                    this._snackBar.open("Record Deleted Successfully!", "X", {
                      horizontalPosition: this.horizontalPosition,
                      verticalPosition: this.verticalPosition,
                      duration: 3000,
                      panelClass: ['green-snackbar','login-snackbar'],
                    });
          this.router.navigate([`/system/configurations/global/exceptions-codes/maintenance`], { skipLocationChange: true });
                },err=>{
                  this.error = err;
                  this._snackBar.open(this.error, "Try again!", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['red-snackbar','login-snackbar'],
                  });
                })  
            }
          }else{
            this._snackBar.open("Invalid Form Data", "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
          }
      }  
  }