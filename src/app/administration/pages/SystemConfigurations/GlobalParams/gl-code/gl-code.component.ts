import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { SchemeTypeService } from '../scheme-type/scheme-type.service';
import { GlCodeService } from './gl-code.service';

@Component({
  selector: 'app-gl-code',
  templateUrl: './gl-code.component.html',
  styleUrls: ['./gl-code.component.scss']
})
export class GlCodeComponent implements OnInit {
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
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private glcodeAPI:GlCodeService,
    ) { }
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.glcodeAPI.currentMessage.subscribe(message=>{
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
        glCode:['', [Validators.required]],
        glDescription:[''],
        modifiedBy:[''],
        modifiedTime:[''],
        postedBy:[''],
        postedTime:[''],
        postedFlag:[''],
        verifiedBy:[''],
        verifiedTime:[''],
        verifiedFlag:[''],
        deletedBy:[''],
        deletedFlag:[''],
        deletedTime:['']
      });

    get f() { return this.formData.controls; }

      disabledFormControll(){
        this.formData.controls.glCode.disable();
        this.formData.controls.glDescription.disable();
      }
      getPage(){
        this.subscription = this.glcodeAPI.currentMessage.subscribe(message =>{
          this.messageData = message;      
          this.function_type = this.messageData.function_type
          this.glCode = this.messageData.glCode
        if(this.function_type == "A-Add"){
          
          // open empty forms
          this.formData.controls.glCode.setValue(this.glCode)
          
          this.formData = this.fb.group({
            glCode:[this.glCode, [Validators.required]],
            glDescription:[''],
            modifiedBy:[''],
            modifiedTime:[''],
            postedBy:['Collins'],
            postedTime:[new Date()],
            postedFlag:[''],
            verifiedBy:[''],
            verifiedTime:[''],
            verifiedFlag:[''],
            deletedBy:[''],
            deletedFlag:[''],
            deletedTime:['']
          });
          // this.formData.controls.code.disable();
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          console.log("this is the code", this.glCode);
          
          this.subscription = this.glcodeAPI.getGlcodeByCode(this.glCode).subscribe(res=>{
            
            this.results = res;
            console.log("this is the res", res);
            
            this.formData = this.fb.group({
              glCode:[this.glCode, [Validators.required]],
              glDescription:[this.results.entity.glDescription],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-code/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){          
          this.subscription = this.glcodeAPI.getGlcodeByCode(this.glCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              deleteFlag: [this.results.entity.deleteFlag],
              deletedBy: [this.results.entity.deletedBy],
              deletedTime: [this.results.entity.deletedTime],
              glCode: [this.results.entity.glCode],
              glDescription: [this.results.entity.glDescription],
              modifiedBy: [this.results.entity.modifiedBy],
              modifiedTime: [this.results.entity.modifiedTime],
              postedBy: [this.results.entity.postedBy],
              postedFlag: [this.results.entity.postedFlag],
              postedTime: [this.results.entity.postedTime],
              sn: [this.results.entity.sn],
              verifiedBy: [this.results.entity.verifiedBy],
              verifiedFlag: [this.results.entity.verifiedFlag],
              verifiedTime: [this.results.entity.verifiedTime]
            });
            // this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-code/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "V-Verify"){
          this.subscription = this.glcodeAPI.getGlcodeByCode(this.glCode).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              deleteFlag: [this.results.entity.deleteFlag],
              deletedBy: [this.results.entity.deletedBy],
              deletedTime: [this.results.entity.deletedTime],
              glCode: [this.results.entity.glCode],
              glDescription: [this.results.entity.glDescription],
              modifiedBy: [this.results.entity.modifiedBy],
              modifiedTime: [this.results.entity.modifiedTime],
              postedBy: [this.results.entity.postedBy],
              postedFlag: [this.results.entity.postedFlag],
              postedTime: [this.results.entity.postedTime],
              sn: [this.results.entity.sn],
              verifiedBy: [this.results.entity.verifiedBy],
              verifiedFlag: ["Y"],
              // verifiedTime: [this.results.entity.verifiedTime]
            });
            // this.formData.controls.glCode.disable();
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-code/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
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
            this.subscription = this.glcodeAPI.createGlcode(this.formData.value).subscribe(res=>{
              this.results = res;
              console.log("message respond",res);
              
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
              this.subscription = this.glcodeAPI.updateGlcode(this.formData.value).subscribe(res=>{
                this.results = res;

                  this._snackBar.open( this.results.message, "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/gl-code/maintenance'));
                  // system/configurations/global/gl-code/maintenance
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
