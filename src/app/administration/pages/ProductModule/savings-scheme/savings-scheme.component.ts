import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { LinkedEventIdLookupComponent } from '../../SystemConfigurations/ChargesParams/event-id/linked-event-id-lookup/linked-event-id-lookup.component';
import { EventTypeLookupComponent } from '../../SystemConfigurations/ChargesParams/event-type/event-type-lookup/event-type-lookup.component';
import { CurrencyLookupComponent } from '../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { ExceptionsCodesLookupComponent } from '../../SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes-lookup/exceptions-codes-lookup.component';
import { GlSubheadLookupComponent } from '../../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { LoanproductService } from '../loanproduct/loanproduct.service';
import { SavingschemeService } from './savingscheme.service';

@Component({
  selector: 'app-savings-scheme',
  templateUrl: './savings-scheme.component.html',
  styleUrls: ['./savings-scheme.component.scss']
})
export class SavingsSchemeComponent implements OnInit {

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
  islamicProductArray: any = [
    'Murabaha','Musyarakaha','Ijarah'
  ]
  productTypeArray: any = [
    'P-Personal Loan','M-Mortage/Housing Loan','R-Property/Loan','S-Student/Educational Loan','A-Auto Loan','C-Consumer Loan','O-Other Loan'
  ]
   eiFormulaFlgArray: any = [
     'P-PMT Formula','M-EMI Formula','F-Flat Rate','R-Rule of 78'
   ]
   weeksArray: any = [
     'Week 1', 'Week 2','Week 3', 'Week 4'
   ]
   debitIntCompFreqArray: any = [
    'Daily','Monthly'
   ]
   Int_Cr_ac_Flag_Array: any =[ 'S - Original A/c','O - Operative A/c','P - Operative A/c or Parking A/c','E - Operative A/c or Original A/c']
   Int_Dr_ac_Flag_Array: any =[ 'S - Original A/c itself','O - Operative A/c','T - Payment System']
   
   int_comp_freq_array: any = ['D- Daily', 'W – Weekly', 'F – Fortnightly', 'M – Monthly','Q- Quarterly','H – Half yearly', 'Y- Yearly','T-Twice a month']
   ei_payment_freq_array: any = ['D- Daily','W – Weekly','F – Fortnightly','M – Monthly','Q- Quarterly','H – Half yearly', 'Y- Yearly']
   
   int_methodArray: any =['M-Minimum balance','A-Average balance','E-EOD balance']
  
   //  debitIntCompFreqArray: any = [
  //   'Daily','Monthly', 'Quarterly','No compounding'
  //  ]

   daysArray: any = [
     'Moday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
   ]
   datesArray: any = [
     '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21',
     '22','23','24','25','26','27','28','29','30','31'
   ]
   loanRepaymentMethodsArray: any = [
    'B – Bill to employer',
    'D –Electronic Clearing',
    'E – Recover up to Effective Amount',
    'H – Recover through ACH',
    'M – Multisource repayment',
    'N – No batch recovery',
    'P –Post Dated cheques',
    'S – Recover from Salary',
    'T – Recover by Granting TOD'
   ]

   months = Array.from({length: 12}, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', {month: 'long'})
  });
  arrayIndex: any;
  description: any;
  eventtypedata: any;
  event_type_code: any;
  event_type_desc: any;
  gl_subhead: any;
  gl_subhead_description: any;
  gl_subhead_code: any;
  showPer_page= false;
  showFixed_amt= false;
  showSystem_gen_no = false;
  showNumber_gen_code = false;
  showAmortizedPH = false;
  selecteddateFrom: any;
  fomartedFromDate: any;
  selecteddateTo: any;
  fomartedToDate: any;
  sba_exc_ac_in_debit_bal: any;
  sba_exc_ac_in_cr_bal: any;
  sba_exc_liability_exceeds_group_limit: any;
  sba_exc_ac_if_frozed: any;
  sba_exc_sanction_limit_expired: any;
  sba_exc_int_cal_not_upto_date: any;
  sba_exc_insufficient_available_bal: any;
  sba_exc_backdated_transaction: any;
  exce_description: any;
  exce_code: any;
  lookupdata: any;
  sba_exc_ac_in_debit_bal_exce_description: any;
  sba_exc_ac_in_debit_bal_exce_code: any;
  sba_exc_ac_in_cr_bal_exce_description: any;
  sba_exc_ac_in_cr_bal_exce_code: any;
  sba_exc_liability_exceeds_group_limit_exce_description: any;
  sba_exc_liability_exceeds_group_limit_exce_code: any;
  sba_exc_ac_if_frozed_exce_description: any;
  sba_exc_ac_if_frozed_exce_code: any;
  sba_exc_sanction_limit_expired_exce_description: any;
  sba_exc_sanction_limit_expired_exce_code: any;
  sba_exc_int_cal_not_upto_date_exce_description: any;
  sba_exc_int_cal_not_upto_date_exce_code: any;
  sba_exc_insufficient_available_bal_exce_description: any;
  sba_exc_insufficient_available_bal_exce_code: any;
  sba_exc_backdated_transaction_exce_code: any;
  sba_exc_backdated_transaction_exce_description: any;

  eventidLookup(): void {
    const dialogRef = this.dialog.open(LinkedEventIdLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data;
      this.feeFormData.controls.sba_fee_event.setValue(result.data);
    });
  }
  eventTypeLookup(): void {
    const dialogRef = this.dialog.open(EventTypeLookupComponent, {
      height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.eventtypedata = result.data;
      this.event_type_code = result.data.code;      
      this.event_type_desc = result.data.description;
      this.feeFormData.controls.sba_fee_type.setValue(this.event_type_code);
    });
  }

  glSubheadLookup(): void {
    const dialogRef = this.dialog.open(GlSubheadLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.gl_subhead = result.data;
      this.gl_subhead_description =  result.data.glSubheadDescription;
      this.gl_subhead_code =  result.data.glSubheadCode;  
       // this.eventtypedata = result.data;
      this.glsubheadFormData.controls.sba_gl_subhead.setValue(this.gl_subhead_code);
      this.glsubheadFormData.controls.sba_gl_subhead_description.setValue(this.gl_subhead_description);
    });
  }
  dt = new Date();
  month = this.dt.getMonth();
  year = this.dt.getFullYear();
 daysInMonth = new Date(this.year, this.month, 0).getDate();

 dayarray =  this.getDaysInMonth();
  scheme_code: any;
  scheme_type: any;
  scheme_code_desc: any;


 getDaysInMonth() {
  var date = new Date(this.year, this.month, 1);
  var days = [];
  while (date.getMonth() === this.month) {
    days.push(new Date(date).toDateString);
    date.setDate(date.getDate() + 1);
  }
  return days;
}

  
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
  newData = true;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private sbaAPI:SavingschemeService,
    private datepipe:DatePipe
    ) { }

    submitted = false;
      ngOnInit() {
        this.getPage();
      }



      //**********************************
      // Exception Lookups
      //**********************************
      // sba_exc_ac_in_debit_bal
