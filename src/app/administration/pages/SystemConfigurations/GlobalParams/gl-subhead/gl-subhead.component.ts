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
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
        }else{
          null;
        }
      })
    }
    refCodeLookup(): void {
      const dialogRef = this.dialog.open(GlCodeLookupComponent, {
        // height: '400px',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.lookupData = result.data;
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
        postedBy: [""],
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
      }
      getPage(){
        this.subscription = this.glSubheadCodeAPI.currentMessage.subscribe(message =>{
          this.messageData = message;      
          this.function_type = this.messageData.function_type
          this.glSubheadCode = this.messageData.glSubheadCode
        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData.controls.glSubheadCode.setValue(this.glSubheadCode)
          this.formData = this.fb.group({
            deleteFlag: [""],
            deletedBy: [""],
            deletedTime: [""],
            glCode: [""],
            glSubheadCode: ["45789"],
            glSubheadDescription: [""],
            modifiedBy: [""],
            modifiedTime: [""],
            postedBy: ["AAA"],
            postedFlag:["Y"],
            postedTime: [new Date()],
            verifiedBy: ["AAA"],
            verifiedFlag: ["Y"],
            verifiedTime: [new Date()],
          });
          console.log("This results",);
          
          // this.formData.controls.code.disable();
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
            this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){          
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              sn:[this.results.entity.sn],
              glCode:[this.results.entity.glCode],
              glSubheadCode: [this.results.entity.glSubheadCode, [Validators.required]],
              glSubheadDescription:[this.results.entity.glSubheadDescription],
              postedBy:["User"],
              modifiedBy:["User"]
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
          console.log("all data for add ",this.formData.value)

            this.subscription = this.glSubheadCodeAPI.createGlSubheadCode(this.formData.value).subscribe(res=>{
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
              this.subscription = this.glSubheadCodeAPI.updateGlSubheadCode(this.formData.value).subscribe(res=>{
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
