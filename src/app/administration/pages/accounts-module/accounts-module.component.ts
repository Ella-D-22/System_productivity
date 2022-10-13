import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollateralLookupComponent } from '../collateral-limits/collateral/collateral-lookup/collateral-lookup.component';
import { RetailCustomerLookupComponent } from '../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountService } from '../loan-account/loan-account.service';
import { BranchComponent } from '../loan-account/lookup/branch/branch.component';
import { productService } from '../loan-account/lookup/product/product.service';
import { CurrentSchemeLookupComponent } from '../ProductModule/current-scheme/current-scheme-lookup/current-scheme-lookup.component';
import { LoanproductLookupComponent } from '../ProductModule/loanproduct/loanproduct-lookup/loanproduct-lookup.component';
import { OverdraftSchemeLookupComponent } from '../ProductModule/overdrafts-scheme/overdraft-scheme-lookup/overdraft-scheme-lookup.component';
import { SavingschemeLookupComponent } from '../ProductModule/savings-scheme/savingscheme-lookup/savingscheme-lookup.component';
import { TermDepositLookupComponent } from '../ProductModule/term-deposit/term-deposit-lookup/term-deposit-lookup.component';
import { CurrencyLookupComponent } from '../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { GlSubheadLookupComponent } from '../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { MisSectorService } from '../SystemConfigurations/GlobalParams/mis-sector/mis-sector.service';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts-module',
  templateUrl: './accounts-module.component.html',
  styleUrls: ['./accounts-module.component.scss']
})
export class AccountsModuleComponent implements OnInit {

  subscription:Subscription
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  sectorData:any
  subSectorData:any
  subSectors:any
  currencyData:any
  customer_lookup:any
  customer_code:any
  customer_name:any
  imgfile:any
  results:any
  error:any
  customerImage:any
  signfile:any
  signatureImage:any
  isEnabled = false
  newData = false;
  lookupdata:any
  glSubheads:any
  filteredArr:any
  tda_schemeCode:any
  laa_schemeCode:any
  sba_schemeCode:any
  oda_schemeCode:any
  caa_schemeCode:any
  collateralData:any
  element:any
  message:any
  constructor(
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog,
    private misSectorAPI:MisSectorService,
    private accountservice:LoanAccountService,
    private accountAPI:AccountsService ) { 
      // this.message = this.router.getCurrentNavigation()?.extras.state;
      // console.log(this.message);

    }

  ngOnInit(): void {
    this.getPage();
    this.getMISData()
  }

