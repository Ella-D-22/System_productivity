import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { CurrencyLookupComponent } from '../../GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { HitcmService } from './hitcm.service';
import { AcPlaceholderLookupComponent } from '../../ChargesParams/event-id/ac-placeholder-lookup/ac-placeholder-lookup.component';

@Component({
  selector: 'app-hitcm',
  templateUrl: './hitcm.component.html',
  styleUrls: ['./hitcm.component.scss']
})
export class HitcmComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  flagArray: any = [

    'Y','N'
  ]
  amt_derivation_Array: any = [
    {code:'CHRG', code_description:'Free Code'},
    {code:'FIXED', code_description:'Fixed Amt'},
    {code:'MRT', code_description:'Formula Based'},
    {code:'PCNT', code_description:'Percentage'},
    {code:'SCRPT', code_description:'Script Based'},
    {code:'USTM', code_description:'Unit Charge Code'},
  ]
  chargePreferetialsArrays: any = [
    'Custmer Level','Account Level','Charge Level','Contract Level'
  ]
  typeOfIntVSlabMntArray: any = [
    'B-Base Rate', 'C-Commercial Lending', 'I-Transaction Accounts & Trade Bills','L-Retail Lending','T-Term Deposits'
  ]

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
  Hitcm: any;
  message: any;
  int_tbl_code: any;
  id: any;
  retrievedMssg: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private hitcmAPI:HitcmService
    ) { }
    submitted = false;

      ngOnInit() {
        this.redirectToMaintenancePage();
        this.getPage();
      }
      redirectToMaintenancePage(){
        this.subscription = this.hitcmAPI.currentMessage.subscribe(message=>{
          this.retrievedMssg = message;
          if( this.retrievedMssg == "default message"){
            // Redirect to maintenace if no action header
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hitcm/maintenance'));
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
        int_tbl_code: [''],
        long_ref_code: [''],
        code_desc: [''],
        type_of_int_v_slab_mnt: ['', [Validators.required]],
        base_rate_wth_prd_slabs:[''],
        diff_der_frm_base:[''],
        is_verified:[''],
        is_deleted:['']
      });
      disabledFormControll(){
        this.formData.controls.long_ref_code.disable();
        this.formData.controls.code_desc.disable();
        this.formData.controls.type_of_int_v_slab_mnt.disable();
        this.formData.controls.base_rate_wth_prd_slabs.disable();
        this.formData.controls.diff_der_frm_base.disable();
        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();
      }

      getPage(){
        this.subscription = this.hitcmAPI.currentMessage.subscribe(message =>{
          this.message = message;  

        console.log(this.message)

        this.function_type =this.message.function_type;
        this.int_tbl_code = this.message.int_tbl_code;
        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({
            int_tbl_code: [this.int_tbl_code ],
            long_ref_code: [''],
            code_desc: [''],
            type_of_int_v_slab_mnt: ['', [Validators.required]],
            base_rate_wth_prd_slabs:[''],
            diff_der_frm_base:[''],
            is_verified:[''],
            is_deleted:['']
          });

          this.formData.controls.is_verified.disable();
          this.formData.controls.is_deleted.disable();
        }
        else if(this.function_type == "I-Inquire"){
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('int_tbl_code',this.int_tbl_code);
          // call to disable edit
          this.disabledFormControll();

          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.hitcmAPI.getHitcmByHitcm(this.params).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              long_ref_code: [this.results.long_ref_code],
              code_desc: [this.results.code_desc],
              type_of_int_v_slab_mnt: [this.results.type_of_int_v_slab_mnt, [Validators.required]],
              base_rate_wth_prd_slabs:[this.results.base_rate_wth_prd_slabs],
              diff_der_frm_base:[this.results.diff_der_frm_base],
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
            this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){
          this.formData.controls.is_verified.disable();
          this.formData.controls.is_deleted.disable();
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('int_tbl_code',this.int_tbl_code);
          // call to disable edit
          this.subscription = this.hitcmAPI.getHitcmByHitcm(this.params).subscribe(res=>{
            this.results = res;
            this.id = this.results.id;
            this.formData = this.fb.group({
              long_ref_code: [this.results.long_ref_code],
              code_desc: [this.results.code_desc],
              type_of_int_v_slab_mnt: [this.results.type_of_int_v_slab_mnt, [Validators.required]],
              base_rate_wth_prd_slabs:[this.results.base_rate_wth_prd_slabs],
              diff_der_frm_base:[this.results.diff_der_frm_base],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
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

          this.disabledFormControll();
          this.formData.controls.is_verified.enable();

          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('int_tbl_code',this.int_tbl_code);
          // call to disable edit
          this.subscription = this.hitcmAPI.getHitcmByHitcm(this.params).subscribe(res=>{
            this.results = res;
            this.id = this.results.id;
            this.formData = this.fb.group({
              long_ref_code: [this.results.long_ref_code],
              code_desc: [this.results.code_desc],
              type_of_int_v_slab_mnt: [this.results.type_of_int_v_slab_mnt, [Validators.required]],
              base_rate_wth_prd_slabs:[this.results.base_rate_wth_prd_slabs],
              diff_der_frm_base:[this.results.diff_der_frm_base],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
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
        else if(this.function_type == "X-Delete"){
          this.disabledFormControll();
          this.formData.controls.is_deleted.enable();
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('int_tbl_code',this.int_tbl_code);
          // call to disable edit
          this.subscription = this.hitcmAPI.getHitcmByHitcm(this.params).subscribe(res=>{
            this.results = res;
            this.id = this.results.id;
            this.formData = this.fb.group({
              long_ref_code: [this.results.long_ref_code],
              code_desc: [this.results.code_desc],
              type_of_int_v_slab_mnt: [this.results.type_of_int_v_slab_mnt, [Validators.required]],
              base_rate_wth_prd_slabs:[this.results.base_rate_wth_prd_slabs],
              diff_der_frm_base:[this.results.diff_der_frm_base],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
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
      })    
      }

      accountLookup(): void {
        const dialogRef = this.dialog.open(AcPlaceholderLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ac_placeholder = result.data;
          this.dialogValue = result.data;
          this.formData.controls.ac_placeholder.setValue(result.data);
        });
      }
      minAmtCurrencyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.min_amt_ccy = result.data;
          this.formData.controls.min_amt_ccy.setValue(result.data);
        });
      }
      maxAmtCurrencyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.max_amt_ccy = result.data;
          this.formData.controls.max_amt_ccy.setValue(result.data);
        });
      }
      chrgCalcCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.chrg_calc_crncy = result.data;
          this.formData.controls.chrg_calc_crncy.setValue(result.data);
        });
      }
      chrgCollCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.chrg_coll_crncy= result.data;
          this.formData.controls.chrg_coll_crncy.setValue(result.data);
        });
      }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSubmit() {
          this.submitted = true;
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.hitcmAPI.createHitcm(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Successful!", "X", {
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
            }else if(this.function_type != "A-Add"){
              // this.Hitcm = this.actRoute.snapshot.paramMap.get('event_id');
              this.subscription = this.hitcmAPI.updateHitcm(this.id, this.formData.value).subscribe(res=>{
                this.results = res;
                  this._snackBar.open("Successful!", "X", {
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