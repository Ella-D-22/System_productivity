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
import { TermDepositServiceService } from './term-deposit-service.service';
@Component({
  selector: 'app-term-deposit',
  templateUrl: './term-deposit.component.html',
  styleUrls: ['./term-deposit.component.scss']
})
export class TermDepositComponent implements OnInit {

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
  int_comp_freq_array: any = ['D- Daily', 'W – Weekly', 'F – Fortnightly', 'M – Monthly', 'Q- Quarterly', 'H – Half yearly', 'Y- Yearly', 'T-Twice a month']
  ei_payment_freq_array: any = ['D- Daily', 'W – Weekly', 'F – Fortnightly', 'M – Monthly', 'Q- Quarterly', 'H – Half yearly', 'Y- Yearly']

  periodicCircleArray: any = [
    'D-Daily','F-Forthnightly','H-Half Yearly','M-Monthly','Q-Quarterly','W-Weekly','Y-Yearly'
  ]
  weekArray: any = [
    '1-First Week','2-Second Week','3-THird Week','4-Fourth Week','L-Last Week','M-Middle Week'
  ]
  dayArray: any = [
    '1-Sunday','2-Monday','3-Tuesday','4-Wednesday','5-Thursday','6-Friday','7-Saturday'
  ]
  dateArray: any = [
    '01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'
  ]
  holidayExceptionArray: any = [
    'N-Next Day','P-Previouse Day'
  ]

  depositTypeArray: any = [
    'T-Other Deposits','R-Recurring','C-Certificate of Deposit','N-Notice Deposit'
  ]
  //  debitIntCompFreqArray: any = [
  //   'Daily','Monthly', 'Quarterly','No compounding'
  //  ]=

