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
    // redirectToMaintenancePage(){
    //   this.subscription = this.exceptionCodeApi.changeMessage().subscribe(message=>{
    //     this.message = message;
    //     if( this.message == "default message"){
    //       // Redirect to maintenace if no action header
    //       this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
    //     }else{
    //       null;
    //     }
    //   })
    // }

      formData = this.fb.group({
        id:[''],
        exception_code: ['', [Validators.required]],
        exce_description:[''],
        exce_code_type:[''],
        exce_working_class:[''],
        exce_work_class_min:[''],
        exce_authorization_matrix_id:[''],
        exce_gen_ledger_type:[''],
        exce_ignore_exce_overriding_events:[''],
        exce_channel_exce:[''],
        exce_is_verified:[''],
        exce_is_deleted:[''],
      });

    get f() { return this.formData.controls; }

      disabledFormControll(){
        this.formData.controls.exception_code.disable();
        this.formData.controls.exce_description.disable();
        this.formData.controls.exce_code_type.disable();
        this.formData.controls.exce_working_class.disable();
        this.formData.controls.exce_work_class_min.disable();
        this.formData.controls.exce_authorization_matrix_id.disable();
        this.formData.controls.exce_gen_ledger_type.disable();
        this.formData.controls.exce_ignore_exce_overriding_events.disable();
        this.formData.controls.exce_channel_exce.disable();
        this.formData.controls.exce_is_verified.disable();
        this.formData.controls.exce_is_deleted.disable();
      }
      getPage(){
        this.subscription = this.exceptionCodeApi.currentMessage.subscribe(message =>{
          console.log("data here",message )
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
            exce_working_class:[''],
            exce_work_class_min:[''],
            exce_authorization_matrix_id:[''],
            exce_gen_ledger_type:[''],
            exce_ignore_exce_overriding_events:[''],
            exce_channel_exce:[''],
            exce_is_verified:[''],
            exce_is_deleted:[''],
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
              id:[''],
              exception_code:[this.exception_code],
            
              exce_description:[this.results.exce_description],
              exce_code_type:[this.results.exce_code_type],
              exce_working_class:[this.results.exce_working_class],
              exce_work_class_min:[this.results.exce_work_class_min],
              exce_authorization_matrix_id:[this.results.exce_authorization_matrix_id],
              exce_gen_ledger_type:[this.results.exce_gen_ledger_type],
              exce_ignore_exce_overriding_events:[this.results.exce_ignore_exce_overriding_events],
              exce_channel_exce:[this.results.exce_channel_exce],
              exce_is_verified:[this.results.exce_is_verified],
              exce_is_deleted:[this.results.exce_is_deleted],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
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
              id:[''],
              exception_code:[this.exception_code],
            
              exce_description:[this.results.exce_description],
              exce_code_type:[this.results.exce_code_type],
              exce_working_class:[this.results.exce_working_class],
              exce_work_class_min:[this.results.exce_work_class_min],
              exce_authorization_matrix_id:[this.results.exce_authorization_matrix_id],
              exce_gen_ledger_type:[this.results.exce_gen_ledger_type],
              exce_ignore_exce_overriding_events:[this.results.exce_ignore_exce_overriding_events],
              exce_channel_exce:[this.results.exce_channel_exce],
              exce_is_verified:[this.results.exce_is_verified],
              exce_is_deleted:[this.results.exce_is_deleted],
            });
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
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
          this.canDeleted = true;
          this.isLookupDisabled = false;
          // Populate data with rotected fileds only verification is enabled
        }
        else if(this.function_type == "C-Cancel"){
          this.canVerify = false;
          this.canDeleted = false;
          this.isLookupDisabled = false;
          // should open a page with data and show remove button
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
                  this._snackBar.open("Executed Successfully!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/maintenance'));
                  // system/configurations/global/linked/organization/maintenance
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