  glSubheadArray = new Array()
  nomineeArray = new Array()
  formData = this.fb.group({
    accountBalance: [''],
    accountManager: [''],
    accountName: [''],
    accountOwnership: [''],
    accountStatus:[''],
    accountType: [''],
    acid: [''],
    cashExceptionLimitCr: [''],
    cashExceptionLimitDr: [''],
    currency:[''],
    customerCode: [''],
    lienAmount: 0,
    loan: new FormArray([]),
    officeAccount: new FormArray([]),
    openingDate: [''],
    referredBy: [''],
    saving: new FormArray([]),
    sn: [''],
    solCode: [''],
    sectorCode:[''],
    subSectorCode:[''],
    termDeposit: new FormArray([]),
    transferExceptionLimitCr:[''] ,
    transferExceptionLimitDr:[''] ,
    accountStatement: [''],
    statementFreq:[''],
    dispatchMode:[''],
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

  loanData = this.fb.group({
    laa_schemeCode:[''],
    laa_glSubhead:[''],
    acid: [''],
    amountDisbursed: [0.000],
    applicationStatus:[''],
    collateralCode: [''],
    demandCarryForward: [''],
    disbursementDate:[''],
    nextRepaymentDate: [''],
    overFlowAmount: [''],
    principalAccount: [''],
    principalDemandAmount: [''],
    repaymentPeriod: [''],
    sn: [''],
    sumPrincipalDemand: [''],
    interestDemandAmount: [''],
    loanDemands :new FormArray([]),
    loanDocuments : new FormArray([])

  })

  loanDemandData = this.fb.group({
    acid: [''],
    adjustmentAmount: [''],
    adjustmentDate:[''] ,
    demandAmount: [''],
    demandCode: [''],
    demandDate: [''],
    demandType:[''] ,
    sn: ['']
  })

  loanDocumentData = this.fb.group({
    documentImage: [''],
    documentTitle: [''],
    sn: [''],
    uploadTime:['']
  })

  officeAccountData = this.fb.group({
    accountHeadName: [''],
    accountSupervisorId: [''],
    id: ['']
  })

  savingsFormData = this.fb.group({
    id: [''],
    sba_maturedValue:[''],
    sba_maturedDate:[''],
    nominees: new FormArray([]),
    sba_savingPeriod: [''],

  })
  

  nomineesFormData = this.fb.group({
    dob: [''],
    emailAddress:[''] ,
    firstName:[''],
    id:[''] ,
    identificationNo: [''],
    lastName: [''],
    middleName: [''],
    nomineeMinor:[''] ,
    occupation: [''],
    phone: [''],
    relationship: [''],
    guardian: new FormArray([])
  })

  guardianFormData = this.fb.group({
    address: [''],
    guardianCode:[''],
    guardianName: [''],
    id:[''] ,
    residence: ['']
  })

  termDepositData = this.fb.group({
    breakDepInMultiples: [''],
    depInstallmentAmount: [''],
    depositPeriod: [''],
    id: [''],
    tda_maturedValue: [''],
    tda_schemeCode:[''],
    tda_glSubhead:[''],
    nominees: new FormArray([]),
  })
  addGurantorsFormData = this.fb.group({

  })
  glSubheadData = this.fb.group({

  })

  get f(){return this.formData.controls}
  get l(){return this.f.loan as FormArray}
  get s(){return this.f.saving as FormArray}
  get t(){return this.f.termDeposit as FormArray}
  get oa(){return this.f.officeAccount as FormArray}
  // get g(){return this.guardianFormData.controls}
  get ll(){return this.loanData.controls}
  get ss(){return this.savingsFormData.controls}
  get n(){return this.ss.nominees as FormArray }

  despatch_mode_array:any = [
    'Post & E-Mail', 'Collect By Person', 'E-Mail Only', 'Post', 'No-Despatch', 'Courier', 'Courier & E-Mail'
  ] 
  statementFreqArray : any = [
    'Daily', 'Weekly', 'Montly', 'Yearly'
  ]
  accountStatusArray: any = [
    'Active', 'Not-Active', 'Dormant'
  ]
  aaplicationStatusAr : any = [
    'Pending', 'Verified'
  ]
  relationshipArray:any = [
    'FATHER', 'MOTHER', 'WIFE','HUSBAND', 'SIBLING', 'DAUGHTER', 'SON'
  ]
  guardianArray:any = [
    'Court Appointed', 'Natural Guardian'
  ]


  initNomineeData(){
    this.newData = true;
    this.nomineesFormData = this.fb.group({
      dob: [''],
      emailAddress:[''] ,
      firstName:[''],
      id:[''] ,
      identificationNo: [''],
      lastName: [''],
      middleName: [''],
      nomineeMinor:[''] ,
      occupation: [''],
      phone: [''],
      relationship: [''],
      guardian: new FormArray([])
    })
  }

  previewNominees(){
    if(this.nomineesFormData.valid){
      this.n.push(this.fb.group(
        this.nomineesFormData.value
      ));
      this.nomineeArray.push(this.nomineesFormData.value);
      this.initNomineeData();
    }
  }
  onAddNomineesField(){
    this.n.push(this.fb.group({
      dob:[''],
      emailAddress:[''],
      firstName:[''],
      identificationNo:[''],
      lastName:[''],
      middleName:[''],
      occupation:[''],
      phone:['']
    }))
  }
  onNomineeClear(){
    this.initNomineeData()
    this.nomineeArray = new Array();
  }
  onUpdateNominee(){
    let i = this.element
    this.nomineeArray[i] = this.nomineesFormData.value
  }
  onRemove(i:any){
    const index:number = this.nomineeArray.indexOf(this.nomineeArray.values);
    this.nomineeArray.splice(index, i);
    this.nomineeArray = this.nomineeArray

  }
 
  
   //setting up the mis sector codes
   getMISData(){
    this.subscription = this.misSectorAPI.getAllMissectors().subscribe(
      res =>{
        this.sectorData = res
      }
    )
  }
  onInputSelection(event:any){
  let miscode = event.target.value
  console.log(miscode);
  
  this.subscription = this.misSectorAPI.getMissectorByCode(miscode).subscribe(
    res =>{
      this.subSectorData = res
      this.subSectors = this.subSectorData.missubsectors
    }
  )
  }

  currencyLookup():void{
    const dialogRef = this.dialog.open(CurrencyLookupComponent,{
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.currencyData = result.data;
      this.formData.controls.currency.setValue(this.currencyData.ccy)
    })
 }

 customerLookup(): void {
  const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {
    this.customer_lookup = result.data;
    this.customer_code = this.customer_lookup.customerCode;
    this.customer_name = this.customer_lookup.firstName +" "+this.customer_lookup.middleName +" "+this.customer_lookup.surname
    this.formData.controls.accountManager.setValue(this.customer_lookup.firstName + " " + this.customer_lookup.middleName)
    this.formData.controls.customerCode.setValue(this.customer_lookup.customerCode)
  });
}
laaSchemeCodeLookup(): void {
  const dialogRef = this.dialog.open(LoanproductLookupComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupdata= result.data;
    console.log("Loan Data", this.lookupdata);
    this.formData.controls.schemeCode.setValue(this.lookupdata.laa_scheme_code);
    this.laa_schemeCode = this.lookupdata.laa_scheme_code
    this.glSubheads = this.lookupdata.laa_glsubheads
    
    this.filteredArr = this.glSubheads.filter(data => data.laa_gl_subhead_deafault == "Yes");
    console.log(this.filteredArr);
  });
}
caaSchemeCodeLookup():void{
 const dialogRef = this.dialog.open(CurrentSchemeLookupComponent,{
 });
 dialogRef.afterClosed().subscribe(result =>{
   this.lookupdata = result.data;
   this.formData.controls.schemeCode.setValue(this.lookupdata.caa_scheme_code)
   this.caa_schemeCode = this.lookupdata.caa_scheme_code

   this.glSubheads = this.lookupdata.caa_glsubheads
    
   this.filteredArr = this.glSubheads.filter(data => data.caa_gl_subhead_deafault == "Yes");
   console.log(this.filteredArr);
 })
}
odaSchemeCodeLookup():void{
  const dialogRef = this.dialog.open(OverdraftSchemeLookupComponent,{
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.lookupdata = result.data;
    this.formData.controls.schemeCode.setValue(this.lookupdata.oda_scheme_code)
    this.oda_schemeCode = this.lookupdata.oda_scheme_code
    this.glSubheads = this.lookupdata.oda_glsubheads
    
    this.filteredArr = this.glSubheads.filter(data => data.oda_gl_subhead_deafault == "Yes");
  })
}
sbaSchemeCodeLookup():void{
  const dialogRef = this.dialog.open(SavingschemeLookupComponent,{
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.lookupdata = result.data;
    this.formData.controls.schemeCode.setValue(this.lookupdata.sba_scheme_code)

    this.sba_schemeCode = this.lookupdata.sba_scheme_code
    this.glSubheads = this.lookupdata.sba_glsubheads
    
    this.filteredArr = this.glSubheads.filter(data => data.sba_gl_subhead_deafault == "Yes");
  })
}
tdaSchemeCodeLookup():void{
  const dialogRef = this.dialog.open(TermDepositLookupComponent,{
  });
  dialogRef.afterClosed().subscribe(result =>{
    this.lookupdata = result.data;
    this.formData.controls.schemeCode.setValue(this.lookupdata.tda_scheme_code)

    this.tda_schemeCode = this.lookupdata.tda_scheme_code
    this.glSubheads = this.lookupdata.tda_glsubheads
    
    this.filteredArr = this.glSubheads.filter(data => data.tda_gl_subhead_deafault == "Yes");
  })
}
collateralLookup():void{
  const dialogRef = this.dialog.open(CollateralLookupComponent,{})
  dialogRef.afterClosed().subscribe(result =>{
    this.collateralData = result.data
    this.loanData.controls.collateralCode.setValue(this.collateralData)
  })
}

guarantorsCustomerLookup(): void {
  const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {
    this.customer_lookup = result.data;
    this.customer_code = this.customer_lookup.customerCode;
    this.customer_name = this.customer_lookup.firstName +" "+this.customer_lookup.middleName +" "+this.customer_lookup.surname
    this.addGurantorsFormData.controls.customer_code.setValue(this.customer_code);
  });
}

