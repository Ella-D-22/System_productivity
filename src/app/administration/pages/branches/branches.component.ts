import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { GlCodeService } from '../SystemConfigurations/GlobalParams/gl-code/gl-code.service';
import { BranchesService } from './branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {
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


  messageData: any;
  code: any;
  glCode: any;
  solecode: any;
  solCode: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private branchAPI:BranchesService,
    private dialog: MatDialog,
    ) { 

    }
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
  
    auth_user = "Auth User"

    redirectToMaintenancePage(){
      this.subscription = this.branchAPI.currentMessage.subscribe(message=>{
        this.message = message;
      
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-code/maintenance'));
        }else{
          null;
        }
      })
    }
      formData = this.fb.group({
        solecode:['', [Validators.required]],
        branchDescription:['', [Validators.required]],
        email:['', [Validators.required]],
        phoneNumber:['', [Validators.required]],
        location:['', [Validators.required]],
        modifiedBy:[this.auth_user],
        postedBy:[this.auth_user]
      });

    get f() { return this.formData.controls; }

      disabledFormControll(){
        this.formData.controls.solecode.disable();
        this.formData.controls.branchDescription.disable();
        this.formData.controls.email.disable();
        this.formData.controls.phoneNumber.disable();
        this.formData.controls.location.disable();
      }

      getPage(){
        this.subscription = this.branchAPI.currentMessage.subscribe(message =>{
          this.messageData = message;      
          this.function_type = this.messageData.function_type
          this.solCode = this.messageData.solcode
          
        if(this.function_type == "A-Add"){
          
          // open empty forms
          this.formData.controls.solecode.setValue(this.solecode)
          
          this.formData = this.fb.group({
            solecode:[this.solecode, [Validators.required]],
            branchDescription:['', [Validators.required]],
            email:['', [Validators.required]],
            phoneNumber:['', [Validators.required]],
            location:['', [Validators.required]],
            modifiedBy:[this.auth_user],
            postedBy:[this.auth_user]
          });
          // this.formData.controls.code.disable();
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.branchAPI.getBranchBySolCode(this.solCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              solecode:[this.solecode, [Validators.required]],
              branchDescription:[this.results.entity.branchDescription, [Validators.required]],
              email:[this.results.entity.email, [Validators.required]],
              phoneNumber:[this.results.entity.phoneNumber, [Validators.required]],
              location:[this.results.entity.location, [Validators.required]],
              modifiedBy:[this.auth_user],
              postedBy:[this.auth_user]
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
          this.subscription = this.branchAPI.getBranchBySolCode(this.solCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              sn:[this.results.entity.sn],
              solecode:[this.solecode, [Validators.required]],
              branchDescription:[this.results.entity.branchDescription, [Validators.required]],
              email:[this.results.entity.email, [Validators.required]],
              phoneNumber:[this.results.entity.phoneNumber, [Validators.required]],
              location:[this.results.entity.location, [Validators.required]],
              modifiedBy:[this.auth_user],
              postedBy:[this.auth_user]
            });
            this.formData.controls.glCode.disable();
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
          // Populate data with rotected fileds only verification is enabled
        }
        else if(this.function_type == "C-Cancle"){
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
            this.subscription = this.branchAPI.createBranch(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-code/maintenance'));
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
              this.subscription = this.branchAPI.updateBranch(this.formData.value).subscribe(res=>{
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

