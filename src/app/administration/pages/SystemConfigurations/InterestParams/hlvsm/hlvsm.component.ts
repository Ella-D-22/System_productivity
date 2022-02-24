import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { CurrencyLookupComponent } from '../../GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { HlvsmService } from './hlvsm.service';

@Component({
  selector: 'app-hlvsm',
  templateUrl: './hlvsm.component.html',
  styleUrls: ['./hlvsm.component.scss']
})
export class HlvsmComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  flagArray: any = [

    'Y','N'
  ]
  amt_derivation_Array: any = [
    {code:'CHRG', description:'Free Code'},
    {code:'FIXED', description:'Fixed Amt'},
    {code:'MRT', description:'Formula Based'},
    {code:'PCNT', description:'Percentage'},
    {code:'SCRPT', description:'Script Based'},
    {code:'USTM', description:'Unit Charge Code'},
  ]
  chargePreferetialsArrays: any = [
    'Custmer Level','Account Level','Charge Level','Contract Level'
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
  eventId: any;
  message: any;
  int_tbl_code: any;
  int_tbl_ccy: any;
  base_indicator: any;
  version: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private hlvsmAPI:HlvsmService
    ) { }
    onSelectPreferential(event:any){
      if(event.target.value != "Contract Level"){
        this.showContractInput = false;
        this.formData.controls.linked_organization.setValue("")
        this.formData.controls.linked_organization_detail.setValue("")
        this.formData.controls.linked_organization.setValidators([])
      }else if(event.target.value == "Contract Level"){
        this.showContractInput = true;
        this.formData.controls.linked_organization.setValidators([Validators.required])
      }
    }
    onYesExerciseDuty(event:any){
      this.showExerciseDutyPercentageInput = true;
      this.formData.controls.exercise_duty_percentage.setValidators([Validators.required])
    }
    onNoExerciseDuty(event:any){
      this.showExerciseDutyPercentageInput = false;
      this.formData.controls.exercise_duty_percentage.setValue("0")
    }

    onSelectAmtDerivationType(event:any){
      console.log("this is selected", event.target.value)
      if(event.target.value != "FIXED"){
        this.showAmtDerivationInput = false;
        this.formData.controls.amt.setValue(0)
        this.formData.controls.amt.setValidators([])
      }else if(event.target.value == "FIXED"){
        this.showAmtDerivationInput = true;
        this.formData.controls.amt.setValidators([Validators.required])
      }
      
      if(event.target.value != "PCNT"){
        this.showPercentageDerivationInput = false;
        this.formData.controls.percentage.setValue(0)
        this.formData.controls.percentage.setValidators([])
      }else if(event.target.value == "PCNT"){
        this.showPercentageDerivationInput = true;
        this.formData.controls.percentage.setValidators([Validators.required])
      }
      if(event.target.value != "CHRG"){
        this.showChargecodeDerivationInput = false;
        this.formData.controls.chrg_code.setValue(0)
        this.formData.controls.chrg_code.setValidators([])
      }else if(event.target.value == "CHRG"){
        this.showChargecodeDerivationInput = true;
        this.formData.controls.chrg_code.setValidators([Validators.required])
      }
      if(event.target.value != "MRT"){
        this.showMrtFilenameDerivationInput = false;
        this.formData.controls.file_name.setValue("NULL")
        this.formData.controls.file_name.setValidators([])
      }else if(event.target.value == "MRT"){
        this.showMrtFilenameDerivationInput = true;
        this.formData.controls.file_name.setValidators([Validators.required])
      }
      if(event.target.value != "SCRPT" ){
        this.showFilenameDerivationInput = false;
        this.formData.controls.file_name.setValue("NULL")
        this.formData.controls.file_name.setValidators([])
      }else if(event.target.value == "SCRPT"){
        this.showFilenameDerivationInput = true;
        this.formData.controls.file_name.setValidators([Validators.required])
      }
    }
    submitted = false;
      ngOnInit() {
        this.getPage();
      }
      formData = this.fb.group({

        function_type: [''],
        int_tbl_code: [''],
        int_tbl_ccy: [''],
        base_indicator: [''],
        version: [''],

        start_date: ['',[Validators.required]],
        end_date: ['',[Validators.required]],
        base_int_code: ['',[Validators.required]],
        base_int_pcnt_cr: [''],
        base_int_pcnt_dr: [''],
        version_desc: [''],
        version_desc_repo: [''],
        add_version_info: [''],

        have_debit: [''],
        db_loan_p_mnth: [''],
        db_loan_p_dys: [''],
        db_period_ind: [''],
        db_begin_slab_amt: [''],
        db_end_slab_amt: [''],
        db_normal: [''],
        db_penal: [''],
        db_normal_int_amt: [''],
        db_penal_int_amt: [''],
        db_record: [''],

      });
      disabledFormControll(){
        this.formData.controls.start_date.disable();
        this.formData.controls.end_date.disable();
        this.formData.controls.base_int_code.disable();
        this.formData.controls.base_int_pcnt_cr.disable();
        this.formData.controls.base_int_pcnt_dr.disable();
        this.formData.controls.version_desc.disable();
        this.formData.controls.version_desc_repo.disable();
        this.formData.controls.add_version_info.disable();

        this.formData.controls.have_debit.disable();
        this.formData.controls.db_loan_p_mnth.disable();
        this.formData.controls.db_loan_p_dys.disable();
        this.formData.controls.db_period_ind.disable();
        this.formData.controls.db_begin_slab_amt.disable();
        this.formData.controls.db_end_slab_amt.disable();
        this.formData.controls.db_normal.disable();
        this.formData.controls.db_penal.disable();
        this.formData.controls.db_normal_int_amt.disable();
        this.formData.controls.db_penal_int_amt.disable();
        this.formData.controls.db_record.disable();

      }

      getPage(){
        this.subscription = this.hlvsmAPI.currentMessage.subscribe(message =>{
          this.message = message;  
        this.function_type = this.message.function_type;
        this.int_tbl_code = this.message.int_tbl_code;
        this.int_tbl_ccy = this.message.int_tbl_ccy;
        this.base_indicator = this.message.base_indicator;
        this.version = this.message.version;

        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({
            function_type: [this.function_type],
            int_tbl_code: [this.int_tbl_code],
            int_tbl_ccy: [this.int_tbl_ccy],
            base_indicator: [this.base_indicator],
            version: [this.version],

            start_date: ['',[Validators.required]],
            end_date: ['',[Validators.required]],
            base_int_code: ['',[Validators.required]],
            base_int_pcnt_cr: [''],
            base_int_pcnt_dr: [''],
            version_desc: [''],
            version_desc_repo: [''],
            add_version_info: [''],

            have_debit: [''],
            db_loan_p_mnth: [''],
            db_loan_p_dys: [''],
            db_period_ind: [''],
            db_begin_slab_amt: [''],
            db_end_slab_amt: [''],
            db_normal: [''],
            db_penal: [''],
            db_normal_int_amt: [''],
            db_penal_int_amt: [''],
            db_record: [''],

          });
        }
        else if(this.function_type == "I-Inquire"){
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.hlvsmAPI.getHlvsmByHlvsm(this.int_tbl_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              function_type: [this.function_type],
              int_tbl_code: [this.int_tbl_code],
              int_tbl_ccy: [this.int_tbl_ccy],
              base_indicator: [this.base_indicator],
              version: [this.version],

              start_date: [this.results.start_date,[Validators.required]],
              end_date: [this.results.end_date,[Validators.required]],
              base_int_code: [this.results.base_int_code,[Validators.required]],
              base_int_pcnt_cr: [this.results.base_int_pcnt_cr],
              base_int_pcnt_dr: [this.results.base_int_pcnt_dr],
              version_desc: [this.results.version_desc],
              version_desc_repo: [this.results.version_desc_repo],
              add_version_info: [this.results.add_version_info],

              have_debit: [this.results.have_debit],
              db_loan_p_mnth: [this.results.db_loan_p_mnth],
              db_loan_p_dys: [this.results.db_loan_p_dys],
              db_period_ind: [this.results.db_period_ind],
              db_begin_slab_amt: [this.results.db_begin_slab_amt],
              db_end_slab_amt: [this.results.db_end_slab_amt],
              db_normal: [this.results.db_normal],
              db_penal: [this.results.db_penal],
              db_normal_int_amt: [this.results.db_normal_int_amt],
              db_penal_int_amt: [this.results.db_penal_int_amt],
              db_record: [this.results.db_record],

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
          // Populate fields with data and allow modifications
                    //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('event_id',this.event_id)
          .set('event_type', this.event_type);
          // call to disable edit
          this.subscription = this.hlvsmAPI.getHlvsmId(this.params).subscribe(res=>{

            this.results = res;
            this.formData = this.fb.group({
              function_type: [this.function_type],
              int_tbl_code: [this.int_tbl_code],
              int_tbl_ccy: [this.int_tbl_ccy],
              base_indicator: [this.base_indicator],
              version: [this.version],

              start_date: [this.results.start_date,[Validators.required]],
              end_date: [this.results.end_date,[Validators.required]],
              base_int_code: [this.results.base_int_code,[Validators.required]],
              base_int_pcnt_cr: [this.results.base_int_pcnt_cr],
              base_int_pcnt_dr: [this.results.base_int_pcnt_dr],
              version_desc: [this.results.version_desc],
              version_desc_repo: [this.results.version_desc_repo],
              add_version_info: [this.results.add_version_info],

              have_debit: [this.results.have_debit],
              db_loan_p_mnth: [this.results.db_loan_p_mnth],
              db_loan_p_dys: [this.results.db_loan_p_dys],
              db_period_ind: [this.results.db_period_ind],
              db_begin_slab_amt: [this.results.db_begin_slab_amt],
              db_end_slab_amt: [this.results.db_end_slab_amt],
              db_normal: [this.results.db_normal],
              db_penal: [this.results.db_penal],
              db_normal_int_amt: [this.results.db_normal_int_amt],
              db_penal_int_amt: [this.results.db_penal_int_amt],
              db_record: [this.results.db_record],
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
          // Populate data with rotected fileds only verification is enabled
        }
        else if(this.function_type == "C-Cancle"){
          // should open a page with data and show remove button
        } 
      })    
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
            this.subscription = this.hlvsmAPI.createHlvsm(this.formData.value).subscribe(res=>{
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
              this.eventId = this.actRoute.snapshot.paramMap.get('event_id');
              this.subscription = this.hlvsmAPI.updateHlvsm(this.eventId, this.formData.value).subscribe(res=>{
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