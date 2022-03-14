import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { LinkedorganizationService } from '../linked-organization/linkedorganization.service';
import { SchemeTypeService } from './scheme-type.service';

@Component({
  selector: 'app-scheme-type',
  templateUrl: './scheme-type.component.html',
  styleUrls: ['./scheme-type.component.scss']
})
export class SchemeTypeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  dialogValue: any;
  dialogData: any;
  function_type: any;
  event_type: any;
  event_id: any;
  subscription!:Subscription;
  error: any;
  results: any;
  showContractInput = false;
  showDerivationInput = false;
  showAmtDerivationInput= false;
  showPercentageDerivationInput= false;
  showFilenameDerivationInput= false;
  showChargecodeDerivationInput= false;
  showMrtFilenameDerivationInput= false;
  chrg_calc_crncy: any;
  chrg_coll_crncy: any;
  showExerciseDutyPercentageInput = false;
  params: any;
  organization_id: any;
  submitted = false;
  message: any;
  organization_name: any;
  showPercentageField = false;
  showFixedAmtField = false;
  org_chrg_crncy: any;
  formn: any;
  formcontrOrg: any;
  infosecdes: any;

  prioritizationArray: any = [
    'Customer Level','Account Level','Charge Level','Contract Level'
  ]
  scheme_id: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private schemeTypeAPI:  SchemeTypeService,
    ) { }
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.schemeTypeAPI.currentMessage.subscribe(message =>{
        this.message = message;
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));
        }else{
          null;
        }
      })
    }
      ac_placeholder = "";
      min_amt_ccy = "";
      max_amt_ccy = "";
      linked_event_id = "";
      formData = this.fb.group({
        scheme_type:['', [Validators.required]],
        scheme_abbreviation:[''],
        scheme_category:[''],
        scheme_description:[''],
        is_verified:[''],
        is_deleted:['']
      });
    get f() { return this.formData.controls; }
      disabledFormControll(){
        this.formData.controls.scheme_type.disable();
        this.formData.controls.scheme_abbreviation.disable();
        this.formData.controls.scheme_category.disable();
        this.formData.controls.scheme_description.disable();
        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();
      }
      getPage(){
        this.subscription = this.schemeTypeAPI.currentMessage.subscribe(message =>{
          console.log("data here",message )
          this.message = message;      
          this.function_type = this.message.function_type
          this.scheme_id = this.message.lookupData.id
          this.organization_id = this.message.organization_id
        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({
            scheme_type:['', [Validators.required]],
            scheme_abbreviation:[''],
            scheme_category:[''],
            scheme_description:[''],
            is_verified:[''],
            is_deleted:['']
          });
        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.schemeTypeAPI.getSchemetypeId(this.scheme_id).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              scheme_type:[this.results.scheme_type, [Validators.required]],
              scheme_abbreviation:[this.results.scheme_abbreviation],
              scheme_category:[this.results.scheme_category],
              scheme_description:[this.results.scheme_description],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){

        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();

          this.subscription = this.schemeTypeAPI.getSchemetypeId(this.scheme_id).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              scheme_type:[this.results.scheme_type, [Validators.required]],
              scheme_abbreviation:[this.results.scheme_abbreviation],
              scheme_category:[this.results.scheme_category],
              scheme_description:[this.results.scheme_description],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
            });
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "V-Verify"){

          this.disabledFormControll();
          this.formData.controls.is_verified.enable();

            this.subscription = this.schemeTypeAPI.getSchemetypeId(this.scheme_id).subscribe(res=>{
              this.results = res;
              this.formData = this.fb.group({
                scheme_type:[this.results.scheme_type, [Validators.required]],
                scheme_abbreviation:[this.results.scheme_abbreviation],
                scheme_category:[this.results.scheme_category],
                scheme_description:[this.results.scheme_description],
                is_verified:[this.results.is_verified],
                is_deleted:[this.results.is_deleted]
              });
            }, err=>{
              this.error = err;
                this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));
                this._snackBar.open(this.error, "Try again!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar','login-snackbar'],
                });
            })
        }
        else if(this.function_type == "X-Delete"){

          this.disabledFormControll();
          this.formData.controls.is_deleted.enable();

            this.subscription = this.schemeTypeAPI.getSchemetypeId(this.scheme_id).subscribe(res=>{
              this.results = res;
              this.formData = this.fb.group({
                scheme_type:[this.results.scheme_type, [Validators.required]],
                scheme_abbreviation:[this.results.scheme_abbreviation],
                scheme_category:[this.results.scheme_category],
                scheme_description:[this.results.scheme_description],
                is_verified:[this.results.is_verified],
                is_deleted:[this.results.is_deleted]
              });
            }, err=>{
              this.error = err;
                this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));
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
          // stop here if form is invalid
          if (this.formData.valid) {
            console.log("this is the submited data", this.formData.value);
            
            if(this.function_type == "A-Add"){
            this.subscription = this.schemeTypeAPI.createSchemetype(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));                
            },err=>{
              this.error = err;
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
            })
            }else if(this.function_type != "A-Add"){
              this.subscription = this.schemeTypeAPI.updateSchemetype(this.scheme_id, this.formData.value).subscribe(res=>{
                this.results = res;
                  this._snackBar.open("Executed Successfully!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });              
                  this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/maintenance'));                
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