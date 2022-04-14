import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { LoanAccountLookupComponent } from '../../loan-account/loan-account-lookup/loan-account-lookup.component';
import { EventIdLookupComponent } from '../../SystemConfigurations/ChargesParams/event-id/event-id-lookup/event-id-lookup.component';
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
  currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  auth_user = this.currentUser.username;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  isSubmitted = false;
  isDeleted = false
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
  dtype: string;
  sba_penal_int_receivable_ac: any;
  sba_normal_int_received_ac: any;
  sba_penal_int_received_ac: any;
  sba_advance_int_ac: any;
  sba_normal_int_receivable_ac: any;
  sba_principal_lossline_ac: any;
  sba_principal_lossline_ac_desc: any;
  sba_recovery_lossline_ac: any;
  sba_recovery_lossline_ac_desc: any;
  sba_charge_off_ac: any;
  sba_charge_off_ac_desc: any;
  sba_penal_int_receivable_ac_desc: any;
  sba_normal_int_received_ac_desc: any;
  sba_penal_int_received_ac_desc: any;
  sba_fee_amortize_credit_ph: any;
  sba_fee_amortize_credit_ph_desc: any;
  sba_fee_amortize_debit_ph_desc: any;
  sba_fee_amortize_debit_ph: any;
  sba_fee_dr_placeholder_desc: any;
  sba_fee_dr_placeholder: any;
  sba_fee_cr_placeholder: any;
  sba_fee_cr_placeholder_desc: any;
  sba_advance_int_ac_desc: any;
  sba_normal_int_receivable_ac_desc: any;
  event_id_desc: any;
  glSubheadData: any;
  element: any;
  loanElement: any;
  exception_lookupData: any;
  exception_code_value: any;
  exception_description: any;

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
      this.feeFormData.controls.sba_fee_event.setValue(this.event_id);
      this.feeFormData.controls.sba_fee_type.setValue(this.event_type_code);
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



principal_lossline_acLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_principal_lossline_ac = result.data.acid;
    this.sba_principal_lossline_ac_desc = result.data.accountName;
    this.formData.controls.sba_principal_lossline_ac.setValue(result.data.acid);
  });
}


recovery_lossline_acLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_recovery_lossline_ac = result.data.acid;
    this.sba_recovery_lossline_ac_desc = result.data.accountName;
    this.formData.controls.sba_recovery_lossline_ac.setValue(result.data.acid);
  });
}

charge_off_acLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_charge_off_ac = result.data.acid;
    this.sba_charge_off_ac_desc = result.data.accountName;
    this.formData.controls.sba_charge_off_ac.setValue(result.data.acid);
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
    this.sba_penal_int_receivable_ac = result.data.acid;
    this.sba_penal_int_receivable_ac_desc = result.data.accountName;
    this.formData.controls.sba_penal_int_receivable_ac.setValue(result.data.acid);
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
    this.sba_normal_int_receivable_ac = result.data.acid;
    this.sba_normal_int_receivable_ac_desc = result.data.accountName;
    this.formData.controls.sba_normal_int_receivable_ac.setValue(result.data.acid);
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
    this.sba_normal_int_received_ac= result.data.acid;
    this.sba_normal_int_received_ac_desc = result.data.accountName;
    this.formData.controls.sba_normal_int_received_ac.setValue(result.data.acid);
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
    this.sba_penal_int_received_ac = result.data.acid;
    this.sba_penal_int_received_ac_desc = result.data.accountName;
    this.formData.controls.sba_penal_int_received_ac.setValue(result.data.acid);
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
    this.sba_advance_int_ac = result.data.acid;
    this.sba_advance_int_ac_desc = result.data.accountName;
    this.formData.controls.sba_advance_int_ac.setValue(result.data.acid);
  });
}

amortizeCreditPHLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_fee_amortize_credit_ph = result.data.acid;
    this.sba_fee_amortize_credit_ph_desc = result.data.accountName;
    this.formData.controls.sba_fee_amortize_credit_ph.setValue(result.data.acid);
  });
}

