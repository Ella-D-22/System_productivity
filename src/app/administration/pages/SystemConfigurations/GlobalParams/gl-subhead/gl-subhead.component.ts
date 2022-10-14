import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlCodeLookupComponent } from '../gl-code/gl-code-lookup/gl-code-lookup.component';
import { GlSubheadService } from './gl-subhead.service';

@Component({
  selector: 'app-gl-subhead',
  templateUrl: './gl-subhead.component.html',
  styleUrls: ['./gl-subhead.component.scss']
})
export class GlSubheadComponent implements OnInit {
  // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user:String ='kiprotich';

  number_of_accounts!: any
  sum_of_balances!: any

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  isDeleting = false;
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
  messageData: any;
  code: any;
  glCode: any;
  lookupData: any;
  glDescription: any;
  glSubheadCode: any;
  glSubheadDescription: any;
  glCodeDescription: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private glSubheadCodeAPI: GlSubheadService

    ) { }
    ngOnInit() {

      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.glSubheadCodeAPI.currentMessage.subscribe(message=>{
        this.message = message;
        console.log(this.message);

        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.router.navigate(['system/configurations/global/gl-subhead/maintenance'], {skipLocationChange:true})
        }else{
          null;
        }
      })
    }
    refCodeLookup(): void {
      const dialogRef = this.dialog.open(GlCodeLookupComponent, {
        // height: '400px',
        width:'45%'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.lookupData = result;
        this.glCode = this.lookupData.glCode;
        this.glDescription = this.lookupData.glDescription;
        this.formData.controls.glCode.setValue(this.glCode);
      });
    }
      formData = this.fb.group({
        deleteFlag: [""],
        deletedBy: [""],
        deletedTime: [""],
        glCode: [""],
        glSubheadCode: [""],
        glSubheadDescription: [""],
        modifiedBy: [""],
        modifiedTime: [""],
        postedBy: [this.auth_user],
        postedFlag:[""],
        postedTime: [""],
        verifiedBy: [""],
        verifiedFlag: [""],
        verifiedTime: [""],
      });

    get f() { return this.formData.controls; }

      disabledFormControll(){
        this.formData.controls.glSubheadCode.disable();
        this.formData.controls.glSubheadDescription.disable();
        this.formData.controls.glCode.disable();
      }
      getSummary(glsubhead: any){
        this.glSubheadCodeAPI.getGLAccountInfo(glsubhead).subscribe(
          data=>{
            console.log(data)
            this.sum_of_balances=data.entity.sumOfAccountBalances;
            this.number_of_accounts=data.entity.numberOfAccounts;
            if (this.sum_of_balances=="null"){
              this.sum_of_balances=0;
            }
            console.log("balances",this.sum_of_balances)
            console.log("accounts",this.number_of_accounts)
          },
          error1 => {

          }
        )
      }
      getPage(){
        this.subscription = this.glSubheadCodeAPI.currentMessage.subscribe(message =>{
          this.messageData = message;
          this.function_type = this.messageData.function_type
          this.glSubheadCode = this.messageData.glSubheadCode
          this.getSummary(this.glSubheadCode);
        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData.controls.glSubheadCode.setValue(this.glSubheadCode)
          this.formData = this.fb.group({
            deleteFlag: ["N"],
            deletedBy: ["N"],
            deletedTime: [""],
            glCode: [""],
            glSubheadCode: [this.glSubheadCode],
            glSubheadDescription: [""],
            modifiedBy: ["P"],
            modifiedTime: [""],
            postedBy: [this.auth_user],
            postedFlag:["Y"],
            postedTime: [new Date()],
            verifiedBy: ["P"],
            verifiedFlag: ["Y"],
            verifiedTime: [new Date()],
          });
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              glCode:[this.results.entity.glCode],
              glSubheadCode: [this.results.entity.glSubheadCode, [Validators.required]],
              glSubheadDescription:[this.results.entity.glSubheadDescription],
              postedBy:["User"],
              modifiedBy:["User"]
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            this.router.navigate(['system/configurations/global/gl-subhead/maintenance'], {skipLocationChange:true})
          })
        }
        else if(this.function_type == "M-Modify"){
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              sn:[this.results.entity.sn],
              glSubheadCode: [this.results.entity.glSubheadCode, [Validators.required]],
              glCode:[this.results.entity.glCode],
              glSubheadDescription:[this.results.entity.glSubheadDescription],
              modifiedBy: [this.auth_user],
              modifiedTime: [new Date()],
              postedBy: [this.results.entity.postedBy],
              postedFlag:[this.results.entity.postedFlag],
              postedTime: [this.results.entity.postedTime],
              verifiedBy: [this.results.entity.verifiedBy],
              verifiedFlag: [this.results.entity.verifiedFlag],
              verifiedTime: [this.results.entity.verifiedTime],
              deleteFlag: [this.results.entity.deleteFlag],
              deletedBy: [this.results.entity.deletedBy],
              deletedTime: [this.results.entity.deletedTime]
            });
          }, err=>{
            this.error = err;
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
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              sn:[this.results.entity.sn],
              glSubheadCode: [this.results.entity.glSubheadCode, [Validators.required]],
              glCode:[this.results.entity.glCode],
              glSubheadDescription:[this.results.entity.glSubheadDescription],
              modifiedBy: [this.results.entity.modifiedBy],
              modifiedTime: [new Date()],
              postedBy: [this.results.entity.postedBy],
              postedFlag:[this.results.entity.postedFlag],
              postedTime: [this.results.entity.postedTime],
              verifiedBy: [this.auth_user],
              verifiedFlag: ["Y"],
              verifiedTime: [new Date()],
              deleteFlag: [this.results.entity.deleteFlag],
              deletedBy: [this.results.entity.deletedBy],
              deletedTime: [this.results.entity.deletedTime]
            });
            // this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "X-Delete"){
          // should open a page with data and show remove button
          this.isDeleting = true;
          this.isEnabled = false;
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              sn:[this.results.entity.sn],
              glSubheadCode: [this.results.entity.glSubheadCode, [Validators.required]],
              glCode:[this.results.entity.glCode],
              glSubheadDescription:[this.results.entity.glSubheadDescription],
              modifiedBy: [this.results.entity.modifiedBy],
              modifiedTime: [new Date()],
              postedBy: [this.results.entity.postedBy],
              postedFlag:[this.results.entity.postedFlag],
              postedTime: [this.results.entity.postedTime],
              verifiedBy: [this.results.entity.verifiedBy],
              verifiedFlag: [this.results.entity.verifiedFlag],
              verifiedTime: [this.results.entity.verifiedTime],
              deleteFlag: ["Y"],
              deletedBy: [this.auth_user],
              deletedTime: [new Date()]
            });
            // this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
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
        console.log("data for sub gl", this.formData.value);
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.glSubheadCodeAPI.createGlSubheadCode(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("General Ledger added successfully", "OK", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
                this.router.navigate(['system/configurations/global/gl-subhead/maintenance'], {skipLocationChange:true})
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
              this.subscription = this.glSubheadCodeAPI.updateGlSubheadCode(this.formData.value).subscribe(res=>{
                this.results = res;
                console.log("The subscribe data", this.results);
                  this._snackBar.open("General Ledger Record Updated Successfully", "OK", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
                  this.router.navigate(['system/configurations/global/gl-subhead/maintenance'], {skipLocationChange:true})
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
            else if(this.function_type == "X-Delete"){
              this.subscription = this.glSubheadCodeAPI.updateGlSubheadCode(this.formData.value).subscribe(res=>{
                this.results = res;
                console.log("The subscribe data", this.results);

                  this._snackBar.open("General Ledger Record deleted Successfully", "OK", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
                  this.router.navigate(['system/configurations/global/gl-subhead/maintenance'], {skipLocationChange:true})
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

          }
          else{
            this._snackBar.open("Error, General Ledger Form Data is invalid!!", "TRY AGAIN", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
          }
      }
  }
