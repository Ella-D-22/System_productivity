import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { InterestLookupComponent } from '../../interest/interest-lookup/interest-lookup.component';
import { LoanAccountLookupComponent } from '../../loan-account/loan-account-lookup/loan-account-lookup.component';
import { LoanAccountService } from '../../loan-account/loan-account.service';
import { EventIdLookupComponent } from '../../SystemConfigurations/ChargesParams/event-id/event-id-lookup/event-id-lookup.component';
import { EventTypeLookupComponent } from '../../SystemConfigurations/ChargesParams/event-type/event-type-lookup/event-type-lookup.component';
import { CurrencyLookupComponent } from '../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { ExceptionsCodesLookupComponent } from '../../SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes-lookup/exceptions-codes-lookup.component';
import { GlSubheadLookupComponent } from '../../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { LoanproductService } from './loanproduct.service';

@Component({
  selector: 'app-loanproduct',
  templateUrl: './loanproduct.component.html',
  styleUrls: ['./loanproduct.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoanproductComponent implements OnInit {
  currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  auth_user = this.currentUser.username;

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
     'P-PMT Formula','F-Flat Rate'
   ]
   weeksArray: any = [
     'Week 1', 'Week 2','Week 3', 'Week 4'
   ]
   debitIntCompFreqArray: any = [
    'Daily','Monthly'
   ]
   int_comp_freq_array: any = ['D- Daily', 'W – Weekly', 'F – Fortnightly', 'M – Monthly','Q- Quarterly','H – Half yearly', 'Y- Yearly','T-Twice a month']
   ei_payment_freq_array: any = ['D- Daily','W – Weekly','F – Fortnightly','M – Monthly','Q- Quarterly','H – Half yearly', 'Y- Yearly']
   
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
    'E – Recover up to Effective Amount',
    'C – Cash Repayment',
    'S – Recover from Salary',
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
  showSystem_gen_no = false;
  showNumber_gen_code = false;
  showAmortizedPH = false;
  showChronologicalOrder = false;
  selecteddateFrom: any;
  fomartedFromDate: any;
  selecteddateTo: any;
  fomartedToDate: any;
  newfomartedFromDate: any;
  dtype: string;
  laa_normal_int_receivable_ac: any;
  laa_penal_int_receivable_ac: any;
  laa_normal_int_received_ac: any;
  laa_penal_int_received_ac: any;
  laa_advance_int_ac: any;
  interestCode: any;
  laa_principal_lossline_ac: any;
  laa_principal_lossline_ac_desc: any;
  laa_recovery_lossline_ac: any;
  laa_recovery_lossline_ac_desc: any;
  laa_fee_cr_placeholder: any;
  laa_fee_dr_placeholder: any;
  laa_fee_amortize_debit_ph: any;
  laa_charge_off_ac: any;
  laa_charge_off_ac_desc: any;
  laa_interest_table_code: any;
  laa_interest_table_code_desc: any;
  laa_ac_int_suspense: any;
  laa_ac_int_suspense_desc: any;
  laa_fee_amortize_credit_ph: any;
  laa_fee_amortize_credit_ph_desc: any;
  laa_fee_amortize_debit_ph_desc: any;
  data: any;
  exception_lookupData: any;
  ac_debit_balance_value: any;
  ac_credit_balance_value: any;
  liability_exceed_group_value: any;
  ac_is_froozed_value: any;
  sanction_limit_expired_value: any;
  interest_calc_value: any;
  insufficient_exception_value: any;
  backdate_transaction_value: any;

  eventidLookup(): void {
    const dialogRef = this.dialog.open(EventIdLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data;
      this.feeFormData.controls.laa_fee_event.setValue(result.data);
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
      this.feeFormData.controls.laa_fee_type.setValue(this.event_type_code);
    });
  }
  onYes(event:any){
    this.showAmortizedPH = true;
  }
  onNo(event:any){
    this.showAmortizedPH = false;
  }
  onChronologicalOrder(event:any){
    this.showChronologicalOrder = true;
  }
  onOffsetSequence(event:any){
    this.showChronologicalOrder = false;
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
      this.glSubheadData.controls.laa_gl_subhead.setValue(this.gl_subhead_code);
      this.glSubheadData.controls.laa_gl_subhead_description.setValue(this.gl_subhead_description);
    });
  }


  intTableCodeLookup(): void {
      const cdialogRef = this.dialog.open(InterestLookupComponent, {
      
      });
      cdialogRef.afterClosed().subscribe((result) => {
        this.laa_interest_table_code = result.data.interestCode;

      });
    }

    // Account lookups
principal_lossline_acLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_principal_lossline_ac = result.data.acid;
    this.laa_principal_lossline_ac_desc = result.data.accountName;
    this.formData.controls.laa_principal_lossline_ac.setValue(result.data.acid);
  });
}

laa_charge_off_acLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_charge_off_ac = result.data.acid;
    this.laa_charge_off_ac_desc = result.data.accountName;
    this.formData.controls.laa_charge_off_ac.setValue(result.data.acid);
  });
}

recoveryLosslineAcLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_recovery_lossline_ac = result.data.acid;
    this.laa_recovery_lossline_ac_desc = result.data.accountName;
    this.formData.controls.laa_recovery_lossline_ac.setValue(result.data.acid);
  });
}
laa_normal_int_receivable_acLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_normal_int_receivable_ac = result.data.acid;
    this.formData.controls.laa_normal_int_receivable_ac.setValue(result.data.acid);
  });
}

normIntReceivedAccountLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_normal_int_received_ac = result.data.acid;
    this.formData.controls.laa_normal_int_received_ac.setValue(result.data.acid);
  });
}

penalIntRecAcLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_penal_int_receivable_ac = result.data.acid;
    this.formData.controls.laa_penal_int_receivable_ac.setValue(result.data.acid);
  });
}
normIntReceivedaccountLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_normal_int_received_ac = result.data.acid;
    this.formData.controls.laa_normal_int_received_ac.setValue(result.data.acid);
  });
}
penalIntReceivedaccountLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_penal_int_received_ac = result.data.acid;
    this.formData.controls.laa_penal_int_received_ac.setValue(result.data.acid);
  });
}
advanceIntAcLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_advance_int_ac = result.data.acid;
    this.formData.controls.laa_advance_int_ac.setValue(result.data.acid);
  });
}

laa_fee_dr_placeholderLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_fee_dr_placeholder = result.data.acid;
    this.formData.controls.laa_fee_dr_placeholder.setValue(result.data.acid);
  });
}
laa_fee_cr_placeholderLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_fee_cr_placeholder = result.data.acid;
    this.formData.controls.laa_fee_cr_placeholder.setValue(result.data.acid);
  });
}
laa_ac_int_suspenseLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_ac_int_suspense = result.data.acid;
    this.laa_ac_int_suspense_desc = result.data.accountName;
    this.formData.controls.laa_ac_int_suspense.setValue(result.data.acid);
  });
}

laa_fee_amortize_credit_phLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_fee_amortize_credit_ph = result.data.acid;
    this.laa_fee_amortize_credit_ph_desc = result.data.accountName;
    this.formData.controls.laa_fee_amortize_credit_ph.setValue(result.data.acid);
  });
}
laa_fee_amortize_debit_phLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.laa_fee_amortize_debit_ph = result.data.acid;
    this.laa_fee_amortize_debit_ph_desc = result.data.accountName;
    this.formData.controls.laa_fee_amortize_debit_ph.setValue(result.data.acid);
  });
}

