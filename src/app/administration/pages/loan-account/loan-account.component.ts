import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoanAccountService} from './loan-account.service'

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, Validators,FormArray,FormGroup, FormControl } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GlSubheadLookup2Component } from './lookup/gl-subhead/gl-subhead.component';
import { BranchComponent } from './lookup/branch/branch.component';
import { ProductComponent } from './lookup/product/product.component';
import { Subscription } from 'rxjs';
import { GlSubheadLookupComponent } from '../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';
import { LoanproductLookupComponent } from '../ProductModule/loanproduct/loanproduct-lookup/loanproduct-lookup.component';
import { RetailCustomerLookupComponent } from '../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';


@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.css'],
})
export class LoanAccountComponent implements OnInit {
  // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
     auth_user = "User"
  message!: any;
  resData: any;
  dtype!:string
  horizontalPosition :MatSnackBarHorizontalPosition = 'end';
  verticalPosition : MatSnackBarVerticalPosition = 'top';
  imgfile!: File; // Variable to store file
  signfile!: File; // Variable to store file
  customerImage!: any
  signatureImage!: any
  resMessage:any
  subscription:Subscription
  gl_subhead:any
  gl_subhead_description:any
  gl_subhead_code:any
  glSubheadData:any
  results:any
  error:any
  customer_lookup: any;
  lookupdata: any;
  laa_scheme_code: any;
  laa_scheme_code_desc: any;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,

