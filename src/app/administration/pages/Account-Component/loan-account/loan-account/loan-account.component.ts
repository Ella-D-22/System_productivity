import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../../accounts-module/accounts.service';
import { RetailCustomerLookupComponent } from '../../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountService } from '../../../loan-account/loan-account.service';
import { BranchComponent } from '../../../loan-account/lookup/branch/branch.component';
import { LoanproductLookupComponent } from '../../../ProductModule/loanproduct/loanproduct-lookup/loanproduct-lookup.component';
import { CurrencyLookupComponent } from '../../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { GlSubheadLookupComponent } from '../../../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { MisSectorService } from '../../../SystemConfigurations/GlobalParams/mis-sector/mis-sector.service';
 
@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.scss']
})
export class LoanAccountComponent implements OnInit {

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
  loading = false
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
  function_type:any
  account_code:any
  customer_type:any
  constructor(
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog,
    private misSectorAPI:MisSectorService,
    private accountAPI:AccountsService,
    private accountService:LoanAccountService ) { 
      // this.message = this.router.getCurrentNavigation()?.extras.state;
      // console.log(this.message);

    }

  ngOnInit(): void { this.getPage()
  this.getMISData()}

  glSubheadArray = new Array

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
      // officeAccount: new FormArray([]),
      openingDate: [''],
      referredBy: [''],
      // saving: new FormArray([]),
      sn: [''],
      solCode: [''],
      sectorCode:[''],
      subSectorCode:[''],
      schemeCode:[''],
      glSubhead:[''],
      // termDeposit: new FormArray([]),
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
    // laa_schemeCode:[''],
    // laa_glSubhead:[''],
    // acid: [''],
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
    sumPrincipalDemand: [''],
    interestDemandAmount: [''],
    loanDemands :new FormArray([]),
    loanDocuments : new FormArray([])

  })

  loanDemandData = this.fb.group({
    adjustmentAmount: [''],
    adjustmentDate:[''] ,
    demandAmount: [''],
    demandCode: [''],
    demandDate: [''],
    demandType:[''] ,
  })

  loanDocumentData = this.fb.group({
    documentImage: [''],
    documentTitle: [''],
    uploadTime:['']
  })

  addGurantorsFormData = this.fb.group({
    customer_code: [''],
    customer_name: [''],
    customer_data: [''],

  });
  glSubheadData = this.fb.group({

  })

  get f(){return this.formData.controls}
  get l(){return this.f.loan as FormArray}
  get ll(){return this.loanData.controls}

  
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
    this.accountService.getCustomerEligibility(customer_code).subscribe(
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

  collateralLookup():void{

  }
  getPage(){
    this.subscription = this.accountAPI.currentMessage.subscribe(
      message =>{
        this.message = message
        if(this.message.function_type == 'A-Add'){
          this.formData = this.fb.group({
            accountManager: [''],
            accountName: [''],
            accountOwnership: [''],
            accountStatus:[''],
            accountType: [''],
            cashExceptionLimitCr: [''],
            cashExceptionLimitDr: [''],
            currency:[''],
            customerCode: [''],
            lienAmount: 0,
            loan: new FormArray([]),
            // officeAccount: new FormArray([]),
            openingDate: [''],
            referredBy: [''],
            // saving: new FormArray([]),
            solCode: [''],
            sectorCode:[''],
            subSectorCode:[''],
            // termDeposit: new FormArray([]),
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
        }else if(this.message.function_type == 'I-Inquire'){
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data =>{
              this.results = data.entity
  
              if(this.results.withholdingTax == true){
                this.results.withholdingTax == "True"
              }else{
                this.results.withholdingTax == "False"
              }
  
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus:[this.results.accountStatus],
                accountType: [this.message.account_type],
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                solCode: [this.results.solCode],
                sectorCode:[this.results.sectorCode],
                subSectorCode:[this.results.subSectorCode],
                // termDeposit: new FormArray([]),
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
        }else if(this.message.function_type == 'M-Modify'){
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data =>{
              this.results = data.entity
  
              if(this.results.withholdingTax == true){
                this.results.withholdingTax == "True"
              }else{
                this.results.withholdingTax == "False"
              }
  
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus:[this.results.accountStatus],
                accountType: [this.message.account_type],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                solCode: [this.results.solCode],
                sectorCode:[this.results.sectorCode],
                subSectorCode:[this.results.subSectorCode],
                // termDeposit: new FormArray([]),
                transferExceptionLimitCr:[this.results.transferExceptionLimitCr] ,
                transferExceptionLimitDr:[this.results.transferExceptionLimitDr] ,
                accountStatement: [this.results.accountStatement],
                statementFreq:[this.results.statementFreq],
                dispatchMode:[this.results.dispatchMode],
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
        }else if(this.message.function_type == 'V-Verify'){
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data =>{
              this.results = data.entity
  
              if(this.results.withholdingTax == true){
                this.results.withholdingTax == "True"
              }else{
                this.results.withholdingTax == "False"
              }
  
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus:[this.results.accountStatus],
                accountType: [this.message.account_type],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                solCode: [this.results.solCode],
                sectorCode:[this.results.sectorCode],
                subSectorCode:[this.results.subSectorCode],
                // termDeposit: new FormArray([]),
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
                verifiedBy: ['user'],
                verifiedFlag: ['Y'],
                verifiedTime: [new Date()],
                deleteFlag: [this.results.deleteFlag],
                deleteTime: [this.results.deleteTime],
                deletedBy: [this.results.deletedBy],
              })
            }
          )
        }else if(this.message.function_type == 'X-Delete'){
          this.accountAPI.retrieveAccount(this.message.account_code).subscribe(
            data =>{
              this.results = data.entity
  
              if(this.results.withholdingTax == true){
                this.results.withholdingTax == "True"
              }else{
                this.results.withholdingTax == "False"
              }
  
              this.formData = this.fb.group({
                // accountBalance: [this.results.accountBalance],
                accountManager: [this.results.accountManager],
                accountName: [this.results.accountName],
                accountOwnership: [this.results.accountOwnership],
                accountStatus:[this.results.accountStatus],
                accountType: [this.message.account_type],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                solCode: [this.results.solCode],
                sectorCode:[this.results.sectorCode],
                subSectorCode:[this.results.subSectorCode],
                // termDeposit: new FormArray([]),
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

  onSubmitdata(){

  }
  onSubmit(){

    if(this.formData.valid){
      if(this.message.function_type == 'A-Add'){
        this.subscription = this.accountAPI.createAccount(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackBar.open("Executed Successfully", "X", {
                 horizontalPosition:this.horizontalPosition,
                 verticalPosition:this.verticalPosition,
                 duration:3000,
                 panelClass:(['green-snackbar', 'login-snackbar'])
            })
          },
          err =>{
            this.error = err;
            this._snackBar.open("Invalid FormData", "Try Again",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'green-snackbar']
            })
          }
        )
      }else if(this.message.function_type != 'A-Add'){
        this.subscription = this.accountAPI.updateAccounts(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackBar.open("Executed Successfully", "X", {
                 horizontalPosition:this.horizontalPosition,
                 verticalPosition:this.verticalPosition,
                 duration:3000,
                 panelClass:(['green-snackbar', 'login-snackbar'])
            })
          },
          err =>{
            this.error = err;
            this._snackBar.open("Invalid FormData", "Try Again",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'green-snackbar']
            })
          }
        )
      }
    }else{
      this._snackBar.open("Invalid FormData", "Try Again",{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar', 'green-snackbar']
      })
    }
  }

}