// Exceptions Lookup
ac_debit_balance_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.ac_debit_balance_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
ac_credit_balance_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.ac_credit_balance_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
liability_exceed_group_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.liability_exceed_group_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
ac_is_froozed_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.ac_is_froozed_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
sanction_limit_expired_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.sanction_limit_expired_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
interest_calc_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.interest_calc_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
insufficient_exception_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.insufficient_exception_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
  });
}
backdate_transaction_Lookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    this.backdate_transaction_value =  this.exception_lookupData.exception_code;
    this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
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
    private loanproductAPI:LoanproductService,
    private accountsAPI: LoanAccountService,
    public datepipe: DatePipe


    ) { }

        //  chronologicalOrderArray: any = [
        //   'Principal', 'Interests','Charges','Collection'
        // ]
     
        chronologicalOrderArray = new Array();

        setNewChronologicalElements(){
          this.chronologicalOrderArray =[
              'Principal', 'Interests','Charges','Collection'
            ]
        }
    submitted = false;
      ngOnInit() {
        this.setNewChronologicalElements();
        this.getPage();
      }
      feeArray= new Array();
      glSubheadArray = new Array();
    //  this.feeArray
      formData = this.fb.group({
        laa_function_type: [''],
        laa_scheme_code: [''],
        laa_scheme_type:[''],
        laa_scheme_code_desc:[''],

        laa_effective_from_date:[''],
        laa_effective_to_date:[''],
        laa_num_gen_code:[''],
        laa_principal_lossline_ac:[''],
        laa_recovery_lossline_ac:[''],
        laa_charge_off_ac:[''],
        laa_number_generation:[''],
        laa_system_gen_no:[''],
        laa_number_generation_code:[''],

        laa_pl_ac_ccy:[''],
        laa_int_receivale_applicable:[''],
        laa_normal_int_receivable_ac:[''],
        laa_penal_int_receivable_ac:[''],
        laa_normal_int_received_ac:[''],
        laa_penal_int_received_ac:[''],
        laa_advance_int_ac:[''],
        laa_dr_int_compounding_freq:[''],
        laa_int_cal_freq_dr_week:[''],
        laa_app_discounted_int_rate:[''],
        laa_int_cal_freq_dr_day:[''],
        laa_int_cal_freq_dr_date:[''],
        laa_int_cal_freq_dr_holiday:[''],
        
        laa_loan_amt_min:[''],
        laa_loan_amt_max:[''],
        laa_period_mm_min:[''],
        laa_period_dd_min:[''],
        laa_period_mm_max:[''],
        laa_period_dd_max:[''],
        laa_max_allowed_age_limit_for_pymnt:[''],
        laa_loan_repayment_method:[''],
        laa_hold_operataive_ac:[''],
        laa_upfront_inst_coll:[''],
        laa_flow_offset_based_on:[''],
        laa_int_base:[''],
        laa_int_product:[''],
        laa_int_routed_through:[''],
        laa_fee_routed_through:[''],
        laa_loan_int_ac:[''],
        laa_penal_int_reco_method:[''],
        laa_int_on_principal:[''],
        laa_prnc_dmd_overdue_endmonth:[''],
        laa_prncpl_overdue_after_mmm:[''],
        laa_prncpl_overdue_after_ddd:[''],
        laa_int_overdue_after_mmm:[''],
        laa_int_overdue_after_ddd:[''],
        laa_chrg_overdue_after_mmm:[''],
        laa_chrg_overdue_after_ddd:[''],
        laa_int_on_int_demand:[''],
        laa_overdue_int_on_principal:[''],
        laa_int_dmnd_ovdue_at_endmonth:[''],
        laa_apply_pref_int_for_overdue_int:[''],
        laa_chrg_demand_overdue_at_endmonth:[''],
        laa_int_rate_based_on_loan_amt:[''],
        laa_apply_late_fee_for_delayed_pymnt:[''],
        laa_grace_prd_for_late_fee_mmm:[''],
        laa_grace_prd_for_late_fee_ddd:[''],
        laa_tolerance_limit_for_dpd_cycle:[''],
        laa_penal_int_on_principal_demand_overdue:[''],
        laa_penal_int_on_int_demand_overdue:[''],
        laa_no_penal_int_on_penal_int_demand:[''],
        laa_penal_int_frm_dmd_eff_date:[''],
        laa_penal_int_based_on:[''],
        laa_penal_int_prod_mthd:[''],
        laa_norm_int_prod_mthd:[''],
        laa_penal_int_rate_mthd:[''],
        laa_grace_prd_for_penal_int_mmm:[''],
        laa_grace_prd_for_penal_int_ddd:[''],
        laa_equated_installment:[''],
        laa_equated_inst:[''],
        laa_ei_formula:[''],
        laa_ei_round_off:[''],
        laa_int_comp_freq:[''],
        laa_ei_payment_freq:[''],
        laa_int_rest_freq:[''],
        laa_ei_rest_basis:[''],
        laa_outstanding_amt_aft_lst_inst:[''],
        laa_ipr_based_apportioning:[''],
        laa_savings_home_loan:[''],
        laa_differential_rate_loans:[''],
        laa_shift_inst_for_holiday:[''],
        laa_maturity_date_if_hldy:[''],
        laa_upfront_int_based_on_int_coll:[''],
        laa_discounted_int:[''],
        laa_int_amort_rule_78:[''],
        laa_dpd:[''],
        laa_class_main:[''],
        laa_class_sub:[''],
        laa_int_accrue:[''],
        laa_int_book:[''],
        laa_int_apply:[''],
        laa_past_due:[''],
        laa_manual:[''],
        laa_ac_int_suspense:[''],
        laa_ac_penal_int_suspense:[''],
        laa_prov_dr:[''],
        laa_prov_cr:[''],
        
        laa_loanfees: new FormArray([]),
        laa_glsubheads: new FormArray([]),

        // Create Audits
        postedBy: ['N'],
        postedFlag: ['N'],
        postedTime: [new Date()],
        modifiedBy: ['N'],
        modifiedFlag: ['N'],
        modifiedTime: [new Date()],
        verifiedBy: ['N'],
        verifiedFlag: ['N'],
        verifiedTime: [new Date()],
        deletedBy: ['N'],
        deletedFlag: ['N'],
        deletedTime: [new Date()],

               });
              //  Form ends

         feeFormData = this.fb.group({
                  laa_fee_type:['',[Validators.required]],
                  laa_fee_event:['',[Validators.required]],
                  laa_fee_frequency:[''],
                  laa_fee_amortize_credit_ph:[''],
                  laa_fee_amortize_debit_ph:[''],
                  laa_fee_deductable:[''],
                  laa_fee_multiple:[''],
                  laa_fee_amortize:[''],
                  laa_fee_demand_flow:[''],
                  laa_fee_dr_placeholder:[''],
                  laa_fee_cr_placeholder:[''],
                  laa_fee_amort_tenor:[''],
                  laa_fee_max_no_of_assesment:[''],
         });

         glSubheadData = this.fb.group({
           laa_gl_subhead:['', [Validators.required]],
           laa_gl_subhead_description:[''],
           laa_gl_subhead_deafault:[''],
           laa_is_gl_subhead_deleted:['']
         })
         initLoanForm(){
         this.newData = true;
          this.feeFormData = this.fb.group({
            laa_fee_type:['',[Validators.required]],
            laa_fee_event:['',[Validators.required]],
            laa_fee_frequency:[''],
            laa_fee_amortize_credit_ph:[''],
            laa_fee_amortize_debit_ph:[''],
            laa_fee_deductable:[''],
            laa_fee_multiple:[''],
            laa_fee_amortize:[''],
            laa_fee_demand_flow:[''],
            laa_fee_dr_placeholder:[''],
            laa_fee_cr_placeholder:[''],
            laa_fee_amort_tenor:[''],
            laa_fee_max_no_of_assesment:[''],
   });
         }

         initGlSUbheadForm(){
           this.newData = true;
          this.glSubheadData = this.fb.group({
            laa_gl_subhead:[''],
            laa_gl_subhead_description:[''],
            laa_gl_subhead_deafault:[''],
            laa_is_gl_subhead_deleted:['']
          })
         }

         editLoanFeeForm(i:any){
           this.newData = false;
           this.arrayIndex = this.feeArray[i];
          this.feeFormData = this.fb.group({
            laa_fee_type:[this.feeArray[i].laa_fee_type],
            laa_fee_event:[this.feeArray[i].laa_fee_event],
            laa_fee_frequency:[''],
            laa_fee_amortize_credit_ph:[''],
            laa_fee_amortize_debit_ph:[''],
            laa_fee_deductable:[this.feeArray[i].laa_deductable],
            laa_fee_multiple:[this.feeArray[i].laa_multiple],
            laa_fee_amortize:[this.feeArray[i].laa_amortize],
            laa_fee_demand_flow:[this.feeArray[i].laa_demand_flow],
            laa_fee_dr_placeholder:[this.feeArray[i].laa_dr_placeholder],
            laa_fee_cr_placeholder:[this.feeArray[i].laa_cr_placeholder],
            laa_fee_amort_tenor:[this.feeArray[i].laa_amort_tenor],
            laa_fee_max_no_of_assesment:[this.feeArray[i].laa_max_no], 
   });

   const index: number = this.feeArray.indexOf(this.feeArray.values);
   this.feeArray.splice(index, i);
         }
    get g() { return this.formData.controls; }
    get t() { return this.g.laa_loanfees as FormArray; }
    get l() {return this.g.laa_glsubheads as FormArray;}


    // newFormDkkata = this.fb.group({
    //   org_lnk_event_id: ['', Validators.required],
    // });
         preview(){
           if(this.feeFormData.valid){
            this.t.push(this.fb.group(
              this.feeFormData.value
              ));
             this.feeArray.push(this.feeFormData.value);
             this.initLoanForm();
           }
         }

         previewGlSubheads(){
          if(this.glSubheadData.valid){
            if(this.glSubheadArray.length<1){
              this.glSubheadData.controls.laa_gl_subhead_deafault.setValue("Yes");
            }else{
              this.glSubheadData.controls.laa_gl_subhead_deafault.setValue("No");
            }
            this.l.push(this.fb.group(
              this.glSubheadData.value
              ));
              this.glSubheadArray.push(this.glSubheadData.value);
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

         onSystem_generated_no(event: any){
          this.showSystem_gen_no = true;
          this.showNumber_gen_code = false;;
        }
        onNumber_generation_code(event: any){
          this.showNumber_gen_code = true;
          this.showSystem_gen_no = false;;
        }
         
      disabledFormControll(){
        this.formData.disable();
      }
        // MAKE API CALLS FOR RELATED DATA
  getAllAccounts(){
    let type = 'oa'
    this.subscription = this.accountsAPI.retrieveAllAccounts(type).subscribe(res=>{
      this.data = res;
      switch (this.data.entity.acid) {
        case 0:
            console.log("It is a Sunday.");
            break;
        case 1:
            console.log("It is a Monday.");
            break;
        case 2:
            console.log("It is a Tuesday.");
            break;
        case 3:
            console.log("It is a Wednesday.");
            break;
        case 4:
            console.log("It is a Thursday.");
            break;
        case 5:
            console.log("It is a Friday.");
            break;
        case 6:
            console.log("It is a Saturday.");
            break;
        default:
            console.log("No such day exists!");
            break;
    }
    })
  }


      getPage(){
        this.subscription = this.loanproductAPI.currentMessage.subscribe(message =>{
          this.message = message;  
        this.function_type = this.message.function_type;
        this.scheme_code = this.message.scheme_code;
        this.scheme_type = this.message.scheme_type;
        this.scheme_code_desc = this.message.scheme_code_desc;

        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({
            laa_function_type: [this.function_type],
            laa_scheme_code: [this.scheme_code],
            laa_scheme_type:[this.scheme_type],
            laa_scheme_code_desc:[this.scheme_code_desc],
      
            id:[''],
            laa_effective_from_date:[''],
            laa_effective_to_date:[''],
            laa_num_gen_code:[''],
            laa_principal_lossline_ac:[''],
            laa_recovery_lossline_ac:[''],
            laa_charge_off_ac:[''],
            laa_number_generation:[''],
            laa_system_gen_no:[''],
            laa_number_generation_code:[''],
            laa_pl_ac_ccy:[''],
            laa_int_receivale_applicable:[''],
            laa_normal_int_receivable_ac:[''],
            laa_penal_int_receivable_ac:[''],
            laa_normal_int_received_ac:[''],
            laa_penal_int_received_ac:[''],
            laa_advance_int_ac:[''],
            laa_dr_int_compounding_freq:[''],
            laa_int_cal_freq_dr_week:[''],
            laa_app_discounted_int_rate:[''],
            laa_int_cal_freq_dr_day:[''],
            laa_int_cal_freq_dr_date:[''],
            laa_int_cal_freq_dr_holiday:[''],
            laa_loan_amt_min:[''],
            laa_loan_amt_max:[''],
            laa_period_mm_min:[''],
            laa_period_dd_min:[''],
            laa_period_mm_max:[''],
            laa_period_dd_max:[''],
            laa_max_allowed_age_limit_for_pymnt:[''],
            laa_loan_repayment_method:[''],
            laa_hold_operataive_ac:[''],
            laa_upfront_inst_coll:[''],
            laa_flow_offset_based_on:[''],
            laa_int_base:[''],
            laa_int_product:[''],
            laa_int_routed_through:[''],
            laa_fee_routed_through:[''],
            laa_loan_int_ac:[''],
            laa_penal_int_reco_method:[''],
            laa_int_on_principal:[''],
            laa_prnc_dmd_overdue_endmonth:[''],
            laa_prncpl_overdue_after_mmm:[''],
            laa_prncpl_overdue_after_ddd:[''],
            laa_int_overdue_after_mmm:[''],
            laa_int_overdue_after_ddd:[''],
            laa_chrg_overdue_after_mmm:[''],
            laa_chrg_overdue_after_ddd:[''],
            laa_int_on_int_demand:[''],
            laa_overdue_int_on_principal:[''],
            laa_int_dmnd_ovdue_at_endmonth:[''],
            laa_apply_pref_int_for_overdue_int:[''],
            laa_chrg_demand_overdue_at_endmonth:[''],
            laa_int_rate_based_on_loan_amt:[''],
            laa_apply_late_fee_for_delayed_pymnt:[''],
            laa_grace_prd_for_late_fee_mmm:[''],
            laa_grace_prd_for_late_fee_ddd:[''],
            laa_tolerance_limit_for_dpd_cycle:[''],
            laa_penal_int_on_principal_demand_overdue:[''],
            laa_penal_int_on_int_demand_overdue:[''],
            laa_no_penal_int_on_penal_int_demand:[''],
            laa_penal_int_frm_dmd_eff_date:[''],
            laa_penal_int_based_on:[''],
            laa_penal_int_prod_mthd:[''],
            laa_norm_int_prod_mthd:[''],
            laa_penal_int_rate_mthd:[''],
            laa_grace_prd_for_penal_int_mmm:[''],
            laa_grace_prd_for_penal_int_ddd:[''],
            laa_equated_installment:[''],
            laa_equated_inst:[''],
            laa_ei_formula:[''],
            laa_ei_round_off:[''],
            laa_int_comp_freq:[''],
            laa_ei_payment_freq:[''],
            laa_int_rest_freq:[''],
            laa_ei_rest_basis:[''],
            laa_outstanding_amt_aft_lst_inst:[''],
            laa_ipr_based_apportioning:[''],
            laa_savings_home_loan:[''],
            laa_differential_rate_loans:[''],
            laa_shift_inst_for_holiday:[''],
            laa_maturity_date_if_hldy:[''],
            laa_upfront_int_based_on_int_coll:[''],
            laa_discounted_int:[''],
            laa_int_amort_rule_78:[''],
            laa_dpd:[''],
            laa_class_main:[''],
            laa_class_sub:[''],
            laa_int_accrue:[''],
            laa_int_book:[''],
            laa_int_apply:[''],
            laa_past_due:[''],
            laa_manual:[''],
            laa_ac_int_suspense:[''],
            laa_ac_penal_int_suspense:[''],
            laa_prov_dr:[''],
            laa_prov_cr:[''],
            
            laa_loanfees: new FormArray([]),
            laa_glsubheads: new FormArray([]),
                // Exceptions
            laa_ac_debit_balance:[''],
            laa_ac_credit_balance:[''],
            laa_liability_exceed_group:[''],
            laa_ac_is_froozed_value:[''],
            laa_sanction_limit_expired:[''],
            laa_interest_calc:[''],
            laa_insufficient_exception:[''],
            laa_backdate_transaction:[''],

            // Create Audits
            postedBy: ['N'],
            postedFlag: ['N'],
            postedTime: [new Date()],
            modifiedBy: ['N'],
            modifiedFlag: ['N'],
            modifiedTime: [new Date()],
            verifiedBy: ['N'],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()],
            deletedBy: ['N'],
            deletedFlag: ['N'],
            deletedTime: [new Date()],
          });
        }
        else if(this.function_type == "I-Inquire"){
          
          this.showContractInput = true;
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
          this.subscription = this.loanproductAPI.getLoanproductBySchemeCode(params).subscribe(res=>{
            this.results = res;
              console.log(this.results);
              
            this.feeArray = this.results.laa_loanfees;
            this.glSubheadArray = this.results.laa_glsubheads;
          
            
            this.formData = this.fb.group({

              function_type: [this.function_type],

              id:[this.results.id],
              laa_scheme_code: [this.results.laa_int_tbl_code],
              laa_scheme_type:[this.results.laa_scheme_type],
              laa_scheme_code_desc:[this.results.laa_scheme_code_desc],
              
              laa_effective_from_date:[this.results.laa_effective_from_date],
              laa_effective_to_date:[this.results.laa_effective_to_date],
              laa_num_gen_code:[this.results.laa_num_gen_code],
              laa_principal_lossline_ac:[this.results.laa_principal_lossline_ac],
              laa_recovery_lossline_ac:[this.results.laa_recovery_lossline_ac],
              laa_charge_off_ac:[this.results.laa_charge_off_ac],
              laa_number_generation:[this.results.laa_number_generation],
              laa_system_gen_no:[this.results.laa_system_gen_no],
              laa_number_generation_code:[this.results.onNumber_generation_code],

              laa_pl_ac_ccy:[this.results.laa_pl_ac_ccy],
              laa_int_receivale_applicable:[this.results.laa_int_receivale_applicable],
              laa_normal_int_receivable_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_receivable_ac:[this.results.laa_penal_int_receivable_ac],
              laa_normal_int_received_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_received_ac:[this.results.laa_penal_int_received_ac],
              laa_advance_int_ac:[this.results.laa_advance_int_ac],
              laa_dr_int_compounding_freq:[this.results.laa_dr_int_compounding_freq],
              laa_int_cal_freq_dr_week:[this.results.laa_int_cal_freq_dr_week],
              laa_app_discounted_int_rate:[this.results.laa_app_discounted_int_rate],
              laa_int_cal_freq_dr_day:[this.results.laa_int_cal_freq_dr_day],
              laa_int_cal_freq_dr_date:[this.results.laa_int_cal_freq_dr_date],
              laa_int_cal_freq_dr_holiday:[this.results.laa_int_cal_freq_dr_holiday],
              laa_loan_amt_min:[this.results.laa_loan_amt_min],
              laa_loan_amt_max:[this.results.laa_loan_amt_max],
              laa_period_mm_min:[this.results.laa_period_mm_min],
              laa_period_dd_min:[this.results.laa_period_dd_min],
              laa_period_mm_max:[this.results.laa_period_mm_max],
              laa_period_dd_max:[this.results.laa_period_dd_max],
              laa_max_allowed_age_limit_for_pymnt:[this.results.laa_max_allowed_age_limit_for_pymnt],
              laa_loan_repayment_method:[this.results.laa_loan_repayment_method],
              laa_hold_operataive_ac:[this.results.laa_hold_operataive_ac],
              laa_upfront_inst_coll:[this.results.laa_upfront_inst_coll],
              laa_flow_offset_based_on:[this.results.laa_flow_offset_based_on],
              laa_int_base:[this.results.laa_int_base],
              laa_int_product:[this.results.laa_int_product],
              laa_int_routed_through:[this.results.laa_int_routed_through],
              laa_fee_routed_through:[this.results.laa_fee_routed_through],
              laa_loan_int_ac:[this.results.laa_loan_int_ac],
              laa_penal_int_reco_method:[this.results.laa_penal_int_reco_method],
              laa_int_on_principal:[this.results.laa_int_on_principal],
              laa_prnc_dmd_overdue_endmonth:[this.results.laa_prnc_dmd_overdue_endmonth],
              laa_prncpl_overdue_after_mmm:[this.results.laa_prncpl_overdue_after_mmm],
              laa_prncpl_overdue_after_ddd:[this.results.laa_prncpl_overdue_after_ddd],
              laa_int_overdue_after_mmm:[this.results.laa_int_overdue_after_ddd],
              laa_int_overdue_after_ddd:[this.results.laa_int_overdue_after_ddd],
              laa_chrg_overdue_after_mmm:[this.results.laa_chrg_overdue_after_mmm],
              laa_chrg_overdue_after_ddd:[this.results.laa_chrg_overdue_after_ddd],
              laa_int_on_int_demand:[this.results.laa_int_on_int_demand],
              laa_overdue_int_on_principal:[this.results.laa_overdue_int_on_principal],
              laa_int_dmnd_ovdue_at_endmonth:[this.results.laa_int_dmnd_ovdue_at_endmonth],
              laa_apply_pref_int_for_overdue_int:[this.results.laa_apply_pref_int_for_overdue_int],
              laa_chrg_demand_overdue_at_endmonth:[this.results.laa_chrg_demand_overdue_at_endmonth],
              laa_int_rate_based_on_loan_amt:[this.results.laa_int_rate_based_on_loan_amt],
              laa_apply_late_fee_for_delayed_pymnt:[this.results.laa_apply_late_fee_for_delayed_pymnt],
              laa_grace_prd_for_late_fee_mmm:[this.results.laa_grace_prd_for_late_fee_mmm],
              laa_grace_prd_for_late_fee_ddd:[this.results.laa_grace_prd_for_late_fee_ddd],
              laa_tolerance_limit_for_dpd_cycle:[this.results.laa_tolerance_limit_for_dpd_cycle],
              laa_penal_int_on_principal_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_penal_int_on_int_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_no_penal_int_on_penal_int_demand:[this.results.laa_no_penal_int_on_penal_int_demand],
              laa_penal_int_frm_dmd_eff_date:[this.results.laa_penal_int_frm_dmd_eff_date],
              laa_penal_int_based_on:[this.results.laa_penal_int_based_on],
              laa_penal_int_prod_mthd:[this.results.laa_penal_int_prod_mthd],
              laa_norm_int_prod_mthd:[this.results.laa_norm_int_prod_mthd],
              laa_penal_int_rate_mthd:[this.results.laa_penal_int_rate_mthd],
              laa_grace_prd_for_penal_int_mmm:[this.results.laa_grace_prd_for_penal_int_mmm],
              laa_grace_prd_for_penal_int_ddd:[this.results.laa_grace_prd_for_penal_int_ddd],
              laa_equated_installment:[this.results.laa_equated_installment],
              laa_equated_inst:[this.results.laa_equated_inst],
              laa_ei_formula:[this.results.laa_ei_formula],
              laa_ei_round_off:[this.results.laa_ei_round_off],
              laa_int_comp_freq:[this.results.laa_int_comp_freq],
              laa_ei_payment_freq:[this.results.laa_ei_payment_freq],
              laa_int_rest_freq:[this.results.laa_int_rest_freq],
              laa_ei_rest_basis:[this.results.laa_ei_rest_basis],
              laa_outstanding_amt_aft_lst_inst:[this.results.laa_outstanding_amt_aft_lst_inst],
              laa_ipr_based_apportioning:[this.results.laa_ipr_based_apportioning],
              laa_savings_home_loan:[this.results.laa_savings_home_loan],
              laa_differential_rate_loans:[this.results.laa_differential_rate_loans],
              laa_shift_inst_for_holiday:[this.results.laa_shift_inst_for_holiday],
              laa_maturity_date_if_hldy:[this.results.laa_maturity_date_if_hldy],
              laa_upfront_int_based_on_int_coll:[this.results.laa_upfront_inst_coll],
              laa_discounted_int:[this.results.laa_discounted_int],
              laa_int_amort_rule_78:[this.results.laa_int_amort_rule_78],
              laa_dpd:[this.results.laa_dpd],
              laa_class_main:[this.results.laa_class_main],
              laa_class_sub:[this.results.laa_class_sub],
              laa_int_accrue:[this.results.laa_int_accrue],
              laa_int_book:[this.results.laa_int_book],
              laa_int_apply:[this.results.laa_int_apply],
              laa_past_due:[this.results.laa_past_due],
              laa_manual:[this.results.laa_manual],
              laa_ac_int_suspense:[this.results.laa_ac_int_suspense],
              laa_ac_penal_int_suspense:[this.results.laa_ac_penal_int_suspense],
              laa_prov_dr:[this.results.laa_prov_dr],
              laa_prov_cr:[this.results.laa_prov_cr],

                  // Exceptions
              laa_ac_debit_balance:[this.results.laa_ac_debit_balance],
              laa_ac_credit_balance:[this.results.laa_ac_credit_balance],
              laa_liability_exceed_group:[this.results.laa_liability_exceed_group],
              laa_ac_is_froozed_value:[this.results.laa_ac_is_froozed_value],
              laa_sanction_limit_expired:[this.results.laa_sanction_limit_expired],
              laa_interest_calc:[this.results.laa_interest_calc],
              laa_insufficient_exception:[this.results.laa_insufficient_exception],
              laa_backdate_transaction:[this.results.laa_backdate_transaction],

                // Audits
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedFlag: [this.results.modifiedFlag],
                modifiedTime: [this.results.modifiedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
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
        else if(this.function_type == "M-Modify"){
          
          this.showContractInput = true;
          this.isEnabled = false;
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
          this.subscription = this.loanproductAPI.getLoanproductBySchemeCode(params).subscribe(res=>{
            this.results = res;
            
            this.feeArray = this.results.laa_loanfees;
            this.glSubheadArray = this.results.laa_glsubheads;

            this.formData = this.fb.group({
              // cr_normal_int:[this.results.cr_normal_int],
              id:[this.results.id],
              laa_scheme_code: [this.results.laa_int_tbl_code],
              laa_scheme_type:[this.results.laa_scheme_type],
              laa_scheme_code_desc:[this.results.laa_scheme_code_desc],

              laa_effective_from_date:[this.results.laa_effective_from_date],
              laa_effective_to_date:[this.results.laa_effective_to_date],
              laa_num_gen_code:[this.results.laa_num_gen_code],
              laa_principal_lossline_ac:[this.results.laa_principal_lossline_ac],
              laa_recovery_lossline_ac:[this.results.laa_recovery_lossline_ac],
              laa_charge_off_ac:[this.results.laa_charge_off_ac],
              laa_number_generation:[this.results.laa_number_generation],
              laa_system_gen_no:[this.results.laa_system_gen_no],
              laa_number_generation_code:[this.results.onNumber_generation_code],


              laa_pl_ac_ccy:[this.results.laa_pl_ac_ccy],
              laa_int_receivale_applicable:[this.results.laa_int_receivale_applicable],
              laa_normal_int_receivable_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_receivable_ac:[this.results.laa_penal_int_receivable_ac],
              laa_normal_int_received_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_received_ac:[this.results.laa_penal_int_received_ac],
              laa_advance_int_ac:[this.results.laa_advance_int_ac],
              laa_dr_int_compounding_freq:[this.results.laa_dr_int_compounding_freq],
              laa_int_cal_freq_dr_week:[this.results.laa_int_cal_freq_dr_week],
              laa_app_discounted_int_rate:[this.results.laa_app_discounted_int_rate],
              laa_int_cal_freq_dr_day:[this.results.laa_int_cal_freq_dr_day],
              laa_int_cal_freq_dr_date:[this.results.laa_int_cal_freq_dr_date],
              laa_int_cal_freq_dr_holiday:[this.results.laa_int_cal_freq_dr_holiday],
              laa_loan_amt_min:[this.results.laa_loan_amt_min],
              laa_loan_amt_max:[this.results.laa_loan_amt_max],
              laa_period_mm_min:[this.results.laa_period_mm_min],
              laa_period_dd_min:[this.results.laa_period_dd_min],
              laa_period_mm_max:[this.results.laa_period_mm_max],
              laa_period_dd_max:[this.results.laa_period_dd_max],
              laa_max_allowed_age_limit_for_pymnt:[this.results.laa_max_allowed_age_limit_for_pymnt],
              laa_loan_repayment_method:[this.results.laa_loan_repayment_method],
              laa_hold_operataive_ac:[this.results.laa_hold_operataive_ac],
              laa_upfront_inst_coll:[this.results.laa_upfront_inst_coll],
              laa_flow_offset_based_on:[this.results.laa_flow_offset_based_on],
              laa_int_base:[this.results.laa_int_base],
              laa_int_product:[this.results.laa_int_product],
              laa_int_routed_through:[this.results.laa_int_routed_through],
              laa_fee_routed_through:[this.results.laa_fee_routed_through],
              laa_loan_int_ac:[this.results.laa_loan_int_ac],
              laa_penal_int_reco_method:[this.results.laa_penal_int_reco_method],
              laa_int_on_principal:[this.results.laa_int_on_principal],
              laa_prnc_dmd_overdue_endmonth:[this.results.laa_prnc_dmd_overdue_endmonth],
              laa_prncpl_overdue_after_mmm:[this.results.laa_prncpl_overdue_after_mmm],
              laa_prncpl_overdue_after_ddd:[this.results.laa_prncpl_overdue_after_ddd],
              laa_int_overdue_after_mmm:[this.results.laa_int_overdue_after_ddd],
              laa_int_overdue_after_ddd:[this.results.laa_int_overdue_after_ddd],
              laa_chrg_overdue_after_mmm:[this.results.laa_chrg_overdue_after_mmm],
              laa_chrg_overdue_after_ddd:[this.results.laa_chrg_overdue_after_ddd],
              laa_int_on_int_demand:[this.results.laa_int_on_int_demand],
              laa_overdue_int_on_principal:[this.results.laa_overdue_int_on_principal],
              laa_int_dmnd_ovdue_at_endmonth:[this.results.laa_int_dmnd_ovdue_at_endmonth],
              laa_apply_pref_int_for_overdue_int:[this.results.laa_apply_pref_int_for_overdue_int],
              laa_chrg_demand_overdue_at_endmonth:[this.results.laa_chrg_demand_overdue_at_endmonth],
              laa_int_rate_based_on_loan_amt:[this.results.laa_int_rate_based_on_loan_amt],
              laa_apply_late_fee_for_delayed_pymnt:[this.results.laa_apply_late_fee_for_delayed_pymnt],
              laa_grace_prd_for_late_fee_mmm:[this.results.laa_grace_prd_for_late_fee_mmm],
              laa_grace_prd_for_late_fee_ddd:[this.results.laa_grace_prd_for_late_fee_ddd],
              laa_tolerance_limit_for_dpd_cycle:[this.results.laa_tolerance_limit_for_dpd_cycle],
              
              laa_penal_int_on_principal_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_penal_int_on_int_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_no_penal_int_on_penal_int_demand:[this.results.laa_no_penal_int_on_penal_int_demand],
              laa_penal_int_frm_dmd_eff_date:[this.results.laa_penal_int_frm_dmd_eff_date],
              laa_penal_int_based_on:[this.results.laa_penal_int_based_on],
              laa_penal_int_prod_mthd:[this.results.laa_penal_int_prod_mthd],
              laa_norm_int_prod_mthd:[this.results.laa_norm_int_prod_mthd],
              laa_penal_int_rate_mthd:[this.results.laa_penal_int_rate_mthd],
              laa_grace_prd_for_penal_int_mmm:[this.results.laa_grace_prd_for_penal_int_mmm],
              laa_grace_prd_for_penal_int_ddd:[this.results.laa_grace_prd_for_penal_int_ddd],
              laa_equated_installment:[this.results.laa_equated_installment],
              laa_equated_inst:[this.results.laa_equated_inst],
              laa_ei_formula:[this.results.laa_ei_formula],
              laa_ei_round_off:[this.results.laa_ei_round_off],
              laa_int_comp_freq:[this.results.laa_int_comp_freq],
              laa_ei_payment_freq:[this.results.laa_ei_payment_freq],
              laa_int_rest_freq:[this.results.laa_int_rest_freq],
              laa_ei_rest_basis:[this.results.laa_ei_rest_basis],
              laa_outstanding_amt_aft_lst_inst:[this.results.laa_outstanding_amt_aft_lst_inst],
              laa_ipr_based_apportioning:[this.results.laa_ipr_based_apportioning],
              laa_savings_home_loan:[this.results.laa_savings_home_loan],
              laa_differential_rate_loans:[this.results.laa_differential_rate_loans],
              laa_shift_inst_for_holiday:[this.results.laa_shift_inst_for_holiday],
              laa_maturity_date_if_hldy:[this.results.laa_maturity_date_if_hldy],
              laa_upfront_int_based_on_int_coll:[this.results.laa_upfront_inst_coll],
              laa_discounted_int:[this.results.laa_discounted_int],
              laa_int_amort_rule_78:[this.results.laa_int_amort_rule_78],
              laa_dpd:[this.results.laa_dpd],
              laa_class_main:[this.results.laa_class_main],
              laa_class_sub:[this.results.laa_class_sub],
              laa_int_accrue:[this.results.laa_int_accrue],
              laa_int_book:[this.results.laa_int_book],
              laa_int_apply:[this.results.laa_int_apply],
              laa_past_due:[this.results.laa_past_due],
              laa_manual:[this.results.laa_manual],
              laa_ac_int_suspense:[this.results.laa_ac_int_suspense],
              laa_ac_penal_int_suspense:[this.results.laa_ac_penal_int_suspense],
              laa_prov_dr:[this.results.laa_prov_dr],
              laa_prov_cr:[this.results.laa_prov_cr],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted],

              laa_loanfees:[this.results.laa_loanfees],
              laa_glsubheads: [this.results.laa_glsubheads],


              // Exceptions
              laa_ac_debit_balance:[this.results.laa_ac_debit_balance],
              laa_ac_credit_balance:[this.results.laa_ac_credit_balance],
              laa_liability_exceed_group:[this.results.laa_liability_exceed_group],
              laa_ac_is_froozed_value:[this.results.laa_ac_is_froozed_value],
              laa_sanction_limit_expired:[this.results.laa_sanction_limit_expired],
              laa_interest_calc:[this.results.laa_interest_calc],
              laa_insufficient_exception:[this.results.laa_insufficient_exception],
              laa_backdate_transaction:[this.results.laa_backdate_transaction],

                // Audits
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.auth_user],
                modifiedFlag: ['Y'],
                modifiedTime: [new Date()],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],

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
          this.disabledFormControll();
          
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          // this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
          this.subscription = this.loanproductAPI.getLoanproductBySchemeCode(params).subscribe(res=>{
            this.results = res;
            
            this.formData = this.fb.group({
              // cr_normal_int:[this.results.cr_normal_int],
              id:[this.results.id],
              laa_scheme_code: [this.results.laa_int_tbl_code],
              laa_scheme_type:[this.results.laa_scheme_type],
              laa_scheme_code_desc:[this.results.laa_scheme_code_desc],

              laa_effective_from_date:[this.results.laa_effective_from_date],
              laa_effective_to_date:[this.results.laa_effective_to_date],
              laa_num_gen_code:[this.results.laa_num_gen_code],
              laa_principal_lossline_ac:[this.results.laa_principal_lossline_ac],
              laa_recovery_lossline_ac:[this.results.laa_recovery_lossline_ac],
              laa_charge_off_ac:[this.results.laa_charge_off_ac],
              laa_number_generation:[this.results.laa_number_generation],
              laa_system_gen_no:[this.results.laa_system_gen_no],
              laa_number_generation_code:[this.results.onNumber_generation_code],


              laa_pl_ac_ccy:[this.results.laa_pl_ac_ccy],
              laa_int_receivale_applicable:[this.results.laa_int_receivale_applicable],
              laa_normal_int_receivable_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_receivable_ac:[this.results.laa_penal_int_receivable_ac],
              laa_normal_int_received_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_received_ac:[this.results.laa_penal_int_received_ac],
              laa_advance_int_ac:[this.results.laa_advance_int_ac],
              laa_dr_int_compounding_freq:[this.results.laa_dr_int_compounding_freq],
              laa_int_cal_freq_dr_week:[this.results.laa_int_cal_freq_dr_week],
              laa_app_discounted_int_rate:[this.results.laa_app_discounted_int_rate],
              laa_int_cal_freq_dr_day:[this.results.laa_int_cal_freq_dr_day],
              laa_int_cal_freq_dr_date:[this.results.laa_int_cal_freq_dr_date],
              laa_int_cal_freq_dr_holiday:[this.results.laa_int_cal_freq_dr_holiday],
              laa_loan_amt_min:[this.results.laa_loan_amt_min],
              laa_loan_amt_max:[this.results.laa_loan_amt_max],
              laa_period_mm_min:[this.results.laa_period_mm_min],
              laa_period_dd_min:[this.results.laa_period_dd_min],
              laa_period_mm_max:[this.results.laa_period_mm_max],
              laa_period_dd_max:[this.results.laa_period_dd_max],
              laa_max_allowed_age_limit_for_pymnt:[this.results.laa_max_allowed_age_limit_for_pymnt],
              laa_loan_repayment_method:[this.results.laa_loan_repayment_method],
              laa_hold_operataive_ac:[this.results.laa_hold_operataive_ac],
              laa_upfront_inst_coll:[this.results.laa_upfront_inst_coll],
              laa_flow_offset_based_on:[this.results.laa_flow_offset_based_on],
              laa_int_base:[this.results.laa_int_base],
              laa_int_product:[this.results.laa_int_product],
              laa_int_routed_through:[this.results.laa_int_routed_through],
              laa_fee_routed_through:[this.results.laa_fee_routed_through],
              laa_loan_int_ac:[this.results.laa_loan_int_ac],
              laa_penal_int_reco_method:[this.results.laa_penal_int_reco_method],
              laa_int_on_principal:[this.results.laa_int_on_principal],
              laa_prnc_dmd_overdue_endmonth:[this.results.laa_prnc_dmd_overdue_endmonth],
              laa_prncpl_overdue_after_mmm:[this.results.laa_prncpl_overdue_after_mmm],
              laa_prncpl_overdue_after_ddd:[this.results.laa_prncpl_overdue_after_ddd],
              laa_int_overdue_after_mmm:[this.results.laa_int_overdue_after_ddd],
              laa_int_overdue_after_ddd:[this.results.laa_int_overdue_after_ddd],
              laa_chrg_overdue_after_mmm:[this.results.laa_chrg_overdue_after_mmm],
              laa_chrg_overdue_after_ddd:[this.results.laa_chrg_overdue_after_ddd],
              laa_int_on_int_demand:[this.results.laa_int_on_int_demand],
              laa_overdue_int_on_principal:[this.results.laa_overdue_int_on_principal],
              laa_int_dmnd_ovdue_at_endmonth:[this.results.laa_int_dmnd_ovdue_at_endmonth],
              laa_apply_pref_int_for_overdue_int:[this.results.laa_apply_pref_int_for_overdue_int],
              laa_chrg_demand_overdue_at_endmonth:[this.results.laa_chrg_demand_overdue_at_endmonth],
              laa_int_rate_based_on_loan_amt:[this.results.laa_int_rate_based_on_loan_amt],
              laa_apply_late_fee_for_delayed_pymnt:[this.results.laa_apply_late_fee_for_delayed_pymnt],
              laa_grace_prd_for_late_fee_mmm:[this.results.laa_grace_prd_for_late_fee_mmm],
              laa_grace_prd_for_late_fee_ddd:[this.results.laa_grace_prd_for_late_fee_ddd],
              laa_tolerance_limit_for_dpd_cycle:[this.results.laa_tolerance_limit_for_dpd_cycle],
              laa_penal_int_on_principal_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_penal_int_on_int_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_no_penal_int_on_penal_int_demand:[this.results.laa_no_penal_int_on_penal_int_demand],
              laa_penal_int_frm_dmd_eff_date:[this.results.laa_penal_int_frm_dmd_eff_date],
              laa_penal_int_based_on:[this.results.laa_penal_int_based_on],
              
              laa_penal_int_prod_mthd:[this.results.laa_penal_int_prod_mthd],
              laa_norm_int_prod_mthd:[this.results.laa_norm_int_prod_mthd],
              laa_penal_int_rate_mthd:[this.results.laa_penal_int_rate_mthd],
              laa_grace_prd_for_penal_int_mmm:[this.results.laa_grace_prd_for_penal_int_mmm],
              laa_grace_prd_for_penal_int_ddd:[this.results.laa_grace_prd_for_penal_int_ddd],
              laa_equated_installment:[this.results.laa_equated_installment],
              laa_equated_inst:[this.results.laa_equated_inst],
              laa_ei_formula:[this.results.laa_ei_formula],
              laa_ei_round_off:[this.results.laa_ei_round_off],
              laa_int_comp_freq:[this.results.laa_int_comp_freq],
              laa_ei_payment_freq:[this.results.laa_ei_payment_freq],
              laa_int_rest_freq:[this.results.laa_int_rest_freq],
              laa_ei_rest_basis:[this.results.laa_ei_rest_basis],
              laa_outstanding_amt_aft_lst_inst:[this.results.laa_outstanding_amt_aft_lst_inst],
              laa_ipr_based_apportioning:[this.results.laa_ipr_based_apportioning],
              laa_savings_home_loan:[this.results.laa_savings_home_loan],
              laa_differential_rate_loans:[this.results.laa_differential_rate_loans],
              laa_shift_inst_for_holiday:[this.results.laa_shift_inst_for_holiday],
              laa_maturity_date_if_hldy:[this.results.laa_maturity_date_if_hldy],
              laa_upfront_int_based_on_int_coll:[this.results.laa_upfront_inst_coll],
              laa_discounted_int:[this.results.laa_discounted_int],
              laa_int_amort_rule_78:[this.results.laa_int_amort_rule_78],
              laa_dpd:[this.results.laa_dpd],
              laa_class_main:[this.results.laa_class_main],
              laa_class_sub:[this.results.laa_class_sub],
              laa_int_accrue:[this.results.laa_int_accrue],
              laa_int_book:[this.results.laa_int_book],
              laa_int_apply:[this.results.laa_int_apply],
              laa_past_due:[this.results.laa_past_due],
              laa_manual:[this.results.laa_manual],
              laa_ac_int_suspense:[this.results.laa_ac_int_suspense],
              laa_ac_penal_int_suspense:[this.results.laa_ac_penal_int_suspense],
              laa_prov_dr:[this.results.laa_prov_dr],
              laa_prov_cr:[this.results.laa_prov_cr],
              is_verified:[true],
              is_deleted:[this.results.is_deleted],

              laa_loanfees:[this.results.laa_loanfees],
              laa_glsubheads: [this.results.laa_glsubheads],

              // Exceptions
              laa_ac_debit_balance:[this.results.laa_ac_debit_balance],
              laa_ac_credit_balance:[this.results.laa_ac_credit_balance],
              laa_liability_exceed_group:[this.results.laa_liability_exceed_group],
              laa_ac_is_froozed_value:[this.results.laa_ac_is_froozed_value],
              laa_sanction_limit_expired:[this.results.laa_sanction_limit_expired],
              laa_interest_calc:[this.results.laa_interest_calc],
              laa_insufficient_exception:[this.results.laa_insufficient_exception],
              laa_backdate_transaction:[this.results.laa_backdate_transaction],

               // Audits
               postedBy: [this.results.postedBy],
               postedFlag: [this.results.postedFlag],
               postedTime: [this.results.postedTime],
               modifiedBy: [this.results.modifiedBy],
               modifiedFlag: [this.results.modifiedFlag],
               modifiedTime: [this.results.modifiedTime],
               verifiedBy: [this.auth_user],
               verifiedFlag: ['Y'],
               verifiedTime: [new Date()],
               deletedBy: [this.results.deletedBy],
               deletedFlag: [this.results.deletedFlag],
               deletedTime: [this.results.deletedTime],
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
          this.disabledFormControll();
        
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          // this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          let params = new HttpParams()
          .set("scheme_code", this.scheme_code);     
          this.subscription = this.loanproductAPI.getLoanproductBySchemeCode(params).subscribe(res=>{
            this.results = res;
            console.log("Got Called!");
            console.log("Data from Backend", this.results);
            
            this.formData = this.fb.group({
              // cr_normal_int:[this.results.cr_normal_int],
              id:[this.results.id],
              laa_scheme_code: [this.results.laa_int_tbl_code],
              laa_scheme_type:[this.results.laa_scheme_type],
              laa_scheme_code_desc:[this.results.laa_scheme_code_desc],

              laa_effective_from_date:[this.results.laa_effective_from_date],
              laa_effective_to_date:[this.results.laa_effective_to_date],
              laa_num_gen_code:[this.results.laa_num_gen_code],
              laa_principal_lossline_ac:[this.results.laa_principal_lossline_ac],
              laa_recovery_lossline_ac:[this.results.laa_recovery_lossline_ac],
              laa_charge_off_ac:[this.results.laa_charge_off_ac],
              laa_number_generation:[this.results.laa_number_generation],
              laa_system_gen_no:[this.results.laa_system_gen_no],
              laa_number_generation_code:[this.results.onNumber_generation_code],


              laa_pl_ac_ccy:[this.results.laa_pl_ac_ccy],
              laa_int_receivale_applicable:[this.results.laa_int_receivale_applicable],
              laa_normal_int_receivable_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_receivable_ac:[this.results.laa_penal_int_receivable_ac],
              laa_normal_int_received_ac:[this.results.laa_normal_int_receivable_ac],
              laa_penal_int_received_ac:[this.results.laa_penal_int_received_ac],
              laa_advance_int_ac:[this.results.laa_advance_int_ac],
              laa_dr_int_compounding_freq:[this.results.laa_dr_int_compounding_freq],
              laa_int_cal_freq_dr_week:[this.results.laa_int_cal_freq_dr_week],
              laa_app_discounted_int_rate:[this.results.laa_app_discounted_int_rate],
              laa_int_cal_freq_dr_day:[this.results.laa_int_cal_freq_dr_day],
              laa_int_cal_freq_dr_date:[this.results.laa_int_cal_freq_dr_date],
              laa_int_cal_freq_dr_holiday:[this.results.laa_int_cal_freq_dr_holiday],
              laa_loan_amt_min:[this.results.laa_loan_amt_min],
              laa_loan_amt_max:[this.results.laa_loan_amt_max],
              laa_period_mm_min:[this.results.laa_period_mm_min],
              laa_period_dd_min:[this.results.laa_period_dd_min],
              laa_period_mm_max:[this.results.laa_period_mm_max],
              laa_period_dd_max:[this.results.laa_period_dd_max],
              laa_max_allowed_age_limit_for_pymnt:[this.results.laa_max_allowed_age_limit_for_pymnt],
              laa_loan_repayment_method:[this.results.laa_loan_repayment_method],
              laa_hold_operataive_ac:[this.results.laa_hold_operataive_ac],
              laa_upfront_inst_coll:[this.results.laa_upfront_inst_coll],
              laa_flow_offset_based_on:[this.results.laa_flow_offset_based_on],
              laa_int_base:[this.results.laa_int_base],
              laa_int_product:[this.results.laa_int_product],
              laa_int_routed_through:[this.results.laa_int_routed_through],
              laa_fee_routed_through:[this.results.laa_fee_routed_through],
              laa_loan_int_ac:[this.results.laa_loan_int_ac],
              laa_penal_int_reco_method:[this.results.laa_penal_int_reco_method],
              laa_int_on_principal:[this.results.laa_int_on_principal],
              laa_prnc_dmd_overdue_endmonth:[this.results.laa_prnc_dmd_overdue_endmonth],
              laa_prncpl_overdue_after_mmm:[this.results.laa_prncpl_overdue_after_mmm],
              laa_prncpl_overdue_after_ddd:[this.results.laa_prncpl_overdue_after_ddd],
              laa_int_overdue_after_mmm:[this.results.laa_int_overdue_after_ddd],
              laa_int_overdue_after_ddd:[this.results.laa_int_overdue_after_ddd],
              laa_chrg_overdue_after_mmm:[this.results.laa_chrg_overdue_after_mmm],
              laa_chrg_overdue_after_ddd:[this.results.laa_chrg_overdue_after_ddd],
              laa_int_on_int_demand:[this.results.laa_int_on_int_demand],
              laa_overdue_int_on_principal:[this.results.laa_overdue_int_on_principal],
              laa_int_dmnd_ovdue_at_endmonth:[this.results.laa_int_dmnd_ovdue_at_endmonth],
              laa_apply_pref_int_for_overdue_int:[this.results.laa_apply_pref_int_for_overdue_int],
              laa_chrg_demand_overdue_at_endmonth:[this.results.laa_chrg_demand_overdue_at_endmonth],
              laa_int_rate_based_on_loan_amt:[this.results.laa_int_rate_based_on_loan_amt],
              laa_apply_late_fee_for_delayed_pymnt:[this.results.laa_apply_late_fee_for_delayed_pymnt],
              laa_grace_prd_for_late_fee_mmm:[this.results.laa_grace_prd_for_late_fee_mmm],
              laa_grace_prd_for_late_fee_ddd:[this.results.laa_grace_prd_for_late_fee_ddd],
              laa_tolerance_limit_for_dpd_cycle:[this.results.laa_tolerance_limit_for_dpd_cycle],
              
              laa_penal_int_on_principal_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_penal_int_on_int_demand_overdue:[this.results.laa_penal_int_on_principal_demand_overdue],
              laa_no_penal_int_on_penal_int_demand:[this.results.laa_no_penal_int_on_penal_int_demand],
              laa_penal_int_frm_dmd_eff_date:[this.results.laa_penal_int_frm_dmd_eff_date],
              laa_penal_int_based_on:[this.results.laa_penal_int_based_on],
              laa_penal_int_prod_mthd:[this.results.laa_penal_int_prod_mthd],
              laa_norm_int_prod_mthd:[this.results.laa_norm_int_prod_mthd],
              laa_penal_int_rate_mthd:[this.results.laa_penal_int_rate_mthd],
              laa_grace_prd_for_penal_int_mmm:[this.results.laa_grace_prd_for_penal_int_mmm],
              laa_grace_prd_for_penal_int_ddd:[this.results.laa_grace_prd_for_penal_int_ddd],
              laa_equated_installment:[this.results.laa_equated_installment],
              laa_equated_inst:[this.results.laa_equated_inst],
              laa_ei_formula:[this.results.laa_ei_formula],
              laa_ei_round_off:[this.results.laa_ei_round_off],
              laa_int_comp_freq:[this.results.laa_int_comp_freq],
              laa_ei_payment_freq:[this.results.laa_ei_payment_freq],
              laa_int_rest_freq:[this.results.laa_int_rest_freq],
              laa_ei_rest_basis:[this.results.laa_ei_rest_basis],
              laa_outstanding_amt_aft_lst_inst:[this.results.laa_outstanding_amt_aft_lst_inst],
              laa_ipr_based_apportioning:[this.results.laa_ipr_based_apportioning],
              laa_savings_home_loan:[this.results.laa_savings_home_loan],
              laa_differential_rate_loans:[this.results.laa_differential_rate_loans],
              laa_shift_inst_for_holiday:[this.results.laa_shift_inst_for_holiday],
              laa_maturity_date_if_hldy:[this.results.laa_maturity_date_if_hldy],
              laa_upfront_int_based_on_int_coll:[this.results.laa_upfront_inst_coll],
              laa_discounted_int:[this.results.laa_discounted_int],
              laa_int_amort_rule_78:[this.results.laa_int_amort_rule_78],
              laa_dpd:[this.results.laa_dpd],
              laa_class_main:[this.results.laa_class_main],
              laa_class_sub:[this.results.laa_class_sub],
              laa_int_accrue:[this.results.laa_int_accrue],
              laa_int_book:[this.results.laa_int_book],
              laa_int_apply:[this.results.laa_int_apply],
              laa_past_due:[this.results.laa_past_due],
              laa_manual:[this.results.laa_manual],
              laa_ac_int_suspense:[this.results.laa_ac_int_suspense],
              laa_ac_penal_int_suspense:[this.results.laa_ac_penal_int_suspense],
              laa_prov_dr:[this.results.laa_prov_dr],
              laa_prov_cr:[this.results.laa_prov_cr],
              is_deleted:[true],
              is_verified:[this.results.is_verified],

              laa_loanfees:[this.results.laa_loanfees],
              laa_glsubheads: [this.results.laa_glsubheads],

              // Exceptions
              laa_ac_debit_balance:[this.results.laa_ac_debit_balance],
              laa_ac_credit_balance:[this.results.laa_ac_credit_balance],
              laa_liability_exceed_group:[this.results.laa_liability_exceed_group],
              laa_ac_is_froozed_value:[this.results.laa_ac_is_froozed_value],
              laa_sanction_limit_expired:[this.results.laa_sanction_limit_expired],
              laa_interest_calc:[this.results.laa_interest_calc],
              laa_insufficient_exception:[this.results.laa_insufficient_exception],
              laa_backdate_transaction:[this.results.laa_backdate_transaction],

               // Audits
               postedBy: [this.results.postedBy],
               postedFlag: [this.results.postedFlag],
               postedTime: [this.results.postedTime],
               modifiedBy: [this.results.modifiedBy],
               modifiedFlag: [this.results.modifiedFlag],
               modifiedTime: [this.results.modifiedTime],
               verifiedBy: [this.results.verifiedBy],
               verifiedFlag: [this.results.verifiedFlag],
               verifiedTime: [this.results.verifiedTime],
               deletedBy: [this.auth_user],
               deletedFlag: ['Y'],
               deletedTime: [new Date()],

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
      this.formData.controls.laa_effective_from_date.setValue(this.datepipe.transform(this.f.laa_effective_from_date.value, 'yyyy-MM-ddTHH:mm:ss'));
      this.formData.controls.laa_effective_to_date.setValue(this.datepipe.transform(this.f.laa_effective_to_date.value, 'yyyy-MM-ddTHH:mm:ss'));

        console.log("huge form data",this.formData.value);
        
          this.submitted = true;
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.loanproductAPI.createLoanproduct(this.formData.value).subscribe(res=>{
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
            }else if(this.function_type  != "A-Add"){
              this.isEnabled = true;
              this.subscription = this.loanproductAPI.updateLoanproduct(this.formData.value).subscribe(res=>{
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