    private accountservice: LoanAccountService
  ) {
    this.message = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.getPage();
  }
  loading = false;

  formData = this.fb.group({
    accountManager: [],
    customerCode: [''],
    accountName: [''],
    accountOwnership: [''],
    currency: [''],
    glSubhead: [''],
    lienAmount: [''],
    referredBy: [''],
    schemeCode: [''],
    solCode: [''],
    withholdingTax: [''],
    amountDisbursed: [''],
    repaymentPeriod: [''],
    matured: [''],
    accountStatus: [''],

    deleteFlag: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    modifiedBy: [''],
    modifiedTime: [''],
  });
  disabledFormControll() {
    this.formData.controls.accountManager.disable();
    this.formData.controls.customerCode.disable();
    this.formData.controls.repaymentPeriod.disable();
    this.formData.controls.currency.disable();
    this.formData.controls.glSubhead.disable();
    this.formData.controls.lienAmount.disable();
    this.formData.controls.referredBy.disable();
    this.formData.controls.schemeCode.disable();
    this.formData.controls.solCode.disable();
    this.formData.controls.withholdingTax.disable();
    this.formData.controls.amountDisbursed.disable();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.formData.controls;
  }
  get g() {
    return this.glSubheadData.controls;
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

  customerLookup(): void {
    const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customer_lookup = result.data;

      // this.gl_subhead_description =  result.data.glSubheadDescription;
      // this.gl_subhead_code =  result.data.glSubheadCode;     
      //  // this.eventtypedata = result.data;
      // this.glSubheadData.controls.laa_gl_subhead.setValue(this.gl_subhead_code);
      // this.glSubheadData.controls.laa_gl_subhead_description.setValue(this.gl_subhead_description);
    });
  }

  laaSchemeCodeLookup(): void {
    const dialogRef = this.dialog.open(LoanproductLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupdata= result.data;
      this.laa_scheme_code = this.lookupdata.laa_scheme_code;
      this.laa_scheme_code_desc = this.lookupdata.laa_scheme_code_desc;
      this.formData.controls.scheme_code.setValue(this.laa_scheme_code);
    });
  }
  


  getPage() {
    if (
      this.message.function_type == 'A-Add' &&
      this.message.account_type == 'Loan'
    ) {
      this.formData = this.fb.group({
        accountManager: [''],
        customerCode: [''],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        amountDisbursed: [''],

        repaymentPeriod: [''],
        accountOwnership:[''],
        schemeType:[''],
        deleteFlag: ['N'],
        postedBy: [this.auth_user],
        postedFlag: ['Y'],
        openingDate: [new Date()],
        postedTime: [new Date()],
        modifiedBy: ['P'],
        modifiedTime: [new Date()],
        accountName: [''],
        matured: ['N'],
        accountStatus: ['P'],
        loan:['']
      });
    } else if (
      this.message.function_type == 'A-Add' &&
      this.message.account_type == 'Savings'
    ) {
      this.formData = this.fb.group({
        accountManager: [''],
        customerCode: [''],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        accountOwnership:['C'],
        schemeType:[''],
        deleteFlag: ['N'],
        postedBy: [this.auth_user],
        postedFlag: ['Y'],
        openingDate: [new Date()],
        postedTime: [new Date()],
        modifiedBy: ['N'],
        modifiedTime: [new Date()],
        accountName: [''],
        matured: ['N'],
        accountStatus: ['P'],
        loan:['']
      });
    } else if (
      this.message.function_type == 'A-Add' &&
      this.message.account_type == 'Term-Deposit'
    ) {
      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        customerCode: [''],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        accountOwnership:['C'],
        schemeType:[''],
        deleteFlag: ['N'],
        postedBy: [this.auth_user],
        postedFlag: ['Y'],
        openingDate: [new Date()],
        postedTime: [new Date()],
        modifiedBy: ['P'],
        modifiedTime: [new Date()],
        accountName: ['KAMAU'],
        matured: ['N'],
        accountStatus: ['P'],
      });
    } else if (
      this.message.function_type == 'A-Add' &&
      this.message.account_type == 'Overdraft'
    ) {
      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        customerCode: [''],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        accountOwnership:['C'],
        schemeType:['ODA'],
        deleteFlag: ['N'],
        postedBy: [this.auth_user],
        postedFlag: ['Y'],
        openingDate: [new Date()],
        postedTime: [new Date()],
        modifiedBy: ['P'],
        modifiedTime: [new Date()],
        accountName: ['KAMAU'],
        matured: ['N'],
        accountStatus: ['P'],
      });
    } else if (
      this.message.function_type == 'A-Add' &&
      this.message.account_type == 'Current'
    ) {
      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        customerCode: [''],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        accountOwnership:['C'],
        schemeType:['CAA'],
        deleteFlag: ['N'],
        postedBy: [this.auth_user],
        postedFlag: ['Y'],
        openingDate: [new Date()],
        postedTime: [new Date()],
        modifiedBy: ['P'],
        modifiedTime: [new Date()],
        accountName: ['KAMAU'],
        matured: ['N'],
        accountStatus: ['P'],
      });
    }

    else if (
      this.message.function_type == 'A-Add' &&
      this.message.account_type == 'Office'
    ) {
      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        accountOwnership:['O'],
        schemeType:['OAB'],
        deleteFlag: ['N'],
        postedBy: [this.auth_user],
        postedFlag: ['Y'],
        openingDate: [new Date()],
        postedTime: [new Date()],
        modifiedBy: ['P'],
        modifiedTime: [new Date()],
        accountName: ['KAMAU'],
        matured: ['N'],
        accountStatus: ['P'],
      });
    }
    
    //'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
    else if (
      this.message.function_type == 'I-Inquire' &&
      this.message.account_type == 'Loan'
    ) {
      console.log("kibet")

      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        currency: ['kes'],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: ['CHEGE'],
        schemeCode: ['test'],
        solCode: [''],
        withholdingTax: [''],
        amountDisbursed: [''],
        repaymentPeriod: [''],
      });
      this.disabledFormControll();
      
    } else if (
      this.message.function_type == 'I-Inquire' &&
      this.message.account_type == 'Savings'
    ) {

      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )





      this.disabledFormControll();
    } else if (
      this.message.function_type == 'I-Inquire' &&
      this.message.account_type == 'Overdraft'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'I-Inquire' &&
      this.message.account_type == 'Term-Deposit'
    ) {

      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'I-Inquire' &&
      this.message.account_type == 'Current'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    }
    else if (
      this.message.function_type == 'I-Inquire' &&
      this.message.account_type == 'Office'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    }
    
    else if (
      this.message.function_type == 'M-Modify' &&
      this.message.account_type == 'Loan'
    ) {
      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        amountDisbursed: ['40000'],
        repaymentPeriod: [''],
      });
    } else if (
      this.message.function_type == 'M-Modify' &&
      this.message.account_type == 'Savings'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
    } else if (
      this.message.function_type == 'M-Modify' &&
      this.message.account_type == 'Overdraft'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],
            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
    } else if (
      this.message.function_type == 'M-Modify' &&
      this.message.account_type == 'Term-Deposit'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],
            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
    } else if (
      this.message.function_type == 'M-Modify' &&
      this.message.account_type == 'Current'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
    }
    else if (
      this.message.function_type == 'M-Modify' &&
      this.message.account_type == 'Office'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
    }

    else if (
      this.message.function_type == 'V-Verify' &&
      this.message.account_type == 'Loan'
    ) {

      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: ['S001'],
        withholdingTax: [''],
        amountDisbursed: [''],
        repaymentPeriod: [''],
      });
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'V-Verify' &&
      this.message.account_type == 'Savings'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["Y"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'V-Verify' &&
      this.message.account_type == 'Overdraft'
    ) {

      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        currency: [''],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: ['S001'],
        withholdingTax: [''],
        amountDisbursed: [''],
        repaymentPeriod: [''],
      });
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'V-Verify' &&
      this.message.account_type == 'Term-Deposit'
    ) {

      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["Y"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'V-Verify' &&
      this.message.account_type == 'Current'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["Y"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    }
    else if (
      this.message.function_type == 'V-Verify' &&
      this.message.account_type == 'Office'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: [data.entity.deleteFlag],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["Y"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    }
    
    else if (
      this.message.function_type == 'X-Cancel' &&
      this.message.account_type == 'Loan'
    ) {
      this.formData = this.fb.group({
        accountManager: ['KAMAU'],
        currency: ['KES'],
        glSubhead: [''],
        lienAmount: [''],
        referredBy: [''],
        schemeCode: [''],
        solCode: [''],
        withholdingTax: [''],
        amountDisbursed: [''],
        repaymentPeriod: [''],
      });
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'X-Cancel' &&
      this.message.account_type == 'Savings'
    ) {

      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: ["Y"],
            deleteTime: [new Date()],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )

      this.disabledFormControll();
    } else if (
      this.message.function_type == 'X-Cancel' &&
      this.message.account_type == 'Overdraft'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
           console.log(data.entity)
          // if(data.entity.withholdingTax==true){

          // }
          // else{


          // 
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: ["Y"],
            deleteTime: [new Date()],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'X-Cancel' &&
      this.message.account_type == 'Term-Deposit'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],
            accountBalance:[data.entity.accountBalance],
            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: ["Y"],
            deleteTime: [new Date()],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],
            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]
          });
        },
        error=>{
        }
      )
      this.disabledFormControll();
    } else if (
      this.message.function_type == 'X-Cancel' &&
      this.message.account_type == 'Current'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{        
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],
            accountBalance:[data.entity.accountBalance],
            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: ["Y"],
            deleteTime: [new Date()],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],
            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]
          });
        },
        error=>{
        }

      )
      this.disabledFormControll();
    }
    else if (
      this.message.function_type == 'X-Cancel' &&
      this.message.account_type == 'Office'
    ) {
      this.accountservice.retriveAccount(this.message.account_code).subscribe(
        data=>{
          this.resData =data.entity
          if(this.resData.withholdingTax==true){
            this.resData.withholdingTax="True"
          }else{
            this.resData.withholdingTax="False"
          }
          this.formData = this.fb.group({
            accountManager: [data.entity.accountManager],
            customerCode: [data.entity.customerCode],
            currency: [data.entity.currency],
            glSubhead: [data.entity.glSubhead],
            lienAmount: [data.entity.lienAmount],
            referredBy: [data.entity.referredBy],
            schemeCode: [data.entity.schemeCode],
            solCode: [data.entity.solCode],
            withholdingTax: [this.resData.withholdingTax],

            accountBalance:[data.entity.accountBalance],

            accountOwnership:[data.entity.accountOwnership],
            deleteFlag: ["Y"],
            deleteTime: [new Date()],
            postedBy: [data.entity.postedBy],
            postedFlag: [data.entity.postedFlag],
            openingDate: [data.entity.openingDate],
            postedTime: [data.entity.postedTime],
            modifiedBy: ['P'],
            modifiedTime: [new Date()],
            accountName: [data.entity.accountName],
            matured: [data.entity.matured],
            accountStatus: [data.entity.accountStatus],
            acid:[data.entity.acid],
            sn:[data.entity.sn],

            verifiedBy:["P"],
            verifiedFlag:["N"],
            verifiedTime:[new Date()]


            // amountDisbursed: [data.entity],
            // repaymentPeriod: [data.entity],
          });

        },
        error=>{

        }

      )
      this.disabledFormControll();
    }
  }

   
  onSubmit() {
    this.loading=true
    this.formData.value.loan={
      amountDisbursed:this.formData.value.amountDisbursed ,
      disbursementDate:new Date(),
      repaymentPeriod: this.formData.value.repaymentPeriod,
      loanDocuments: [
        {
          documentImage: this.customerImage,
          documentTitle: "string",
        },
        {
          documentImage: this.signatureImage,
          documentTitle: "string",
        }
      ]
    }

    if (this.formData.valid){

          if( this.message.account_type != 'Loan'){
    delete this.formData.value.loan
     delete this.formData.value.amountDisbursed
    delete this.formData.value.repaymentPeriod
    }
    console.log(this.formData.value);
    if( this.message.function_type == 'A-Add'){
      this.accountservice.createAccount(this.formData.value).subscribe(
        data=>{
          this.loading=false
          console.log(data.message)
          this.resMessage=data.message
                this._snackBar.open(this.resMessage, "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 10000,
                panelClass: ['green-snackbar'],
              });
        },
        error=>{
          this.loading=false
          //console.log("error")
            this._snackBar.open(error.error.message, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 10000,
              panelClass: ['red-snackbar'],
            });
        }
      )
      
    }
    if( this.message.function_type != 'A-Add'){
      this.accountservice.updateAccount(this.formData.value).subscribe(
        data=>{
          this.loading=false
          //console.log("works")
          this.resMessage=data.message
              this._snackBar.open(this.resMessage, "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 10000,
                panelClass: ['green-snackbar','login-snackbar'],
              });
        },
        error=>{
          //console.log("error")
          this.loading=false
            this._snackBar.open(error.error.message, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 10000,
              panelClass: ['red-snackbar'],
            });
        }
      )
      
    }

    }
    else{
      this.loading=false
        this._snackBar.open("Invalid Form Data", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 10000,
          panelClass: ['red-snackbar'],
        });
    }


    console.log(this.formData.value);
  }