sba_fee_amortize_debit_phLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_fee_amortize_debit_ph = result.data.acid;
    this.sba_fee_amortize_debit_ph_desc = result.data.accountName;
    this.formData.controls.sba_fee_amortize_debit_ph.setValue(result.data.acid);
  });
}

sba_fee_dr_placeholderLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_fee_dr_placeholder = result.data.acid;
    this.sba_fee_dr_placeholder_desc = result.data.accountName;
    this.formData.controls.sba_fee_dr_placeholder.setValue(result.data.acid);
  });
}

sba_fee_cr_placeholderLookup(): void {
  this.dtype="oa"
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    this.sba_fee_cr_placeholder = result.data.acid;
    this.sba_fee_cr_placeholder_desc = result.data.accountName;
    this.formData.controls.sba_fee_cr_placeholder.setValue(result.data.acid);
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
  
exceptionLookup(): void {
  const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.exception_lookupData = result.data;
    console.log(this.exception_lookupData);
    
    this.exception_code_value = this.exception_lookupData.exception_code
    this.exception_description = this.exception_lookupData.exce_description
    
    this.exceptionsFormData.controls.laa_exception_code.setValue(this.exception_code_value)
    this.exceptionsFormData.controls.laa_exception_description.setValue(this.exception_description)
  });
}

     feeArray = new Array();
     glSubheadArray = new Array();
     exceptionArray = new Array();

     
      formData = this.fb.group({
        sba_function_type: [''],
        sba_scheme_code: [''],
        sba_scheme_type:[''],
        sba_scheme_code_desc:[''],

        sba_effective_from_date:[''],
        sba_effective_to_date:[''],
        sba_principal_lossline_ac:[''],
        sba_recovery_lossline_ac:[''],
        sba_charge_off_ac:[''],
        sba_number_generation:[''],
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
        sba_fee_withrawal:[''],
        sba_inactive_ac_abnormal_tran_limit:[''],
        sba_dormant_ac_abnormal_trans_limit:[''],
        sba_duration_to_mark_ac_as_inactive:[''],
        sba_duration_from_inactive_to_dormant:[''],
        sba_int_calc_based_local_calender:[''],
        sba_int_method:[''],
        sba_bal_frm_date:[''],
        sba_bal_to_date:[''],
        sba_recover_fee_for_chq_issue:[''],
        sba_fees: new FormArray([]),
        sba_glsubheads: new FormArray([]),
        sba_exceptions: new FormArray([]),
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
         exceptionsFormData = this.fb.group({
          sba_exception_code:[''],
          sba_exception_description:['']
          })

         initLoanFeeForm(){
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

         initGlSubheadForm(){
           this.newData = true;
          this.glsubheadFormData = this.fb.group({
            sba_gl_subhead:[''],
            sba_gl_subhead_description:[''],
            sba_gl_subhead_deafault:[''],
            sba_is_gl_subhead_deleted:['']
          })
         }
         initExceptionForm(){
          this.newData = true;
          this.exceptionsFormData = this.fb.group({
            sba_exception_code:[''],
            sba_exception_description:['']
          })
        }
    get g() { return this.formData.controls; }
    get t() { return this.g.sba_fees as FormArray; }
    get l() {return this.g.sba_glsubheads as FormArray;}
    get e(){ return this.g.sba_exceptions as FormArray;}
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
              this.initGlSubheadForm();
           }
         }
          
      editGlSubhead(i: any) {
        this.element = i
        this.newData = false;
        this.arrayIndex = this.glSubheadArray[i];
        this.glSubheadData = this.fb.group({
          sba_gl_subhead: [this.glSubheadArray[i].sba_gl_subhead],
          sba_gl_subhead_description: [
            this.glSubheadArray[i].sba_gl_subhead_description,
          ],
          sba_gl_subhead_deafault: [this.glSubheadArray[i].sba_gl_subhead_deafault],
          sba_is_gl_subhead_deleted: [
            this.glSubheadArray[i].sba_is_gl_subhead_deleted,
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
                  sba_fee_type: [this.feeArray[i].sba_fee_type],
                  sba_fee_event: [this.feeArray[i].sba_fee_event],
                  sba_fee_frequency: [this.feeArray[i].sba_fee_frequency],
                  sba_fee_deductable: [this.feeArray[i].sba_fee_deductable],
                  sba_fee_multiple: [this.feeArray[i].sba_fee_multiple],
                  sba_fee_amortize: [this.feeArray[i].sba_fee_amortize],
                  sba_fee_amortize_credit_ph:[this.feeArray[i].sba_fee_amortize_credit_ph],
                  sba_fee_amortize_debit_ph:[this.feeArray[i].sba_fee_amortize_debit_ph],
                  sba_fee_demand_flow: [this.feeArray[i].sba_fee_demand_flow],
                  sba_fee_dr_placeholder: [this.feeArray[i].sba_fee_dr_placeholder],
                  sba_fee_cr_placeholder: [this.feeArray[i].sba_fee_cr_placeholder],
                  sba_fee_max_no_of_assesment: [this.feeArray[i].sba_fee_max_no_of_assessment],
                });
              }
              previewExceptions(){
                if(this.exceptionsFormData.valid){
                  this.e.push(this.fb.group(this.exceptionsFormData.value));
                  this.exceptionArray.push(this.exceptionsFormData.value);
                  this.initExceptionForm();
                }
              }
              editException(i:any){
                this.element = i
                this.newData = false;
                this.arrayIndex = this.exceptionArray[i];
                this.exceptionsFormData = this.fb.group({
                  sba_exception_code:[this.exceptionArray[i].sba_exception_code],
                  sba_exception_description:[this.exceptionArray[i].sba_exception_description]
                })
              }
      
              updateException(i:any){
                this.exceptionArray[i] = this.exceptionsFormData.value
              }
              onRemoveExceptions(i:any){
                const index: number = this.exceptionArray.indexOf(this.exceptionArray.values);
                this.exceptionArray.splice(index, i);
                this.exceptionArray = this.exceptionArray;
              }
              onClearExceptions(){
                this.initExceptionForm();
                this.exceptionArray = new Array();
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
           this.isSubmitted = true;
        
          this.formData = this.fb.group({

            sba_function_type: [this.function_type],
            sba_scheme_code: [this.scheme_code],
            sba_scheme_type:[this.scheme_type],
            sba_scheme_code_desc:[this.scheme_code_desc],
                
            sba_effective_from_date:[''],
            sba_effective_to_date:[''],
            sba_principal_lossline_ac:[''],
            sba_recovery_lossline_ac:[''],
            sba_charge_off_ac:[''],
            sba_number_generation:[''],
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
            sba_fee_withrawal:[''],
            sba_inactive_ac_abnormal_tran_limit:[''],
            sba_dormant_ac_abnormal_trans_limit:[''],
            sba_duration_to_mark_ac_as_inactive:[''],
            sba_duration_from_inactive_to_dormant:[''],
            sba_int_calc_based_local_calender:[''],
            sba_int_method:[''],
            sba_bal_frm_date:[''],
            sba_bal_to_date:[''],
          
          
            sba_recover_fee_for_chq_issue:[''],
        
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
            sba_glsubheads: new FormArray([]),
            // Create Audits
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
        }
        else if(this.function_type == "I-Inquire"){
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
        this.isEnabled = false
        let params = new HttpParams() .set("scheme_code", this.scheme_code);     
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
              sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
              sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
              sba_charge_off_ac:[this.results.sba_charge_off_ac],
              sba_number_generation:[this.results.sba_number_generation],
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
              sba_fee_withrawal:[this.results.sba_fee_withrawal],
              sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
              sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
              sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
              sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
              sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
              sba_int_method:[this.results.sba_int_method],
              sba_bal_frm_date:[this.results.sba_bal_frm_date],
              sba_bal_to_date:[this.results.sba_bal_to_date],
              

              
              sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
              
              
              
              
              // Exceptithis.results.              // Exceptithis.results.s s 
              sba_exc_ac_in_debit_bal:[this.results.sba_exc_ac_in_debit_bal],
              sba_exc_ac_in_cr_bal:[this.results.sba_exc_ac_in_cr_bal],
              sba_exc_liability_exceeds_group_limit:[this.results.sba_exc_liability_exceeds_group_limit],
              sba_exc_ac_if_frozed:[this.results.sba_exc_ac_if_frozed],
              sba_exc_sanction_limit_expired:[this.results.sba_exc_sanction_limit_expired],
              sba_exc_int_cal_not_upto_date:[this.results.sba_exc_int_cal_not_upto_date],
              sba_exc_insufficient_available_bal:[this.results.sba_exc_insufficient_available_bal],
              sba_exc_backdated_transaction:[this.results.sba_exc_backdated_transaction],
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
            })
          })
        }
        else if(this.function_type == "M-Modify"){
          this.isSubmitted = true;
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
                sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
                sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
                sba_charge_off_ac:[this.results.sba_charge_off_ac],
                sba_number_generation:[this.results.sba_number_generation],
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
                sba_fee_withrawal:[this.results.sba_fee_withrawal],
                sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
                sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
                sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
                sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
                sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
                sba_int_method:[this.results.sba_int_method],
                sba_bal_frm_date:[this.results.sba_bal_frm_date],
                sba_bal_to_date:[this.results.sba_bal_to_date],
                
  
            
                sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
                
                
                
                
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
                sba_glsubheads:[ this.results.sba_glsubheads],
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
          this.isEnabled = false
          this.isSubmitted = true;
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
                sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
                sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
                sba_charge_off_ac:[this.results.sba_charge_off_ac],
                sba_number_generation:[this.results.sba_number_generation],
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
                sba_fee_withrawal:[this.results.sba_fee_withrawal],
                sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
                sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
                sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
                sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
                sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
                sba_int_method:[this.results.sba_int_method],
                sba_bal_frm_date:[this.results.sba_bal_frm_date],
                sba_bal_to_date:[this.results.sba_bal_to_date],
                
                
  
                
                sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
                
                
                
                
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
                sba_glsubheads:[ this.results.sba_glsubheads],
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
          this.isDeleted = true;
          this.isEnabled = false;
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
                sba_principal_lossline_ac:[this.results.sba_principal_lossline_ac],
                sba_recovery_lossline_ac:[this.results.sba_recovery_lossline_ac],
                sba_charge_off_ac:[this.results.sba_charge_off_ac],
                sba_number_generation:[this.results.sba_number_generation],
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
                sba_fee_withrawal:[this.results.sba_fee_withrawal],
                sba_inactive_ac_abnormal_tran_limit:[this.results.sba_inactive_ac_abnormal_tran_limit],
                sba_dormant_ac_abnormal_trans_limit:[this.results.sba_dormant_ac_abnormal_trans_limit],
                sba_duration_to_mark_ac_as_inactive:[this.results.sba_duration_to_mark_ac_as_inactive],
                sba_duration_from_inactive_to_dormant:[this.results.sba_duration_from_inactive_to_dormant],
                sba_int_calc_based_local_calender:[this.results.sba_int_calc_based_local_calender],
                sba_int_method:[this.results.sba_int_method],
                sba_bal_frm_date:[this.results.sba_bal_frm_date],
                sba_bal_to_date:[this.results.sba_bal_to_date],
                
                
                
  
                
                sba_recover_fee_for_chq_issue:[this.results.sba_recover_fee_for_chq_issue],
                
                
                
                
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
                sba_glsubheads:[ this.results.sba_glsubheads],

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
                
        this.formData.controls.sba_effective_from_date.setValue(this.datepipe.transform(this.f.sba_effective_from_date.value, 'yyyy-MM-ddTHH:mm:ss'));
        this.formData.controls.sba_effective_to_date.setValue(this.datepipe.transform(this.f.sba_effective_to_date.value, 'yyyy-MM-ddTHH:mm:ss'));
  

        
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
                this.router.navigateByUrl('system/configurations/product/saving-scheme/maintenance');

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
                  this.router.navigateByUrl('system/configurations/product/saving-scheme/maintenance');

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