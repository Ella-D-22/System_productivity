import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TransactionsService} from 'src/app/administration/pages/transactions/transactions/transactions.service'
import {AccountComponent} from 'src/app/administration/pages/transactions/lookup/account/account.component'

import { FormBuilder, Validators,FormArray,FormGroup, FormControl } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cash-transactions',
  templateUrl: './cash-transactions.component.html',
  styleUrls: ['./cash-transactions.component.scss']
})
export class CashTransactionsComponent implements OnInit {
  message!: any;
  resData: any;
  transaction_stype: any;

  loading = false;

  TypeArray: any = [
    {type:'Deposit',stype: 'NR'},
    {type:'Withdraw',stype: 'NP'},
    {type:'Loan Repayment',stype: 'LR'},   
  ]

  constructor( 
    private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private transactionservice: TransactionsService)
     { this.message = this.router.getCurrentNavigation()?.extras.state;}

  ngOnInit(): void {
  }
  onTypeChange(event:any){
    this.transaction_stype = event.target.value;
  }

  formData = this.fb.group({
    amount: [],
    command: ['A'],
    creditAccount: [''],
    currency: [''],
    debitAccount: [''],
    paymentChannel: ['C'],
    sol: [''],
    transactionDetails: [''],
    transactionSubType: [''],
    transactionType: ['C'],

  });

  get f() {
    return this.formData.controls;
  }

  onSubmit() {
    //this.formData.value.transactionType=this.message.transaction_type
    console.log(this.formData.value)
    console.log(this.message)



    if( this.formData.value.transactionSubType == 'NR'){
      this.transactionservice.postCashTransaction("deposit",this.formData.value).subscribe(
        data=>{
          console.log("works")
        },
        error=>{
          console.log("error")
        }
      )
      
    }
    else if( this.formData.value.transactionSubType == 'NP'){
      this.transactionservice.postCashTransaction("withdrawal",this.formData.value).subscribe(
        data=>{
          console.log("works")
        },
        error=>{
          console.log("error")
        }
      )
      
    }
    else if( this.formData.value.transactionSubType == 'LR'){
      this.transactionservice.postCashTransaction("lr",this.formData.value).subscribe(
        data=>{
          console.log("works")
        },
        error=>{
          console.log("error")
        }
      )
      
    }
  }


  savingsAccountLookup(): void {

    const dconfig= new MatDialogConfig()
    dconfig.data={
      type:"sb"
    }
    const cdialogRef = this.dialog.open(AccountComponent,dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      console.log(result.data);
      this.formData.controls.creditAccount.setValue(result.data.acid);
    });
  }
  officeAccountLookup(): void {

    const dconfig= new MatDialogConfig()
    dconfig.data={
      type:"oa"
    }
    const cdialogRef = this.dialog.open(AccountComponent,dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      console.log(result.data);
      this.formData.controls.debitAccount.setValue(result.data.acid);
    });
  }

}