customer_code:any
glSubheadArray:any

initGlSUbheadForm(){
  
  // this.glSubheadData = this.fb.group({

  // })
}

  //Checking for eligibility of a guarantors
  eligibilityTest(){

  this.accountservice.getCustomerEligibility(this.customer_code).subscribe(
    res =>{
        this.results = res
          this.glSubheadArray.push(this.glSubheadData.value);
    },
    err=>{
      this.error = err
      this._snackBar.open(this.error, "Try Again",{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }
  )

  // this.accountservice.getCustomerEligibility(this.customer_code).subscribe(
  //   res =>{
  //       this.results = res
  //       this.l.push(this.fb.group
  //         this.glSubheadData).value
  //         this.glSubheadArray.push(this.glSubheadData.value);

        
  //   },
  //   err=>{
  //     this.error = err
  //     this._snackBar.open(this.error, "Try Again",{
  //       horizontalPosition:this.horizontalPosition,
  //       verticalPosition:this.verticalPosition,
  //       duration:3000,
  //       panelClass:['red-snackbar', 'login-snackbar']
  //     })
  //   }
  // )

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

    // height: '400px',
    // width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("Gl Subhead data", result);
    this.formData.controls.glSubhead.setValue(result.data.glSubheadCode);
  });
}

branchSubheadLookup(): void {
  const dialogRef = this.dialog.open(BranchComponent, {
    // height: '400px',
    // width: '600px',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("Branch data", result);
    this.formData.controls.solCode.setValue(result.data.solCode);
  });
}

