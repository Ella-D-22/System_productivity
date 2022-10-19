import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../accounts-module/accounts.service';
import { RetailCustomerLookupComponent } from '../../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountService } from '../../../loan-account/loan-account.service';
import { BranchComponent } from '../../../loan-account/lookup/branch/branch.component';
import { SavingschemeLookupComponent } from '../../../ProductModule/savings-scheme/savingscheme-lookup/savingscheme-lookup.component';
import { CurrencyLookupComponent } from '../../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { MisSectorService } from '../../../SystemConfigurations/GlobalParams/mis-sector/mis-sector.service';

@Component({
  selector: 'app-open-savings-account',
  templateUrl: './open-savings-account.component.html',
  styleUrls: ['./open-savings-account.component.scss']
})
export class OpenSavingsAccountComponent implements OnInit {

  subscription: Subscription
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  sectorData: any;
  subSectorData: any;
  subSectors: any;
  currencyData: any;
  customer_lookup: any;
  customer_code: any;
  customer_name: any;
  element: any;
  message: any;
  function_type: any;
  account_code: any;
  customer_type: any;
  collateralData: any;
  signatureImage: any;
  isEnabled: boolean = false;
  newData: boolean = false;
  loading: boolean = false;
  lookupdata: any;
  glSubheads: any;
  glCode: any;
  filteredArr: any;
  error: any;
  results: any;
  sba_schemeCode: any;
  sba_gl_subhead_description: any;
  sba_scheme_code_desc: any;
  i: number;
  showGuadian: boolean = false;
  showNominees: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private misSectorAPI: MisSectorService,
    private accountAPI: AccountsService,
    private accountService: LoanAccountService
  ) { }

  ngOnInit(): void {
    this.getPage()
  }

  saving(): FormArray {
    return this.formData.get('saving') as FormArray;
  }
  newSavings(): FormGroup {
    return this.fb.group({
      sba_monthlyValue: [''],
      sba_maturedValue: [''],
      sba_savingPeriod: [''],
      sba_startDate: [''],
      sba_maturedDate: [''],
      nominees: this.fb.array([]),
      guadian: this.fb.array([])

    })
  }
  addNewSavings() {
    this.saving().push(this.newSavings());
  }
  removeSaving(savingIndex: number) {
    this.saving().removeAt(savingIndex);
    
  }


  newnominees(savingIndex: number): FormArray {
    return this.saving().at(savingIndex).get('nominees') as FormArray;
  }
  nomineeData(): FormGroup {
    return this.fb.group({
      dob: [''],
      emailAddress: [''],
      firstName: [''],
      id: [''],
      identificationNo: [''],
      lastName: [''],
      middleName: [''],
      nomineeMinor: [''],
      occupation: [''],
      phone: [''],
      relationship: [''],
    });
  }
  addnominee(savingIndex: number) {
    this.newnominees(savingIndex).push(this.nomineeData());
  }
  removeNominee(savingIndex: number, nomineeIndex:number ) {
    this.newnominees(savingIndex).removeAt(nomineeIndex);
  }
  
  savingsArray = new Array();
  nomineeArray = new Array();
  guardiansArray = new Array();
  formData = this.fb.group({
    // accountBalance: [''],
    accountManager: [''],
    accountName: [''],
    accountOwnership: [''],
    accountStatus: [''],
    accountType: [''],
    // acid: [''],
    cashExceptionLimitCr: [''],
    cashExceptionLimitDr: [''],
    currency: [''],
    customerCode: [''],
    lienAmount: 0,
    // loan: new FormArray([]),
    // officeAccount: new FormArray([]),
    openingDate: [''],
    referredBy: [''],
    saving: this.fb.array([]),
    //saving: new FormArray([]),
    solCode: [''],
    sectorCode: [''],
    subSectorCode: [''],
    schemeCode: [''],
    schemeType: ['1'],
    glCode: ['1'],
    glSubhead: [''],
    // termDeposit: new FormArray([]),
    transferExceptionLimitCr: [''],
    transferExceptionLimitDr: [''],
    accountStatement: [''],
    statementFreq: [''],
    dispatchMode: [''],
    withholdingTax: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    modifiedBy: [''],
    modifiedTime: [''],
    verifiedBy: [''],
    verifiedFlag: [''],
    verifiedTime: [''],
    deleteFlag: [''],
    deleteTime: [''],
    deletedBy: [''],
  })
  savingsFormData = this.fb.group({
    sba_monthlyValue: [''],
    sba_maturedValue: [''],
    sba_savingPeriod: [''],
    sba_startDate: [''],
    sba_maturedDate: [''],
    nominees: this.fb.array([]),
    guadian: this.fb.array([])
  })

  nomineesFormData = this.fb.group({
    dob: [''],
    emailAddress: [''],
    firstName: [''],
    id: [''],
    identificationNo: [''],
    lastName: [''],
    middleName: [''],
    nomineeMinor: [''],
    occupation: [''],
    phone: [''],
    relationship: [''],

    //guardian: new FormArray([])
  })
  guardianFormData = this.fb.group({
    address: [''],
    guardianCode: [''],
    guardianName: [''],
    id: [''],
    residence: ['']
  })
  despatch_mode_array: any = [
    'POST', 'COURIER', 'POST & MAIL', 'COLLECT IN PERSON', 'E-MAIL ONLY', 'NO DISPATCH', 'COURIER & MAIL'
  ];
  statementFreqArray: any = [
    'DAILY', 'WEEKLY', 'MONTLY', 'YEARLY'
  ];
  accountStatusArray: any = [
    'ACTIVE', 'DORMANT', 'NOT-ACTIVE'
  ];
  aaplicationStatusAr: any = [
    'PENDING', 'VERIFIED'
  ];
  relationshipArray: any = [
    'FATHER', 'MOTHER', 'WIFE', 'HUSBAND', 'SIBLING', 'DAUGHTER', 'SON'
  ];
  guardianArray: any = [
    'COURT APPOINTED', 'NATURAL GUARDIAN'
  ];
  nominations: any = [
    {
      id: 1,
      value: 'nomination',
      name: 'NOMINEES'
    },
    {
      id: 2,
      value: 'guardian',
      name: 'GUARDIAN'
    }
  ];
  //forms
  get dataForm() {
    return this.formData.controls;
  }
  get savings() {
    return this.dataForm.saving as FormArray;
  }
  get savingData() {
    return this.savingsFormData.controls;
  }
  get nominees() {
    return this.savingData.nominees as FormArray;
  }
  get nomineesData() {
    return this.nomineesFormData.controls;
  }
  get guardian() {
    return this.nomineesData.guardian as FormArray;
  }
  initNomineeData() {
    this.newData = true;
    this.nomineesFormData = this.fb.group({
      dob: [''],
      emailAddress: [''],
      firstName: [''],
      id: [''],
      identificationNo: [''],
      lastName: [''],
      middleName: [''],
      nomineeMinor: [''],
      occupation: [''],
      phone: [''],
      relationship: [''],
      guadian: this.fb.array([])
      // guardian: new FormArray([])
    });
  }
  //Nominees
  previewNominees() {
    if (this.nomineesFormData.valid) {
      this.nominees.push(this.fb.group(
        this.nomineesFormData.value
      ));
      this.nomineeArray.push(this.nomineesFormData.value);
      this.initNomineeData();
    }
  }
  onAddNomineesField() {
    this.nominees.push(this.fb.group({
      dob: [''],
      emailAddress: [''],
      firstName: [''],
      identificationNo: [''],
      lastName: [''],
      middleName: [''],
      occupation: [''],
      phone: ['']
    }));
  }
  onNomineeClear() {
    this.initNomineeData()
    this.nomineeArray = new Array();
  }
  onUpdateNominee() {
    let i = this.element
    this.nomineeArray[i] = this.nomineesFormData.value
  }
  onRemove(i: any) {
    const index: number = this.nomineeArray.indexOf(this.nomineeArray.values);
    this.nomineeArray.splice(index, i);
    this.nomineeArray = this.nomineeArray
  }
  get guadian() {
    return this.savingsFormData.controls['guadian'] as FormArray;
  }
  addGuardian() {
    const guardianFormData = this.fb.group({
      address: [''],
      guardianCode: [''],
      guardianName: [''],
      residence: ['']
    });
    this.guadian.push(guardianFormData);
    console.log("guadian data", guardianFormData);
  }

  removeGuardian(index: number) {
    this.guadian.removeAt(index);
  }

  //setting up the mis sector codes
  getMISData() {
    this.subscription = this.misSectorAPI.getAllMissectors().subscribe(
      res => {
        this.sectorData = res
      }
    )
  }
  onInputSelection(event: any) {
    let miscode = event.target.value
    console.log(miscode);

    this.subscription = this.misSectorAPI.getMissectorByCode(miscode).subscribe(
      res => {
        this.subSectorData = res
        this.subSectors = this.subSectorData.missubsectors
      }
    )
  }
  currencyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.currencyData = result.data;
      this.formData.controls.currency.setValue(this.currencyData.ccy)
    })
  }
  customerLookup(): void {
    const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customer_lookup = result.data;
      this.customer_code = this.customer_lookup.customerCode;
      this.customer_name = this.customer_lookup.firstName + " " + this.customer_lookup.middleName + " " + this.customer_lookup.surname
      this.formData.controls.accountManager.setValue(this.customer_lookup.firstName + " " + this.customer_lookup.middleName)
      this.formData.controls.customerCode.setValue(this.customer_lookup.customerCode)
    });
  }
  sbaSchemeCodeLookup(): void {
    const dialogRef = this.dialog.open(SavingschemeLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupdata = result.data;
      this.formData.controls.schemeCode.setValue(this.lookupdata.sba_scheme_code)
      this.sba_schemeCode = this.lookupdata.sba_scheme_code
      this.sba_scheme_code_desc = this.lookupdata.sba_scheme_code_desc
      this.glSubheads = this.lookupdata.sba_glsubheads
      this.filteredArr = this.glSubheads.filter(data => data.sba_gl_subhead_deafault == "Yes");
      this.formData.controls.glSubhead.setValue(this.filteredArr[0].sba_gl_subhead)
      this.sba_gl_subhead_description = this.filteredArr[0].sba_gl_subhead_description
    })
  }
  branchSubheadLookup(): void {
    const dialogRef = this.dialog.open(BranchComponent, {

    });
    dialogRef.afterClosed().subscribe(result => {
      this.formData.controls.solCode.setValue(result.data.solCode);
    });
  }
  glSubheadLookup() {

  }
  subSectorCodeLookup() {

  }
  sectorCodeLookup() {

  }
  collateralLookup(): void {
  }
  getPage() {
    this.loading = true;
    this.subscription = this.accountAPI.currentMessage.subscribe(
      message => {
        this.message = message
        this.function_type = this.message.function_type;
        this.account_code = this.message.account_code;
        this.customer_type = this.message.customer_type;
        this.loading = false;
        if (this.message.function_type == 'A-Add') {
          this.formData = this.fb.group({
            // accountBalance: [''],
            accountManager: [''],
            accountName: [''],
            accountOwnership: [''],
            accountStatus: [''],
            accountType: [''],
            // acid: [''],
            cashExceptionLimitCr: [''],
            cashExceptionLimitDr: [''],
            currency: [''],
            customerCode: [''],
            schemeCode: [''],
            schemeType: ['1'],
            glCode: ['1'],
            glSubhead: [''],
            lienAmount: 0,
            // loan: new FormArray([]),
            // officeAccount: new FormArray([]),
            openingDate: [''],
            referredBy: [''],
            saving: this.fb.array([]),
            //saving: new FormArray([]),
            // sn: [''],
            solCode: [''],
            sectorCode: [''],
            subSectorCode: [''],
            // termDeposit: new FormArray([]),
            transferExceptionLimitCr: [''],
            transferExceptionLimitDr: [''],
            accountStatement: [''],
            statementFreq: [''],
            dispatchMode: [''],
            withholdingTax: [''],
            postedBy: ['user'],
            postedFlag: ['Y'],
            postedTime: [new Date()],
            modifiedBy: ['None'],
            modifiedTime: [new Date()],
            verifiedBy: ['None'],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()],
            deleteFlag: ['N'],
            deleteTime: [new Date()],
            deletedBy: ['None'],
          })
        } else if (this.message.function_type == 'I-Inquire') {
          this.loading = true;
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data => {
              this.results = data.entity
              this.loading = false;

              // if (this.results.withholdingTax == true) {
              //   this.results.withholdingTax == "True"
              // } else {
              //   this.results.withholdingTax == "False"
              // }
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus: [this.results.accountStatus],
                accountType: [this.message.account_type],
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency: [this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                saving: this.fb.array([]),
                //saving: new FormArray([]),
                // sn: [this.results.sn],
                glCode: [this.results.glCode],
                solCode: [this.results.solCode],
                sectorCode: [this.results.sectorCode],
                subSectorCode: [this.results.subSectorCode],
                // termDeposit: new FormArray([]),
                transferExceptionLimitCr: [this.results.transferExceptionLimitCr],
                transferExceptionLimitDr: [this.results.transferExceptionLimitDr],
                accountStatement: [this.results.accountStatement],
                statementFreq: [this.results.statementFreq],
                dispatchMode: [this.results.dispatchMode],
                withholdingTax: [this.results.withholdingTax],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deleteFlag: [this.results.deleteFlag],
                deleteTime: [this.results.deleteTime],
                deletedBy: [this.results.deletedBy],
              })
            }
          )
        } else if (this.message.function_type == 'M-Modify') {
          this.loading = true;
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data => {
              this.results = data.entity
              this.loading = false;
              console.log("Account Details", this.results);
              // if (this.results.withholdingTax == true) {
              //   this.results.withholdingTax == "True"
              // } else {
              //   this.results.withholdingTax == "False"
              // }  
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.acid],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus: [this.results.accountStatus],
                accountType: [this.message.account_type],
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency: [this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                saving: this.fb.array([]),
                // saving: new FormArray([]),
                // sn: [this.results.sn],
                solCode: [this.results.solCode],
                glCode: [this.results.glCode],
                glSubhead: [this.results.glSubhead],
                sectorCode: [this.results.sectorCode],
                schemeCode: [this.results.schemeCode],
                schemeType: [this.results.schemeType],
                subSectorCode: [this.results.subSectorCode],
                // termDeposit: new FormArray([]),
                transferExceptionLimitCr: [this.results.transferExceptionLimitCr],
                transferExceptionLimitDr: [this.results.transferExceptionLimitDr],
                accountStatement: [this.results.accountStatement],
                statementFreq: [this.results.statementFreq],
                dispatchMode: [this.results.dispatchMode],
                withholdingTax: [this.results.withholdingTax],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                modifiedBy: ['user'],
                modifiedTime: [new Date()],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deleteFlag: [this.results.deleteFlag],
                deleteTime: [this.results.deleteTime],
                deletedBy: [this.results.deletedBy],
              })
            }
          )
        } else if (this.message.function_type == 'V-Verify') {
          this.loading = true;
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data => {
              this.results = data.entity
              this.loading = false;

              // if (this.results.withholdingTax == true) {
              //   this.results.withholdingTax == "True"
              // } else {
              //   this.results.withholdingTax == "False"
              // }
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus: [this.results.accountStatus],
                accountType: [this.message.account_type],
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency: [this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                saving: this.fb.array([]),
                // saving: new FormArray([]),
                // sn: [this.results.sn],
                solCode: [this.results.solCode],
                glCode: [this.results.glCode],
                sectorCode: [this.results.sectorCode],
                schemeType: [this.results.schemeType],
                subSectorCode: [this.results.subSectorCode],
                // termDeposit: new FormArray([]),
                transferExceptionLimitCr: [this.results.transferExceptionLimitCr],
                transferExceptionLimitDr: [this.results.transferExceptionLimitDr],
                accountStatement: [this.results.accountStatement],
                statementFreq: [this.results.statementFreq],
                dispatchMode: [this.results.dispatchMode],
                withholdingTax: [this.results.withholdingTax],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                verifiedBy: ['user'],
                verifiedFlag: ['Y'],
                verifiedTime: [new Date()],
                deleteFlag: [this.results.deleteFlag],
                deleteTime: [this.results.deleteTime],
                deletedBy: [this.results.deletedBy],
              })
            }
          )
        } else if (this.message.function_type == 'X-Delete') {
          this.loading = true;
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data => {
              this.results = data.entity
              this.loading = false;
              // if (this.results.withholdingTax == true) {
              //   this.results.withholdingTax == "True"
              // } else {
              //   this.results.withholdingTax == "False"
              // }

              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus: [this.results.accountStatus],
                accountType: [this.message.account_type],
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency: [this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                saving: this.fb.array([]),
                // saving: new FormArray([]),
                // sn: [this.results.sn],
                solCode: [this.results.solCode],
                glCode: [this.results.glCode],
                schemeType: [this.results.schemeType],
                sectorCode: [this.results.sectorCode],
                subSectorCode: [this.results.subSectorCode],
                // termDeposit: new FormArray([]),
                transferExceptionLimitCr: [this.results.transferExceptionLimitCr],
                transferExceptionLimitDr: [this.results.transferExceptionLimitDr],
                accountStatement: [this.results.accountStatement],
                statementFreq: [this.results.statementFreq],
                dispatchMode: [this.results.dispatchMode],
                withholdingTax: [this.results.withholdingTax],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deleteFlag: ['Y'],
                deleteTime: [new Date()],
                deletedBy: ['user'],
              })
            }
          )
        }
      }
    )
  }
  onSubmitNewSavings() {
    console.log("Saving account data", this.formData.value);

    if (this.message.function_type == 'A-Add') {
      this.loading = true;
      this.accountAPI.createAccount(this.formData.value).subscribe(
        res => {
          this.results = res
          console.log("API", this.results);
          this.loading = false;
          this._snackBar.open("Savings account Details saved successfully", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: (['green-snackbar', 'login-snackbar'])
          });
        },
        err => {
          this.error = err;
          this._snackBar.open("Savings account Details Invalid", "TRY AGAIN", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'green-snackbar']
          });
        }
      )
    } else if (this.message.function_type != 'A-Add') {
      this.loading = true;
      this.subscription = this.accountAPI.updateAccounts(this.formData.value).subscribe(
        res => {
          this.results = res
          this.loading = false;
          this._snackBar.open("Savings account Details Updated Successfully", "X", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: (['green-snackbar', 'login-snackbar'])
          });
        },
        err => {
          this.error = err;
          this._snackBar.open("Savings account Details Invalid", "TRY AGAIN", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'green-snackbar']
          });
        }
      )
    }
  }

}