// sba_exc_ac_in_cr_bal
// sba_exc_liability_exceeds_group_limit
// sba_exc_ac_if_frozed
// sba_exc_sanction_limit_expired
// sba_exc_int_cal_not_upto_date
// sba_exc_insufficient_available_bal
// sba_exc_backdated_transaction

AccountInDebitBalLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_ac_in_debit_bal_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_ac_in_debit_bal_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_ac_in_debit_bal.setValue(this.sba_exc_ac_in_debit_bal_exce_code);
  });
}
AccountInCreditBalLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_ac_in_cr_bal_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_ac_in_cr_bal_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_ac_in_cr_bal.setValue(this.sba_exc_ac_in_cr_bal_exce_code);
  });
}
LiabilityExceedGroupLimitLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_liability_exceeds_group_limit_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_liability_exceeds_group_limit_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_liability_exceeds_group_limit.setValue(this.sba_exc_liability_exceeds_group_limit_exce_code);
  });
}
AccountIsFrozedLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_ac_if_frozed_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_ac_if_frozed_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_ac_if_frozed.setValue(this.sba_exc_ac_if_frozed_exce_code);
  });
}
SactionedLimitExpiredLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_sanction_limit_expired_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_sanction_limit_expired_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_sanction_limit_expired.setValue(this.sba_exc_sanction_limit_expired_exce_code);
  });
}
InterestCalculationNotUptodateLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_int_cal_not_upto_date_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_int_cal_not_upto_date_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_int_cal_not_upto_date.setValue(this.sba_exc_int_cal_not_upto_date_exce_code_);
  });
}
  sba_exc_int_cal_not_upto_date_exce_code_(sba_exc_int_cal_not_upto_date_exce_code_: any) {
    throw new Error('Method not implemented.');
  }
InsufficientAvailabbleBalanceLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_insufficient_available_bal_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_insufficient_available_bal_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_insufficient_available_bal.setValue(this.sba_exc_insufficient_available_bal_exce_code);
  });
}

BackdatedTransactionLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent, {
    height: '400px',
    width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata = result;
    this.sba_exc_backdated_transaction_exce_description = this.lookupdata.data.exce_description
    this.sba_exc_backdated_transaction_exce_code = this.lookupdata.data.exception_code 
    this.formData.controls.sba_exc_backdated_transaction.setValue(this.sba_exc_backdated_transaction_exce_code);
  });
}

     feeArray = new Array();
     glSubheadArray = new Array();
     
      formData = this.fb.group({
        sba_function_type: [''],
        sba_scheme_code: [''],
        sba_scheme_type:[''],
        sba_scheme_code_desc:[''],

        sba_effective_from_date:[''],
        sba_effective_to_date:[''],
        sba_system_generated_no:[''],
        sba_principal_lossline_ac:[''],
        sba_recovery_lossline_ac:[''],
        sba_charge_off_ac:[''],
        sba_number_generation:[''],
        sba_system_gen_no:[''],
        sba_number_generation_code:[''],

        // Interest Details
        sba_pl_ac_ccy:[''],
        sba_int_receivale_applicable:[''],
        sba_normal_int_receivable_ac:[''],
        sba_penal_int_receivable_ac:[''],
        sba_normal_int_received_ac:[''],
        sba_penal_int_received_ac:[''],
        sba_advance_int_ac:[''],
        sba_dr_int_compounding_freq:[''],
        sba_int_cal_freq_dr_week:[''],
        sba_app_discounted_int_rate:[''],
        sba_int_cal_freq_dr_day:[''],
        sba_int_cal_freq_dr_date:[''],
        sba_int_cal_freq_dr_holiday:[''],

        sba_no__of_withdrawals:[''],
        sba_no_int_if_withdwl_exceeded:[''],
        sba_ac_statement_charged_by:[''],
        sba_min_balance_with_chq:[''],
        sba_dr_bal_limit:[''],
        sba_ledger_folio_fee:[''],
        sba_fee_withrawal:[''],
        sba_inactive_ac_abnormal_tran_limit:[''],
        sba_dormant_ac_abnormal_trans_limit:[''],
        sba_duration_to_mark_ac_as_inactive:[''],
        sba_duration_from_inactive_to_dormant:[''],
        sba_dormant_fee:[''],
        sba_inactive_fee:[''],
        sba_int_calc_based_local_calender:[''],
        sba_int_method:[''],
        sba_bal_frm_date:[''],
        sba_bal_to_date:[''],
        sba_allow_sweeps:[''],
        sba_allow_debit_against_unclear_bal:[''],
        sba_dormant_calc_freq_dr_week:[''],
        sba_dormant_calc_freq_dr_day:[''],
        sba_dormant_calc_freq_dr_date:[''],
        sba_dormant_calc_freq_dr_holiday:[''],
        // sba_dormant_calc_freq_dr_week:[''],
        sba_chq_allowed:[''],
        sba_nomination:[''],
        sba_recover_fee_for_chq_issue:[''],
        // sba_dr_bal_limit:[''],
        sba_return_paid_chq:[''],
        sba_max_allowed_limit:[''],
        sba_sanction_limit:[''],
        sba_expiry_date:[''],
        sba_credit_file_no:[''],
        sba_paid_chq_return_freq_week:[''],
        sba_paid_chq_return_freq_day:[''],
        sba_paid_chq_return_freq_date:[''],
        sba_paid_chq_return_freq_holiday:[''],
        // sba_paid_chq_return_freq_day:[''],
        // sba_paid_chq_return_freq_date:[''],
        int_cal_freq_dr_holiday:[''],
        sba_ac_health_code:[''],
        sba_debt_ack_date:[''],
        sba_int_amt:[''],
        sba_dr_or_cr:[''],
        sba_min_bal:[''],
        sba_loan_int_compounded_till:[''],
        sba_provision_amt:[''],
        sba_adhoc_provisioned_amt:[''],
        // Exceptions 
        sba_exc_ac_in_debit_bal:[''],
        sba_exc_ac_in_cr_bal:[''],
        sba_exc_liability_exceeds_group_limit:[''],
        sba_exc_ac_if_frozed:[''],
        sba_exc_sanction_limit_expired:[''],
        sba_exc_int_cal_not_upto_date:[''],
        sba_exc_insufficient_available_bal:[''],
        sba_exc_backdated_transaction:[''],
        


        sba_fees: new FormArray([]),
        sba_glsubheads: new FormArray([])
               });

         feeFormData = this.fb.group({
                  sba_fee_type:[''],
                  sba_fee_event:[''],
                  sba_fee_frequency:[''],
                  sba_fee_amortize_credit_ph:[''],
                  sba_fee_amortize_debit_ph:[''],
                  sba_fee_deductable:[''],
                  sba_fee_multiple:[''],
                  sba_fee_amortize:[''],
                  sba_fee_demand_flow:[''],
                  sba_fee_dr_placeholder:[''],
                  sba_fee_cr_placeholder:[''],
                  sba_fee_amort_tenor:[''],
                  sba_fee_max_no_of_assesment:[''],
         });


         glsubheadFormData = this.fb.group({
           sba_gl_subhead:[''],
           sba_gl_subhead_description:[''],
           sba_gl_subhead_deafault:[''],
           sba_is_gl_subhead_deleted:['']
         })

         initLoanForm(){
         this.newData = true;
        this.feeFormData = this.fb.group({
          sba_fee_type:[''],
          sba_fee_event:[''],
          sba_fee_frequency:[''],
          sba_fee_amortize_credit_ph:[''],
          sba_fee_amortize_debit_ph:[''],
          sba_fee_deductable:[''],
          sba_fee_multiple:[''],
          sba_fee_amortize:[''],
          sba_fee_demand_flow:[''],
          sba_fee_dr_placeholder:[''],
          sba_fee_cr_placeholder:[''],
          sba_fee_amort_tenor:[''],
          sba_fee_max_no_of_assesment:[''],
      });
         }

         initGlSUbheadForm(){
           this.newData = true;
          this.glsubheadFormData = this.fb.group({
            sba_gl_subhead:[''],
            sba_gl_subhead_description:[''],
            sba_gl_subhead_deafault:[''],
            sba_is_gl_subhead_deleted:['']
          })
         }

         editLoanFeeForm(i:any){
           this.newData = false;
           this.arrayIndex = this.feeArray[i];
          this.feeFormData = this.fb.group({
            sba_fee_type:[this.feeArray[i].sba_fee_type],
            sba_fee_event:[this.feeArray[i].sba_fee_event],
            sba_fee_frequency:[this.feeArray[i].sba_fee_frequency],
            sba_fee_amortize_credit_ph:[this.feeArray[i].sba_fee_amortize_credit_ph],
            sba_fee_amortize_debit_ph:[this.feeArray[i].sba_fee_amortize_debit_ph],
            sba_fee_deductable:[this.feeArray[i].sba_fee_deductable],
            sba_fee_multiple:[this.feeArray[i].sba_fee_multiple],
            sba_fee_amortize:[this.feeArray[i].sba_fee_amortize],
            sba_fee_demand_flow:[this.feeArray[i].sba_fee_demand_flow],
            sba_fee_dr_placeholder:[this.feeArray[i].sba_fee_dr_placeholder],
            sba_fee_cr_placeholder:[this.feeArray[i].sba_fee_cr_placeholder],
            sba_fee_apr:[this.feeArray[i].sba_fee_apr],
            sba_fee_eir:[this.feeArray[i].sba_fee_eir],
            sba_fee_amort_tenor:[this.feeArray[i].sba_fee_amort_tenor],
            sba_fee_max_no_of_assesment:[this.feeArray[i].sba_fee_max_no_of_assesment],
        });

   const index: number = this.feeArray.indexOf(this.feeArray.values);
   this.feeArray.splice(index, i);
         }

     get g() { return this.formData.controls; }
    get t() { return this.g.sba_fees as FormArray; }
    get l() {return this.g.sba_glsubheads as FormArray;}


    newFormDkkata = this.fb.group({
      org_lnk_event_id: ['', Validators.required],
    });
         preview(){
           if(this.feeFormData.valid){
            this.t.push(this.fb.group(
              this.feeFormData.value
              ));
             this.feeArray.push(this.feeFormData.value);
             console.log("form fee", this.feeArray);
             this.initLoanForm();
           }
         }

        //  previewGlSubheads(){
        //   if(this.glsubheadFormData.valid){
        //     this.l.push(this.fb.group(
        //       this.glsubheadFormData.value
        //       ));
        //       this.glSubheadArray.push(this.glsubheadFormData.value);
        //       console.log("Gl Subheads", this.glSubheadArray);
        //       this.initLoanForm();
        //    }
        //  }

         previewGlSubheads(){
          if(this.glsubheadFormData.valid){
            if(this.glSubheadArray.length<1){
              this.glsubheadFormData.controls.sba_gl_subhead_deafault.setValue("Yes");
            }else{
              this.glsubheadFormData.controls.sba_gl_subhead_deafault.setValue("No");
            }
            this.l.push(this.fb.group(
              this.glsubheadFormData.value
              ));
              this.glSubheadArray.push(this.glsubheadFormData.value);
              this.initGlSUbheadForm();
           }
         }
         
         updateLoanFee(i:any){
          this.t.push(this.fb.group(
            this.feeFormData.value
            ));
           this.feeArray.push(this.feeFormData.value);
           console.log("form fee", this.feeArray);
           this.initLoanForm();
         }


         onRemove(i:any,){
          const index: number = this.feeArray.indexOf(this.feeArray.values);
            this.feeArray.splice(index, i);
            console.log("new", this.feeArray);
            this.feeArray = this.feeArray;
           console.log("click", i);
         }


         onRemoveGLSubhead(i:any,){
          const index: number = this.glSubheadArray.indexOf(this.glSubheadArray.values);
          this.glSubheadArray.splice(index, i);
          this.glSubheadArray = this.glSubheadArray
         }

         onfixed_amt(event:any){
           this.showFixed_amt = true;
           this.showPer_page = false;
         }
         onper_page(event:any){
          this.showPer_page = true;
          this.showFixed_amt = false;
         }
         
         onSystem_generated_no(event: any){
          this.showSystem_gen_no = true;
          this.showNumber_gen_code = false;;
        }
        onNumber_generation_code(event: any){
          this.showNumber_gen_code = true;
          this.showSystem_gen_no = false;;
        }

        onYes(event:any){
          this.showAmortizedPH = true;
        }
        onNo(event:any){
          this.showAmortizedPH = false;
        }
         

      disabledFormControll(){
        this.formData.disable();
      }
      getPage(){
        this.subscription = this.sbaAPI.currentMessage.subscribe(message =>{
          this.message = message;  
        this.function_type = this.message.function_type;
        this.scheme_code = this.message.scheme_code;
        this.scheme_type = this.message.scheme_type;
        this.scheme_code_desc = this.message.scheme_code_desc;

        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({

            sba_function_type: [this.function_type],
            sba_scheme_code: [this.scheme_code],
            sba_scheme_type:[this.scheme_type],
            sba_scheme_code_desc:[this.scheme_code_desc],
                
            sba_effective_from_date:[''],
            sba_effective_to_date:[''],
            sba_system_generated_no:[''],
            sba_principal_lossline_ac:[''],
            sba_recovery_lossline_ac:[''],
            sba_charge_off_ac:[''],
            sba_number_generation:[''],
            sba_system_gen_no:[''],
            sba_number_generation_code:[''],
    
            // Interest Details
            sba_pl_ac_ccy:[''],
            sba_int_receivale_applicable:[''],
            sba_normal_int_receivable_ac:[''],
            sba_penal_int_receivable_ac:[''],
            sba_normal_int_received_ac:[''],
            sba_penal_int_received_ac:[''],
            sba_advance_int_ac:[''],
            sba_dr_int_compounding_freq:[''],
            sba_int_cal_freq_dr_week:[''],
            sba_app_discounted_int_rate:[''],
            sba_int_cal_freq_dr_day:[''],
            sba_int_cal_freq_dr_date:[''],
            sba_int_cal_freq_dr_holiday:[''],
    
            sba_no__of_withdrawals:[''],
            sba_no_int_if_withdwl_exceeded:[''],
            sba_ac_statement_charged_by:[''],
            sba_min_balance_with_chq:[''],
            sba_dr_bal_limit:[''],
            sba_ledger_folio_fee:[''],
            sba_fee_withrawal:[''],
            sba_inactive_ac_abnormal_tran_limit:[''],
            sba_dormant_ac_abnormal_trans_limit:[''],
            sba_duration_to_mark_ac_as_inactive:[''],
            sba_duration_from_inactive_to_dormant:[''],
            sba_dormant_fee:[''],
            sba_inactive_fee:[''],
            sba_int_calc_based_local_calender:[''],
            sba_int_method:[''],
            sba_bal_frm_date:[''],
            sba_bal_to_date:[''],
            sba_allow_sweeps:[''],
            sba_allow_debit_against_unclear_bal:[''],
            sba_dormant_calc_freq_dr_week:[''],
            sba_dormant_calc_freq_dr_day:[''],
            sba_dormant_calc_freq_dr_date:[''],
            sba_dormant_calc_freq_dr_holiday:[''],
            // sba_dormant_calc_freq_dr_week:[''],
            sba_chq_allowed:[''],
            sba_nomination:[''],
            sba_recover_fee_for_chq_issue:[''],
            // sba_dr_bal_limit:[''],
            sba_return_paid_chq:[''],
            sba_max_allowed_limit:[''],
            sba_sanction_limit:[''],
            sba_expiry_date:[''],
            sba_credit_file_no:[''],
            sba_paid_chq_return_freq_week:[''],
            sba_paid_chq_return_freq_day:[''],
            sba_paid_chq_return_freq_date:[''],
            sba_paid_chq_return_freq_holiday:[''],
            // sba_paid_chq_return_freq_day:[''],
            // sba_paid_chq_return_freq_date:[''],
            int_cal_freq_dr_holiday:[''],
            sba_ac_health_code:[''],
            sba_debt_ack_date:[''],
            sba_int_amt:[''],
            sba_dr_or_cr:[''],
            sba_min_bal:[''],
            sba_loan_int_compounded_till:[''],
            sba_provision_amt:[''],
            sba_adhoc_provisioned_amt:[''],
            // Exceptions 
            sba_exc_ac_in_debit_bal:[''],
            sba_exc_ac_in_cr_bal:[''],
            sba_exc_liability_exceeds_group_limit:[''],
            sba_exc_ac_if_frozed:[''],
            sba_exc_sanction_limit_expired:[''],
            sba_exc_int_cal_not_upto_date:[''],
            sba_exc_insufficient_available_bal:[''],
            sba_exc_backdated_transaction:[''],
            is_verified:[false],
            is_deleted:[false],
            
            sba_fees: new FormArray([]),
            sba_glsubheads: new FormArray([])

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

        let params = new HttpParams()
        .set("scheme_code", this.scheme_code);     
          this.subscription = this.sbaAPI.getproductBySchemeCode(params).subscribe(res=>{
            this.results = res;

            this.feeArray = this.results.sba_fees
            this.glSubheadArray = this.results.sba_glsubheads

            this.formData = this.fb.group({
              id:[this.results.id],
              sba_function_type: [this.function_type],
              sba_scheme_code: [this.results.sba_scheme_code],
              sba_scheme_type:[this.results. sba_scheme_type],
              sba_scheme_code_desc:[this.results.sba_scheme_code_desc],
                  
              sba_effective_from_date:[this.results.sba_effective_from_date],
              sba_effective_to_date:[this.results.sba_effective_to_date],
              sba_system_generated_no:[this.results.sba_system_generated_no],
              sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
              sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
              sba_charge_off_ac:[this.results.sba_charge_off_ac],
              sba_number_generation:[this.results.sba_number_generation],
              sba_system_gen_no:[this.results.sba_system_gen_no],
              sba_number_generation_code:[this.results.sba_number_generation_code],

              sba_pl_ac_ccy:[this.results.sba_pl_ac_ccy],
              sba_int_receivale_applicable:[this.results.sba_int_receivale_applicable],
              sba_normal_int_receivable_ac:[this.results.sba_normal_int_receivable_ac],
              sba_penal_int_receivable_ac:[this.results.sba_penal_int_receivable_ac],
              sba_normal_int_received_ac:[this.results.sba_normal_int_received_ac],
              sba_penal_int_received_ac:[this.results.sba_penal_int_received_ac],
              sba_advance_int_ac:[this.results.sba_advance_int_ac],
              sba_dr_int_compounding_freq:[this.results.sba_dr_int_compounding_freq],
              sba_int_cal_freq_dr_week:[this.results.sba_int_cal_freq_dr_week],
              sba_app_discounted_int_rate:[this.results.sba_app_discounted_int_rate],
              sba_int_cal_freq_dr_day:[this.results.sba_int_cal_freq_dr_day],
              sba_int_cal_freq_dr_date:[this.results.sba_int_cal_freq_dr_date],
              sba_int_cal_freq_dr_holiday:[this.results.sba_int_cal_freq_dr_holiday],

              sba_no__of_withdrawals:[this.results.sba_no__of_withdrawals],
              sba_no_int_if_withdwl_exceeded:[this.results.sba_no_int_if_withdwl_exceeded],
              sba_ac_statement_charged_by:[this.results.sba_ac_statement_charged_by],
              sba_min_balance_with_chq:[this.results.sba_min_balance_with_chq],
              sba_dr_bal_limit:[this.results.sba_dr_bal_limit],
              sba_ledger_folio_fee:[this.results.sba_ledger_folio_fee],
              sba_fee_withrawal:[this.results.sba_fee_withrawal],
              sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
              sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
              sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
              sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
              sba_dormant_fee:[this.results.sba_dormant_fee],
              sba_inactive_fee:[this.results.sba_inactive_fee],
              sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
              sba_int_method:[this.results.sba_int_method],
              sba_bal_frm_date:[this.results.sba_bal_frm_date],
              sba_bal_to_date:[this.results.sba_bal_to_date],
              sba_allow_sweeps:[this.results.sba_allow_sweeps],
              sba_allow_debit_against_unclear_bal:[this.results.sba_allow_debit_against_unclear_bal],
              sba_dormant_calc_freq_dr_week:[this.results.sba_dormant_calc_freq_dr_week],
              sba_dormant_calc_freq_dr_day:[this.results.sba_dormant_calc_freq_dr_day],
              sba_dormant_calc_freq_dr_date:[this.results.sba_dormant_calc_freq_dr_date],
              sba_dormant_calc_freq_dr_holiday:[this.results.sba_dormant_calc_freq_dr_holiday],

              sba_chq_allowed:[this.results.sba_chq_allowed],
              sba_nomination:[this.results.sba_nomination],
              sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
              // sba_dr_bal_limit:[this.results.              // sba_dr_bal_limit:[this.results.],],
              sba_return_paid_chq:[this.results.sba_return_paid_chq],
              sba_max_allowed_limit:[this.results.sba_max_allowed_limit],
              sba_sanction_limit:[this.results.sba_sanction_limit],
              sba_expiry_date:[this.results.sba_expiry_date],
              sba_credit_file_no:[this.results.sba_credit_file_no],
              sba_paid_chq_return_freq_week:[this.results.sba_paid_chq_return_freq_week],
              sba_paid_chq_return_freq_day:[this.results.sba_paid_chq_return_freq_day],
              sba_paid_chq_return_freq_date:[this.results.sba_paid_chq_return_freq_date],
              sba_paid_chq_return_freq_holiday:[this.results.sba_paid_chq_return_freq_holiday],
              // sba_paid_chq_return_freq_day:[this.results.              // sba_paid_chq_return_freq_day:[this.results.],],
              // sba_paid_chq_return_freq_date:[this.results.              // sba_paid_chq_return_freq_date:[this.results.],],
              int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
              sba_ac_health_code:[this.results.sba_ac_health_code],
              sba_debt_ack_date:[this.results.sba_debt_ack_date],
              sba_int_amt:[this.results.sba_int_amt],
              sba_dr_or_cr:[this.results.sba_dr_or_cr],
              sba_min_bal:[this.results.sba_min_bal],
              sba_loan_int_compounded_till:[this.results.sba_loan_int_compounded_till],
              sba_provision_amt:[this.results.sba_provision_amt],
              sba_adhoc_provisioned_amt:[this.results.sba_adhoc_provisioned_amt],
              // Exceptithis.results.              // Exceptithis.results.s s 
              sba_exc_ac_in_debit_bal:[this.results.sba_exc_ac_in_debit_bal],
              sba_exc_ac_in_cr_bal:[this.results.sba_exc_ac_in_cr_bal],
              sba_exc_liability_exceeds_group_limit:[this.results.sba_exc_liability_exceeds_group_limit],
              sba_exc_ac_if_frozed:[this.results.sba_exc_ac_if_frozed],
              sba_exc_sanction_limit_expired:[this.results.sba_exc_sanction_limit_expired],
              sba_exc_int_cal_not_upto_date:[this.results.sba_exc_int_cal_not_upto_date],
              sba_exc_insufficient_available_bal:[this.results.sba_exc_insufficient_available_bal],
              sba_exc_backdated_transaction:[this.results.sba_exc_backdated_transaction],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            })
          })
        }
        else if(this.function_type == "M-Modify"){
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
            this.subscription = this.sbaAPI.getproductBySchemeCode(params).subscribe(res=>{
              this.results = res;

              this.formData = this.fb.group({

                id:[this.results.id],
                sba_function_type: [this.function_type],
                sba_scheme_code: [this.results.sba_scheme_code],
                sba_scheme_type:[this.results. sba_scheme_type],
                sba_scheme_code_desc:[this.results.sba_scheme_code_desc],
                    
                sba_effective_from_date:[this.results.sba_effective_from_date],
                sba_effective_to_date:[this.results.sba_effective_to_date],
                sba_system_generated_no:[this.results.sba_system_generated_no],
                sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
                sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
                sba_charge_off_ac:[this.results.sba_charge_off_ac],
                sba_number_generation:[this.results.sba_number_generation],
                sba_system_gen_no:[this.results.sba_system_gen_no],
                sba_number_generation_code:[this.results.sba_number_generation_code],
  
                sba_pl_ac_ccy:[this.results.sba_pl_ac_ccy],
                sba_int_receivale_applicable:[this.results.sba_int_receivale_applicable],
                sba_normal_int_receivable_ac:[this.results.sba_normal_int_receivable_ac],
                sba_penal_int_receivable_ac:[this.results.sba_penal_int_receivable_ac],
                sba_normal_int_received_ac:[this.results.sba_normal_int_received_ac],
                sba_penal_int_received_ac:[this.results.sba_penal_int_received_ac],
                sba_advance_int_ac:[this.results.sba_advance_int_ac],
                sba_dr_int_compounding_freq:[this.results.sba_dr_int_compounding_freq],
                sba_int_cal_freq_dr_week:[this.results.sba_int_cal_freq_dr_week],
                sba_app_discounted_int_rate:[this.results.sba_app_discounted_int_rate],
                sba_int_cal_freq_dr_day:[this.results.sba_int_cal_freq_dr_day],
                sba_int_cal_freq_dr_date:[this.results.sba_int_cal_freq_dr_date],
                sba_int_cal_freq_dr_holiday:[this.results.sba_int_cal_freq_dr_holiday],
  
                sba_no__of_withdrawals:[this.results.sba_no__of_withdrawals],
                sba_no_int_if_withdwl_exceeded:[this.results.sba_no_int_if_withdwl_exceeded],
                sba_ac_statement_charged_by:[this.results.sba_ac_statement_charged_by],
                sba_min_balance_with_chq:[this.results.sba_min_balance_with_chq],
                sba_dr_bal_limit:[this.results.sba_dr_bal_limit],
                sba_ledger_folio_fee:[this.results.sba_ledger_folio_fee],
                sba_fee_withrawal:[this.results.sba_fee_withrawal],
                sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
                sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
                sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
                sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
                sba_dormant_fee:[this.results.sba_dormant_fee],
                sba_inactive_fee:[this.results.sba_inactive_fee],
                sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
                sba_int_method:[this.results.sba_int_method],
                sba_bal_frm_date:[this.results.sba_bal_frm_date],
                sba_bal_to_date:[this.results.sba_bal_to_date],
                sba_allow_sweeps:[this.results.sba_allow_sweeps],
                sba_allow_debit_against_unclear_bal:[this.results.sba_allow_debit_against_unclear_bal],
                sba_dormant_calc_freq_dr_week:[this.results.sba_dormant_calc_freq_dr_week],
                sba_dormant_calc_freq_dr_day:[this.results.sba_dormant_calc_freq_dr_day],
                sba_dormant_calc_freq_dr_date:[this.results.sba_dormant_calc_freq_dr_date],
                sba_dormant_calc_freq_dr_holiday:[this.results.sba_dormant_calc_freq_dr_holiday],
  
                sba_chq_allowed:[this.results.sba_chq_allowed],
                sba_nomination:[this.results.sba_nomination],
                sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
                // sba_dr_bal_limit:[this.results.              // sba_dr_bal_limit:[this.results.],],
                sba_return_paid_chq:[this.results.sba_return_paid_chq],
                sba_max_allowed_limit:[this.results.sba_max_allowed_limit],
                sba_sanction_limit:[this.results.sba_sanction_limit],
                sba_expiry_date:[this.results.sba_expiry_date],
                sba_credit_file_no:[this.results.sba_credit_file_no],
                sba_paid_chq_return_freq_week:[this.results.sba_paid_chq_return_freq_week],
                sba_paid_chq_return_freq_day:[this.results.sba_paid_chq_return_freq_day],
                sba_paid_chq_return_freq_date:[this.results.sba_paid_chq_return_freq_date],
                sba_paid_chq_return_freq_holiday:[this.results.sba_paid_chq_return_freq_holiday],
                // sba_paid_chq_return_freq_day:[this.results.              // sba_paid_chq_return_freq_day:[this.results.],],
                // sba_paid_chq_return_freq_date:[this.results.              // sba_paid_chq_return_freq_date:[this.results.],],
                int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
                sba_ac_health_code:[this.results.sba_ac_health_code],
                sba_debt_ack_date:[this.results.sba_debt_ack_date],
                sba_int_amt:[this.results.sba_int_amt],
                sba_dr_or_cr:[this.results.sba_dr_or_cr],
                sba_min_bal:[this.results.sba_min_bal],
                sba_loan_int_compounded_till:[this.results.sba_loan_int_compounded_till],
                sba_provision_amt:[this.results.sba_provision_amt],
                sba_adhoc_provisioned_amt:[this.results.sba_adhoc_provisioned_amt],
                // Exceptithis.results.              // Exceptithis.results.s s 
                sba_exc_ac_in_debit_bal:[this.results.sba_exc_ac_in_debit_bal],
                sba_exc_ac_in_cr_bal:[this.results.sba_exc_ac_in_cr_bal],
                sba_exc_liability_exceeds_group_limit:[this.results.sba_exc_liability_exceeds_group_limit],
                sba_exc_ac_if_frozed:[this.results.sba_exc_ac_if_frozed],
                sba_exc_sanction_limit_expired:[this.results.sba_exc_sanction_limit_expired],
                sba_exc_int_cal_not_upto_date:[this.results.sba_exc_int_cal_not_upto_date],
                sba_exc_insufficient_available_bal:[this.results.sba_exc_insufficient_available_bal],
                sba_exc_backdated_transaction:[this.results.sba_exc_backdated_transaction],
                is_verified:[this.results.is_verified],
                is_deleted:[this.results.is_deleted],

                sba_fees:[this.results.sba_fees],
                sba_glsubheads:[ this.results.sba_glsubheads]
            });

            this.feeArray = this.results.sba_fees
            this.glSubheadArray = this.results.sba_glsubheads
            
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
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
            this.subscription = this.sbaAPI.getproductBySchemeCode(params).subscribe(res=>{
              this.results = res;

              this.disabledFormControll();

            this.feeArray = this.results.sba_fees
            this.glSubheadArray = this.results.sba_glsubheads

              this.formData = this.fb.group({

                id:[this.results.id],
                sba_function_type: [this.function_type],
                sba_scheme_code: [this.results.sba_scheme_code],
                sba_scheme_type:[this.results. sba_scheme_type],
                sba_scheme_code_desc:[this.results.sba_scheme_code_desc],
                    
                sba_effective_from_date:[this.results.sba_effective_from_date],
                sba_effective_to_date:[this.results.sba_effective_to_date],
                sba_system_generated_no:[this.results.sba_system_generated_no],
                sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
                sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
                sba_charge_off_ac:[this.results.sba_charge_off_ac],
                sba_number_generation:[this.results.sba_number_generation],
                sba_system_gen_no:[this.results.sba_system_gen_no],
                sba_number_generation_code:[this.results.sba_number_generation_code],
  
                sba_pl_ac_ccy:[this.results.sba_pl_ac_ccy],
                sba_int_receivale_applicable:[this.results.sba_int_receivale_applicable],
                sba_normal_int_receivable_ac:[this.results.sba_normal_int_receivable_ac],
                sba_penal_int_receivable_ac:[this.results.sba_penal_int_receivable_ac],
                sba_normal_int_received_ac:[this.results.sba_normal_int_received_ac],
                sba_penal_int_received_ac:[this.results.sba_penal_int_received_ac],
                sba_advance_int_ac:[this.results.sba_advance_int_ac],
                sba_dr_int_compounding_freq:[this.results.sba_dr_int_compounding_freq],
                sba_int_cal_freq_dr_week:[this.results.sba_int_cal_freq_dr_week],
                sba_app_discounted_int_rate:[this.results.sba_app_discounted_int_rate],
                sba_int_cal_freq_dr_day:[this.results.sba_int_cal_freq_dr_day],
                sba_int_cal_freq_dr_date:[this.results.sba_int_cal_freq_dr_date],
                sba_int_cal_freq_dr_holiday:[this.results.sba_int_cal_freq_dr_holiday],
  
                sba_no__of_withdrawals:[this.results.sba_no__of_withdrawals],
                sba_no_int_if_withdwl_exceeded:[this.results.sba_no_int_if_withdwl_exceeded],
                sba_ac_statement_charged_by:[this.results.sba_ac_statement_charged_by],
                sba_min_balance_with_chq:[this.results.sba_min_balance_with_chq],
                sba_dr_bal_limit:[this.results.sba_dr_bal_limit],
                sba_ledger_folio_fee:[this.results.sba_ledger_folio_fee],
                sba_fee_withrawal:[this.results.sba_fee_withrawal],
                sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
                sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
                sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
                sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
                sba_dormant_fee:[this.results.sba_dormant_fee],
                sba_inactive_fee:[this.results.sba_inactive_fee],
                sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
                sba_int_method:[this.results.sba_int_method],
                sba_bal_frm_date:[this.results.sba_bal_frm_date],
                sba_bal_to_date:[this.results.sba_bal_to_date],
                sba_allow_sweeps:[this.results.sba_allow_sweeps],
                sba_allow_debit_against_unclear_bal:[this.results.sba_allow_debit_against_unclear_bal],
                sba_dormant_calc_freq_dr_week:[this.results.sba_dormant_calc_freq_dr_week],
                sba_dormant_calc_freq_dr_day:[this.results.sba_dormant_calc_freq_dr_day],
                sba_dormant_calc_freq_dr_date:[this.results.sba_dormant_calc_freq_dr_date],
                sba_dormant_calc_freq_dr_holiday:[this.results.sba_dormant_calc_freq_dr_holiday],
  
                sba_chq_allowed:[this.results.sba_chq_allowed],
                sba_nomination:[this.results.sba_nomination],
                sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
                // sba_dr_bal_limit:[this.results.              // sba_dr_bal_limit:[this.results.],],
                sba_return_paid_chq:[this.results.sba_return_paid_chq],
                sba_max_allowed_limit:[this.results.sba_max_allowed_limit],
                sba_sanction_limit:[this.results.sba_sanction_limit],
                sba_expiry_date:[this.results.sba_expiry_date],
                sba_credit_file_no:[this.results.sba_credit_file_no],
                sba_paid_chq_return_freq_week:[this.results.sba_paid_chq_return_freq_week],
                sba_paid_chq_return_freq_day:[this.results.sba_paid_chq_return_freq_day],
                sba_paid_chq_return_freq_date:[this.results.sba_paid_chq_return_freq_date],
                sba_paid_chq_return_freq_holiday:[this.results.sba_paid_chq_return_freq_holiday],
                // sba_paid_chq_return_freq_day:[this.results.              // sba_paid_chq_return_freq_day:[this.results.],],
                // sba_paid_chq_return_freq_date:[this.results.              // sba_paid_chq_return_freq_date:[this.results.],],
                int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
                sba_ac_health_code:[this.results.sba_ac_health_code],
                sba_debt_ack_date:[this.results.sba_debt_ack_date],
                sba_int_amt:[this.results.sba_int_amt],
                sba_dr_or_cr:[this.results.sba_dr_or_cr],
                sba_min_bal:[this.results.sba_min_bal],
                sba_loan_int_compounded_till:[this.results.sba_loan_int_compounded_till],
                sba_provision_amt:[this.results.sba_provision_amt],
                sba_adhoc_provisioned_amt:[this.results.sba_adhoc_provisioned_amt],
                // Exceptithis.results.              // Exceptithis.results.s s 
                sba_exc_ac_in_debit_bal:[this.results.sba_exc_ac_in_debit_bal],
                sba_exc_ac_in_cr_bal:[this.results.sba_exc_ac_in_cr_bal],
                sba_exc_liability_exceeds_group_limit:[this.results.sba_exc_liability_exceeds_group_limit],
                sba_exc_ac_if_frozed:[this.results.sba_exc_ac_if_frozed],
                sba_exc_sanction_limit_expired:[this.results.sba_exc_sanction_limit_expired],
                sba_exc_int_cal_not_upto_date:[this.results.sba_exc_int_cal_not_upto_date],
                sba_exc_insufficient_available_bal:[this.results.sba_exc_insufficient_available_bal],
                sba_exc_backdated_transaction:[this.results.sba_exc_backdated_transaction],
                is_verified:[true],
                is_deleted:[this.results.is_deleted],

                sba_fees:[this.results.sba_fees],
                sba_glsubheads:[ this.results.sba_glsubheads]

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
        
        else if(this.function_type == "X-Delete"){
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
            this.subscription = this.sbaAPI.getproductBySchemeCode(params).subscribe(res=>{
              this.results = res;

              this.disabledFormControll();

            this.feeArray = this.results.sba_fees
            this.glSubheadArray = this.results.sba_glsubheads

              this.formData = this.fb.group({

                id:[this.results.id],
                sba_function_type: [this.function_type],
                sba_scheme_code: [this.results.sba_scheme_code],
                sba_scheme_type:[this.results. sba_scheme_type],
                sba_scheme_code_desc:[this.results.sba_scheme_code_desc],
                    
                sba_effective_from_date:[this.results.sba_effective_from_date],
                sba_effective_to_date:[this.results.sba_effective_to_date],
                sba_system_generated_no:[this.results.sba_system_generated_no],
                sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
                sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
                sba_charge_off_ac:[this.results.sba_charge_off_ac],
                sba_number_generation:[this.results.sba_number_generation],
                sba_system_gen_no:[this.results.sba_system_gen_no],
                sba_number_generation_code:[this.results.sba_number_generation_code],
  
                sba_pl_ac_ccy:[this.results.sba_pl_ac_ccy],
                sba_int_receivale_applicable:[this.results.sba_int_receivale_applicable],
                sba_normal_int_receivable_ac:[this.results.sba_normal_int_receivable_ac],
                sba_penal_int_receivable_ac:[this.results.sba_penal_int_receivable_ac],
                sba_normal_int_received_ac:[this.results.sba_normal_int_received_ac],
                sba_penal_int_received_ac:[this.results.sba_penal_int_received_ac],
                sba_advance_int_ac:[this.results.sba_advance_int_ac],
                sba_dr_int_compounding_freq:[this.results.sba_dr_int_compounding_freq],
                sba_int_cal_freq_dr_week:[this.results.sba_int_cal_freq_dr_week],
                sba_app_discounted_int_rate:[this.results.sba_app_discounted_int_rate],
                sba_int_cal_freq_dr_day:[this.results.sba_int_cal_freq_dr_day],
                sba_int_cal_freq_dr_date:[this.results.sba_int_cal_freq_dr_date],
                sba_int_cal_freq_dr_holiday:[this.results.sba_int_cal_freq_dr_holiday],
  
                sba_no__of_withdrawals:[this.results.sba_no__of_withdrawals],
                sba_no_int_if_withdwl_exceeded:[this.results.sba_no_int_if_withdwl_exceeded],
                sba_ac_statement_charged_by:[this.results.sba_ac_statement_charged_by],
                sba_min_balance_with_chq:[this.results.sba_min_balance_with_chq],
                sba_dr_bal_limit:[this.results.sba_dr_bal_limit],
                sba_ledger_folio_fee:[this.results.sba_ledger_folio_fee],
                sba_fee_withrawal:[this.results.sba_fee_withrawal],
                sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
                sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
                sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
                sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
                sba_dormant_fee:[this.results.sba_dormant_fee],
                sba_inactive_fee:[this.results.sba_inactive_fee],
                sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
                sba_int_method:[this.results.sba_int_method],
                sba_bal_frm_date:[this.results.sba_bal_frm_date],
                sba_bal_to_date:[this.results.sba_bal_to_date],
                sba_allow_sweeps:[this.results.sba_allow_sweeps],
                sba_allow_debit_against_unclear_bal:[this.results.sba_allow_debit_against_unclear_bal],
                sba_dormant_calc_freq_dr_week:[this.results.sba_dormant_calc_freq_dr_week],
                sba_dormant_calc_freq_dr_day:[this.results.sba_dormant_calc_freq_dr_day],
                sba_dormant_calc_freq_dr_date:[this.results.sba_dormant_calc_freq_dr_date],
                sba_dormant_calc_freq_dr_holiday:[this.results.sba_dormant_calc_freq_dr_holiday],
  
                sba_chq_allowed:[this.results.sba_chq_allowed],
                sba_nomination:[this.results.sba_nomination],
                sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
                // sba_dr_bal_limit:[this.results.              // sba_dr_bal_limit:[this.results.],],
                sba_return_paid_chq:[this.results.sba_return_paid_chq],
                sba_max_allowed_limit:[this.results.sba_max_allowed_limit],
                sba_sanction_limit:[this.results.sba_sanction_limit],
                sba_expiry_date:[this.results.sba_expiry_date],
                sba_credit_file_no:[this.results.sba_credit_file_no],
                sba_paid_chq_return_freq_week:[this.results.sba_paid_chq_return_freq_week],
                sba_paid_chq_return_freq_day:[this.results.sba_paid_chq_return_freq_day],
                sba_paid_chq_return_freq_date:[this.results.sba_paid_chq_return_freq_date],
                sba_paid_chq_return_freq_holiday:[this.results.sba_paid_chq_return_freq_holiday],
                // sba_paid_chq_return_freq_day:[this.results.              // sba_paid_chq_return_freq_day:[this.results.],],
                // sba_paid_chq_return_freq_date:[this.results.              // sba_paid_chq_return_freq_date:[this.results.],],
                int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
                sba_ac_health_code:[this.results.sba_ac_health_code],
                sba_debt_ack_date:[this.results.sba_debt_ack_date],
                sba_int_amt:[this.results.sba_int_amt],
                sba_dr_or_cr:[this.results.sba_dr_or_cr],
                sba_min_bal:[this.results.sba_min_bal],
                sba_loan_int_compounded_till:[this.results.sba_loan_int_compounded_till],
                sba_provision_amt:[this.results.sba_provision_amt],
                sba_adhoc_provisioned_amt:[this.results.sba_adhoc_provisioned_amt],
                // Exceptithis.results.              // Exceptithis.results.s s 
                sba_exc_ac_in_debit_bal:[this.results.sba_exc_ac_in_debit_bal],
                sba_exc_ac_in_cr_bal:[this.results.sba_exc_ac_in_cr_bal],
                sba_exc_liability_exceeds_group_limit:[this.results.sba_exc_liability_exceeds_group_limit],
                sba_exc_ac_if_frozed:[this.results.sba_exc_ac_if_frozed],
                sba_exc_sanction_limit_expired:[this.results.sba_exc_sanction_limit_expired],
                sba_exc_int_cal_not_upto_date:[this.results.sba_exc_int_cal_not_upto_date],
                sba_exc_insufficient_available_bal:[this.results.sba_exc_insufficient_available_bal],
                sba_exc_backdated_transaction:[this.results.sba_exc_backdated_transaction],
                is_verified:[this.results.is_verified],
                is_deleted:[true],

                sba_fees:[this.results.sba_fees],
                sba_glsubheads:[ this.results.sba_glsubheads]

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
                
        this.formData.controls.sba_effective_from_date.setValue(this.datepipe.transform(this.f.sba_effective_from_date.value, 'yyyy-MM-ddTHH:mm:ss'));
        this.formData.controls.sba_effective_to_date.setValue(this.datepipe.transform(this.f.sba_effective_to_date.value, 'yyyy-MM-ddTHH:mm:ss'));
  

        console.log(this.formData.value);
        
          this.submitted = true;
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.sbaAPI.createSavingscheme(this.formData.value).subscribe(res=>{
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
            }else if(this.function_type != "A-Add"){
              this.subscription = this.sbaAPI.updateSavingscheme(this.formData.value).subscribe(res=>{
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