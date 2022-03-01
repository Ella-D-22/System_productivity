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
import { OverdraftService } from './overdraft.service';

import {} from 'src/app/administration/pages/ProductModule/Accounts/office-accounts/office-accounts-lookup/office-accounts-lookup.component'

@Component({
  selector: 'app-overdrafts-scheme',
  templateUrl: './overdrafts-scheme.component.html',
  styleUrls: ['./overdrafts-scheme.component.scss']
})
export class OverdraftsSchemeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  flagArray: any = [

    'Y', 'N'
  ]
  amt_derivation_Array: any = [
    { code: 'CHRG', description: 'Free Code' },
    { code: 'FIXED', description: 'Fixed Amt' },
    { code: 'MRT', description: 'Formula Based' },
    { code: 'PCNT', description: 'Percentage' },
    { code: 'SCRPT', description: 'Script Based' },
    { code: 'USTM', description: 'Unit Charge Code' },
  ]
  chargePreferetialsArrays: any = [
    'Custmer Level', 'Account Level', 'Charge Level', 'Contract Level'
  ]
  islamicProductArray: any = [
    'Murabaha', 'Musyarakaha', 'Ijarah'
  ]
  productTypeArray: any = [
    'P-Personal Loan', 'M-Mortage/Housing Loan', 'R-Property/Loan', 'S-Student/Educational Loan', 'A-Auto Loan', 'C-Consumer Loan', 'O-Other Loan'
  ]
  eiFormulaFlgArray: any = [
    'P-PMT Formula', 'M-EMI Formula', 'F-Flat Rate', 'R-Rule of 78'
  ]
  weeksArray: any = [
    'Week 1', 'Week 2', 'Week 3', 'Week 4'
  ]
  debitIntCompFreqArray: any = [
    'Daily', 'Monthly'
  ]
  Int_Cr_ac_Flag_Array: any =[ 'S - Original A/c','O - Operative A/c','P - Operative A/c or Parking A/c','E - Operative A/c or Original A/c']
  Int_Dr_ac_Flag_Array: any =[ 'S - Original A/c itself','O - Operative A/c','T - Payment System']

  int_comp_freq_array: any = ['D- Daily', 'W – Weekly', 'F – Fortnightly', 'M – Monthly', 'Q- Quarterly', 'H – Half yearly', 'Y- Yearly', 'T-Twice a month']
  ei_payment_freq_array: any = ['D- Daily', 'W – Weekly', 'F – Fortnightly', 'M – Monthly', 'Q- Quarterly', 'H – Half yearly', 'Y- Yearly']



  //  debitIntCompFreqArray: any = [
  //   'Daily','Monthly', 'Quarterly','No compounding'
  //  ]

  daysArray: any = [
    'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  datesArray: any = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
    '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
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

  months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' })
  });
  arrayIndex: any;
  description: any;
  eventtypedata: any;
  event_type_code: any;
  event_type_desc: any;
  gl_subhead: any;
  gl_subhead_description: any;
  gl_subhead_code: any;
  showFixed_amt = false;
  showPer_page = false;
  showSystem_gen_no = false;
  showNumber_gen_code = false;
  showAmortizedPH = true;
  exception_lookupData: any;
  ac_debit_balance_value: any;
  ac_credit_balance_value: any;
  liability_exceed_group_value: any;
  ac_is_froozed_value: any;
  sanction_limit_expired_value: any;
  interest_calc_value: any;
  insufficient_exception_value: any;
  backdate_transaction_value: any;
  selecteddateFrom: any;
  fomartedFromDate: any;
  selecteddateTo: any;
  fomartedToDate: any;

  eventidLookup(): void {
    const dialogRef = this.dialog.open(LinkedEventIdLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data;
      this.feeFormData.controls.oda_fee_event.setValue(result.data);
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
      this.feeFormData.controls.oda_fee_type.setValue(this.event_type_code);
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


  glSubheadLookup(): void {
    const dialogRef = this.dialog.open(GlSubheadLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Gl Subhead data", result);
      this.gl_subhead = result.data;
      this.gl_subhead_description = result.data.glSubheadDescription;
      this.gl_subhead_code = result.data.glSubheadCode;


      // this.eventtypedata = result.data;
      this.glSubheadData.controls.oda_gl_subhead.setValue(this.gl_subhead_code);
      this.glSubheadData.controls.oda_gl_subhead_description.setValue(this.gl_subhead_description);
    });
  }



  dt = new Date();
  month = this.dt.getMonth();
  year = this.dt.getFullYear();
  daysInMonth = new Date(this.year, this.month, 0).getDate();

  dayarray = this.getDaysInMonth();
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
  subscription!: Subscription;
  error: any;
  results:any;
  showContractInput = false;
  showDerivationInput = false;
  showAmtDerivationInput = false;
  showPercentageDerivationInput = false;
  showFilenameDerivationInput = false;
  showChargecodeDerivationInput = false;
  showMrtFilenameDerivationInput = false;
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
    private odaAPI: OverdraftService,
    private datepipe: DatePipe

  ) { }

  submitted = false;
  ngOnInit() {
    this.getPage();
  }

  feeArray = new Array();
  glSubheadArray = new Array();

  formData = this.fb.group({
    oda_function_type: [''],
    oda_scheme_code: [''],
    oda_scheme_type: [''],
    oda_scheme_code_desc: [''],

    oda_effective_from_date: [''],
    oda_effective_to_date: [''],
    oda_system_generated_no: [''],
    oda_principal_lossline_ac: [''],
    oda_recovery_lossline_ac: [''],
    oda_charge_off_ac: [''],
    oda_number_generation:[''],
    oda_system_gen_no:[''],
    oda_number_generation_code:[''],
    // Interest Details

    oda_pl_ac_ccy:[''],
    oda_int_receivale_applicable:[''],
    oda_normal_int_receivable_ac:[''],
    oda_penal_int_receivable_ac:[''],
    oda_normal_int_received_ac:[''],
    oda_penal_int_received_ac:[''],
    oda_advance_int_ac:[''],
    oda_dr_int_compounding_freq:[''],
    oda_int_cal_freq_dr_week:[''],
    oda_app_discounted_int_rate:[''],
    oda_int_cal_freq_dr_day:[''],
    oda_int_cal_freq_dr_date:[''],
    oda_int_cal_freq_dr_holiday:[''],

// end of interest details
    oda_max_sanction_limit: [''],
    oda_dr_bal_limit: [''],
    // oda_max_sanction_limit: [''],
    // oda_dr_bal_limit: [''],
    oda_max_penal_int: [''],
    ac_statement_charged_by: [''],
    oda_inactive_ac_abnormal_trans_limit: [''],
    oda_dormant_ac_abnormal_trans_limit: [''],
    oda_duration_to_mark_ac_inactive: [''],
    oda_duration_from_inactive_to_dormant: [''],
    oda_dormant_fee: [''],
    oda_inactive_fee: [''],
    oda_allow_sweeps: [''],
    oda_allow_debit_against_unclear_bal: [''],
    oda_allow_rollover: [''],
    oda_dft_delink_ac_ph: [''],
    oda_dflt_delink_rate_code: [''],
    oda_revolving_od: [''],
    oda_calc_freq_dr_week: [''],
    oda_calc_freq_dr_day: [''],
    oda_calc_freq_dr_date: [''],
    oda_calc_freq_dr_holiday: [''],
    // oda_calc_freq_dr_week: [''],
    // oda_calc_freq_dr_day: [''],
    // oda_calc_freq_dr_date: [''],
    // oda_calc_freq_dr_holiday: [''],
    oda_norm_int_product_method: [''],
    oda_penal_int_rate_method: [''],
    oda_fees: new FormArray([]),
    oda_glsubheads: new FormArray([])
  });

  feeFormData = this.fb.group({
    oda_fee_type:[''],
    oda_fee_event:[''],

    oda_fee_frequency:[''],
    oda_fee_amortize_credit_ph:[''],
    oda_fee_amortize_debit_ph:[''],

    oda_fee_deductable:[''],
    oda_fee_multiple:[''],
    oda_fee_amortize:[''],
    oda_fee_demand_flow_id:[''],
    oda_fee_dr_placeholder:[''],
    oda_fee_cr_placeholder:[''],
    oda_fee_apr:[''],
    oda_fee_eir:[''],
    oda_fee_amort_tenor:[''],
    oda_fee_max_no_of_assesment:[''],
  });

  glSubheadData = this.fb.group({
    oda_gl_subhead: [''],
    oda_gl_subhead_description: [''],
    oda_gl_subhead_deafault: [''],
    oda_is_gl_subhead_deleted: ['']
  })

  initLoanForm() {
    this.newData = true;
    this.feeFormData = this.fb.group({
      oda_fee_type:[''],
      oda_fee_event:[''],
      oda_fee_frequency:[''],
      oda_fee_amortize_credit_ph:[''],
      oda_fee_amortize_debit_ph:[''],
      oda_fee_deductable:[''],
      oda_fee_multiple:[''],
      oda_fee_amortize:[''],
      oda_fee_demand_flow_id:[''],
      oda_fee_dr_placeholder:[''],
      oda_fee_cr_placeholder:[''],
      oda_fee_apr:[''],
      oda_fee_eir:[''],
      oda_fee_amort_tenor:[''],
      oda_fee_max_no_of_assesment:[''],
    });
  }

  initGlSUbheadForm() {
    this.newData = true;
    this.glSubheadData = this.fb.group({
      oda_gl_subhead: [''],
      oda_gl_subhead_description: [''],
      oda_gl_subhead_deafault: [''],
      oda_is_gl_subhead_deleted: ['']
    })
  }

  editLoanFeeForm(i: any) {
    this.newData = false;
    this.arrayIndex = this.feeArray[i];
    this.feeFormData = this.fb.group({
      oda_fee_type:[this.feeArray[i].oda_fee_type],
      oda_fee_event:[this.feeArray[i].oda_fee_event],

    oda_fee_frequency:[this.feeArray[i].oda_fee_frequency],
    oda_fee_amortize_credit_ph:[this.feeArray[i].oda_fee_amortize_credit_ph],
    oda_fee_amortize_debit_ph:[this.feeArray[i].oda_fee_amortize_debit_ph],

      oda_fee_deductable:[this.feeArray[i].oda_fee_deductable],
      oda_fee_multiple:[this.feeArray[i].oda_fee_multiple],
      oda_fee_amortize:[this.feeArray[i].oda_fee_amortize],
      oda_fee_demand_flow_id:[this.feeArray[i].oda_fee_demand_flow_id],
      oda_fee_dr_placeholder:[this.feeArray[i].oda_fee_dr_placeholder],
      oda_fee_cr_placeholder:[this.feeArray[i].oda_fee_cr_placeholder],
      oda_fee_apr:[this.feeArray[i].oda_fee_apr],
      oda_fee_eir:[this.feeArray[i].oda_fee_eir],
      oda_fee_amort_tenor:[this.feeArray[i].oda_fee_amort_tenor],
      oda_fee_max_no_of_assesment:[this.feeArray[i].oda_fee_max_no_of_assesment],

    });

    const index: number = this.feeArray.indexOf(this.feeArray.values);
    this.feeArray.splice(index, i);

  }

  get g() { return this.formData.controls; }
  get t() { return this.g.oda_fees as FormArray; }
  get l() { return this.g.oda_glsubheads as FormArray; }

  preview() {
    if (this.feeFormData.valid) {
      console.log("form data");
      
      this.t.push(this.fb.group(
        this.feeFormData.value
      ));
      this.feeArray.push(this.feeFormData.value);
      console.log("form fee", this.feeArray);
      this.initLoanForm();
    }
  }

  previewGlSubheads(){
    if(this.glSubheadData.valid){
      if(this.glSubheadArray.length<1){
        this.glSubheadData.controls.oda_gl_subhead_deafault.setValue("Yes");
      }else{
        this.glSubheadData.controls.oda_gl_subhead_deafault.setValue("No");
      }
      this.l.push(this.fb.group(
        this.glSubheadData.value
        ));
        this.glSubheadArray.push(this.glSubheadData.value);
        this.initGlSUbheadForm();
     }
   }


  updateLoanFee(i: any) {
    this.t.push(this.fb.group(
      this.feeFormData.value
    ));
    this.feeArray.push(this.feeFormData.value);
    console.log("form fee", this.feeArray);
    this.initLoanForm();
  }


  onRemove(i: any,) {
    const index: number = this.feeArray.indexOf(this.feeArray.values);
    this.feeArray.splice(index, i);
    console.log("new", this.feeArray);
    this.feeArray = this.feeArray;
    console.log("click", i);
  }

  onYes(event:any){
    this.showAmortizedPH = true;
  }
  onNo(event:any){
    this.showAmortizedPH = false;
  }


  onRemoveGLSubhead(i: any,) {
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
  disabledFormControll() {
    // this.formData.controls.start_date.disable();
    // this.formData.controls.end_date.disable();
    // this.formData.controls.base_int_code.disable();
    // this.formData.controls.base_int_pcnt_cr.disable();
    // this.formData.controls.base_int_pcnt_dr.disable();
    // this.formData.controls.version_desc.disable();
    // this.formData.controls.version_desc_repo.disable();
    // this.formData.controls.add_version_info.disable();

    // this.formData.controls.cr_normal_int.disable();
    // this.formData.controls.ac_ccy.disable();
    // this.formData.controls.home_ccy.disable();
    // this.formData.controls.max_no_of_assesment.disable();

  }
  getPage() {
    this.subscription = this.odaAPI.currentMessage.subscribe(message => {
      this.message = message;
      this.function_type = this.message.function_type;
      this.scheme_code = this.message.scheme_code;
      this.scheme_type = this.message.scheme_type;
      this.scheme_code_desc = this.message.scheme_code_desc;


      console.log(message);
      

      if (this.function_type == "A-Add") {
        console.log("test")
        // open empty forms
        this.formData = this.fb.group({
          oda_function_type: [this.function_type],
          oda_scheme_code: [this.int_tbl_code],
          oda_scheme_type: [this.scheme_type],
          oda_scheme_code_desc: [this.scheme_code_desc],
      
          oda_effective_from_date: [''],
          oda_effective_to_date: [''],
          oda_system_generated_no: [''],
          oda_principal_lossline_ac: [''],
          oda_recovery_lossline_ac: [''],
          oda_charge_off_ac: [''],
          oda_number_generation:[''],
          oda_system_gen_no:[''],
          oda_number_generation_code:[''],
          // Interest Details
    
      
          oda_pl_ac_ccy:[''],
          oda_int_receivale_applicable:[''],
          oda_normal_int_receivable_ac:[''],
          oda_penal_int_receivable_ac:[''],
          oda_normal_int_received_ac:[''],
          oda_penal_int_received_ac:[''],
          oda_advance_int_ac:[''],
          oda_dr_int_compounding_freq:[''],
          oda_int_cal_freq_dr_week:[''],
          oda_app_discounted_int_rate:[''],
          oda_int_cal_freq_dr_day:[''],
          oda_int_cal_freq_dr_date:[''],
          oda_int_cal_freq_dr_holiday:[''],
      
      // end of interest details
          oda_max_sanction_limit: [''],
          oda_dr_bal_limit: [''],
          // oda_max_sanction_limit: [''],
          // oda_dr_bal_limit: [''],
          oda_max_penal_int: [''],
          ac_statement_charged_by: [''],
          oda_inactive_ac_abnormal_trans_limit: [''],
          oda_dormant_ac_abnormal_trans_limit: [''],
          oda_duration_to_mark_ac_inactive: [''],
          oda_duration_from_inactive_to_dormant: [''],
          oda_dormant_fee: [''],
          oda_inactive_fee: [''],
          oda_allow_sweeps: [''],
          oda_allow_debit_against_unclear_bal: [''],
          oda_allow_rollover: [''],
          oda_dft_delink_ac_ph: [''],
          oda_dflt_delink_rate_code: [''],
          oda_revolving_od: [''],
          oda_calc_freq_dr_week: [''],
          oda_calc_freq_dr_day: [''],
          oda_calc_freq_dr_date: [''],
          oda_calc_freq_dr_holiday: [''],
          // oda_calc_freq_dr_week: [''],
          // oda_calc_freq_dr_day: [''],
          // oda_calc_freq_dr_date: [''],
          // oda_calc_freq_dr_holiday: [''],
          oda_norm_int_product_method: [''],
          oda_penal_int_rate_method: [''],
          oda_fees: new FormArray([]),
          oda_glsubheads: new FormArray([])

        });
      }
      else if (this.function_type == "I-Inquire") {
        console.log("testing")
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        this.subscription = this.odaAPI.getOverdraftByOverdraft(this.scheme_code).subscribe(res => {
          this.results = res;
          this.formData = this.fb.group({

            oda_scheme_code: [this.results.oda_scheme_code],
            oda_scheme_code_desc: [this.results.oda_scheme_code_desc],

            id: [this.results.id],
            oda_effective_to_date: [this.results.oda_effective_to_date],
            oda_effective_from_date: [this.results.oda_effective_from_date],
            oda_system_generated_no: [this.results.oda_system_generated_no],
            oda_principal_lossline_ac: [this.results.oda_principal_lossline_ac],
            oda_recovery_lossline_ac: [this.results.oda_recovery_lossline_ac],
            oda_charge_off_ac: [this.results.oda_charge_off_ac],
            oda_number_generation:[this.results.oda_number_generation],
            oda_system_gen_no:[this.results.oda_system_gen_no],
            oda_number_generation_code:[this.results.oda_number_generation_code],
            // Interest Details
      
        
            oda_pl_ac_ccy:[this.results.oda_pl_ac_ccy],
            oda_int_receivale_applicable:[this.results.oda_int_receivale_applicable],
            oda_normal_int_receivable_ac:[this.results.oda_normal_int_receivable_ac],
            oda_penal_int_receivable_ac:[this.results.oda_penal_int_receivable_ac],
            oda_normal_int_received_ac:[this.results.oda_normal_int_received_ac],
            oda_penal_int_received_ac:[this.results.oda_penal_int_received_ac],
            oda_advance_int_ac:[this.results.oda_advance_int_ac],
            oda_dr_int_compounding_freq:[this.results.oda_dr_int_compounding_freq],
            oda_int_cal_freq_dr_week:[this.results.oda_int_cal_freq_dr_week],
            oda_app_discounted_int_rate:[this.results.oda_app_discounted_int_rate],
            oda_int_cal_freq_dr_day:[this.results.oda_int_cal_freq_dr_day],
            oda_int_cal_freq_dr_date:[this.results.oda_int_cal_freq_dr_date],
            oda_int_cal_freq_dr_holiday:[this.results.oda_int_cal_freq_dr_holiday],
        
        // end of interest details
            oda_max_sanction_limit: [this.results.oda_max_sanction_limit],
            oda_dr_bal_limit: [this.results.oda_dr_bal_limit],
            // oda_max_sanction_limit: [this.results.],
            // oda_dr_bal_limit: [this.results.],
            oda_max_penal_int: [this.results.oda_max_penal_int],
            ac_statement_charged_by: [this.results.ac_statement_charged_by],
            oda_inactive_ac_abnormal_trans_limit: [this.results.oda_inactive_ac_abnormal_trans_limit],
            oda_dormant_ac_abnormal_trans_limit: [this.results.oda_dormant_ac_abnormal_trans_limit],
            oda_duration_to_mark_ac_inactive: [this.results.oda_duration_to_mark_ac_inactive],
            oda_duration_from_inactive_to_dormant: [this.results.oda_duration_from_inactive_to_dormant],
            oda_dormant_fee: [this.results.oda_dormant_fee],
            oda_inactive_fee: [this.results.oda_inactive_fee],
            oda_allow_sweeps: [this.results.oda_allow_sweeps],
            oda_allow_debit_against_unclear_bal: [this.results.oda_allow_debit_against_unclear_bal],
            oda_allow_rollover: [this.results.oda_allow_rollover],
            oda_dft_delink_ac_ph: [this.results.oda_dft_delink_ac_ph],
            oda_dflt_delink_rate_code: [this.results.oda_dflt_delink_rate_code],
            oda_revolving_od: [this.results.oda_revolving_od],
            oda_calc_freq_dr_week: [this.results.oda_calc_freq_dr_week],
            oda_calc_freq_dr_day: [this.results.oda_calc_freq_dr_day],
            oda_calc_freq_dr_date: [this.results.oda_calc_freq_dr_date],
            oda_calc_freq_dr_holiday: [this.results.oda_calc_freq_dr_holiday],
            // oda_calc_freq_dr_week: [this.results.],
            // oda_calc_freq_dr_day: [this.results.],
            // oda_calc_freq_dr_date: [this.results.],
            // oda_calc_freq_dr_holiday: [this.results.],
            oda_norm_int_product_method: [this.results.oda_norm_int_product_method],
            oda_penal_int_rate_method: [this.results.oda_penal_int_rate_method],
           // oda_fees: new FormArray([]),
           // oda_glsubheads: new FormArray([])

          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
          this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
        })
      }
      else if (this.function_type == "M-Modify") {
        // Populate fields with data and allow modifications
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        this.params = new HttpParams()
          .set('event_id', this.event_id)
          .set('event_type', this.event_type);
        // call to disable edit
        this.subscription = this.odaAPI.getOverdraftByOverdraft(this.scheme_code).subscribe(res => {

          this.results= res;
          this.formData = this.fb.group({

            // oda_function_type: [this.function_type],
            // oda_scheme_code: [this.int_tbl_code],
            // oda_scheme_type: [this.scheme_type],
            // oda_scheme_code_desc: [this.scheme_code_desc],

                        // oda_function_type: [this.function_type],
            // oda_scheme_code: [this.int_tbl_code],
            // oda_scheme_type: [this.scheme_type],
            // oda_scheme_code_desc: [this.scheme_code_desc],


            oda_scheme_code: [this.results.oda_scheme_code],
            oda_scheme_code_desc: [this.results.oda_scheme_code_desc],

            id: [this.results.id],
            oda_effective_to_date: [this.results.oda_effective_to_date],
            oda_effective_from_date: [this.results.oda_effective_from_date],
            oda_system_generated_no: [this.results.oda_system_generated_no],
            oda_principal_lossline_ac: [this.results.oda_principal_lossline_ac],
            oda_recovery_lossline_ac: [this.results.oda_recovery_lossline_ac],
            oda_charge_off_ac: [this.results.oda_charge_off_ac],
            oda_number_generation:[this.results.oda_number_generation],
            oda_system_gen_no:[this.results.oda_system_gen_no],
            oda_number_generation_code:[this.results.oda_number_generation_code],
            // Interest Details
      
        
            oda_pl_ac_ccy:[this.results.oda_pl_ac_ccy],
            oda_int_receivale_applicable:[this.results.oda_int_receivale_applicable],
            oda_normal_int_receivable_ac:[this.results.oda_normal_int_receivable_ac],
            oda_penal_int_receivable_ac:[this.results.oda_penal_int_receivable_ac],
            oda_normal_int_received_ac:[this.results.oda_normal_int_received_ac],
            oda_penal_int_received_ac:[this.results.oda_penal_int_received_ac],
            oda_advance_int_ac:[this.results.oda_advance_int_ac],
            oda_dr_int_compounding_freq:[this.results.oda_dr_int_compounding_freq],
            oda_int_cal_freq_dr_week:[this.results.oda_int_cal_freq_dr_week],
            oda_app_discounted_int_rate:[this.results.oda_app_discounted_int_rate],
            oda_int_cal_freq_dr_day:[this.results.oda_int_cal_freq_dr_day],
            oda_int_cal_freq_dr_date:[this.results.oda_int_cal_freq_dr_date],
            oda_int_cal_freq_dr_holiday:[this.results.oda_int_cal_freq_dr_holiday],
        
        // end of interest details
            oda_max_sanction_limit: [this.results.oda_max_sanction_limit],
            oda_dr_bal_limit: [this.results.oda_dr_bal_limit],
            // oda_max_sanction_limit: [this.results.],
            // oda_dr_bal_limit: [this.results.],
            oda_max_penal_int: [this.results.oda_max_penal_int],
            ac_statement_charged_by: [this.results.ac_statement_charged_by],
            oda_inactive_ac_abnormal_trans_limit: [this.results.oda_inactive_ac_abnormal_trans_limit],
            oda_dormant_ac_abnormal_trans_limit: [this.results.oda_dormant_ac_abnormal_trans_limit],
            oda_duration_to_mark_ac_inactive: [this.results.oda_duration_to_mark_ac_inactive],
            oda_duration_from_inactive_to_dormant: [this.results.oda_duration_from_inactive_to_dormant],
            oda_dormant_fee: [this.results.oda_dormant_fee],
            oda_inactive_fee: [this.results.oda_inactive_fee],
            oda_allow_sweeps: [this.results.oda_allow_sweeps],
            oda_allow_debit_against_unclear_bal: [this.results.oda_allow_debit_against_unclear_bal],
            oda_allow_rollover: [this.results.oda_allow_rollover],
            oda_dft_delink_ac_ph: [this.results.oda_dft_delink_ac_ph],
            oda_dflt_delink_rate_code: [this.results.oda_dflt_delink_rate_code],
            oda_revolving_od: [this.results.oda_revolving_od],
            oda_calc_freq_dr_week: [this.results.oda_calc_freq_dr_week],
            oda_calc_freq_dr_day: [this.results.oda_calc_freq_dr_day],
            oda_calc_freq_dr_date: [this.results.oda_calc_freq_dr_date],
            oda_calc_freq_dr_holiday: [this.results.oda_calc_freq_dr_holiday],
            // oda_calc_freq_dr_week: [this.results.],
            // oda_calc_freq_dr_day: [this.results.],
            // oda_calc_freq_dr_date: [this.results.],
            // oda_calc_freq_dr_holiday: [this.results.],
            oda_norm_int_product_method: [this.results.oda_norm_int_product_method],
            oda_penal_int_rate_method: [this.results.oda_penal_int_rate_method],
           // oda_fees: new FormArray([]),
           // oda_glsubheads: new FormArray([])

          });
        }, err => {
          this.error = err;
          this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        })

      }
      else if (this.function_type == "V-Verify") {
        // Populate data with rotected fileds only verification is enabled
        console.log("testing")
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        this.subscription = this.odaAPI.getOverdraftByOverdraft(this.scheme_code).subscribe(res => {
          this.results = res;
          this.formData = this.fb.group({

            // oda_function_type: [this.function_type],
            // oda_scheme_code: [this.int_tbl_code],
            // oda_scheme_type: [this.scheme_type],
            // oda_scheme_code_desc: [this.scheme_code_desc],

            oda_scheme_code: [this.results.oda_scheme_code],
            oda_scheme_code_desc: [this.results.oda_scheme_code_desc],

            id: [this.results.id],
            oda_effective_to_date: [this.results.oda_effective_to_date],
            oda_effective_from_date: [this.results.oda_effective_from_date],
            oda_system_generated_no: [this.results.oda_system_generated_no],
            oda_principal_lossline_ac: [this.results.oda_principal_lossline_ac],
            oda_recovery_lossline_ac: [this.results.oda_recovery_lossline_ac],
            oda_charge_off_ac: [this.results.oda_charge_off_ac],
            oda_number_generation:[this.results.oda_number_generation],
            oda_system_gen_no:[this.results.oda_system_gen_no],
            oda_number_generation_code:[this.results.oda_number_generation_code],
            // Interest Details
      
        
            oda_pl_ac_ccy:[this.results.oda_pl_ac_ccy],
            oda_int_receivale_applicable:[this.results.oda_int_receivale_applicable],
            oda_normal_int_receivable_ac:[this.results.oda_normal_int_receivable_ac],
            oda_penal_int_receivable_ac:[this.results.oda_penal_int_receivable_ac],
            oda_normal_int_received_ac:[this.results.oda_normal_int_received_ac],
            oda_penal_int_received_ac:[this.results.oda_penal_int_received_ac],
            oda_advance_int_ac:[this.results.oda_advance_int_ac],
            oda_dr_int_compounding_freq:[this.results.oda_dr_int_compounding_freq],
            oda_int_cal_freq_dr_week:[this.results.oda_int_cal_freq_dr_week],
            oda_app_discounted_int_rate:[this.results.oda_app_discounted_int_rate],
            oda_int_cal_freq_dr_day:[this.results.oda_int_cal_freq_dr_day],
            oda_int_cal_freq_dr_date:[this.results.oda_int_cal_freq_dr_date],
            oda_int_cal_freq_dr_holiday:[this.results.oda_int_cal_freq_dr_holiday],
        
        // end of interest details
            oda_max_sanction_limit: [this.results.oda_max_sanction_limit],
            oda_dr_bal_limit: [this.results.oda_dr_bal_limit],
            // oda_max_sanction_limit: [this.results.],
            // oda_dr_bal_limit: [this.results.],
            oda_max_penal_int: [this.results.oda_max_penal_int],
            ac_statement_charged_by: [this.results.ac_statement_charged_by],
            oda_inactive_ac_abnormal_trans_limit: [this.results.oda_inactive_ac_abnormal_trans_limit],
            oda_dormant_ac_abnormal_trans_limit: [this.results.oda_dormant_ac_abnormal_trans_limit],
            oda_duration_to_mark_ac_inactive: [this.results.oda_duration_to_mark_ac_inactive],
            oda_duration_from_inactive_to_dormant: [this.results.oda_duration_from_inactive_to_dormant],
            oda_dormant_fee: [this.results.oda_dormant_fee],
            oda_inactive_fee: [this.results.oda_inactive_fee],
            oda_allow_sweeps: [this.results.oda_allow_sweeps],
            oda_allow_debit_against_unclear_bal: [this.results.oda_allow_debit_against_unclear_bal],
            oda_allow_rollover: [this.results.oda_allow_rollover],
            oda_dft_delink_ac_ph: [this.results.oda_dft_delink_ac_ph],
            oda_dflt_delink_rate_code: [this.results.oda_dflt_delink_rate_code],
            oda_revolving_od: [this.results.oda_revolving_od],
            oda_calc_freq_dr_week: [this.results.oda_calc_freq_dr_week],
            oda_calc_freq_dr_day: [this.results.oda_calc_freq_dr_day],
            oda_calc_freq_dr_date: [this.results.oda_calc_freq_dr_date],
            oda_calc_freq_dr_holiday: [this.results.oda_calc_freq_dr_holiday],
            // oda_calc_freq_dr_week: [this.results.],
            // oda_calc_freq_dr_day: [this.results.],
            // oda_calc_freq_dr_date: [this.results.],
            // oda_calc_freq_dr_holiday: [this.results.],
            oda_norm_int_product_method: [this.results.oda_norm_int_product_method],
            oda_penal_int_rate_method: [this.results.oda_penal_int_rate_method],
           // oda_fees: new FormArray([]),
           // oda_glsubheads: new FormArray([])
              


          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
          this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
        })
      }
      else if (this.function_type == "C-Cancle") {
        // should open a page with data and show remove button
        console.log("testing")
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        this.subscription = this.odaAPI.getOverdraftByOverdraft(this.scheme_code).subscribe(res => {
          this.results = res;
          this.formData = this.fb.group({

            // oda_function_type: [this.function_type],
            // oda_scheme_code: [this.int_tbl_code],
            // oda_scheme_type: [this.scheme_type],
            // oda_scheme_code_desc: [this.scheme_code_desc],

            oda_scheme_code: [this.results.oda_scheme_code],
            oda_scheme_code_desc: [this.results.oda_scheme_code_desc],

            id: [this.results.id],
            oda_effective_to_date: [this.results.oda_effective_to_date],
            oda_effective_from_date: [this.results.oda_effective_from_date],
            oda_system_generated_no: [this.results.oda_system_generated_no],
            oda_principal_lossline_ac: [this.results.oda_principal_lossline_ac],
            oda_recovery_lossline_ac: [this.results.oda_recovery_lossline_ac],
            oda_charge_off_ac: [this.results.oda_charge_off_ac],
            oda_number_generation:[this.results.oda_number_generation],
            oda_system_gen_no:[this.results.oda_system_gen_no],
            oda_number_generation_code:[this.results.oda_number_generation_code],
            // Interest Details
      
        
            oda_pl_ac_ccy:[this.results.oda_pl_ac_ccy],
            oda_int_receivale_applicable:[this.results.oda_int_receivale_applicable],
            oda_normal_int_receivable_ac:[this.results.oda_normal_int_receivable_ac],
            oda_penal_int_receivable_ac:[this.results.oda_penal_int_receivable_ac],
            oda_normal_int_received_ac:[this.results.oda_normal_int_received_ac],
            oda_penal_int_received_ac:[this.results.oda_penal_int_received_ac],
            oda_advance_int_ac:[this.results.oda_advance_int_ac],
            oda_dr_int_compounding_freq:[this.results.oda_dr_int_compounding_freq],
            oda_int_cal_freq_dr_week:[this.results.oda_int_cal_freq_dr_week],
            oda_app_discounted_int_rate:[this.results.oda_app_discounted_int_rate],
            oda_int_cal_freq_dr_day:[this.results.oda_int_cal_freq_dr_day],
            oda_int_cal_freq_dr_date:[this.results.oda_int_cal_freq_dr_date],
            oda_int_cal_freq_dr_holiday:[this.results.oda_int_cal_freq_dr_holiday],
        
        // end of interest details
            oda_max_sanction_limit: [this.results.oda_max_sanction_limit],
            oda_dr_bal_limit: [this.results.oda_dr_bal_limit],
            // oda_max_sanction_limit: [this.results.],
            // oda_dr_bal_limit: [this.results.],
            oda_max_penal_int: [this.results.oda_max_penal_int],
            ac_statement_charged_by: [this.results.ac_statement_charged_by],
            oda_inactive_ac_abnormal_trans_limit: [this.results.oda_inactive_ac_abnormal_trans_limit],
            oda_dormant_ac_abnormal_trans_limit: [this.results.oda_dormant_ac_abnormal_trans_limit],
            oda_duration_to_mark_ac_inactive: [this.results.oda_duration_to_mark_ac_inactive],
            oda_duration_from_inactive_to_dormant: [this.results.oda_duration_from_inactive_to_dormant],
            oda_dormant_fee: [this.results.oda_dormant_fee],
            oda_inactive_fee: [this.results.oda_inactive_fee],
            oda_allow_sweeps: [this.results.oda_allow_sweeps],
            oda_allow_debit_against_unclear_bal: [this.results.oda_allow_debit_against_unclear_bal],
            oda_allow_rollover: [this.results.oda_allow_rollover],
            oda_dft_delink_ac_ph: [this.results.oda_dft_delink_ac_ph],
            oda_dflt_delink_rate_code: [this.results.oda_dflt_delink_rate_code],
            oda_revolving_od: [this.results.oda_revolving_od],
            oda_calc_freq_dr_week: [this.results.oda_calc_freq_dr_week],
            oda_calc_freq_dr_day: [this.results.oda_calc_freq_dr_day],
            oda_calc_freq_dr_date: [this.results.oda_calc_freq_dr_date],
            oda_calc_freq_dr_holiday: [this.results.oda_calc_freq_dr_holiday],
            // oda_calc_freq_dr_week: [this.results.],
            // oda_calc_freq_dr_day: [this.results.],
            // oda_calc_freq_dr_date: [this.results.],
            // oda_calc_freq_dr_holiday: [this.results.],
            oda_norm_int_product_method: [this.results.oda_norm_int_product_method],
            oda_penal_int_rate_method: [this.results.oda_penal_int_rate_method],
           // oda_fees: new FormArray([]),
           // oda_glsubheads: new FormArray([])
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
          this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
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
      this.chrg_coll_crncy = result.data;
      this.formData.controls.chrg_coll_crncy.setValue(result.data);
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  onSubmit() {
                    
    this.formData.controls.oda_effective_from_date.setValue(this.datepipe.transform(this.f.oda_effective_from_date.value, 'yyyy-MM-ddTHH:mm:ss'));
    this.formData.controls.oda_effective_to_date.setValue(this.datepipe.transform(this.f.oda_effective_to_date.value, 'yyyy-MM-ddTHH:mm:ss'));

    this.submitted = true;
    // stop here if form is invalid
    if (this.formData.valid) {
      if (this.function_type == "A-Add") {
        this.subscription = this.odaAPI.createOverdraft(this.formData.value).subscribe(res => {
          this.results = res;
          this._snackBar.open("Executed Successfully!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        })
      } else if (this.function_type != "A-Add") {
        //this.eventId = this.actRoute.snapshot.paramMap.get('event_id');
        this.subscription = this.odaAPI.updateOverdraft(this.formData.value).subscribe(res => {
          this.results = res;
          this._snackBar.open("Executed Successfully!", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        })
      }
    } else {
      this._snackBar.open("Invalid Form Data", "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }


}