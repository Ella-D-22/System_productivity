import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { LoanAccountLookupComponent } from '../../loan-account/loan-account-lookup/loan-account-lookup.component';
import { EventIdLookupComponent } from '../../SystemConfigurations/ChargesParams/event-id/event-id-lookup/event-id-lookup.component';
import { EventTypeLookupComponent } from '../../SystemConfigurations/ChargesParams/event-type/event-type-lookup/event-type-lookup.component';
import { CurrencyLookupComponent } from '../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { ExceptionsCodesLookupComponent } from '../../SystemConfigurations/GlobalParams/exceptions-codes/exceptions-codes-lookup/exceptions-codes-lookup.component';
import { GlSubheadLookupComponent } from '../../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { CurrentSchemeService } from './current-scheme.service';

@Component({
  selector: 'app-current-scheme',
  templateUrl: './current-scheme.component.html',
  styleUrls: ['./current-scheme.component.scss'],
})
export class CurrentSchemeComponent implements OnInit {
  currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  auth_user = this.currentUser.username;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  deleting = false;
  flagArray: any = ['Y', 'N'];
  amt_derivation_Array: any = [
    { code: 'CHRG', description: 'Free Code' },
    { code: 'FIXED', description: 'Fixed Amt' },
    { code: 'MRT', description: 'Formula Based' },
    { code: 'PCNT', description: 'Percentage' },
    { code: 'SCRPT', description: 'Script Based' },
    { code: 'USTM', description: 'Unit Charge Code' },
  ];
  chargePreferetialsArrays: any = [
    'Custmer Level',
    'Account Level',
    'Charge Level',
    'Contract Level',
  ];

  productTypeArray: any = [
    'P-Personal Loan',
    'M-Mortage/Housing Loan',
    'R-Property/Loan',
    'S-Student/Educational Loan',
    'A-Auto Loan',
    'C-Consumer Loan',
    'O-Other Loan',
  ];
  eiFormulaFlgArray: any = [
    'P-PMT Formula',
    'M-EMI Formula',
    'F-Flat Rate',
    'R-Rule of 78',
  ];
  weeksArray: any = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  debitIntCompFreqArray: any = ['Daily', 'Monthly'];
  int_comp_freq_array: any = [
    'D- Daily',
    'W – Weekly',
    'F – Fortnightly',
    'M – Monthly',
    'Q- Quarterly',
    'H – Half yearly',
    'Y- Yearly',
    'T-Twice a month',
  ];
  ei_payment_freq_array: any = [
    'D- Daily',
    'W – Weekly',
    'F – Fortnightly',
    'M – Monthly',
    'Q- Quarterly',
    'H – Half yearly',
    'Y- Yearly',
  ];

  daysArray: any = [
    'Moday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  datesArray: any = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
  Int_Cr_ac_Flag_Array: any = [
    'S - Original A/c',
    'O - Operative A/c',
    'P - Operative A/c or Parking A/c',
    'E - Operative A/c or Original A/c',
  ];
  Int_Dr_ac_Flag_Array: any = [
    'S - Original A/c itself',
    'O - Operative A/c',
    'T - Payment System',
  ];

  loanRepaymentMethodsArray: any = [
    'B – Bill to employer',
    'D – Electronic Clearing',
    'E – Recover up to Effective Amount',
    'H – Recover through ACH',
    'M – Multisource repayment',
    'N – No batch recovery',
    'P – Post Dated cheques',
    'S – Recover from Salary',
    'T – Recover by Granting TOD',
  ];

  months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString('en-US', { month: 'long' });
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
  dtype: any;
  caa_normal_int_receivable_ac: any;
  caa_penal_int_receivable_ac: any;
  caa_normal_int_received_ac: any;
  caa_penal_int_received_ac: any;
  caa_advance_int_ac: any;
  caa_principal_lossline_ac: any;
  caa_principal_lossline_ac_desc: any;
  caa_recovery_lossline_ac: any;
  caa_recovery_lossline_ac_desc: any;
  caa_charge_off_ac: any;
  caa_charge_off_ac_desc: any;
  caa_normal_int_receivable_ac_desc: any;
  caa_penal_int_receivable_ac_desc: any;
  caa_normal_int_received_ac_desc: any;
  caa_penal_int_received_ac_desc: any;
  caa_advance_int_ac_desc: any;
  caa_fee_amortize_credit_ph: any;
  caa_fee_amortize_credit_ph_desc: any;
  caa_fee_amortize_debit_ph: any;
  caa_fee_amortize_debit_ph_desc: any;
  caa_fee_dr_placeholder: any;
  caa_fee_dr_placeholder_desc: any;
  caa_fee_cr_placeholder: any;
  caa_fee_cr_placeholder_desc: any;
  ac_debit_balance_value: any;
  ac_credit_balance_value: any;
  liability_exceed_group_value: any;
  ac_is_froozed_value: any;
  sanction_limit_expired_value: any;
  interest_calc_value: any;
  insufficient_exception_value: any;
  backdate_transaction_value: any;
  ac_debit_balance_description: any;
  ac_credit_balance_description: any;
  liability_exceed_group_description: any;
  ac_is_froozed_description: any;
  sanction_limit_expired_description: any;
  interest_calc_description: any;
  insufficient_exception_description: any;
  backdate_transaction_description: any;
  event_id_desc: any;
  element: any;
  loanElement: any;

  eventidLookup(): void {
    const dialogRef = this.dialog.open(EventIdLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data.event_id;
      this.event_id_desc = result.data.event_id_desc
      this.event_type = result.data.event_type
      this.event_type_desc = result.data.event_type_desc 
      this.feeFormData.controls.caa_fee_event.setValue(this.event_id);
      this.feeFormData.controls.caa_fee_type.setValue(this.event_type_code);
    });
  }
  eventTypeLookup(): void {
    const dialogRef = this.dialog.open(EventTypeLookupComponent, {
      height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.eventtypedata = result.data;
      this.event_type_code = result.data.code;
      this.event_type_desc = result.data.description;
      this.feeFormData.controls.caa_fee_type.setValue(this.event_type_code);
      // this.feeFormData.controls.caa_scheme_code_desc.setValue(this.event_type_desc);
    });
  }