  daysArray: any = [
    'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  datesArray: any = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
    '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  ]
  loanRepaymentMethodsArray: any = [
    'B – Bill to employer',
    'D – Electronic Clearing',
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
  showSystem_gen_no = false;
  showNumber_gen_code = false;
  showAmortizedPH = true;
  exception_lookupData: any;
  exception_code_value: any;
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
  tda_fees: any;

  eventidLookup(): void {
    const dialogRef = this.dialog.open(LinkedEventIdLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data;
      this.feeFormData.controls.tda_fee_event.setValue(result.data);
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
      this.feeFormData.controls.tda_fee_type.setValue(this.event_type_code);
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
      this.gl_subhead = result.data;
      this.gl_subhead_description =  result.data.glSubheadDescription;
      this.gl_subhead_code =  result.data.glSubheadCode;  

      // this.eventtypedata = result.data;
      this.glSubheadData.controls.tda_gl_subhead.setValue(this.gl_subhead_code);
      this.glSubheadData.controls.tda_gl_subhead_description.setValue(this.gl_subhead_description);
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


  onYes(event:any){
    this.showAmortizedPH = true;
  }
  onNo(event:any){
    this.showAmortizedPH = false;
  }

  dialogValue: any;
  dialogData: any;
  function_type: any;
  event_type: any;
  event_id: any;
  subscription!: Subscription;
  error: any;
  results: any;
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
    private tdaAPI: TermDepositServiceService,
    private datepipe: DatePipe

  ) { }

  submitted = false;
  ngOnInit() {
    this.getPage();
  }
  feeArray = new Array();
  glSubheadArray = new Array();

  formData = this.fb.group({
    function_type: [''],
    scheme_code: [''],
    scheme_type: [''],
    scheme_code_desc: [''],

    tda_effective_from_date:[''],
    tda_effective_to_date:[''],
    tda_system_generated_no:[''],
    tda_number_generation_code:[''],
    tda_principal_lossline_ac:[''],
    tda_recovery_lossline_ac:[''],
    tda_charge_off_ac:[''],
    tda_number_generation:[''],

    // interest details
    tda_pl_ac_ccy:[''],
    tda_int_receivale_applicable:[''],
    tda_normal_int_receivable_ac:[''],
    tda_penal_int_receivable_ac:[''],
    tda_normal_int_received_ac:[''],
    tda_penal_int_received_ac:[''],
    tda_advance_int_ac:[''],
    tda_dr_int_compounding_freq:[''],
    tda_int_cal_freq_dr_week:[''],
    tda_app_discounted_int_rate:[''],
    tda_int_cal_freq_dr_day:[''],
    tda_int_cal_freq_dr_date:[''],
    tda_int_cal_freq_dr_holiday:[''],
    tda_int_table_code:[''],


    // end of interest details

    tda_deposit_amt_min:[''],
    tda_deposit_amt_max:[''],
    tda_deposit_amt_steps:[''],
    tda_period_mm_min:[''],
    tda_period_dd_min:[''],
    tda_period_mm_max:[''],
    tda_period_dd_max:[''],
    tda_period_steps_mm:[''],
    tda_period_steps_dd:[''],
    tda_deposit_type:[''],
    tda_sundry_deposit_ph:[''],
    tda_repayment_report_code:[''],
    tda_duration_to_mrk_ac_inactive:[''],
    tda_duration_frm_inactive_to_dormant:[''],
    tda_pre_closure_rate:[''],
    tda_pre_closure_penalty_rate:[''],
    // tda_sundry_deposit_ph:[''],
    // tda_repayment_report_code:[''],
    tda_frequency_for_int_calc_on_preclosure_month:[''],
    tda_sweeps:[''],
    tda_part_closure:[''],
    tda_value_dated_closure:[''],
    tda_repayment_ac_ph:[''],
    tda_auto_renewal:[''],
    tda_max_no_of_renewal:[''],
    tda_renewal_period_mm:[''],
    tda_renewal_period_dd:[''],
    tda_renewal_allowed_within_days:[''],
    tda_renewal_period:[''],
    tda_automatically_create_dep:[''],
    tda_link_to_operative_ac:[''],
    tda_auto_cr_period_mm:[''],
    tda_auto_cr_period_dd:[''],
    int_cal_freq_dr_week:[''],
    // int_cal_freq_dr_week:[''],
    int_cal_freq_dr_day:[''],
    int_cal_freq_dr_date:[''],
    int_cal_freq_dr_holiday:[''],
    // int_cal_freq_dr_day:[''],
    // int_cal_freq_dr_date:[''],
    // int_cal_freq_dr_holiday:[''],
    tda_fees: new FormArray([]),
    tda_glsubheads: new FormArray([])
  });

  feeFormData = this.fb.group({
    tda_fee_type: ['', [Validators.required]],
    tda_fee_event: ['', [Validators.required]],
    tda_fee_frequency: ['', [Validators.required]],
    tda_fee_deductable: ['', [Validators.required]],
    tda_fee_multiple: ['', [Validators.required]],
    tda_fee_amortize: [''],
    tda_fee_amortize_credit_ph:[''],
    tda_fee_amortize_debit_ph:[''],
    tda_fee_demand_flow: [''],
    tda_fee_dr_placeholder: [''],
    tda_fee_cr_placeholder: [''],
    tda_fee_apr: [''],
    tda_fee_eir: [''],
    tda_fee_amort_tenor: [''],
    tda_fee_max_no_of_assesment: [''],
  });

  glSubheadData = this.fb.group({
    tda_gl_subhead: [''],
    tda_gl_subhead_description: [''],
    tda_gl_subhead_deafault: [''],
    tda_is_gl_subhead_deleted: ['']
  })

  initLoanForm() {
    this.newData = true;
    this.feeFormData = this.fb.group({
      tda_fee_type: [''],
      tda_fee_event: [''],
      tda_fee_frequency: [''],
      tda_fee_deductable: [''],
      tda_fee_multiple: [''],
      tda_fee_amortize: [''],
      tda_fee_amortize_credit_ph:[''],
      tda_fee_amortize_debit_ph:[''],
      tda_fee_demand_flow: [''],
      tda_fee_dr_placeholder: [''],
      tda_fee_cr_placeholder: [''],
      tda_fee_apr: [''],
      tda_fee_eir: [''],
      tda_fee_amort_tenor: [''],
      tda_fee_max_no_of_assesment: [''],
    });
  }

  initGlSUbheadForm() {
    this.newData = true;
    this.glSubheadData = this.fb.group({
      tad_gl_subhead: [''],
      tda_gl_subhead_description: [''],
      tda_gl_subhead_deafault: [''],
      tda_is_gl_subhead_deleted: ['']
    })
  }

  editLoanFeeForm(i: any) {
    this.newData = false;
    this.arrayIndex = this.feeArray[i];
    this.feeFormData = this.fb.group({
      tda_fee_type: [this.feeArray[i].tda_fee_type],
      tda_fee_event: [this.feeArray[i].tda_fee_event],
      tda_fee_frequency: [this.feeArray[i].tda_fee_frequency],
      tda_fee_deductable: [this.feeArray[i].tda_fee_deductable],
      tda_fee_multiple: [this.feeArray[i].tda_fee_multiple],
      tda_fee_amortize: [this.feeArray[i].tda_fee_amortize],
      tda_fee_amortize_credit_ph:[this.feeArray[i].tda_fee_amortize_credit_ph],
      tda_fee_amortize_debit_ph:[this.feeArray[i].tda_fee_amortize_debit_ph],
      tda_fee_demand_flow: [this.feeArray[i].tda_fee_demand_flow],
      tda_fee_dr_placeholder: [this.feeArray[i].tda_fee_dr_placeholder],
      tda_fee_cr_placeholder: [this.feeArray[i].tda_fee_cr_placeholder],
      tda_fee_apr: [this.feeArray[i].tda_fee_apr],
      tda_fee_eir: [this.feeArray[i].tda_fee_eir],
      tda_fee_amort_tenor: [this.feeArray[i].tda_fee_amort_tenor],
      tda_fee_max_no_of_assesment: [this.feeArray[i].tda_fee_max_no_of_assessment],
    });

    const index: number = this.feeArray.indexOf(this.feeArray.values);
    this.feeArray.splice(index, i);

  }

  get g() { return this.formData.controls; }
  get t() { return this.g.tda_fees as FormArray; }
  get l() { return this.g.tda_glsubheads as FormArray; }


  newFormDkkata = this.fb.group({
    org_lnk_event_id: ['', Validators.required],
  });
  preview() {
    if (this.feeFormData.valid) {
      this.t.push(this.fb.group(
        this.feeFormData.value
      ));
      this.feeArray.push(this.feeFormData.value);
      console.log("form fee", this.feeArray);
      this.initLoanForm();
    }
  }

  // previewGlSubheads() {
  //   if (this.glSubheadData.valid) {
  //     this.l.push(this.fb.group(
  //       this.glSubheadData.value
  //     ));
  //     this.glSubheadArray.push(this.glSubheadData.value);
  //     console.log("Gl Subheads", this.glSubheadArray);
  //     this.initLoanForm();
  //   }
  // }

  
  previewGlSubheads(){
    if(this.glSubheadData.valid){
      if(this.glSubheadArray.length<1){
        this.glSubheadData.controls.tda_gl_subhead_deafault.setValue("Yes");
      }else{
        this.glSubheadData.controls.tda_gl_subhead_deafault.setValue("No");
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


  onRemoveGLSubhead(i: any,) {
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




  disabledFormControll() {
      
            this.formData.controls.tda_effective_from_date.disable();
            this.formData.controls.tda_effective_to_date.disable();
            this.formData.controls.tda_system_generated_no.disable();
            this.formData.controls.tda_number_generation_code.disable();
            this.formData.controls.tda_principal_lossline_ac.disable();
            this.formData.controls.tda_recovery_lossline_ac.disable();
            this.formData.controls.tda_charge_off_ac.disable();
            this.formData.controls.tda_number_generation.disable();
      
            this.formData.controls.tda_pl_ac_ccy.disable();
            this.formData.controls.tda_int_receivale_applicable.disable();
            this.formData.controls.tda_normal_int_receivable_ac.disable();
            this.formData.controls.tda_penal_int_receivable_ac.disable();
            this.formData.controls.tda_normal_int_received_ac.disable();
            this.formData.controls.tda_penal_int_received_ac.disable();
            this.formData.controls.tda_advance_int_ac.disable();
            this.formData.controls.tda_dr_int_compounding_freq.disable();
            this.formData.controls.tda_int_cal_freq_dr_week.disable();
            this.formData.controls.tda_app_discounted_int_rate.disable();
            this.formData.controls.tda_int_cal_freq_dr_day.disable();
            this.formData.controls.tda_int_cal_freq_dr_date.disable();
            this.formData.controls.tda_int_cal_freq_dr_holiday.disable();
            this.formData.controls.tda_int_table_code.disable();

            this.formData.controls.tda_deposit_amt_min.disable();
            this.formData.controls.tda_deposit_amt_max.disable();
            this.formData.controls.tda_deposit_amt_steps.disable();
            this.formData.controls.tda_period_mm_min.disable();
            this.formData.controls.tda_period_dd_min.disable();
            this.formData.controls.tda_period_mm_max.disable();
            this.formData.controls.tda_period_dd_max.disable();
            this.formData.controls.tda_period_steps_mm.disable();
            this.formData.controls.tda_period_steps_dd.disable();
            this.formData.controls.tda_deposit_type.disable();
            this.formData.controls.tda_sundry_deposit_ph.disable();
            this.formData.controls.tda_repayment_report_code.disable();
            this.formData.controls.tda_duration_to_mrk_ac_inactive.disable();
            this.formData.controls.tda_duration_frm_inactive_to_dormant.disable();
            this.formData.controls.tda_pre_closure_rate.disable();
            this.formData.controls.tda_pre_closure_penalty_rate.disable();
            this.formData.controls.tda_frequency_for_int_calc_on_preclosure_month.disable();
            this.formData.controls.tda_sweeps.disable();
            this.formData.controls.tda_part_closure.disable();
            this.formData.controls.tda_value_dated_closure.disable();
            this.formData.controls.tda_repayment_ac_ph.disable();
            this.formData.controls.tda_auto_renewal.disable();
            this.formData.controls.tda_max_no_of_renewal.disable();
            this.formData.controls.tda_renewal_period_mm.disable();
            this.formData.controls.tda_renewal_period_dd.disable();
            this.formData.controls.tda_renewal_allowed_within_days.disable();
            this.formData.controls.tda_renewal_period.disable();
            this.formData.controls.tda_automatically_create_dep.disable();
            this.formData.controls.tda_link_to_operative_ac.disable();
            this.formData.controls.tda_auto_cr_period_mm.disable();
            this.formData.controls.tda_auto_cr_period_dd.disable();
            this.formData.controls.int_cal_freq_dr_week.disable();
            this.formData.controls.int_cal_freq_dr_day.disable();
            this.formData.controls.int_cal_freq_dr_date.disable();
            this.formData.controls.int_cal_freq_dr_holiday.disable();  }
  getPage() {
    this.subscription = this.tdaAPI.currentMessage.subscribe(message => {
      this.message = message;
      this.function_type = this.message.function_type;
      this.scheme_code = this.message.scheme_code;
      this.scheme_type = this.message.scheme_type;
      this.scheme_code_desc = this.message.scheme_code_desc;

      if (this.function_type == "A-Add") {
        // open empty forms
        this.formData = this.fb.group({

          function_type: [this.function_type],
          scheme_code: [this.scheme_code],
          scheme_type: [this.scheme_type],
          scheme_code_desc: [this.scheme_code_desc],

  
          tda_effective_from_date:[''],
          tda_effective_to_date:[''],
          tda_system_generated_no:[''],
          tda_number_generation_code:[''],
          tda_principal_lossline_ac:[''],
          tda_recovery_lossline_ac:[''],
          tda_charge_off_ac:[''],
          tda_number_generation:[''],
    
          // interest details
          tda_pl_ac_ccy:[''],
          tda_int_receivale_applicable:[''],
          tda_normal_int_receivable_ac:[''],
          tda_penal_int_receivable_ac:[''],
          tda_normal_int_received_ac:[''],
          tda_penal_int_received_ac:[''],
          tda_advance_int_ac:[''],
          tda_dr_int_compounding_freq:[''],
          tda_int_cal_freq_dr_week:[''],
          tda_app_discounted_int_rate:[''],
          tda_int_cal_freq_dr_day:[''],
          tda_int_cal_freq_dr_date:[''],
          tda_int_cal_freq_dr_holiday:[''],
          tda_int_table_code:[''],

          // end of interest details
          tda_deposit_amt_min:[''],
          tda_deposit_amt_max:[''],
          tda_deposit_amt_steps:[''],
          tda_period_mm_min:[''],
          tda_period_dd_min:[''],
          tda_period_mm_max:[''],
          tda_period_dd_max:[''],
          tda_period_steps_mm:[''],
          tda_period_steps_dd:[''],
          tda_deposit_type:[''],
          tda_sundry_deposit_ph:[''],
          tda_repayment_report_code:[''],
          tda_duration_to_mrk_ac_inactive:[''],
          tda_duration_frm_inactive_to_dormant:[''],
          tda_pre_closure_rate:[''],
          tda_pre_closure_penalty_rate:[''],
          // tda_sundry_deposit_ph:[''],
          // tda_repayment_report_code:[''],
          tda_frequency_for_int_calc_on_preclosure_month:[''],
          tda_sweeps:[''],
          tda_part_closure:[''],
          tda_value_dated_closure:[''],
          tda_repayment_ac_ph:[''],
          tda_auto_renewal:[''],
          tda_max_no_of_renewal:[''],
          tda_renewal_period_mm:[''],
          tda_renewal_period_dd:[''],
          tda_renewal_allowed_within_days:[''],
          tda_renewal_period:[''],
          tda_automatically_create_dep:[''],
          tda_link_to_operative_ac:[''],
          tda_auto_cr_period_mm:[''],
          tda_auto_cr_period_dd:[''],
          int_cal_freq_dr_week:[''],
          // int_cal_freq_dr_week:[''],
          int_cal_freq_dr_day:[''],
          int_cal_freq_dr_date:[''],
          int_cal_freq_dr_holiday:[''],
          // int_cal_freq_dr_day:[''],
          // int_cal_freq_dr_date:[''],
          // int_cal_freq_dr_holiday:[''],
          tda_fees: new FormArray([]),
          tda_glsubheads: new FormArray([])

        });
      }
      else if (this.function_type == "I-Inquire") {
        console.log("Got Called!");
        
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        let params = new HttpParams()
        .set("scheme_code", this.scheme_code);     
        this.subscription = this.tdaAPI.getproductBySchemeCode(params).subscribe(res=>{
          this.results = res;
          console.log("this are the results from the form", res);
// Initialise the glsubheads
          this.glSubheadArray = this.results.tda_glsubheads;
          this.feeArray = this.results.tda_fees;
          
          this.formData = this.fb.group({

            id:[this.results.id],
            scheme_code: [this.results.scheme_code],
            scheme_type: [this.results.scheme_type],
            scheme_code_desc: [this.results.scheme_code_desc],
  
            tda_effective_from_date:[this.results.tda_effective_from_date],
            tda_effective_to_date:[this.results.tda_effective_to_date],
            tda_system_generated_no:[this.results.tda_system_generated_no],
            tda_number_generation_code:[this.results.tda_number_generation_code],
            tda_principal_lossline_ac:[this.results.tda_principal_lossline_ac],
            tda_recovery_lossline_ac:[this.results.tda_recovery_lossline_ac],
            tda_charge_off_ac:[this.results.tda_charge_off_ac],
            tda_number_generation:[this.results.tda_number_generation],
      
            // interest details
            tda_pl_ac_ccy:[this.results.tda_pl_ac_ccy],
            tda_int_receivale_applicable:[this.results.tda_int_receivale_applicable],
            tda_normal_int_receivable_ac:[this.results.tda_normal_int_receivable_ac],
            tda_penal_int_receivable_ac:[this.results.tda_penal_int_receivable_ac],
            tda_normal_int_received_ac:[this.results.tda_normal_int_received_ac],
            tda_penal_int_received_ac:[this.results.tda_penal_int_received_ac],
            tda_advance_int_ac:[this.results.tda_advance_int_ac],
            tda_dr_int_compounding_freq:[this.results.tda_dr_int_compounding_freq],
            tda_int_cal_freq_dr_week:[this.results.tda_int_cal_freq_dr_week],
            tda_app_discounted_int_rate:[this.results.tda_app_discounted_int_rate],
            tda_int_cal_freq_dr_day:[this.results.tda_int_cal_freq_dr_day],
            tda_int_cal_freq_dr_date:[this.results.tda_int_cal_freq_dr_date],
            tda_int_cal_freq_dr_holiday:[this.results.tda_int_cal_freq_dr_holiday],
            tda_int_table_code:[this.results.tda_int_table_code],
  
            // end of interest details
            tda_deposit_amt_min:[this.results.tda_deposit_amt_min],
            tda_deposit_amt_max:[this.results.tda_deposit_amt_max],
            tda_deposit_amt_steps:[this.results.tda_deposit_amt_steps],
            tda_period_mm_min:[this.results.tda_period_mm_min],
            tda_period_dd_min:[this.results.tda_period_dd_min],
            tda_period_mm_max:[this.results.tda_period_mm_max],
            tda_period_dd_max:[this.results.tda_period_dd_max],
            tda_period_steps_mm:[this.results.tda_period_steps_mm],
            tda_period_steps_dd:[this.results.tda_period_steps_dd],
            tda_deposit_type:[this.results.tda_deposit_type],
            tda_sundry_deposit_ph:[this.results.tda_sundry_deposit_ph],
            tda_repayment_report_code:[this.results.tda_repayment_report_code],
            tda_duration_to_mrk_ac_inactive:[this.results.tda_duration_to_mrk_ac_inactive],
            tda_duration_frm_inactive_to_dormant:[this.results.tda_duration_frm_inactive_to_dormant],
            tda_pre_closure_rate:[this.results.tda_pre_closure_rate],
            tda_pre_closure_penalty_rate:[this.results.tda_pre_closure_penalty_rate],
            // tda_sundry_deposit_ph:[this.results.],
            // tda_repayment_report_code:[this.results.],
            tda_frequency_for_int_calc_on_preclosure_month:[this.results.tda_frequency_for_int_calc_on_preclosure_month],
            tda_sweeps:[this.results.tda_sweeps],
            tda_part_closure:[this.results.tda_part_closure],
            tda_value_dated_closure:[this.results.tda_value_dated_closure],
            tda_repayment_ac_ph:[this.results.tda_repayment_ac_ph],
            tda_auto_renewal:[this.results.tda_auto_renewal],
            tda_max_no_of_renewal:[this.results.tda_max_no_of_renewal],
            tda_renewal_period_mm:[this.results.tda_renewal_period_mm],
            tda_renewal_period_dd:[this.results.tda_renewal_period_dd],
            tda_renewal_allowed_within_days:[this.results.tda_renewal_allowed_within_days],
            tda_renewal_period:[this.results.tda_renewal_period],
            tda_automatically_create_dep:[this.results.tda_automatically_create_dep],
            tda_link_to_operative_ac:[this.results.tda_link_to_operative_ac],
            tda_auto_cr_period_mm:[this.results.tda_auto_cr_period_mm],
            tda_auto_cr_period_dd:[this.results.tda_auto_cr_period_dd],
            int_cal_freq_dr_week:[this.results.int_cal_freq_dr_week],
            // int_cal_freq_dr_week:[this.results.],
            int_cal_freq_dr_day:[this.results.int_cal_freq_dr_day],
            int_cal_freq_dr_date:[this.results.int_cal_freq_dr_date],
            int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
            // int_cal_freq_dr_day:[this.results.],
            // int_cal_freq_dr_date:[this.results.],
            // int_cal_freq_dr_holiday:[this.results.],
            tda_fees: new FormArray([]),
            tda_glsubheads: new FormArray([])


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
        //load the page wit
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        // this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        let params = new HttpParams()
        .set("scheme_code", this.scheme_code);     
        this.subscription = this.tdaAPI.getproductBySchemeCode(params).subscribe(res=>{
          this.results = res;
          // Initialise the glsubheads
          this.glSubheadArray = this.results.tda_glsubheads;
          this.tda_fees = this.results.tda_fees;

          this.formData = this.fb.group({
            id:[this.results.id],
            scheme_code: [this.results.scheme_code],
            scheme_type: [this.results.scheme_type],
            scheme_code_desc: [this.results.scheme_code_desc],

            tda_effective_from_date:[this.results.tda_effective_from_date],
            tda_effective_to_date:[this.results.tda_effective_to_date],
            tda_system_generated_no:[this.results.tda_system_generated_no],
            tda_number_generation_code:[this.results.tda_number_generation_code],
            tda_principal_lossline_ac:[this.results.tda_principal_lossline_ac],
            tda_recovery_lossline_ac:[this.results.tda_recovery_lossline_ac],
            tda_charge_off_ac:[this.results.tda_charge_off_ac],
            tda_number_generation:[this.results.tda_number_generation],
      
            // interest details
            tda_pl_ac_ccy:[this.results.tda_pl_ac_ccy],
            tda_int_receivale_applicable:[this.results.tda_int_receivale_applicable],
            tda_normal_int_receivable_ac:[this.results.tda_normal_int_receivable_ac],
            tda_penal_int_receivable_ac:[this.results.tda_penal_int_receivable_ac],
            tda_normal_int_received_ac:[this.results.tda_normal_int_received_ac],
            tda_penal_int_received_ac:[this.results.tda_penal_int_received_ac],
            tda_advance_int_ac:[this.results.tda_advance_int_ac],
            tda_dr_int_compounding_freq:[this.results.tda_dr_int_compounding_freq],
            tda_int_cal_freq_dr_week:[this.results.tda_int_cal_freq_dr_week],
            tda_app_discounted_int_rate:[this.results.tda_app_discounted_int_rate],
            tda_int_cal_freq_dr_day:[this.results.tda_int_cal_freq_dr_day],
            tda_int_cal_freq_dr_date:[this.results.tda_int_cal_freq_dr_date],
            tda_int_cal_freq_dr_holiday:[this.results.tda_int_cal_freq_dr_holiday],
            tda_int_table_code:[this.results.tda_int_table_code],
  
            // end of interest details
            tda_deposit_amt_min:[this.results.tda_deposit_amt_min],
            tda_deposit_amt_max:[this.results.tda_deposit_amt_max],
            tda_deposit_amt_steps:[this.results.tda_deposit_amt_steps],
            tda_period_mm_min:[this.results.tda_period_mm_min],
            tda_period_dd_min:[this.results.tda_period_dd_min],
            tda_period_mm_max:[this.results.tda_period_mm_max],
            tda_period_dd_max:[this.results.tda_period_dd_max],
            tda_period_steps_mm:[this.results.tda_period_steps_mm],
            tda_period_steps_dd:[this.results.tda_period_steps_dd],
            tda_deposit_type:[this.results.tda_deposit_type],
            tda_sundry_deposit_ph:[this.results.tda_sundry_deposit_ph],
            tda_repayment_report_code:[this.results.tda_repayment_report_code],
            tda_duration_to_mrk_ac_inactive:[this.results.tda_duration_to_mrk_ac_inactive],
            tda_duration_frm_inactive_to_dormant:[this.results.tda_duration_frm_inactive_to_dormant],
            tda_pre_closure_rate:[this.results.tda_pre_closure_rate],
            tda_pre_closure_penalty_rate:[this.results.tda_pre_closure_penalty_rate],
            // tda_sundry_deposit_ph:[this.results.],
            // tda_repayment_report_code:[this.results.],
            tda_frequency_for_int_calc_on_preclosure_month:[this.results.tda_frequency_for_int_calc_on_preclosure_month],
            tda_sweeps:[this.results.tda_sweeps],
            tda_part_closure:[this.results.tda_part_closure],
            tda_value_dated_closure:[this.results.tda_value_dated_closure],
            tda_repayment_ac_ph:[this.results.tda_repayment_ac_ph],
            tda_auto_renewal:[this.results.tda_auto_renewal],
            tda_max_no_of_renewal:[this.results.tda_max_no_of_renewal],
            tda_renewal_period_mm:[this.results.tda_renewal_period_mm],
            tda_renewal_period_dd:[this.results.tda_renewal_period_dd],
            tda_renewal_allowed_within_days:[this.results.tda_renewal_allowed_within_days],
            tda_renewal_period:[this.results.tda_renewal_period],
            tda_automatically_create_dep:[this.results.tda_automatically_create_dep],
            tda_link_to_operative_ac:[this.results.tda_link_to_operative_ac],
            tda_auto_cr_period_mm:[this.results.tda_auto_cr_period_mm],
            tda_auto_cr_period_dd:[this.results.tda_auto_cr_period_dd],
            int_cal_freq_dr_week:[this.results.int_cal_freq_dr_week],
            // int_cal_freq_dr_week:[this.results.],
            int_cal_freq_dr_day:[this.results.int_cal_freq_dr_day],
            int_cal_freq_dr_date:[this.results.int_cal_freq_dr_date],
            int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
            // int_cal_freq_dr_day:[this.results.],
            // int_cal_freq_dr_date:[this.results.],
            // int_cal_freq_dr_holiday:[this.results.],
            tda_fees: new FormArray([]),
            tda_glsubheads: new FormArray([])
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        })

      }
      else if (this.function_type == "V-Verify") {
        
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        // this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        let params = new HttpParams()
        .set("scheme_code", this.scheme_code);     
        this.subscription = this.tdaAPI.getproductBySchemeCode(params).subscribe(res=>{

          this.results = res;

          // Initialise the glsubheads
          this.glSubheadArray = this.results.tda_glsubheads;
          this.tda_fees = this.results.tda_fees;


          this.formData = this.fb.group({
  
            id:[this.results.id],
            scheme_code: [this.results.scheme_code],
            scheme_type: [this.results.scheme_type],
            scheme_code_desc: [this.results.scheme_code_desc],

            tda_effective_from_date:[this.results.tda_effective_from_date],
            tda_effective_to_date:[this.results.tda_effective_to_date],
            tda_system_generated_no:[this.results.tda_system_generated_no],
            tda_number_generation_code:[this.results.tda_number_generation_code],
            tda_principal_lossline_ac:[this.results.tda_principal_lossline_ac],
            tda_recovery_lossline_ac:[this.results.tda_recovery_lossline_ac],
            tda_charge_off_ac:[this.results.tda_charge_off_ac],
            tda_number_generation:[this.results.tda_number_generation],
      
            // interest details
            tda_pl_ac_ccy:[this.results.tda_pl_ac_ccy],
            tda_int_receivale_applicable:[this.results.tda_int_receivale_applicable],
            tda_normal_int_receivable_ac:[this.results.tda_normal_int_receivable_ac],
            tda_penal_int_receivable_ac:[this.results.tda_penal_int_receivable_ac],
            tda_normal_int_received_ac:[this.results.tda_normal_int_received_ac],
            tda_penal_int_received_ac:[this.results.tda_penal_int_received_ac],
            tda_advance_int_ac:[this.results.tda_advance_int_ac],
            tda_dr_int_compounding_freq:[this.results.tda_dr_int_compounding_freq],
            tda_int_cal_freq_dr_week:[this.results.tda_int_cal_freq_dr_week],
            tda_app_discounted_int_rate:[this.results.tda_app_discounted_int_rate],
            tda_int_cal_freq_dr_day:[this.results.tda_int_cal_freq_dr_day],
            tda_int_cal_freq_dr_date:[this.results.tda_int_cal_freq_dr_date],
            tda_int_cal_freq_dr_holiday:[this.results.tda_int_cal_freq_dr_holiday],
            tda_int_table_code:[this.results.tda_int_table_code],
  
            // end of interest details
            tda_deposit_amt_min:[this.results.tda_deposit_amt_min],
            tda_deposit_amt_max:[this.results.tda_deposit_amt_max],
            tda_deposit_amt_steps:[this.results.tda_deposit_amt_steps],
            tda_period_mm_min:[this.results.tda_period_mm_min],
            tda_period_dd_min:[this.results.tda_period_dd_min],
            tda_period_mm_max:[this.results.tda_period_mm_max],
            tda_period_dd_max:[this.results.tda_period_dd_max],
            tda_period_steps_mm:[this.results.tda_period_steps_mm],
            tda_period_steps_dd:[this.results.tda_period_steps_dd],
            tda_deposit_type:[this.results.tda_deposit_type],
            tda_sundry_deposit_ph:[this.results.tda_sundry_deposit_ph],
            tda_repayment_report_code:[this.results.tda_repayment_report_code],
            tda_duration_to_mrk_ac_inactive:[this.results.tda_duration_to_mrk_ac_inactive],
            tda_duration_frm_inactive_to_dormant:[this.results.tda_duration_frm_inactive_to_dormant],
            tda_pre_closure_rate:[this.results.tda_pre_closure_rate],
            tda_pre_closure_penalty_rate:[this.results.tda_pre_closure_penalty_rate],
            // tda_sundry_deposit_ph:[this.results.],
            // tda_repayment_report_code:[this.results.],
            tda_frequency_for_int_calc_on_preclosure_month:[this.results.tda_frequency_for_int_calc_on_preclosure_month],
            tda_sweeps:[this.results.tda_sweeps],
            tda_part_closure:[this.results.tda_part_closure],
            tda_value_dated_closure:[this.results.tda_value_dated_closure],
            tda_repayment_ac_ph:[this.results.tda_repayment_ac_ph],
            tda_auto_renewal:[this.results.tda_auto_renewal],
            tda_max_no_of_renewal:[this.results.tda_max_no_of_renewal],
            tda_renewal_period_mm:[this.results.tda_renewal_period_mm],
            tda_renewal_period_dd:[this.results.tda_renewal_period_dd],
            tda_renewal_allowed_within_days:[this.results.tda_renewal_allowed_within_days],
            tda_renewal_period:[this.results.tda_renewal_period],
            tda_automatically_create_dep:[this.results.tda_automatically_create_dep],
            tda_link_to_operative_ac:[this.results.tda_link_to_operative_ac],
            tda_auto_cr_period_mm:[this.results.tda_auto_cr_period_mm],
            tda_auto_cr_period_dd:[this.results.tda_auto_cr_period_dd],
            int_cal_freq_dr_week:[this.results.int_cal_freq_dr_week],
            // int_cal_freq_dr_week:[this.results.],
            int_cal_freq_dr_day:[this.results.int_cal_freq_dr_day],
            int_cal_freq_dr_date:[this.results.int_cal_freq_dr_date],
            int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
            is_verified:[true],
            // int_cal_freq_dr_day:[this.results.],
            // int_cal_freq_dr_date:[this.results.],
            // int_cal_freq_dr_holiday:[this.results.],
            tda_fees: new FormArray([]),
            tda_glsubheads: new FormArray([])
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
          });
        })

      }
      else if (this.function_type == "X-Delete") {
        console.log("Got Called!");
        
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        // this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        let params = new HttpParams()
        .set("scheme_code", this.scheme_code);     
        this.subscription = this.tdaAPI.getproductBySchemeCode(params).subscribe(res=>{

          this.results = res;

          // Initialise the glsubheads
          this.glSubheadArray = this.results.tda_glsubheads;
          this.tda_fees = this.results.tda_fees;


          this.formData = this.fb.group({

            id:[this.results.id],
            scheme_code: [this.results.scheme_code],
            scheme_type: [this.results.scheme_type],
            scheme_code_desc: [this.results.scheme_code_desc],

            tda_effective_from_date:[this.results.tda_effective_from_date],
            tda_effective_to_date:[this.results.tda_effective_to_date],
            tda_system_generated_no:[this.results.tda_system_generated_no],
            tda_number_generation_code:[this.results.tda_number_generation_code],
            tda_principal_lossline_ac:[this.results.tda_principal_lossline_ac],
            tda_recovery_lossline_ac:[this.results.tda_recovery_lossline_ac],
            tda_charge_off_ac:[this.results.tda_charge_off_ac],
            tda_number_generation:[this.results.tda_number_generation],
      
            // interest details
            tda_pl_ac_ccy:[this.results.tda_pl_ac_ccy],
            tda_int_receivale_applicable:[this.results.tda_int_receivale_applicable],
            tda_normal_int_receivable_ac:[this.results.tda_normal_int_receivable_ac],
            tda_penal_int_receivable_ac:[this.results.tda_penal_int_receivable_ac],
            tda_normal_int_received_ac:[this.results.tda_normal_int_received_ac],
            tda_penal_int_received_ac:[this.results.tda_penal_int_received_ac],
            tda_advance_int_ac:[this.results.tda_advance_int_ac],
            tda_dr_int_compounding_freq:[this.results.tda_dr_int_compounding_freq],
            tda_int_cal_freq_dr_week:[this.results.tda_int_cal_freq_dr_week],
            tda_app_discounted_int_rate:[this.results.tda_app_discounted_int_rate],
            tda_int_cal_freq_dr_day:[this.results.tda_int_cal_freq_dr_day],
            tda_int_cal_freq_dr_date:[this.results.tda_int_cal_freq_dr_date],
            tda_int_cal_freq_dr_holiday:[this.results.tda_int_cal_freq_dr_holiday],
            tda_int_table_code:[this.results.tda_int_table_code],
  
            // end of interest details
            tda_deposit_amt_min:[this.results.tda_deposit_amt_min],
            tda_deposit_amt_max:[this.results.tda_deposit_amt_max],
            tda_deposit_amt_steps:[this.results.tda_deposit_amt_steps],
            tda_period_mm_min:[this.results.tda_period_mm_min],
            tda_period_dd_min:[this.results.tda_period_dd_min],
            tda_period_mm_max:[this.results.tda_period_mm_max],
            tda_period_dd_max:[this.results.tda_period_dd_max],
            tda_period_steps_mm:[this.results.tda_period_steps_mm],
            tda_period_steps_dd:[this.results.tda_period_steps_dd],
            tda_deposit_type:[this.results.tda_deposit_type],
            tda_sundry_deposit_ph:[this.results.tda_sundry_deposit_ph],
            tda_repayment_report_code:[this.results.tda_repayment_report_code],
            tda_duration_to_mrk_ac_inactive:[this.results.tda_duration_to_mrk_ac_inactive],
            tda_duration_frm_inactive_to_dormant:[this.results.tda_duration_frm_inactive_to_dormant],
            tda_pre_closure_rate:[this.results.tda_pre_closure_rate],
            tda_pre_closure_penalty_rate:[this.results.tda_pre_closure_penalty_rate],
            // tda_sundry_deposit_ph:[this.results.],
            // tda_repayment_report_code:[this.results.],
            tda_frequency_for_int_calc_on_preclosure_month:[this.results.tda_frequency_for_int_calc_on_preclosure_month],
            tda_sweeps:[this.results.tda_sweeps],
            tda_part_closure:[this.results.tda_part_closure],
            tda_value_dated_closure:[this.results.tda_value_dated_closure],
            tda_repayment_ac_ph:[this.results.tda_repayment_ac_ph],
            tda_auto_renewal:[this.results.tda_auto_renewal],
            tda_max_no_of_renewal:[this.results.tda_max_no_of_renewal],
            tda_renewal_period_mm:[this.results.tda_renewal_period_mm],
            tda_renewal_period_dd:[this.results.tda_renewal_period_dd],
            tda_renewal_allowed_within_days:[this.results.tda_renewal_allowed_within_days],
            tda_renewal_period:[this.results.tda_renewal_period],
            tda_automatically_create_dep:[this.results.tda_automatically_create_dep],
            tda_link_to_operative_ac:[this.results.tda_link_to_operative_ac],
            tda_auto_cr_period_mm:[this.results.tda_auto_cr_period_mm],
            tda_auto_cr_period_dd:[this.results.tda_auto_cr_period_dd],
            int_cal_freq_dr_week:[this.results.int_cal_freq_dr_week],
            // int_cal_freq_dr_week:[this.results.],
            int_cal_freq_dr_day:[this.results.int_cal_freq_dr_day],
            int_cal_freq_dr_date:[this.results.int_cal_freq_dr_date],
            int_cal_freq_dr_holiday:[this.results.int_cal_freq_dr_holiday],
            is_verified:[this.results.is_verified],
            is_deleted:[true],
            // int_cal_freq_dr_day:[this.results.],
            // int_cal_freq_dr_date:[this.results.],
            // int_cal_freq_dr_holiday:[this.results.],
            tda_fees: new FormArray([]),
            tda_glsubheads: new FormArray([])
          });
        }, err => {
          this.error = err;
          this._snackBar.open(this.error, "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar'],
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
      this.chrg_coll_crncy = result.data;
      this.formData.controls.chrg_coll_crncy.setValue(result.data);
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  onSubmit() {                 
    this.formData.controls.tda_effective_from_date.setValue(this.datepipe.transform(this.f.tda_effective_from_date.value, 'yyyy-MM-ddTHH:mm:ss'));
    this.formData.controls.tda_effective_to_date.setValue(this.datepipe.transform(this.f.tda_effective_to_date.value, 'yyyy-MM-ddTHH:mm:ss'));

    this.submitted = true;

    console.log("this is the form Data", this.formData.value);
    
    // stop here if form is invalid
    if (this.formData.valid) {
      if (this.function_type == "A-Add") {
        this.subscription = this.tdaAPI.createTermDeposit(this.formData.value).subscribe(res => {
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
        this.subscription = this.tdaAPI.updateproduct(this.formData.value).subscribe(res => {
          console.log("delete form data", this.formData.value);
          
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