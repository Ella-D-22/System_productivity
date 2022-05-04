import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../accounts-module/accounts.service';
import { RetailCustomerLookupComponent } from '../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountService } from '../../loan-account/loan-account.service';
import { BranchComponent } from '../../loan-account/lookup/branch/branch.component';
import { SavingschemeLookupComponent } from '../../ProductModule/savings-scheme/savingscheme-lookup/savingscheme-lookup.component';
import { CurrencyLookupComponent } from '../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { MisSectorService } from '../../SystemConfigurations/GlobalParams/mis-sector/mis-sector.service';

@Component({
  selector: 'app-office-account',
  templateUrl: './office-account.component.html',
  styleUrls: ['./office-account.component.scss']
})
export class OfficeAccountComponent implements OnInit {

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
  element:any
  message:any
  function_type:any
  account_code:any
  customer_type:any
  collateralData:any
  signatureImage:any
  isEnabled = false
  newData = false;
  loading = false
  lookupdata:any
  glSubheads:any
  filteredArr:any
  error:any
  results:any
  sba_gl_subhead_description: any;
  sba_scheme_code_desc: any;
  sba_schemeCode:any
  // sba_gl_subhead_description:any
  // sba_scheme_code_desc:any
  constructor(
    private fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog,
    private misSectorAPI:MisSectorService,
    private accountAPI:AccountsService,
    private accountService:LoanAccountService
  ) { }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    // accountBalance: [''],
    accountManager: [''],
    accountName: [''],
    accountOwnership: [''],
    accountStatus:[''],
    accountType: [''],
    // acid: [''],
    cashExceptionLimitCr: [''],
    cashExceptionLimitDr: [''],
    currency:[''],
    customerCode: [''],
    lienAmount: 0,
    // loan: new FormArray([]),
    // officeAccount: new FormArray([]),
    openingDate: [''],
    referredBy: [''],
    // saving: new FormArray([]),
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
  get f(){return this.formData.controls}

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
sbaSchemeCodeLookup():void{
  const dialogRef = this.dialog.open(SavingschemeLookupComponent,{
  });
  dialogRef.afterClosed().subscribe(result =>{
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

  collateralLookup():void{

  }

  getPage(){
    this.subscription = this.accountAPI.currentMessage.subscribe(
      message =>{
        this.message = message
        if(this.message.function_type == 'A-Add'){
          this.formData = this.fb.group({
            // accountBalance: [''],
            accountManager: [''],
            accountName: [''],
            accountOwnership: [''],
            accountStatus:[''],
            accountType: [''],
            // acid: [''],
            cashExceptionLimitCr: [''],
            cashExceptionLimitDr: [''],
            currency:[''],
            customerCode: [''],
            lienAmount: 0,
            // loan: new FormArray([]),
            // officeAccount: new FormArray([]),
            openingDate: [''],
            referredBy: [''],
            // saving: new FormArray([]),
            // sn: [''],
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
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                // sn: [this.results.sn],
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
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                // sn: [this.results.sn],
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
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                // sn: [this.results.sn],
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
                // acid: [this.results.acid],
                cashExceptionLimitCr: [this.results.cashExceptionLimitCr],
                cashExceptionLimitDr: [this.results.cashExceptionLimitDr],
                currency:[this.results.currency],
                customerCode: [this.results.customerCode],
                lienAmount: [this.results.lienAmount],
                // loan: new FormArray([]),
                // officeAccount: new FormArray([]),
                openingDate: [this.results.openingDate],
                referredBy: [this.results.referredBy],
                // saving: new FormArray([]),
                // sn: [this.results.sn],
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
  onSubmit(){
    if(this.formData.valid){
      if(this.message.function_type == 'A-Add'){
        this.accountAPI.createAccount(this.formData.value).subscribe(
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