  glSubheadLookup(): void {
    const dialogRef = this.dialog.open(GlSubheadLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.gl_subhead = result.data;
      this.gl_subhead_description = result.data.glSubheadDescription;
      this.gl_subhead_code = result.data.glSubheadCode;

      // this.eventtypedata = result.data;
      this.glSubheadData.controls.caa_gl_subhead.setValue(this.gl_subhead_code);
      this.glSubheadData.controls.caa_gl_subhead_description.setValue(
        this.gl_subhead_description
      );
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
  ) {}

  submitted = false;
  ngOnInit() {
    this.getPage();
  }

  feeArray = new Array();
  glSubheadArray = new Array();

  formData = this.fb.group({
    caa_scheme_code: [''],
    caa_scheme_type: [''],
    caa_scheme_code_desc: [''],

    caa_effective_from_date: [''],
    caa_effective_to_date: [''],
    caa_system_generated_no: [''],
    caa_principal_lossline_ac: [''],
    caa_recovery_lossline_ac: [''],
    caa_charge_off_ac: [''],
    caa_number_generation: [''],
    caa_system_gen_no: [''],
    caa_number_generation_code: [''],
    //interest details
    caa_pl_ac_ccy: [''],
    caa_int_receivale_applicable: [''],
    caa_normal_int_receivable_ac: [''],
    caa_penal_int_receivable_ac: [''],
    caa_normal_int_received_ac: [''],
    caa_penal_int_received_ac: [''],
    caa_advance_int_ac: [''],
    caa_dr_int_compounding_freq: [''],
    caa_int_cal_freq_dr_week: [''],
    caa_app_discounted_int_rate: [''],
    caa_int_cal_freq_dr_day: [''],
    caa_int_cal_freq_dr_date: [''],
    caa_int_cal_freq_dr_holiday: [''],

    // end of interest details
    caa_max_sanction_limit: [''],
    caa_norm_int_product_method: [''],
    caa_ac_statement_charged_by: [''],
    caa_ledger_follio_fee: [''],
    caa_dormant_ac_abnormal_trans_limit: [''],
    caa_duration_to_mark_ac_inactive: [''],
    caa_duration_from_inactive_to_dormant: [''],
    caa_dormant_fee: [''],
    caa_calc_freq_dr_week: [''],
    caa_allow_debit_against_unclear_bal: [''],

    caa_fees: new FormArray([]),
    caa_glsubheads: new FormArray([]),

     // Exceptions
     caa_ac_debit_balance:[''],
     caa_ac_credit_balance:[''],
     caa_liability_exceed_group:[''],
     caa_sanction_limit_expired:[''],
     caa_interest_calc:[''],
     caa_insufficient_exception:[''],
     caa_backdate_transaction:[''],

    // Audits
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    modifiedBy: [''],
    modifiedFlag: [''],
    modifiedTime: [''],
    verifiedBy: [''],
    verifiedFlag: [''],
    verifiedTime: [''],
    deletedBy: [''],
    deletedFlag: [''],
    deletedTime: [''],
  });

  feeFormData = this.fb.group({
    caa_fee_type: [''],
    caa_fee_event: [''],
    caa_fee_frequency: [''],
    caa_fee_amortize_credit_ph: [''],
    caa_fee_amortize_debit_ph: [''],
    caa_fee_deductable: [''],
    caa_fee_multiple: [''],
    caa_fee_amortize: [''],
    caa_fee_demand_flow: [''],
    caa_fee_dr_placeholder: [''],
    caa_fee_cr_placeholder: [''],
    caa_fee_amort_tenor: [''],
    caa_fee_max_no_of_assesment: [''],
  });

  glSubheadData = this.fb.group({
    caa_gl_subhead: [''],
    caa_gl_subhead_description: [''],
    caa_gl_subhead_deafault: [''],
    caa_is_gl_subhead_deleted: [''],
  });

  initLoanFeeForm() {
    this.newData = true;
    this.feeFormData = this.fb.group({
      caa_fee_type: [''],
      caa_fee_event: [''],
      caa_fee_frequency: [''],
      caa_fee_amortize_credit_ph: [''],
      caa_fee_amortize_debit_ph: [''],
      caa_fee_deductable: [''],
      caa_fee_multiple: [''],
      caa_fee_amortize: [''],
      caa_fee_demand_flow: [''],
      caa_fee_dr_placeholder: [''],
      caa_fee_cr_placeholder: [''],
      caa_fee_amort_tenor: [''],
      caa_fee_max_no_of_assesment: [''],
    });
  }

  initGlSubheadForm() {
    this.newData = true;
    this.glSubheadData = this.fb.group({
      caa_gl_subhead: [''],
      caa_gl_subhead_description: [''],
      caa_gl_subhead_deafault: [''],
      caa_is_gl_subhead_deleted: [''],
    });
  }



  // Account lookups
  penalIntRecAcLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_penal_int_receivable_ac = result.data.acid;
      this.formData.controls.caa_penal_int_receivable_ac.setValue(
        result.data.acid
      );
    });
  }
  normIntReceivedaccountLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_normal_int_received_ac = result.data.acid;
      this.formData.controls.caa_normal_int_received_ac.setValue(
        result.data.acid
      );
    });
  }
  penalIntReceivedaccountLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_penal_int_received_ac = result.data.acid;
      this.formData.controls.caa_penal_int_received_ac.setValue(
        result.data.acid
      );
    });
  }
  advanceIntAcLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_advance_int_ac = result.data.acid;
      this.formData.controls.caa_advance_int_ac.setValue(result.data.acid);
    });
  }
  caa_principal_lossline_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_principal_lossline_ac = result.data.acid;
      this.caa_principal_lossline_ac_desc = result.data.accountName;
      this.formData.controls.caa_principal_lossline_ac.setValue(
        result.data.acid
      );
    });
  }
  caa_recovery_lossline_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_recovery_lossline_ac = result.data.acid;
      this.caa_recovery_lossline_ac_desc = result.data.accountName;
      this.formData.controls.caa_recovery_lossline_ac.setValue(
        result.data.acid
      );
    });
  }
  caa_charge_off_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_charge_off_ac = result.data.acid;
      this.caa_charge_off_ac_desc = result.data.accountName;
      this.formData.controls.caa_charge_off_ac.setValue(result.data.acid);
    });
  }
  caa_normal_int_receivable_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_normal_int_receivable_ac = result.data.acid;
      this.caa_normal_int_receivable_ac_desc = result.data.accountName;
      this.formData.controls.caa_normal_int_receivable_ac.setValue(
        result.data.acid
      );
    });
  }
  caa_penal_int_receivable_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_penal_int_receivable_ac = result.data.acid;
      this.caa_penal_int_receivable_ac_desc = result.data.accountName;
      this.formData.controls.caa_penal_int_receivable_ac.setValue(
        result.data.acid
      );
    });
  }
  normIntReceivedAccountLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_normal_int_received_ac = result.data.acid;
      this.caa_normal_int_received_ac_desc = result.data.accountName;
      this.formData.controls.caa_normal_int_received_ac.setValue(
        result.data.acid
      );
    });
  }
  caa_penal_int_received_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_penal_int_received_ac = result.data.acid;
      this.caa_penal_int_received_ac_desc = result.data.accountName;
      this.formData.controls.caa_penal_int_received_ac.setValue(
        result.data.acid
      );
    });
  }

  caa_advance_int_acLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_advance_int_ac = result.data.acid;
      this.caa_advance_int_ac_desc = result.data.accountName;
      this.formData.controls.caa_advance_int_ac.setValue(result.data.acid);
    });
  }

  caa_fee_amortize_credit_phLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_fee_amortize_credit_ph = result.data.acid;
      this.caa_fee_amortize_credit_ph_desc = result.data.accountName;
      this.formData.controls.caa_fee_amortize_credit_ph.setValue(
        result.data.acid
      );
    });
  }
  caa_fee_amortize_debit_phLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_fee_amortize_debit_ph = result.data.acid;
      this.caa_fee_amortize_debit_ph_desc = result.data.accountName;
      this.formData.controls.caa_fee_amortize_debit_ph.setValue(
        result.data.acid
      );
    });
  }
  caa_fee_dr_placeholderLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_fee_dr_placeholder = result.data.acid;
      this.caa_fee_dr_placeholder_desc = result.data.accountName;
      this.formData.controls.caa_fee_dr_placeholder.setValue(result.data.acid);
    });
  }
  caa_fee_cr_placeholderLookup(): void {
    this.dtype = 'oa';
    const dconfig = new MatDialogConfig();
    dconfig.data = {
      type: this.dtype,
    };
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent, dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      this.caa_fee_cr_placeholder = result.data.acid;
      this.caa_fee_cr_placeholder_desc = result.data.accountName;
      this.formData.controls.caa_fee_cr_placeholder.setValue(result.data.acid);
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
      this.ac_debit_balance_description =  this.exception_lookupData.exce_description;
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
      this.ac_credit_balance_description =  this.exception_lookupData.exce_description;
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
      this.liability_exceed_group_description =  this.exception_lookupData.exce_description;
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
      this.ac_is_froozed_description =  this.exception_lookupData.exce_description;
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
      this.sanction_limit_expired_description =  this.exception_lookupData.exce_description;
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
      this.interest_calc_description =  this.exception_lookupData.exce_description;
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
      this.insufficient_exception_description =  this.exception_lookupData.exce_description;
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
      this.backdate_transaction_description =  this.exception_lookupData.exce_description;
      this.formData.controls.exception_code.setValue(this.exception_lookupData .id);
    });
  }

  editGlSubhead(i: any) {
    this.element = i
    this.newData = false;
    this.arrayIndex = this.glSubheadArray[i];
    this.glSubheadData = this.fb.group({
      caa_gl_subhead: [this.glSubheadArray[i].caa_gl_subhead],
      caa_gl_subhead_description: [
        this.glSubheadArray[i].caa_gl_subhead_description,
      ],
      caa_gl_subhead_deafault: [this.glSubheadArray[i].caa_gl_subhead_deafault],
      caa_is_gl_subhead_deleted: [
        this.glSubheadArray[i].caa_is_gl_subhead_deleted,
      ],
    });
  }
  onGlSubheadUpdate(){
    let i = this.element;
    this.glSubheadArray[i] = this.glSubheadData.value
 } 
 onGlSubheadClear(){
  this.initGlSubheadForm();
  this.glSubheadArray = new Array();
}

  get g() {
    return this.formData.controls;
  }
  get t() {
    return this.g.caa_fees as FormArray;
  }
  get l() {
    return this.g.caa_glsubheads as FormArray;
  }


  previewGlSubheads() {
    if (this.glSubheadData.valid) {
      if (this.glSubheadArray.length < 1) {
        this.glSubheadData.controls.caa_gl_subhead_deafault.setValue('Yes');
      } else {
        this.glSubheadData.controls.caa_gl_subhead_deafault.setValue('No');
      }
      this.l.push(this.fb.group(this.glSubheadData.value));
      this.glSubheadArray.push(this.glSubheadData.value);
      this.initGlSubheadForm();
    }
  }

  //Loan Fee Operations
  onPreviewFees(){        
    if (this.feeFormData.valid) {
      this.t.push(this.fb.group(
        this.feeFormData.value
      ));
      this.feeArray.push(this.feeFormData.value);
      this.initLoanFeeForm();
    }
  }
  onUpdateFees(){
    let i = this.loanElement;
    this.feeArray[i] = this.feeFormData.value
  }
  onClearFees(){
    this.initLoanFeeForm();
    this.feeArray = new Array();
  }
  onRemoveLoanFee(i: any) {
    const index: number = this.feeArray.indexOf(this.feeArray.values);
    this.feeArray.splice(index, i);
    this.feeArray = this.feeArray;
  }
  editLoanFeeForm(i: any) {
    this.loanElement = i;
    this.newData = false;
    this.arrayIndex = this.feeArray[i];
    this.feeFormData = this.fb.group({
      caa_fee_type: [this.feeArray[i].caa_fee_type],
      caa_fee_event: [this.feeArray[i].caa_fee_event],
      caa_fee_frequency: [this.feeArray[i].caa_fee_frequency],
      caa_fee_deductable: [this.feeArray[i].caa_fee_deductable],
      caa_fee_multiple: [this.feeArray[i].caa_fee_multiple],
      caa_fee_amortize: [this.feeArray[i].caa_fee_amortize],
      caa_fee_amortize_credit_ph:[this.feeArray[i].caa_fee_amortize_credit_ph],
      caa_fee_amortize_debit_ph:[this.feeArray[i].caa_fee_amortize_debit_ph],
      caa_fee_demand_flow: [this.feeArray[i].caa_fee_demand_flow],
      caa_fee_dr_placeholder: [this.feeArray[i].caa_fee_dr_placeholder],
      caa_fee_cr_placeholder: [this.feeArray[i].caa_fee_cr_placeholder],
      caa_fee_max_no_of_assesment: [this.feeArray[i].caa_fee_max_no_of_assessment],
    });
  }



  updateLoanFee(i: any) {
    this.feeArray[i] = this.feeFormData.value
    }
  onRemove(i: any) {
    const index: number = this.feeArray.indexOf(this.feeArray.values);
    this.feeArray.splice(index, i);
    this.feeArray = this.feeArray;
  }
  onYes(event: any) {
    this.showAmortizedPH = true;
  }
  onNo(event: any) {
    this.showAmortizedPH = false;
  }
  onRemoveGLSubhead(i: any) {
    const index: number = this.glSubheadArray.indexOf(
      this.glSubheadArray.values
    );
    this.glSubheadArray.splice(index, i);
    this.glSubheadArray = this.glSubheadArray;
  }
  onfixed_amt(event: any) {
    this.showFixed_amt = true;
    this.showPer_page = false;
  }
  onper_page(event: any) {
    this.showPer_page = true;
    this.showFixed_amt = false;
  }
  onSystem_generated_no(event: any) {
    this.showSystem_gen_no = true;
    this.showNumber_gen_code = false;
  }
  onNumber_generation_code(event: any) {
    this.showNumber_gen_code = true;
    this.showSystem_gen_no = false;
  }
  disabledFormControll() {
    //General Details
    this.formData.disable();
  }
  getPage() {
    this.subscription = this.currentSchemeAPI.currentMessage.subscribe(
      (message) => {
        this.message = message;
        this.function_type = this.message.function_type;
        this.scheme_code = this.message.scheme_code;
        this.scheme_type = this.message.scheme_type;

        if (this.function_type == 'A-Add') {
          this.scheme_code_desc = this.message.scheme_code_desc;
          // open empty forms
          this.formData = this.fb.group({
            caa_scheme_code: [this.scheme_code],
            caa_scheme_type: [this.scheme_type],
            caa_scheme_code_desc: [this.scheme_code_desc],
            //General Details
            caa_effective_from_date: [''],
            caa_effective_to_date: [''],
            caa_system_generated_no: [''],
            caa_principal_lossline_ac: [''],
            caa_recovery_lossline_ac: [''],
            caa_charge_off_ac: [''],
            caa_number_generation: [''],
            caa_system_gen_no: [''],
            caa_number_generation_code: [''],
            //interest details
            caa_pl_ac_ccy: [''],
            caa_int_receivale_applicable: [''],
            caa_normal_int_receivable_ac: [''],
            caa_penal_int_receivable_ac: [''],
            caa_normal_int_received_ac: [''],
            caa_penal_int_received_ac: [''],
            caa_advance_int_ac: [''],
            caa_dr_int_compounding_freq: [''],
            caa_int_cal_freq_dr_week: [''],
            caa_app_discounted_int_rate: [''],
            caa_int_cal_freq_dr_day: [''],
            caa_int_cal_freq_dr_date: [''],
            caa_int_cal_freq_dr_holiday: [''],
            // end of interest details
            caa_max_sanction_limit: [''],
            caa_norm_int_product_method: [''],
            caa_ac_statement_charged_by: [''],
            caa_ac_stmt_chrg_fixed_amt: [''],
            caa_ac_stmt_chrg_per_page: [''],
            caa_ledger_follio_fee: [''],
            caa_dormant_ac_abnormal_trans_limit: [''],
            caa_duration_to_mark_ac_inactive: [''],
            caa_duration_from_inactive_to_dormant: [''],
            caa_dormant_fee: [''],
            caa_calc_freq_dr_week: [''],
            caa_allow_debit_against_unclear_bal: [''],

            caa_fees: new FormArray([]),
            caa_glsubheads: new FormArray([]),

                 // Exceptions
            caa_ac_debit_balance:[''],
            caa_ac_credit_balance:[''],
            caa_liability_exceed_group:[''],
            caa_sanction_limit_expired:[''],
            caa_interest_calc:[''],
            caa_insufficient_exception:[''],
            caa_backdate_transaction:[''],

            // Audits
            postedBy: [this.auth_user],
            postedFlag: ['Y'],
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
        } else if (this.function_type == 'I-Inquire') {
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          let params = new HttpParams().set('scheme_code', this.scheme_code);
          this.subscription = this.currentSchemeAPI
            .getCurrentschemeByCurrentschemeCode(params)
            .subscribe(
              (res) => {
                this.results = res;
                this.feeArray = this.results.caa_fees;
                this.glSubheadArray = this.results.caa_glsubheads;
                this.formData = this.fb.group({
                  caa_scheme_code: [this.scheme_code],
                  caa_scheme_type: [this.scheme_type],
                  caa_scheme_code_desc: [this.scheme_code_desc],

                  id: [this.results.id],
                  //General Details
                  caa_effective_from_date: [
                    this.results.caa_effective_from_date,
                  ],
                  caa_effective_to_date: [this.results.caa_effective_to_date],
                  caa_system_generated_no: [
                    this.results.caa_system_generated_no,
                  ],
                  caa_principal_lossline_ac: [
                    this.results.caa_principal_lossline_ac,
                  ],
                  caa_recovery_lossline_ac: [
                    this.results.caa_recovery_lossline_ac,
                  ],
                  caa_charge_off_ac: [this.results.caa_charge_off_ac],
                  caa_number_generation: [this.results.caa_number_generation],
                  caa_system_gen_no: [this.results.caa_system_gen_no],
                  caa_number_generation_code: [
                    this.results.caa_number_generation_code,
                  ],
                  //interest details
                  caa_pl_ac_ccy: [this.results.caa_pl_ac_ccy],
                  caa_int_receivale_applicable: [
                    this.results.caa_int_receivale_applicable,
                  ],
                  caa_normal_int_receivable_ac: [
                    this.results.caa_normal_int_receivable_ac,
                  ],
                  caa_penal_int_receivable_ac: [
                    this.results.caa_penal_int_receivable_ac,
                  ],
                  caa_normal_int_received_ac: [
                    this.results.caa_normal_int_received_ac,
                  ],
                  caa_penal_int_received_ac: [
                    this.results.caa_penal_int_received_ac,
                  ],
                  caa_advance_int_ac: [this.results.caa_advance_int_ac],
                  caa_dr_int_compounding_freq: [
                    this.results.caa_dr_int_compounding_freq,
                  ],
                  caa_int_cal_freq_dr_week: [
                    this.results.caa_int_cal_freq_dr_week,
                  ],
                  caa_app_discounted_int_rate: [
                    this.results.caa_app_discounted_int_rate,
                  ],
                  caa_int_cal_freq_dr_day: [
                    this.results.caa_int_cal_freq_dr_day,
                  ],
                  caa_int_cal_freq_dr_date: [
                    this.results.caa_int_cal_freq_dr_date,
                  ],
                  caa_int_cal_freq_dr_holiday: [
                    this.results.caa_int_cal_freq_dr_holiday,
                  ],
                  // end of interest details
                  caa_max_sanction_limit: [this.results.caa_max_sanction_limit],
                  caa_norm_int_product_method: [
                    this.results.caa_norm_int_product_method,
                  ],
                  caa_ac_statement_charged_by: [
                    this.results.caa_ac_statement_charged_by,
                  ],
                  caa_ledger_follio_fee: [this.results.caa_ledger_follio_fee],
                  caa_dormant_ac_abnormal_trans_limit: [
                    this.results.caa_dormant_ac_abnormal_trans_limit,
                  ],
                  caa_duration_to_mark_ac_inactive: [
                    this.results.caa_duration_to_mark_ac_inactive,
                  ],
                  caa_duration_from_inactive_to_dormant: [
                    this.results.caa_duration_from_inactive_to_dormant,
                  ],
                  caa_dormant_fee: [this.results.caa_dormant_fee],
                  caa_calc_freq_dr_week: [this.results.caa_calc_freq_dr_week],
                  
                  caa_allow_debit_against_unclear_bal: [
                    this.results.caa_allow_debit_against_unclear_bal,
                  ],

                  // caa_fees: new FormArray([]),
                  // caa_glsubheads: new FormArray([])
                });
                // this.disabledFormControll();
              },
              (err) => {
                this.error = err;
                this._snackBar.open(this.error, 'Try again!', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
                // this.ngZone.run(() => this.router.navigateByUrl(''));
              }
            );
        } else if (this.function_type == 'M-Modify') {
          // Populate fields with data and allow modifications
          //load the page with form data submit disabled
          // find by event id
          this.isEnabled = true;
          this.showContractInput = true;
          let params = new HttpParams().set('scheme_code', this.scheme_code);
          // call to disable edit
          this.subscription = this.currentSchemeAPI
            .getCurrentschemeByCurrentschemeCode(params)
            .subscribe(
              (res) => {
                this.results = res;
                this.feeArray = this.results.caa_fees;
                this.glSubheadArray = this.results.caa_glsubheads;
                this.formData = this.fb.group({
                  id: [this.results.id],
                  caa_scheme_code: [this.results.caa_scheme_code],
                  caa_scheme_type: [this.results.caa_scheme_type],
                  caa_scheme_code_desc: [this.results.caa_scheme_code_desc],
                  //General Details
                  caa_effective_from_date: [
                    this.results.caa_effective_from_date,
                  ],
                  caa_effective_to_date: [this.results.caa_effective_to_date],
                  caa_system_generated_no: [
                    this.results.caa_system_generated_no,
                  ],
                  caa_principal_lossline_ac: [
                    this.results.caa_principal_lossline_ac,
                  ],
                  caa_recovery_lossline_ac: [
                    this.results.caa_recovery_lossline_ac,
                  ],
                  caa_charge_off_ac: [this.results.caa_charge_off_ac],
                  caa_number_generation: [this.results.caa_number_generation],
                  caa_system_gen_no: [this.results.caa_system_gen_no],
                  caa_number_generation_code: [
                    this.results.caa_number_generation_code,
                  ],
                  //interest details
                  caa_pl_ac_ccy: [this.results.caa_pl_ac_ccy],
                  caa_int_receivale_applicable: [
                    this.results.caa_int_receivale_applicable,
                  ],
                  caa_normal_int_receivable_ac: [
                    this.results.caa_normal_int_receivable_ac,
                  ],
                  caa_penal_int_receivable_ac: [
                    this.results.caa_penal_int_receivable_ac,
                  ],
                  caa_normal_int_received_ac: [
                    this.results.caa_normal_int_received_ac,
                  ],
                  caa_penal_int_received_ac: [
                    this.results.caa_penal_int_received_ac,
                  ],
                  caa_advance_int_ac: [this.results.caa_advance_int_ac],
                  caa_dr_int_compounding_freq: [
                    this.results.caa_dr_int_compounding_freq,
                  ],
                  caa_int_cal_freq_dr_week: [
                    this.results.caa_int_cal_freq_dr_week,
                  ],
                  caa_app_discounted_int_rate: [
                    this.results.caa_app_discounted_int_rate,
                  ],
                  caa_int_cal_freq_dr_day: [
                    this.results.caa_int_cal_freq_dr_day,
                  ],
                  caa_int_cal_freq_dr_date: [
                    this.results.caa_int_cal_freq_dr_date,
                  ],
                  caa_int_cal_freq_dr_holiday: [
                    this.results.caa_int_cal_freq_dr_holiday,
                  ],

                  // end of interest details

                  caa_max_sanction_limit: [this.results.caa_max_sanction_limit],
                  caa_norm_int_product_method: [
                    this.results.caa_norm_int_product_method,
                  ],
                  caa_ac_statement_charged_by: [
                    this.results.caa_ac_statement_charged_by,
                  ],
                  caa_ledger_follio_fee: [this.results.caa_ledger_follio_fee],
                  caa_dormant_ac_abnormal_trans_limit: [
                    this.results.caa_dormant_ac_abnormal_trans_limit,
                  ],
                  caa_duration_to_mark_ac_inactive: [
                    this.results.caa_duration_to_mark_ac_inactive,
                  ],
                  caa_duration_from_inactive_to_dormant: [
                    this.results.caa_duration_from_inactive_to_dormant,
                  ],
                  caa_dormant_fee: [this.results.caa_dormant_fee],
                  // caa_norm_int_product_method:[''],
                  caa_calc_freq_dr_week: [this.results.caa_calc_freq_dr_week],
                  // caa_calc_freq_dr_week:[''],
                  // caa_calc_freq_dr_week:[''],
                  caa_allow_debit_against_unclear_bal: [
                    this.results.caa_allow_debit_against_unclear_bal,
                  ],
         

                  caa_fees: [this.feeArray],
                  caa_glsubheads: [this.glSubheadArray],

                       // Exceptions
                  caa_ac_debit_balance:[this.results.caa_ac_debit_balance],
                  caa_ac_credit_balance:[this.results.caa_ac_credit_balance],
                  caa_liability_exceed_group:[this.results.caa_liability_exceed_group],
                  caa_sanction_limit_expired:[this.results.caa_sanction_limit_expired],
                  caa_interest_calc:[this.results.caa_interest_calc],
                  caa_insufficient_exception:[this.results.caa_insufficient_exception],
                  caa_backdate_transaction:[this.results.caa_backdate_transaction],
                  
                  // Audits
                  postedBy: [this.results.postedBy],
                  postedFlag: [this.results.postedFlag],
                  postedTime: [this.results.postedTime],
                  modifiedBy: [this.auth_user],
                  modifiedFlag: ['Y'],
                  modifiedTime: [this.results.modifiedTime],
                  verifiedBy: [this.results.verifiedBy],
                  verifiedFlag: [this.results.verifiedFlag],
                  verifiedTime: [this.results.verifiedTime],
                  deletedBy: [this.results.deletedBy],
                  deletedFlag: [this.results.deletedFlag],
                  deletedTime: [this.results.deletedTime],
                });
              },
              (err) => {
                this.error = err;
                // this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
                this._snackBar.open(this.error, 'Try again!', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
              }
            );
        } else if (this.function_type == 'V-Verify') {
          // Populate data with rotected fileds only verification is enabled
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = true;
          let params = new HttpParams().set('scheme_code', this.scheme_code);
          this.subscription = this.currentSchemeAPI
            .getCurrentschemeByCurrentschemeCode(params)
            .subscribe(
              (res) => {
                this.results = res;

                this.feeArray = this.results.caa_fees;
                this.glSubheadArray = this.results.caa_glsubheads;

                this.formData = this.fb.group({
                  id: [this.results.id],
                  caa_scheme_code: [this.results.caa_scheme_code],
                  caa_scheme_type: [this.results.caa_scheme_type],
                  caa_scheme_code_desc: [this.results.caa_scheme_code_desc],

                  caa_effective_from_date: [
                    this.results.caa_effective_from_date,
                  ],
                  caa_effective_to_date: [this.results.caa_effective_to_date],
                  caa_system_generated_no: [
                    this.results.caa_system_generated_no,
                  ],
                  caa_principal_lossline_ac: [
                    this.results.caa_principal_lossline_ac,
                  ],
                  caa_recovery_lossline_ac: [
                    this.results.caa_recovery_lossline_ac,
                  ],
                  caa_charge_off_ac: [this.results.caa_charge_off_ac],
                  caa_number_generation: [this.results.caa_number_generation],
                  caa_system_gen_no: [this.results.caa_system_gen_no],
                  caa_number_generation_code: [
                    this.results.caa_number_generation_code,
                  ],
                  //interest details
                  caa_pl_ac_ccy: [this.results.caa_pl_ac_ccy],
                  caa_int_receivale_applicable: [
                    this.results.caa_int_receivale_applicable,
                  ],
                  caa_normal_int_receivable_ac: [
                    this.results.caa_normal_int_receivable_ac,
                  ],
                  caa_penal_int_receivable_ac: [
                    this.results.caa_penal_int_receivable_ac,
                  ],
                  caa_normal_int_received_ac: [
                    this.results.caa_normal_int_received_ac,
                  ],
                  caa_penal_int_received_ac: [
                    this.results.caa_penal_int_received_ac,
                  ],
                  caa_advance_int_ac: [this.results.caa_advance_int_ac],
                  caa_dr_int_compounding_freq: [
                    this.results.caa_dr_int_compounding_freq,
                  ],
                  caa_int_cal_freq_dr_week: [
                    this.results.caa_int_cal_freq_dr_week,
                  ],
                  caa_app_discounted_int_rate: [
                    this.results.caa_app_discounted_int_rate,
                  ],
                  caa_int_cal_freq_dr_day: [
                    this.results.caa_int_cal_freq_dr_day,
                  ],
                  caa_int_cal_freq_dr_date: [
                    this.results.caa_int_cal_freq_dr_date,
                  ],
                  caa_int_cal_freq_dr_holiday: [
                    this.results.caa_int_cal_freq_dr_holiday,
                  ],

                  // end of interest details

                  caa_max_sanction_limit: [this.results.caa_max_sanction_limit],
                  caa_norm_int_product_method: [
                    this.results.caa_norm_int_product_method,
                  ],
                  caa_ac_statement_charged_by: [
                    this.results.caa_ac_statement_charged_by,
                  ],
                  caa_ledger_follio_fee: [this.results.caa_ledger_follio_fee],
                  caa_dormant_ac_abnormal_trans_limit: [
                    this.results.caa_dormant_ac_abnormal_trans_limit,
                  ],
                  caa_duration_to_mark_ac_inactive: [
                    this.results.caa_duration_to_mark_ac_inactive,
                  ],
                  caa_duration_from_inactive_to_dormant: [
                    this.results.caa_duration_from_inactive_to_dormant,
                  ],
                  caa_dormant_fee: [this.results.caa_dormant_fee],
                  // caa_norm_int_product_method:[''],
                  caa_calc_freq_dr_week: [this.results.caa_calc_freq_dr_week],
                  // caa_calc_freq_dr_week:[''],
                  // caa_calc_freq_dr_week:[''],
                  caa_allow_debit_against_unclear_bal: [
                    this.results.caa_allow_debit_against_unclear_bal,
                  ],
                  is_verified: [true],
                  is_deleted: [this.results.is_deleted],

                  caa_fees: new FormArray([]),
                  caa_glsubheads: new FormArray([]),

                  // Exceptions
                  caa_ac_debit_balance:[this.results.caa_ac_debit_balance],
                  caa_ac_credit_balance:[this.results.caa_ac_credit_balance],
                  caa_liability_exceed_group:[this.results.caa_liability_exceed_group],
                  caa_sanction_limit_expired:[this.results.caa_sanction_limit_expired],
                  caa_interest_calc:[this.results.caa_interest_calc],
                  caa_insufficient_exception:[this.results.caa_insufficient_exception],
                  caa_backdate_transaction:[this.results.caa_backdate_transaction],

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
                // this.disabledFormControll();
              },
              (err) => {
                this.error = err;
                this._snackBar.open(this.error, 'Try again!', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
                // this.ngZone.run(() => this.router.navigateByUrl(''));
              }
            );
        } else if (this.function_type == 'X-Delete') {
          // should open a page with data and show remove button
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.deleting = true;
          let params = new HttpParams().set('scheme_code', this.scheme_code);
          this.subscription = this.currentSchemeAPI
            .getCurrentschemeByCurrentschemeCode(params)
            .subscribe(
              (res) => {
                this.results = res;
                this.feeArray = this.results.caa_fees;
                this.glSubheadArray = this.results.caa_glsubheads;

                this.formData = this.fb.group({
                  id: [this.results.id],
                  caa_scheme_code: [this.results.caa_scheme_code],
                  caa_scheme_type: [this.results.caa_scheme_type],
                  caa_scheme_code_desc: [this.results.caa_scheme_code_desc],
                  //General Details
                  caa_effective_from_date: [
                    this.results.caa_effective_from_date,
                  ],
                  caa_effective_to_date: [this.results.caa_effective_to_date],
                  caa_system_generated_no: [
                    this.results.caa_system_generated_no,
                  ],
                  caa_principal_lossline_ac: [
                    this.results.caa_principal_lossline_ac,
                  ],
                  caa_recovery_lossline_ac: [
                    this.results.caa_recovery_lossline_ac,
                  ],
                  caa_charge_off_ac: [this.results.caa_charge_off_ac],
                  caa_number_generation: [this.results.caa_number_generation],
                  caa_system_gen_no: [this.results.caa_system_gen_no],
                  caa_number_generation_code: [
                    this.results.caa_number_generation_code,
                  ],
                  //interest details
                  caa_pl_ac_ccy: [this.results.caa_pl_ac_ccy],
                  caa_int_receivale_applicable: [
                    this.results.caa_int_receivale_applicable,
                  ],
                  caa_normal_int_receivable_ac: [
                    this.results.caa_normal_int_receivable_ac,
                  ],
                  caa_penal_int_receivable_ac: [
                    this.results.caa_penal_int_receivable_ac,
                  ],
                  caa_normal_int_received_ac: [
                    this.results.caa_normal_int_received_ac,
                  ],
                  caa_penal_int_received_ac: [
                    this.results.caa_penal_int_received_ac,
                  ],
                  caa_advance_int_ac: [this.results.caa_advance_int_ac],
                  caa_dr_int_compounding_freq: [
                    this.results.caa_dr_int_compounding_freq,
                  ],
                  caa_int_cal_freq_dr_week: [
                    this.results.caa_int_cal_freq_dr_week,
                  ],
                  caa_app_discounted_int_rate: [
                    this.results.caa_app_discounted_int_rate,
                  ],
                  caa_int_cal_freq_dr_day: [
                    this.results.caa_int_cal_freq_dr_day,
                  ],
                  caa_int_cal_freq_dr_date: [
                    this.results.caa_int_cal_freq_dr_date,
                  ],
                  caa_int_cal_freq_dr_holiday: [
                    this.results.caa_int_cal_freq_dr_holiday,
                  ],

                  // end of interest details

                  caa_max_sanction_limit: [this.results.caa_max_sanction_limit],
                  caa_norm_int_product_method: [
                    this.results.caa_norm_int_product_method,
                  ],
                  caa_ac_statement_charged_by: [
                    this.results.caa_ac_statement_charged_by,
                  ],
                  caa_ledger_follio_fee: [this.results.caa_ledger_follio_fee],
                  caa_dormant_ac_abnormal_trans_limit: [
                    this.results.caa_dormant_ac_abnormal_trans_limit,
                  ],
                  caa_duration_to_mark_ac_inactive: [
                    this.results.caa_duration_to_mark_ac_inactive,
                  ],
                  caa_duration_from_inactive_to_dormant: [
                    this.results.caa_duration_from_inactive_to_dormant,
                  ],
                  caa_dormant_fee: [this.results.caa_dormant_fee],
                  caa_calc_freq_dr_week: [this.results.caa_calc_freq_dr_week],
                  caa_allow_debit_against_unclear_bal: [
                    this.results.caa_allow_debit_against_unclear_bal,
                  ],
                  is_verified: [this.results.is_verified],
                  is_deleted: [true],

                  caa_fees: new FormArray([]),
                  caa_glsubheads: new FormArray([]),

                  // Exceptions
                  caa_ac_debit_balance:[this.results.caa_ac_debit_balance],
                  caa_ac_credit_balance:[this.results.caa_ac_credit_balance],
                  caa_liability_exceed_group:[this.results.caa_liability_exceed_group],
                  caa_sanction_limit_expired:[this.results.caa_sanction_limit_expired],
                  caa_interest_calc:[this.results.caa_interest_calc],
                  caa_insufficient_exception:[this.results.caa_insufficient_exception],
                  caa_backdate_transaction:[this.results.caa_backdate_transaction],


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
                // this.disabledFormControll();
              },
              (err) => {
                this.error = err;
                this._snackBar.open(this.error, 'Try again!', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar', 'login-snackbar'],
                });
                // this.ngZone.run(() => this.router.navigateByUrl(''));
              }
            );
        }
      }
    );
  }
  chrgCalcCrncyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.chrg_calc_crncy = result.data;
      this.formData.controls.chrg_calc_crncy.setValue(result.data);
    });
  }
  chrgCollCrncyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.chrg_coll_crncy = result.data;
      this.formData.controls.chrg_coll_crncy.setValue(result.data);
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.formData.controls;
  }

  onSubmit() {
    this.formData.controls.caa_effective_from_date.setValue(
      this.datepipe.transform(
        this.f.caa_effective_from_date.value,
        'yyyy-MM-ddTHH:mm:ss'
      )
    );
    this.formData.controls.caa_effective_to_date.setValue(
      this.datepipe.transform(
        this.f.caa_effective_to_date.value,
        'yyyy-MM-ddTHH:mm:ss'
      )
    );
    this.submitted = true;
    // stop here if form is invalid
    if (this.formData.valid) {
      if (this.function_type == 'A-Add') {
        this.subscription = this.currentSchemeAPI
          .createCurrentscheme(this.formData.value)
          .subscribe(
            (res) => {
              this.results = res;
              this._snackBar.open('Executed Successfully!', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
            },
            (err) => {
              this.error = err;
              this._snackBar.open(this.error, 'Try again!', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
            }
          );
      } else if (this.function_type != 'A-Add') {
        this.eventId = this.actRoute.snapshot.paramMap.get('event_id');
        this.subscription = this.currentSchemeAPI
          .updateCurrentScheme(this.formData.value)
          .subscribe(
            (res) => {
              this.results = res;
              this._snackBar.open('Executed Successfully!', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
            },
            (err) => {
              this.error = err;
              this._snackBar.open(this.error, 'Try again!', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
            }
          );
      }
    } else {
      this._snackBar.open('Invalid Form Data', 'Try again!', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }
}