//Checking for eligibility of a guarantors customer_code
eligibilityTest(){
  if(this.addGurantorsFormData.valid){
    let customer_code = this.addGurantorsFormData.controls.customer_code.value;
    this.accountservice.getCustomerEligibility(customer_code).subscribe(
      res =>{
          this.results = res
            this.glSubheadArray.push(this.glSubheadData.value);
      },
      err=>{
        this.error = err.error
        this._snackBar.open(this.error.message, "Try Another",{
          horizontalPosition:this.horizontalPosition,
          verticalPosition:this.verticalPosition,
          duration:3000,
          panelClass:['red-snackbar', 'login-snackbar']
        })
      }
    )
  }else{
    this._snackBar.open("Invalid Form Data", "Try Again",{
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition,
      duration:3000,
      panelClass:['red-snackbar', 'login-snackbar']
    })
  }

}

onPhotoChange(event: any) {
  this.imgfile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
                  var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
reader.onload = () => {
this.customerImage=reader.result;
console.log(this.customerImage)
}
reader.onerror = function (error) {
console.log('Error: ', error);
};

}

}

onSignatureChange(event: any) {
this.signfile = event.target.files[0];

  if (event.target.files && event.target.files[0]) {

                      var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
reader.onload = () => {
this.signatureImage=reader.result;
console.log(this.signatureImage)
}
reader.onerror = function (error) {
console.log('Error: ', error);
};

}
}

