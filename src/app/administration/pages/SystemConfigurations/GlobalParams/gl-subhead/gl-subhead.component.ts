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
            deleteFlag: ["N"],
            deletedBy: ["N"],
            deletedTime: [new Date()],
            glCode: [""],
            glSubheadCode: [this.glSubheadCode],
            glSubheadDescription: [""],
            modifiedBy: ["N"],
            modifiedTime: [new Date()],
            postedBy: ["USER"],
            postedFlag:["Y"],
            postedTime: [new Date()],
            verifiedBy: ["N"],
            verifiedFlag: ["N"],
            verifiedTime: [new Date()],
          });
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
            deleteFlag: [this.results.entity.deleteFlag],
            deletedBy: [this.results.entity.deleteBy],
            deletedTime: [this.results.entity.deletedTime],
            glCode: [this.results.entity.glCode],
            glSubheadCode: [this.results.entity.glSubheadCode],
            glSubheadDescription: [this.results.entity.glSubheadDescription],
            modifiedBy: [this.results.entity.modifiedBy],
            modifiedTime: [this.results.entity.modifiedTime],
            postedBy: [this.results.entity.postedBy],
            postedFlag:[this.results.entity.postedFlag],
            postedTime: [this.results.entity.postedTime],
            verifiedBy: [this.results.entityverifiedBy],
            verifiedFlag: [this.results.entity.verifiedFlag],
            verifiedTime: [this.results.entity.verifiedTime],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            // this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){          
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
            deleteFlag: [this.results.entity.deleteFlag],
            deletedBy: [this.results.entity.deletedBy],
            deletedTime: [this.results.entity.deletedTime],
            glCode: [this.results.entity.glCode],
            glSubheadCode: [this.results.entity.glSubheadCode],
            glSubheadDescription: [this.results.entity.glSubheadDescription],
            modifiedBy: ["USER"],
            modifiedTime: [this.results.entity.modifiedTime],
            postedBy: [this.results.entity.postedBy],
            postedFlag:[this.results.entity.postedFlag],
            postedTime: [this.results.entity.postedTime],
            verifiedBy: [this.results.entity.verifiedBy],
            verifiedFlag: [this.results.entity.verifiedFlag],
            verifiedTime: [this.results.entity.verifiedTime], 
            });
            this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "V-Verify"){     
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
            deleteFlag: [this.results.entity.deleteFlag],
            deletedBy: [this.results.entity.deletedBy],
            deletedTime: [this.results.entity.deletedTime],
            glCode: [this.results.entity.glCode],
            glSubheadCode: [this.results.entity.glSubheadCode],
            glSubheadDescription: [this.results.entity.glSubheadDescription],
            modifiedBy: [this.results.entity.modifiedBy],
            modifiedTime: [this.results.entity.modifiedTime],
            postedBy: [this.results.entity.postedBy],
            postedFlag:[this.results.entity.postedFlag],
            postedTime: [this.results.entity.postedTime],
            verifiedBy: ["USER"],
            verifiedFlag: ["Y"],
            verifiedTime: [new Date()], 
            });
            this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "X-Delete"){     
          this.subscription = this.glSubheadCodeAPI.getGlSubheadCodeByCode(this.glSubheadCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
            deleteFlag: ["Y"],
            deletedBy: ["USER"],
            deletedTime: [new Date()],
            glCode: [this.results.entity.glCode],
            glSubheadCode: [this.results.entity.glSubheadCode],
            glSubheadDescription: [this.results.entity.glSubheadDescription],
            modifiedBy: [this.results.entity.modifiedBy],
            modifiedTime: [this.results.entity.modifiedTime],
            postedBy: [this.results.entity.postedBy],
            postedFlag:[this.results.entity.postedFlag],
            postedTime: [this.results.entity.postedTime],
            verifiedBy: [this.results.entityverifiedBy],
            verifiedFlag: [this.results.entity.verifiedFlag],
            verifiedTime: [this.results.entity.verifiedTime], 
            });
            this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
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
          console.log("all data for add ",this.formData.value)

            this.subscription = this.glSubheadCodeAPI.createGlSubheadCode(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
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
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-subhead/maintenance'));
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