productLookup(): void {
  if(this.message.account_type=="Loan"){
    this.dtype="laa"
  }
  else if(this.message.account_type=="Office"){
    this.dtype="oda"           
  }
  else if(this.message.account_type=="Savings"){   
    this.dtype="sba"         
  }
  else if(this.message.account_type=="Overdraft"){
    this.dtype="oda"            
  }
  else if(this.message.account_type=="Current"){  
    this.dtype="caa"         
  }
  else if(this.message.account_type=="Term-Deposit"){ 
    this.dtype="tda"          
  }
  console.log(this.message.account_type)
  console.log(this.dtype)
  const dconfig= new MatDialogConfig()
  dconfig.data={
    type:this.dtype
  }
  const cdialogRef = this.dialog.open(ProductComponent,dconfig);
  cdialogRef.afterClosed().subscribe((result) => {
    console.log(result.data);
    
    if(this.dtype=="oda"){
      this.formData.controls.schemeCode.setValue(result.data.oda_scheme_code);
    }
    if(this.dtype=="sba"){
      this.formData.controls.schemeCode.setValue(result.data.sba_scheme_code);
    }
    if(this.dtype=="caa"){
      this.formData.controls.schemeCode.setValue(result.data.caa_scheme_code);
    }
    if(this.dtype=="tda"){
      this.formData.controls.schemeCode.setValue(result.data.tda_scheme_code);
    }
    if(this.dtype=="laa"){
      this.formData.controls.schemeCode.setValue(result.data.laa_scheme_code);
    }
  });
}

}