glSubheadLookup1(): void {
const dialogRef = this.dialog.open(GlSubheadLookupComponent, {

});
dialogRef.afterClosed().subscribe(result => {
  this.formData.controls.glSubhead.setValue(result.data.glSubheadCode);
});
}

branchSubheadLookup(): void {
const dialogRef = this.dialog.open(BranchComponent, {

});
dialogRef.afterClosed().subscribe(result => {
  this.formData.controls.solCode.setValue(result.data.solCode);
});
}
getPage(){
  this.subscription = this.accountAPI.currentMessage.subscribe(
    message =>{
      this.message = message
      if(this.message.function_type == 'A-Add' && this.message.account_type == 'LAA'){
         this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'A-Add' && this.message.account_type == 'SBA'){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'A-Add' && this.message.account_type == 'TDA'){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'A-Add' && this.message.account_type == 'TDA'){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'A-Add' && this.message.account_type){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if( this.message.function_type == 'A-Add' && this.message.account_type == 'ODA'){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'A-Add' && this.message.account_type == 'CAA'){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'A-Add' && this.message.account_type == 'OAB'){
        this.formData = this.fb.group({
          accountBalance: [''],
          accountManager: [''],
          accountName: [''],
          accountOwnership: [''],
          accountStatus:[''],
          accountType: [''],
          acid: [''],
          cashExceptionLimitCr: [''],
          cashExceptionLimitDr: [''],
          currency:[''],
          customerCode: [''],
          lienAmount: 0,
          loan: new FormArray([]),
          officeAccount: new FormArray([]),
          openingDate: [''],
          referredBy: [''],
          saving: new FormArray([]),
          sn: [''],
          solCode: [''],
          sectorCode:[''],
          subSectorCode:[''],
          termDeposit: new FormArray([]),
          transferExceptionLimitCr:[''] ,
          transferExceptionLimitDr:[''] ,
          accountStatement: [''],
          statementFreq:[''],
          dispatchMode:[''],
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
      }else if(this.message.function_type == 'I-Inquire' && this.message.account_type == 'LAA'){
        this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
          data =>{
            this.results = data.entity

            if(this.results.withholdingTax == true){
              this.results.withholdingTax == "True"
            }else{
              this.results.withholdingTax == "False"
            }

            this.formData = this.fb.group({
              accountBalance: [this.results.accountBalance],
              accountManager: [this.results.accountManager],
              accountName: [this.results.accountName],
              accountOwnership: [this.results.accountOwnership],
              accountStatus:[this.results.accountStatus],
              accountType: [this.message.account_type],
              acid: [this.results.acid],
              cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
              cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
              currency:[this.results.currency],
              customerCode: [this.results.customerCode],
              lienAmount: [this.results.lienAmount],
              loan: new FormArray([]),
              officeAccount: new FormArray([]),
              openingDate: [this.results.openingDate],
              referredBy: [this.results.referredBy],
              saving: new FormArray([]),
              sn: [this.results.sn],
              solCode: [this.results.solCode],
              sectorCode:[this.results.sectorCode],
              subSectorCode:[this.results.subSectorCode],
              termDeposit: new FormArray([]),
              transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
              transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
              accountStatement: [this.results.accountStatement],
              statementFreq:[this.results.statementFreq],
              dispatchMode:[this.results.dispatchMode],
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
      }else if(this.message.function_type == 'I-Inquire' && this.message.account_type == 'SBA'){
        this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
          data =>{
            this.results = data.entity
            
            if(this.results.withholdingTax == true){
              this.results.withholdingTax == "True"
            }else{
              this.results.withholdingTax == "False"
            }

            this.formData = this.fb.group({
              accountBalance: [this.results.accountBalance],
              accountManager: [this.results.accountManager],
              accountName: [this.results.accountName],
              accountOwnership: [this.results.accountOwnership],
              accountStatus:[this.results.accountStatus],
              accountType: [this.message.account_type],
              acid: [this.results.acid],
              cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
              cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
              currency:[this.results.currency],
              customerCode: [this.results.customerCode],
              lienAmount: [this.results.lienAmount],
              loan: new FormArray([]),
              officeAccount: new FormArray([]),
              openingDate: [this.results.openingDate],
              referredBy: [this.results.referredBy],
              saving: new FormArray([]),
              sn: [this.results.sn],
              solCode: [this.results.solCode],
              sectorCode:[this.results.sectorCode],
              subSectorCode:[this.results.subSectorCode],
              termDeposit: new FormArray([]),
              transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
              transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
              accountStatement: [this.results.accountStatement],
              statementFreq:[this.results.statementFreq],
              dispatchMode:[this.results.dispatchMode],
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
          }else if(this.message.function_type == 'I-Inquire' && this.message.account_type == 'TDA'){
            this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
              data =>{
                this.results = data.entity
                
                if(this.results.withholdingTax == true){
                  this.results.withholdingTax == "True"
                }else{
                  this.results.withholdingTax == "False"
                }
    
                this.formData = this.fb.group({
                  accountBalance: [this.results.accountBalance],
                  accountManager: [this.results.accountManager],
                  accountName: [this.results.accountName],
                  accountOwnership: [this.results.accountOwnership],
                  accountStatus:[this.results.accountStatus],
                  accountType: [this.message.account_type],
                  acid: [this.results.acid],
                  cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                  cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                  currency:[this.results.currency],
                  customerCode: [this.results.customerCode],
                  lienAmount: [this.results.lienAmount],
                  loan: new FormArray([]),
                  officeAccount: new FormArray([]),
                  openingDate: [this.results.openingDate],
                  referredBy: [this.results.referredBy],
                  saving: new FormArray([]),
                  sn: [this.results.sn],
                  solCode: [this.results.solCode],
                  sectorCode:[this.results.sectorCode],
                  subSectorCode:[this.results.subSectorCode],
                  termDeposit: new FormArray([]),
                  transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
                  transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
                  accountStatement: [this.results.accountStatement],
                  statementFreq:[this.results.statementFreq],
                  dispatchMode:[this.results.dispatchMode],
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
          }else if(this.message.function_type == 'I-Inquire' && this.message.account_type =='ODA'){
            this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
              data =>{
                this.results = data.entity
                
                if(this.results.withholdingTax == true){
                  this.results.withholdingTax == "True"
                }else{
                  this.results.withholdingTax == "False"
                }
    
                this.formData = this.fb.group({
                  accountBalance: [this.results.accountBalance],
                  accountManager: [this.results.accountManager],
                  accountName: [this.results.accountName],
                  accountOwnership: [this.results.accountOwnership],
                  accountStatus:[this.results.accountStatus],
                  accountType: [this.message.account_type],
                  acid: [this.results.acid],
                  cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                  cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                  currency:[this.results.currency],
                  customerCode: [this.results.customerCode],
                  lienAmount: [this.results.lienAmount],
                  loan: new FormArray([]),
                  officeAccount: new FormArray([]),
                  openingDate: [this.results.openingDate],
                  referredBy: [this.results.referredBy],
                  saving: new FormArray([]),
                  sn: [this.results.sn],
                  solCode: [this.results.solCode],
                  sectorCode:[this.results.sectorCode],
                  subSectorCode:[this.results.subSectorCode],
                  termDeposit: new FormArray([]),
                  transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
                  transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
                  accountStatement: [this.results.accountStatement],
                  statementFreq:[this.results.statementFreq],
                  dispatchMode:[this.results.dispatchMode],
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
          }else if(this.message.function_type == 'I-Inquire' && this.message.account_type == 'CAA'){
            this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
              data =>{
                this.results = data.entity
                
                if(this.results.withholdingTax == true){
                  this.results.withholdingTax == "True"
                }else{
                  this.results.withholdingTax == "False"
                }
    
                this.formData = this.fb.group({
                  accountBalance: [this.results.accountBalance],
                  accountManager: [this.results.accountManager],
                  accountName: [this.results.accountName],
                  accountOwnership: [this.results.accountOwnership],
                  accountStatus:[this.results.accountStatus],
                  accountType: [this.message.account_type],
                  acid: [this.results.acid],
                  cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                  cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                  currency:[this.results.currency],
                  customerCode: [this.results.customerCode],
                  lienAmount: [this.results.lienAmount],
                  loan: new FormArray([]),
                  officeAccount: new FormArray([]),
                  openingDate: [this.results.openingDate],
                  referredBy: [this.results.referredBy],
                  saving: new FormArray([]),
                  sn: [this.results.sn],
                  solCode: [this.results.solCode],
                  sectorCode:[this.results.sectorCode],
                  subSectorCode:[this.results.subSectorCode],
                  termDeposit: new FormArray([]),
                  transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
                  transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
                  accountStatement: [this.results.accountStatement],
                  statementFreq:[this.results.statementFreq],
                  dispatchMode:[this.results.dispatchMode],
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
          }else if(this.message.function_type == 'I-Inquire' && this.message.account_type == 'OAB'){
            this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
              data =>{
                this.results = data.entity
                
                if(this.results.withholdingTax == true){
                  this.results.withholdingTax == "True"
                }else{
                  this.results.withholdingTax == "False"
                }
    
                this.formData = this.fb.group({
                  accountBalance: [this.results.accountBalance],
                  accountManager: [this.results.accountManager],
                  accountName: [this.results.accountName],
                  accountOwnership: [this.results.accountOwnership],
                  accountStatus:[this.results.accountStatus],
                  accountType: [this.message.account_type],
                  acid: [this.results.acid],
                  cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                  cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                  currency:[this.results.currency],
                  customerCode: [this.results.customerCode],
                  lienAmount: [this.results.lienAmount],
                  loan: new FormArray([]),
                  officeAccount: new FormArray([]),
                  openingDate: [this.results.openingDate],
                  referredBy: [this.results.referredBy],
                  saving: new FormArray([]),
                  sn: [this.results.sn],
                  solCode: [this.results.solCode],
                  sectorCode:[this.results.sectorCode],
                  subSectorCode:[this.results.subSectorCode],
                  termDeposit: new FormArray([]),
                  transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
                  transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
                  accountStatement: [this.results.accountStatement],
                  statementFreq:[this.results.statementFreq],
                  dispatchMode:[this.results.dispatchMode],
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
          }else if(this.message.function_type == 'M-Modify' && this.message.account_type =='OAB'){}
        
      }
    
  )

  
  

}

onSubmit(){}

}
