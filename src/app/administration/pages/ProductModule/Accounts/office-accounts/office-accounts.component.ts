import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { CurrencyLookupComponent } from '../../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { OfficeAccountService } from './office-account.service';

@Component({
  selector: 'app-office-accounts',
  templateUrl: './office-accounts.component.html',
  styleUrls: ['./office-accounts.component.scss']
})
export class OfficeAccountsComponent implements OnInit {
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
  acclassificationArray: any = [
    'A-Asset','B-Balance SHeet', 'C-Cash','E-Expenditure','I-Income','L-Liabilities','N-OBS Non Contingent Contra',
    'O-OBS Non Contigent Asset','P-Capital','S-Sundry'
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
  sol_id: any;
  ac_id: any;
  gl_subhead_code: any;
  ccy: any;
  scheme_code: any;
  ccy_name: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private officeacAPI:OfficeAccountService
    ) { }

    CcyLookup(){

    }
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
    // fixed -> amt
    // PCNT‟/‟MRT  -> percent
    // „CHRG‟->charge-code
    // MRT or SCRIPT =>filename
    submitted = false;
      ngOnInit() {
        // this.getData();
        this.getPage();
      }
      formData = this.fb.group({
        function_type: [''],
        sol_id: [''],
        ac_id: [''],
        ccy: [''],
        gl_subhead_code: [''],
        scheme_code: [''],

        ac_head_name: ['', [Validators.required]],
        short_name: [''],
        place_holder: [''],
        ac_report_code: ['',[Validators.required]],
        ac_supervisor_id: [''],
        ac_classification: [''],
        system_only_ac: [''],
        any_trans_allowed: ['',[Validators.required]],
        freeze_code: [''],
        freeze_reason: [''],
        tran_from_other_sol_allowed: ['',[Validators.required]],
        refresh_ac_data_to_sis: [''],
        ac_partitioned: [''],
        partition_type: [''],
        remarks: [''],
        cash_limit_dr: [''],
        cash_limit_cr: [''],
        clg_limit_dr: [''],
        clg_limit_cr: [''],
        transfer_limit_dr: [''],
        transfer_limit_cr: [''],
        bal_limit_dr: [''],
        total_cr: [''],
        total_dr: [''],
        current_bal: [''],
        future_bal: [''],
        free_text_1: [''],
        free_text_2: [''],
        free_text_3: [''],
        free_text_4: [''],
        free_text_5: [''],
        free_text_6: [''],
        free_text_7: [''],
        free_text_8: [''],
        free_text_9: [''],
        free_text_10: [''],
        
        have_account_label: [''],
        ac_label: [''],
        val_of_label: [''],
        record_del:['']
      });
      disabledFormControll(){
        this.formData.controls.function_type.disable();
        this.formData.controls.sol_id.disable();
        this.formData.controls.ac_id.disable();
        this.formData.controls.ccy.disable();
        this.formData.controls.gl_subhead_code.disable();
        this.formData.controls.scheme_code.disable();
        this.formData.controls.ac_head_name.disable();
        this.formData.controls.short_name.disable();
        this.formData.controls.place_holder.disable();
        this.formData.controls.ac_report_code.disable();
        this.formData.controls.ac_supervisor_id.disable();
        this.formData.controls.ac_classification.disable();
        this.formData.controls.system_only_ac.disable();
        this.formData.controls.any_trans_allowed.disable();
        this.formData.controls.freeze_code.disable();
        this.formData.controls.freeze_reason.disable();
        this.formData.controls.tran_from_other_sol_allowed.disable();
        this.formData.controls.refresh_ac_data_to_sis.disable();
        this.formData.controls.ac_partitioned.disable();
        this.formData.controls.partition_type.disable();
        this.formData.controls.remarks.disable();
        this.formData.controls.cash_limit_dr.disable();
        this.formData.controls.cash_limit_cr.disable();
        this.formData.controls.clg_limit_dr.disable();
        this.formData.controls.clg_limit_cr.disable();
        this.formData.controls.transfer_limit_dr.disable();
        this.formData.controls.transfer_limit_cr.disable();
        this.formData.controls.bal_limit_dr.disable();
        this.formData.controls.total_cr.disable();
        this.formData.controls.total_dr.disable();
        this.formData.controls.current_bal.disable();
        this.formData.controls.future_bal.disable();
        this.formData.controls.free_text_1.disable();
        this.formData.controls.free_text_2.disable();
        this.formData.controls.free_text_3.disable();
        this.formData.controls.free_text_4.disable();
        this.formData.controls.free_text_5.disable();
        this.formData.controls.free_text_6.disable();
        this.formData.controls.free_text_7.disable();
        this.formData.controls.free_text_8.disable();
        this.formData.controls.free_text_9.disable();
        this.formData.controls.free_text_10.disable();
        this.formData.controls.have_account_label.disable();
        this.formData.controls.ac_label.disable();
        this.formData.controls.val_of_label.disable();
        this.formData.controls.record_del.disable();
      }

