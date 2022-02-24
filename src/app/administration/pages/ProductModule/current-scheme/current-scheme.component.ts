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
import { CurrentSchemeService } from './current-scheme.service';

@Component({
  selector: 'app-current-scheme',
  templateUrl: './current-scheme.component.html',
  styleUrls: ['./current-scheme.component.scss']
})
export class CurrentSchemeComponent implements OnInit {

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

  daysArray: any = [
    'Moday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]
  datesArray: any = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
    '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  ]


  Int_Cr_ac_Flag_Array: any =[ 'S - Original A/c','O - Operative A/c','P - Operative A/c or Parking A/c','E - Operative A/c or Original A/c']
  Int_Dr_ac_Flag_Array: any =[ 'S - Original A/c itself','O - Operative A/c','T - Payment System']

  loanRepaymentMethodsArray: any = [
    'B – Bill to employer',
    'D – Electronic Clearing',
    'E – Recover up to Effective Amount',
    'H – Recover through ACH',
    'M – Multisource repayment',
    'N – No batch recovery',
    'P – Post Dated cheques',
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
  showAmortizedPH = false;
  exception_lookupData: any;
  exception_code_value: any;
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
      this.feeFormData.controls.caa_fee_event.setValue(result.data);
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
      this.feeFormData.controls.caa_fee_type.setValue(this.event_type_code);
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
      this.gl_subhead_description = result.data.subhead_description;
      this.gl_subhead_code = result.data.subhead_code;


      // this.eventtypedata = result.data;
      this.glSubheadData.controls.caa_gl_subhead.setValue(this.gl_subhead_code);
      this.glSubheadData.controls.caa_gl_subhead_description.setValue(this.gl_subhead_description);
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
    private currentSchemeAPI: CurrentSchemeService,
    private datepipe: DatePipe

  ) { }

  submitted = false;
  ngOnInit() {
    this.getPage();
  }

  feeArray = new Array();
  glSubheadArray = new Array();

  formData = this.fb.group({
    caa_function_type: [''],
    caa_scheme_code: [''],
    caa_scheme_type: [''],
    caa_scheme_code_desc: [''],

    caa_effective_from_date:[''],
    caa_effective_to_date:[''],
    caa_system_generated_no:[''],
    caa_principal_lossline_ac:[''],
    caa_recovery_lossline_ac:[''],
    caa_charge_off_ac:[''],
    caa_number_generation:[''],
    caa_system_gen_no:[''],
    caa_number_generation_code:[''],
    //interest details
    caa_pl_ac_ccy:[''],
    caa_int_receivale_applicable:[''],
    caa_normal_int_receivable_ac:[''],
    caa_penal_int_receivable_ac:[''],
    caa_normal_int_received_ac:[''],
    caa_penal_int_received_ac:[''],
    caa_advance_int_ac:[''],
    caa_dr_int_compounding_freq:[''],
    caa_int_cal_freq_dr_week:[''],
    caa_app_discounted_int_rate:[''],
    caa_int_cal_freq_dr_day:[''],
    caa_int_cal_freq_dr_date:[''],
    caa_int_cal_freq_dr_holiday:[''],

    // end of interest details

    caa_max_sanction_limit:[''],
    caa_norm_int_product_method:[''],
    // caa_max_sanction_limit:[''],
    caa_dr_bal_limit:[''],
    caa_max_penal_int:[''],
    caa_ledger_follio_fee:[''],
    caa_inactive_ac_abnormal_trans_limit:[''],
    caa_dormant_ac_abnormal_trans_limit:[''],
    caa_duration_to_mark_ac_inactive:[''],
    caa_duration_from_inactive_to_dormant:[''],
    caa_dormant_fee:[''],
    caa_inactive_fee:[''],
    // caa_norm_int_product_method:[''],
    caa_calc_freq_dr_week:[''],
    // caa_calc_freq_dr_week:[''],
    // caa_calc_freq_dr_week:[''],
    caa_allow_sweeps:[''],
    caa_allow_debit_against_unclear_bal:[''],
    // caa_calc_freq_dr_week:[''],
    caa_calc_freq_dr_day:[''],
    caa_calc_freq_dr_date:[''],
    caa_calc_freq_dr_holiday:[''],
    // caa_calc_freq_dr_week:[''],
    // caa_calc_freq_dr_day:[''],
    // caa_calc_freq_dr_date:[''],
    // caa_calc_freq_dr_holiday:[''],
    
    caa_fees: new FormArray([]),
    caa_glsubheads: new FormArray([])
  });

  feeFormData = this.fb.group({
    caa_fee_type:[''],
    caa_fee_event:[''],
    caa_fee_frequency:[''],
    caa_fee_amortize_credit_ph:[''],
    caa_fee_amortize_debit_ph:[''],
    caa_fee_deductable:[''],
    caa_fee_multiple:[''],
    caa_fee_amortize:[''],
    caa_fee_demand_flow:[''],
    caa_fee_dr_placeholder:[''],
    caa_fee_cr_placeholder:[''],
    caa_fee_amort_tenor:[''],
    caa_fee_max_no_of_assesment:[''],
  });

  glSubheadData = this.fb.group({
    caa_gl_subhead: [''],
    caa_gl_subhead_description: [''],
    caa_gl_subhead_deafault: [''],
    caa_is_gl_subhead_deleted: ['']
  })

  initLoanForm() {
    this.newData = true;
    this.feeFormData = this.fb.group({
      caa_fee_type:[''],
      caa_fee_event:[''],
      caa_fee_frequency:[''],
      caa_fee_amortize_credit_ph:[''],
      caa_fee_amortize_debit_ph:[''],
      caa_fee_deductable:[''],
      caa_fee_multiple:[''],
      caa_fee_amortize:[''],
      caa_fee_demand_flow:[''],
      caa_fee_dr_placeholder:[''],
      caa_fee_cr_placeholder:[''],
      caa_fee_amort_tenor:[''],
      caa_fee_max_no_of_assesment:[''],
  
    });
  }

  initGlSUbheadForm() {
    this.newData = true;
    this.glSubheadData = this.fb.group({
      gl_subhead: [''],
      gl_subhead_description: [''],
      gl_subhead_deafault: [''],
      is_gl_subhead_deleted: ['']
    })
  }

  exception_codeLookup(): void {
    const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.exception_lookupData = result.data;
      this.exception_code_value =  this.exception_lookupData.exception_code;
      this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
    });
  }


  editLoanFeeForm(i: any) {
    this.newData = false;
    this.arrayIndex = this.feeArray[i];
    this.feeFormData = this.fb.group({
      fee_type: [this.feeArray[i].fee_type],
      fee_event: [this.feeArray[i].fee_event],
      method: [this.feeArray[i].method],
      deductable: [this.feeArray[i].deductable],
      multiple: [this.feeArray[i].multiple],
      amortize: [this.feeArray[i].amortize],
      demand_flow: [this.feeArray[i].demand_flow],
      dr_placeholder: [this.feeArray[i].dr_placeholder],
      cr_placeholder: [this.feeArray[i].cr_placeholder],
      apr: [this.feeArray[i].apr],
      eir: [this.feeArray[i].eir],
      amort_tenor: [this.feeArray[i].amort_tenor],
      max_no_of_assesment: [this.feeArray[i].max_no],
    });

    this.feeFormData = this.fb.group({
      caa_fee_type:[this.feeArray[i].caa_fee_type],
      caa_fee_event:[this.feeArray[i].caa_fee_event],

      caa_fee_frequency:[this.feeArray[i].caa_fee_frequency],
      caa_fee_amortize_credit_ph:[this.feeArray[i].caa_fee_amortize_credit_ph],
      caa_fee_amortize_debit_ph:[this.feeArray[i].caa_fee_amortize_debit_ph],

      caa_fee_deductable:[this.feeArray[i].caa_fee_deductable],
      caa_fee_multiple:[this.feeArray[i].caa_fee_multiple],
      caa_fee_amortize:[this.feeArray[i].caa_fee_amortize],
      caa_fee_demand_flow:[this.feeArray[i].caa_fee_demand_flow],
      caa_fee_dr_placeholder:[this.feeArray[i].caa_fee_dr_placeholder],
      caa_fee_cr_placeholder:[this.feeArray[i].caa_fee_cr_placeholder],
      caa_fee_amort_tenor:[this.feeArray[i].caa_fee_amort_tenor],
      caa_fee_max_no_of_assesment:[this.feeArray[i].caa_fee_max_no_of_assesment],

      
    });

    const index: number = this.feeArray.indexOf(this.feeArray.values);
    this.feeArray.splice(index, i);

  }

  get g() { return this.formData.controls; }
  get t() { return this.g.caa_fees as FormArray; }
  get l() { return this.g.caa_glsubheads as FormArray; }


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

  previewGlSubheads() {
    if (this.glSubheadData.valid) {
      this.l.push(this.fb.group(
        this.glSubheadData.value
      ));
      this.glSubheadArray.push(this.glSubheadData.value);
      console.log("Gl Subheads", this.glSubheadArray);
      this.initLoanForm();
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
    this.formData.controls.start_date.disable();
    this.formData.controls.end_date.disable();
    this.formData.controls.base_int_code.disable();
    this.formData.controls.base_int_pcnt_cr.disable();
    this.formData.controls.base_int_pcnt_dr.disable();
    this.formData.controls.version_desc.disable();
    this.formData.controls.version_desc_repo.disable();
    this.formData.controls.add_version_info.disable();

    this.formData.controls.cr_normal_int.disable();
    this.formData.controls.ac_ccy.disable();
    this.formData.controls.home_ccy.disable();
    this.formData.controls.int_receivale_app.disable();
    this.formData.controls.norm_int_rec_ac.disable();
    this.formData.controls.penal_int_rec_ac.disable();
    this.formData.controls.loan_rep_method.disable();
    this.formData.controls.hold_opertaive_ac.disable();
    this.formData.controls.upfront_inst_coll.disable();
    this.formData.controls.int_base.disable();
    this.formData.controls.int_product.disable();
    this.formData.controls.int_routed_thr.disable();
    this.formData.controls.cr_placeholder.disable();
    this.formData.controls.apr.disable();
    this.formData.controls.eir.disable();
    this.formData.controls.amort_tenor.disable();
    this.formData.controls.max_no_of_assesment.disable();

  }
  getPage() {
    this.subscription = this.currentSchemeAPI.currentMessage.subscribe(message => {
      this.message = message;
      this.function_type = this.message.function_type;
      this.scheme_code = this.message.scheme_code;
      this.scheme_type = this.message.scheme_type;
      this.scheme_code_desc = this.message.scheme_code_desc;

      if (this.function_type == "A-Add") {
        // open empty forms
        this.formData = this.fb.group({


          caa_function_type: [''],
          caa_scheme_code: [''],
          caa_scheme_type: [''],
          caa_scheme_code_desc: [''],
      
          caa_effective_from_date:[''],
          caa_effective_to_date:[''],
    caa_system_generated_no:[''],
    caa_principal_lossline_ac:[''],
    caa_recovery_lossline_ac:[''],
    caa_charge_off_ac:[''],
    caa_number_generation:[''],
    caa_system_gen_no:[''],
    caa_number_generation_code:[''],
    //interest details
    caa_pl_ac_ccy:[''],
    caa_int_receivale_applicable:[''],
    caa_normal_int_receivable_ac:[''],
    caa_penal_int_receivable_ac:[''],
    caa_normal_int_received_ac:[''],
    caa_penal_int_received_ac:[''],
    caa_advance_int_ac:[''],
    caa_dr_int_compounding_freq:[''],
    caa_int_cal_freq_dr_week:[''],
    caa_app_discounted_int_rate:[''],
    caa_int_cal_freq_dr_day:[''],
    caa_int_cal_freq_dr_date:[''],
    caa_int_cal_freq_dr_holiday:[''],

    // end of interest details

    caa_max_sanction_limit:[''],
    caa_norm_int_product_method:[''],
    // caa_max_sanction_limit:[''],
    caa_dr_bal_limit:[''],
    caa_max_penal_int:[''],
    caa_ledger_follio_fee:[''],
    caa_inactive_ac_abnormal_trans_limit:[''],
    caa_dormant_ac_abnormal_trans_limit:[''],
    caa_duration_to_mark_ac_inactive:[''],
    caa_duration_from_inactive_to_dormant:[''],
    caa_dormant_fee:[''],
    caa_inactive_fee:[''],
    // caa_norm_int_product_method:[''],
    caa_calc_freq_dr_week:[''],
    // caa_calc_freq_dr_week:[''],
    // caa_calc_freq_dr_week:[''],
    caa_allow_sweeps:[''],
    caa_allow_debit_against_unclear_bal:[''],
    // caa_calc_freq_dr_week:[''],
    caa_calc_freq_dr_day:[''],
    caa_calc_freq_dr_date:[''],
    caa_calc_freq_dr_holiday:[''],
    // caa_calc_freq_dr_week:[''],
    // caa_calc_freq_dr_day:[''],
    // caa_calc_freq_dr_date:[''],
    // caa_calc_freq_dr_holiday:[''],
          
          caa_fees: new FormArray([]),
          caa_glsubheads: new FormArray([])

        });
      }
      else if (this.function_type == "I-Inquire") {
        //load the page with form data submit disabled
        // find by event id
        this.showContractInput = true;
        // call to disable edit
        this.disabledFormControll();
        // hide Buttons
        this.isEnabled = false;
        this.subscription = this.currentSchemeAPI.getCurrentschemeByCurrentscheme(this.int_tbl_code).subscribe(res => {
          this.results = res;
          this.formData = this.fb.group({

            function_type: [this.function_type],
            scheme_code: [this.int_tbl_code],
            scheme_type: [this.scheme_type],
            scheme_code_desc: [this.scheme_code_desc],

            cr_normal_int: [this.results.cr_normal_int],
            ac_ccy: [this.results.ac_ccy],
            home_ccy: [this.results.home_ccy],
            int_receivale_app: [this.results.int_receivale_app],
            norm_int_rec_ac: [this.results.norm_int_rec_ac],
            penal_int_rec_ac: [this.results.penal_int_rec_ac],
            adv_int_ac: [this.results.adv_int_ac],
            dr_int_comp_freq: [this.results.dr_int_comp_freq],
            booking_tran_scrpt: [this.results.booking_tran_scrpt],
            app_dic_int_rate: [this.results.app_dic_int_rate],
            int_cal_freq_dr: [this.results.int_cal_freq_dr],
            int_cal_freq_dr_week: [this.results.int_cal_freq_dr_week],
            int_cal_freq_dr_day: [this.results.int_cal_freq_dr_day],
            int_cal_freq_dr_date: [this.results.int_cal_freq_dr_date],
            int_cal_freq_dr_holiday: [this.results.int_cal_freq_dr_holiday],
            loan_amt_min: [this.results.loan_amt_min],
            loan_amt_max: [this.results.loan_amt_max],
            period_mm_dd_min: [this.results.period_mm_dd_min],
            period_mm_dd_max: [this.results.period_mm_dd_max],
            max_all_age_limit: [this.results.max_all_age_limit],
            loan_rep_method: [this.results.loan_rep_method],
            hold_opertaive_ac: [this.results.hold_opertaive_ac],
            upfront_inst_coll: [this.results.upfront_inst_coll],
            int_base: [this.results.int_base],
            int_product: [this.results.int_product],
            int_routed_thr: [this.results.int_routed_thr],
            fee_routed_thr: [this.results.fee_routed_thr],
            loan_int_ac: [this.results.loan_int_ac],
            penal_int_reco: [this.results.penal_int_reco],
            equated_installment: [this.results.equated_installment],
            ei_in: [this.results.ei_in],
            ei_formula: [this.results.ei_formula],
            ei_round_off: [this.results.ei_round_off],
            int_comp_freq: [this.results.int_comp_freq],
            ei_payment_freq: [this.results.ei_payment_freq],
            int_rest_freq: [this.results.int_rest_freq],
            ei_rest_basis: [this.results.ei_rest_basis],
            shift_inst_for_holiday: [this.results.shift_inst_for_holiday],
            maturity_date: [this.results.maturity_date],
            holiday_period_in: [this.results.holiday_period_in],
            upfrnt_inst_coll: [this.results.upfrnt_inst_coll],
            int_prod: [this.results.int_prod],
            penal_int_rec: [this.results.penal_int_rec],
            max_all_age_lmt: [this.results.max_all_age_lmt],
            hold_operative_ac: [this.results.hold_operative_ac],
            int_routed_thrgh: [this.results.int_routed_thrgh],
            fee_routed_thrgh: [this.results.fee_routed_thrgh],
            penal_int_recognition: [this.results.penal_int_recognition],
            dpd: [this.results.dpd],
            class_main: [this.results.class_main],
            class_sub: [this.results.class_sub],
            int_accrue: [this.results.int_accrue],
            int_book: [this.results.int_book],
            int_aply: [this.results.int_aply],
            past_due: [this.results.past_due],
            manual: [this.results.manual],
            ac_int_suspense: [this.results.ac_int_suspense],
            ac_penal_int_suspense: [this.results.ac_penal_int_suspense],
            prov_dr: [this.results.prov_dr],
            prov_cr: [this.results.prov_cr],
            record_del: [this.results.record_del],
            fee_type: [this.results.fee_type],
            fee_event: [this.results.fee_event],
            method: [this.results.method],
            deductable: [this.results.deductable],
            multiple: [this.results.multiple],
            amortize: [this.results.amortize],
            demand_flow: [this.results.demand_flow],
            dr_placeholder: [this.results.dr_placeholder],
            cr_placeholder: [this.results.cr_placeholder],
            apr: [this.results.apr],
            eir: [this.results.eir],
            amort_tenor: [this.results.amort_tenor],
            max_no_of_assesment: [this.results.max_no_of_assesment],

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
        this.subscription = this.currentSchemeAPI.getCurrentschemeId(this.params).subscribe(res => {

          this.results = res;
          this.formData = this.fb.group({

            function_type: [this.function_type],
            scheme_code: [this.scheme_code],
            scheme_type: [this.scheme_type],
            scheme_code_desc: [this.scheme_code_desc],

            cr_normal_int: [this.results.cr_normal_int],
            ac_ccy: [this.results.ac_ccy],
            home_ccy: [this.results.home_ccy],
            int_receivale_app: [this.results.int_receivale_app],
            norm_int_rec_ac: [this.results.norm_int_rec_ac],
            penal_int_rec_ac: [this.results.penal_int_rec_ac],
            adv_int_ac: [this.results.adv_int_ac],
            dr_int_comp_freq: [this.results.dr_int_comp_freq],
            booking_tran_scrpt: [this.results.booking_tran_scrpt],
            app_dic_int_rate: [this.results.app_dic_int_rate],
            int_cal_freq_dr: [this.results.int_cal_freq_dr],
            int_cal_freq_dr_week: [this.results.int_cal_freq_dr_week],
            int_cal_freq_dr_day: [this.results.int_cal_freq_dr_day],
            int_cal_freq_dr_date: [this.results.int_cal_freq_dr_date],
            int_cal_freq_dr_holiday: [this.results.int_cal_freq_dr_holiday],
            loan_amt_min: [this.results.loan_amt_min],
            loan_amt_max: [this.results.loan_amt_max],
            period_mm_dd_min: [this.results.period_mm_dd_min],
            period_mm_dd_max: [this.results.period_mm_dd_max],
            max_all_age_limit: [this.results.max_all_age_limit],
            loan_rep_method: [this.results.loan_rep_method],
            hold_opertaive_ac: [this.results.hold_opertaive_ac],
            upfront_inst_coll: [this.results.upfront_inst_coll],
            int_base: [this.results.int_base],
            int_product: [this.results.int_product],
            int_routed_thr: [this.results.int_routed_thr],
            fee_routed_thr: [this.results.fee_routed_thr],
            loan_int_ac: [this.results.loan_int_ac],
            penal_int_reco: [this.results.penal_int_reco],
            equated_installment: [this.results.equated_installment],
            ei_in: [this.results.ei_in],
            ei_formula: [this.results.ei_formula],
            ei_round_off: [this.results.ei_round_off],
            int_comp_freq: [this.results.int_comp_freq],
            ei_payment_freq: [this.results.ei_payment_freq],
            int_rest_freq: [this.results.int_rest_freq],
            ei_rest_basis: [this.results.ei_rest_basis],
            shift_inst_for_holiday: [this.results.shift_inst_for_holiday],
            maturity_date: [this.results.maturity_date],
            holiday_period_in: [this.results.holiday_period_in],
            upfrnt_inst_coll: [this.results.upfrnt_inst_coll],
            int_prod: [this.results.int_prod],
            penal_int_rec: [this.results.penal_int_rec],
            max_all_age_lmt: [this.results.max_all_age_lmt],
            hold_operative_ac: [this.results.hold_operative_ac],
            int_routed_thrgh: [this.results.int_routed_thrgh],
            fee_routed_thrgh: [this.results.fee_routed_thrgh],
            penal_int_recognition: [this.results.penal_int_recognition],
            dpd: [this.results.dpd],
            class_main: [this.results.class_main],
            class_sub: [this.results.class_sub],
            int_accrue: [this.results.int_accrue],
            int_book: [this.results.int_book],
            int_aply: [this.results.int_aply],
            past_due: [this.results.past_due],
            manual: [this.results.manual],
            ac_int_suspense: [this.results.ac_int_suspense],
            ac_penal_int_suspense: [this.results.ac_penal_int_suspense],
            prov_dr: [this.results.prov_dr],
            prov_cr: [this.results.prov_cr],
            record_del: [this.results.record_del],
            fee_type: [this.results.fee_type],
            fee_event: [this.results.fee_event],
            method: [this.results.method],
            deductable: [this.results.deductable],
            multiple: [this.results.multiple],
            amortize: [this.results.amortize],
            demand_flow: [this.results.demand_flow],
            dr_placeholder: [this.results.dr_placeholder],
            cr_placeholder: [this.results.cr_placeholder],
            apr: [this.results.apr],
            eir: [this.results.eir],
            amort_tenor: [this.results.amort_tenor],
            max_no_of_assesment: [this.results.max_no_of_assesment],
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
      }
      else if (this.function_type == "C-Cancle") {
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
      this.chrg_coll_crncy = result.data;
      this.formData.controls.chrg_coll_crncy.setValue(result.data);
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  onSubmit() {

    this.selecteddateFrom =  this.f.caa_effective_from_date.value.toLocaleDateString(),
    this.fomartedFromDate  =this.datepipe.transform(this.selecteddateFrom, 'yyyy-MM-ddTHH:mm:ss');

    this.selecteddateTo =  this.f.caa_effective_to_date.value.toLocaleDateString(),
    this.fomartedToDate  =this.datepipe.transform(this.selecteddateTo, 'yyyy-MM-ddTHH:mm:ss');
    
    this.formData.controls.caa_effective_from_date.setValue(this.fomartedFromDate)
    this.formData.controls.caa_effective_to_date.setValue(this.fomartedToDate)

    console.log(this.formData.value);

    this.submitted = true;
    // stop here if form is invalid
    if (this.formData.valid) {
      if (this.function_type == "A-Add") {
        this.subscription = this.currentSchemeAPI.createCurrentscheme(this.formData.value).subscribe(res => {
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
      } else if (this.function_type == "M-Modify") {
        this.eventId = this.actRoute.snapshot.paramMap.get('event_id');
        this.subscription = this.currentSchemeAPI.updateCurrentscheme(this.eventId, this.formData.value).subscribe(res => {
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