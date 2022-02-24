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
  invalid:any;


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
        solCode:['', [Validators.required]],
        branchDescription:['', [Validators.required]],
        email:['', [Validators.email]],
        phoneNumber:['', [Validators.required]],
        location:['', [Validators.required]],
        // modifiedBy:[this.auth_user],
        // postedBy:[this.auth_user]
        deletedBy:[this.auth_user],
        deletedTime:[new Date()],
        deletedFlag:['N'],
        verifiedBy:[this.auth_user],
        verifiedTime:[new Date()],
        verifiedFlag:['Y'],
        postedBy:[this.auth_user],
        postedTime:[new Date()],
        postedFlag:['Y'],
        modifiedBy:[this.auth_user],
        modifiedTime:[new Date()],
      });

    get f() { return this.formData.controls; }

      disabledFormControl(){
        this.formData.controls.solCode.disable();
        this.formData.controls.branchDescription.disable();
        this.formData.controls.email.disable();
        this.formData.controls.phoneNumber.disable();
        this.formData.controls.location.disable();
      }

      getPage(){
        this.subscription = this.branchAPI.currentMessage.subscribe(message =>{
          this.messageData = message;      
          this.function_type = this.messageData.function_type
          this.solCode = this.messageData.solCode
          console.log(this.solCode);
          console.log(this.messageData);
          
        if(this.function_type == "A-Add"){
          
        
          this.formData = this.fb.group({
            solCode:[this.solCode],
            branchDescription:['', [Validators.required]],
            email:['', [Validators.email,Validators.required]],
            phoneNumber:['', [Validators.required]],
            location:['', [Validators.required]],
            // modifiedBy:[this.auth_user],
            // postedBy:[this.auth_user]
            deletedBy:[this.auth_user],
            deletedTime:[new Date()],
            deletedFlag:['N'],
            verifiedBy:[this.auth_user],
            verifiedTime:[new Date()],
            verifiedFlag:['Y'],
            postedBy:[this.auth_user],
            postedTime:[new Date()],
            postedFlag:['Y'],
            modifiedBy:[this.auth_user],
            modifiedTime:[new Date()],
          });
          // this.formData.controls.code.disable();
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControl();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.branchAPI.getBranchBySolCode(this.message.solCode).subscribe(res=>{
            this.results = res;
            console.log("this all", this.results);
            
            this.formData = this.fb.group({
              solCode:[this.solCode],
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
            this.ngZone.run(() => this.router.navigateByUrl('system/branches/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){          
          this.subscription = this.branchAPI.getBranchBySolCode(this.message.solCode).subscribe(res=>{
            this.results = res;
            console.log(this.results);
            
            this.formData = this.fb.group({
              // sn:[this.results.entity.sn],
              solCode:[this.solCode],
              branchDescription:[this.results.entity.branchDescription],
              email:[this.results.entity.email, [Validators.required]],
              phoneNumber:[this.results.entity.phoneNumber, [Validators.required]],
              location:[this.results.entity.location, [Validators.required]],
              modifiedBy:[this.auth_user],
              modifiedTime:[new Date()],
              postedBy:[this.results.entity.postedBy],
              postedTime:[this.results.entity.postedTime],
              postedFlag:[this.results.entity.postedFlag],
              verifiedBy:[this.results.entity.verifiedBy],
              verifiedTime:[this.results.entity.verifiedTime],
              verifiedFlag:[this.results.entity.verifiedFlag],
              deletedFlag:['N'],
              deletedTime:[this.results.entity.deletedTime],
              deletedBy:[''],
              sn:[this.results.entity.sn]
            });
            // this.formData.controls.solCode.disable();
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/branches/maintenance'));
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
          this.branchAPI.getBranchBySolCode(this.message.solCode).subscribe(res=>{
            this.results = res;

            this.formData = this.fb.group({
              solCode:[this.results.entity.solCode],
              branchDescription:[this.results.entity.branchDescription],
              email:[this.results.entity.email],
              location:[this.results.entity.location],
              phoneNumber:[this.results.entity.phoneNumber],
              postedBy:[this.results.entity.postedBy],
              postedFlag:[this.results.entity.postedFlag],
              postedTime:[this.results.entity.postedTime],
              modifiedBy:[this.results.entity.modifiedBy],
              modifiedTime:[this.results.entity.modifiedTime],
              deletedBy:[this.results.entity.deletedBy],
              deletedTime:[this.results.entity.deletedTime],
              deletedFlag:[this.results.entity.deletedFlag],
              verifiedBy:[this.auth_user],
              verifiedTime:[new Date()],
              verifiedFlag:["Y"],
              sn:[this.results.entity.sn]
            })
          })
          this.disabledFormControl();
        }
        else if(this.function_type == "X-Delete"){
          // should open a page with data and show remove button
          this.branchAPI.getBranchBySolCode(this.message.solCode).subscribe(res=>{
            this.results = res;
            console.log("deleting results", this.results);
            
            this.formData = this.fb.group({
              solCode:[this.results.entity.solCode],
              branchDescription:[this.results.entity.branchDescription],
              email:[this.results.entity.email],
              location:[this.results.entity.location],
              phoneNumber:[this.results.entity.phoneNumber],
              postedBy:[this.results.entity.postedBy],
              postedFlag:[this.results.entity.postedFlag],
              postedTime:[this.results.entity.postedTime],
              modifiedBy:[this.results.entity.modifiedBy],
              modifiedTime:[this.results.entity.modifiedTime],
              deletedBy:[this.auth_user],
              deletedTime:[new Date()],
              deletedFlag:['Y'],
              verifiedBy:[this.results.entity.verifiedBy],
              verifiedTime:[this.results.entity.verifiedTime],
              verifiedFlag:[this.results.entity.verifiedFlag],
              sn:[this.results.entity.sn]


            });
          })
          this.disabledFormControl();
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
              console.log(this.results);
              
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/branches/maintenance'));
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
              this.ngZone.run(() => this.router.navigateByUrl('system/branches/maintenance'));
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