      getPage(){
        this.subscription = this.officeacAPI.currentMessage.subscribe(message =>{
          this.message = message; 
          this.function_type = this.message.function_type;
          this.sol_id = this.message.sol_id;
          this.ac_id = this.message.ac_id;
          this.ccy = this.message.ccy;
          this.ccy_name = this.ccy.ccy_name;
          this.gl_subhead_code = this.message.gl_subhead_code;
          this.scheme_code = this.message.scheme_code;

        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({

        function_type: [this.function_type],
        sol_id: [this.sol_id],
        ac_id: [this.ac_id],
        ccy: [this.ccy],
        gl_subhead_code: [this.gl_subhead_code],
        scheme_code: [this.scheme_code],

        ac_head_name: ['',[Validators.required]],
        short_name: [''],
        place_holder: [''],
        ac_report_code: ['',[Validators.required]],
        ac_supervisor_id: [''],
        ac_classification: [''],
        system_only_ac: [''],
        any_trans_allowed: ['',[Validators.required]],
        freeze_code: [''],
        freeze_reason: [''],
        tran_from_other_sol_allowed: ['',[Validators.required]],
        refresh_ac_data_to_sis: [''],
        ac_partitioned: [''],
        partition_type: [''],
        remarks: [''],
        cash_limit_dr: [''],
        cash_limit_cr: [''],
        clg_limit_dr: [''],
        clg_limit_cr: [''],
        transfer_limit_dr: [''],
        transfer_limit_cr: [''],
        bal_limit_dr: [''],
        total_cr: [''],
        total_dr: [''],
        current_bal: [''],
        future_bal: [''],
        free_text_1: [''],
        free_text_2: [''],
        free_text_3: [''],
        free_text_4: [''],
        free_text_5: [''],
        free_text_6: [''],
        free_text_7: [''],
        free_text_8: [''],
        free_text_9: [''],
        free_text_10: [''],
        
        have_account_label: [''],
        ac_label: [''],
        val_of_label: [''],
        record_del:['']

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
          this.subscription = this.officeacAPI.getOfficeaccountByOfficeaccount(this.int_tbl_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              function_type: [this.function_type],
              sol_id: [this.sol_id],
              ac_id: [this.ac_id],
              ccy: [this.ccy],
              gl_subhead_code: [this.gl_subhead_code],
              scheme_code: [this.scheme_code],

              ac_head_name: [this.results.ac_head_name, [Validators.required]],
              short_name: [this.results.short_name],
              place_holder: [this.results.place_holder],
              ac_report_code: [this.results.ac_report_code,[Validators.required]],
              ac_supervisor_id: [this.results.ac_supervisor_id],
              ac_classification: [this.results.ac_classification],
              system_only_ac: [this.results.system_only_ac],
              any_trans_allowed: [this.results.any_trans_allowed,[Validators.required]],
              freeze_code: [this.results.freeze_code],
              freeze_reason: [this.results.freeze_reason],
              tran_from_other_sol_allowed: [this.results.tran_from_other_sol_allowed,[Validators.required]],
              refresh_ac_data_to_sis: [this.results.refresh_ac_data_to_sis],
              ac_partitioned: [this.results.ac_partitioned],
              partition_type: [this.results.partition_type],
              remarks: [this.results.remarks],
              cash_limit_dr: [this.results.cash_limit_dr],
              cash_limit_cr: [this.results.cash_limit_cr],
              clg_limit_dr: [this.results.clg_limit_dr],
              clg_limit_cr: [this.results.clg_limit_cr],
              transfer_limit_dr: [this.results.transfer_limit_dr],
              transfer_limit_cr: [this.results.transfer_limit_cr],
              bal_limit_dr: [this.results.bal_limit_dr],
              total_cr: [this.results.total_cr],
              total_dr: [this.results.total_dr],
              current_bal: [this.results.current_bal],
              future_bal: [this.results.future_bal],
              free_text_1: [this.results.free_text_1],
              free_text_2: [this.results.free_text_2],
              free_text_3: [this.results.free_text_3],
              free_text_4: [this.results.free_text_4],
              free_text_5: [this.results.free_text_5],
              free_text_6: [this.results.free_text_6],
              free_text_7: [this.results.free_text_7],
              free_text_8: [this.results.free_text_8],
              free_text_9: [this.results.free_text_9],
              free_text_10: [this.results.free_text_10],
              have_account_label: [this.results.have_account_label],
              ac_label: [this.results.ac_label],
              val_of_label: [this.results.val_of_label],
              record_del:[this.results.record_del]
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
          this.subscription = this.officeacAPI.getOfficeaccountId(this.params).subscribe(res=>{

            this.results = res;
            this.formData = this.fb.group({

              function_type: [this.function_type],
              sol_id: [this.sol_id],
              ac_id: [this.ac_id],
              ccy: [this.ccy],
              gl_subhead_code: [this.gl_subhead_code],
              scheme_code: [this.scheme_code],

              ac_head_name: [this.results.ac_head_name,[Validators.required]],
              short_name: [this.results.short_name],
              place_holder: [this.results.place_holder],
              ac_report_code: [this.results.ac_report_code,[Validators.required]],
              ac_supervisor_id: [this.results.ac_supervisor_id],
              ac_classification: [this.results.ac_classification],
              system_only_ac: [this.results.system_only_ac],
              any_trans_allowed: [this.results.any_trans_allowed,[Validators.required]],
              freeze_code: [this.results.freeze_code],
              freeze_reason: [this.results.freeze_reason],
              tran_from_other_sol_allowed: [this.results.tran_from_other_sol_allowed],
              refresh_ac_data_to_sis: [this.results.refresh_ac_data_to_sis],
              ac_partitioned: [this.results.ac_partitioned],
              partition_type: [this.results.partition_type],
              remarks: [this.results.remarks],
              cash_limit_dr: [this.results.cash_limit_dr],
              cash_limit_cr: [this.results.cash_limit_cr],
              clg_limit_dr: [this.results.clg_limit_dr],
              clg_limit_cr: [this.results.clg_limit_cr],
              transfer_limit_dr: [this.results.transfer_limit_dr],
              transfer_limit_cr: [this.results.transfer_limit_cr],
              bal_limit_dr: [this.results.bal_limit_dr],
              total_cr: [this.results.total_cr],
              total_dr: [this.results.total_dr],
              current_bal: [this.results.current_bal],
              future_bal: [this.results.future_bal],
              free_text_1: [this.results.free_text_1],
              free_text_2: [this.results.free_text_2],
              free_text_3: [this.results.free_text_3],
              free_text_4: [this.results.free_text_4],
              free_text_5: [this.results.free_text_5],
              free_text_6: [this.results.free_text_6],
              free_text_7: [this.results.free_text_7],
              free_text_8: [this.results.free_text_8],
              free_text_9: [this.results.free_text_9],
              free_text_10: [this.results.free_text_10],
              have_account_label: [this.results.have_account_label],
              ac_label: [this.results.ac_label],
              val_of_label: [this.results.val_of_label],
              record_del:[this.results.record_del]
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
            this.subscription = this.officeacAPI.createOfficeaccount(this.formData.value).subscribe(res=>{
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
              this.subscription = this.officeacAPI.updateOfficeaccount(this.eventId, this.formData.value).subscribe(res=>{
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






