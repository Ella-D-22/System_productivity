import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TransactionExecutionService } from '../transaction-execution.service';
import { DatePipe } from '@angular/common';
import { TransactionExecutionLookupComponent } from '../transaction-execution-lookup/transaction-execution-lookup.component';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoanAccountComponent } from '../../loan-account/loan-account.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountLookupComponent } from '../account-lookup/account-lookup.component';
import { CurrencyLookupComponent } from '../../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';

@Component({
  selector: 'app-transaction-execution-main',
  templateUrl: './transaction-execution-main.component.html',
  styleUrls: ['./transaction-execution-main.component.scss']
})
export class TransactionExecutionMainComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  // Data Table
  displayedColumns: string[] = ['index','acid','partTranType','transactionAmount','transactionDate','transactionParticulars','exchangeRate'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  debit_value = 0.00;
  credit_value = 0.00;
  total_value = 0.00;
  dialogData: any;
  ccy_name: any;
  selectedCurrency: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  spinnerVisible: boolean = true;
  errorVisible: boolean = false;
  transactionTabIndex: number = 1;
  selection: number = 1;
  transactionType: string = 'NC';
  transactionNumber!: string;
  customerCode!: string;
  Valid = false;
  // transaction!: Transac
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  //unverified Transactions
  existingData: boolean;
  loading = false;
  transaction_code: number;
  submitted = false;
  currency: any;
  exchangeRate: any;
  error_message: string;
  partTrans: any;
  partTranType: any;
  transactionAmount: any;
  accountlookupData: any;
  error: any;
  accountReference: any;
  description: any;
  partTransForm: any;
  messageData: any;
  function_type: any;
  transactionId: any;
  resData: any;
  isDisable = false;
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private datepipe: DatePipe,
    private dialog :MatDialog,
    private fb: FormBuilder,
    private transactionAPI:TransactionExecutionService) { }
  ngOnInit(): void {
    this.getPage();
    this.initTransactionArray();
    this.getTransactions();
  }
  functionArray: any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]
  partTransactionTypeArray: any = [
    'Debit', 'Credit',
  ]
  transactionTypeArray: any = [
    'Normal Cash','Transfet Normal','Loan Repayment','Loan Disbursement','Kopo Kopo Batch','KCB Batch'
  ]
  user = "P"
  formData = this.fb.group({
    transactionId: [''],
    chequeNo: [''],
    currency: [''],
    deleteFlag: ['N'],
    exchangeRate: [''],
    postedBy: [this.user],
    postedFlag: ['Y'],
    postedTime: [new Date()],
    transactionSubType: [''],
    transactionType: ['', [Validators.required]],
    verifiedBy: ['P'],
    verifiedFlag: ['N'],
    verifiedTime: [new Date()],
    partTrans: new FormArray([]),
  })
  
  transactionForm = this.fb.group({
    sn:[''],
    acid: ['', [Validators.required]],
    isoFlag: ['Y', [Validators.required]],
    partTranSn: [''],
    exchangeRate: [''],
    partTranType: ['', [Validators.required]],
    transactionAmount: ['', [Validators.required]],
    transactionDate: ['', [Validators.required]],
    transactionParticulars: ['', [Validators.required]],
  })
  initTransactionForm(){
    this.transactionForm = this.fb.group({
      sn:[''],
      acid: [''],
      isoFlag: ['Y'],
      partTranSn: [''],
      exchangeRate: [''],
      partTranType: [''],
      transactionAmount: [''],
      transactionDate: [''],
      transactionParticulars: [''],
    })
  }

  get f() { return this.formData.controls; }
  get p() { return this.f.partTrans as FormArray; }
  
  currencyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogData = result.data;
      this.ccy_name = this.dialogData.ccy_name;
      this.formData.controls.currency.setValue(result.data);
      this.selectedCurrency =  this.dialogData.ccy_name;
    });
  }
 
  onAddField() {
    this.p.push(this.fb.group({
      sn:[''],
      acid: ['', [Validators.required]],
      isoFlag: ['Y', [Validators.required]],
      partTranSn: [''],
      partTranType: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required]],
      transactionDate: ['', [Validators.required]],
      transactionParticulars: ['', [Validators.required]],
    }));
  }

  onPreviewField(e:any) {

    this.p.push(this.fb.group({
      sn:[e.sn],
      acid: [e.acid,],
      isoFlag: [e.isoFlag],
      partTranSn: [e.partTranSn],
      partTranType: [e.partTranType],
      transactionAmount: [e.transactionAmount],
      transactionDate: [e.transactionDate],
      transactionParticulars: [e.transactionParticulars],
    }));
   
  }

  initPartransForm() {
    for (let i = 0; i < 2; i++) {
      this.onAddField();
    }
  }
  onRemoveField(i: any) {
    if (this.p.length < 3) {
      this._snackBar.open("Transaction Must Affect two accounts on execution!", "Try again!", {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });

    } else {
      this.p.removeAt(i);
    }
  }
  transactionLookup() {
    const dialogRef = this.dialog.open(TransactionExecutionLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.accountlookupData = result.data;
      this.accountReference = this.accountlookupData.accountReference;
      this.description = this.accountlookupData.accountReference.description;

      // this.partTransForm = this.p.controls[i];
      this.partTransForm .controls.acid.setValue(this.accountReference);
    });
  }
  accountLookup(): void {
    const dialogRef = this.dialog.open(AccountLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.accountlookupData = result.data;
      this.accountReference = this.accountlookupData.accountReference;
      this.description = this.accountlookupData.accountReference.description;

      // this.partTransForm = this.p.controls[i];
      // this.partTransForm .controls.acid.setValue(this.accountReference);
    });
  }

  onSelectFunction(event: any) {
    if (event.target.value != "A-Add") {
      this.existingData = true;
      this.formData.controls.solCode.setValue("")
      this.formData.controls.solCode.setValidators([Validators.required])
    } else if (event.target.value == "A-Add") {
      this.existingData = false;;
      this.formData.controls.solCode.setValidators([])
      this.formData.controls.solCode.setValue("");
    }
  }
  getPage(){
    this.transactionAPI.currentMessage.subscribe(message=>{
      this.messageData = message;      
      this.function_type = this.messageData.function_type
      this.transactionId = this.messageData.transactionId

        if(this.function_type == "A-Add"){
          this.formData = this.fb.group({
            transactionId: [''],
            chequeNo: [''],
            currency: [''],
            deleteFlag: ['N'],
            exchangeRate: [''],
            postedBy: [this.user],
            postedFlag: ['Y'],
            postedTime: [new Date()],
            transactionSubType: [''],
            transactionType: ['', [Validators.required]],
            verifiedBy: ['P'],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()],
            partTrans: new FormArray([]),
          })
        }
        
        else if(this.function_type == "I-Inquire"){
          this.formData.disable()
          this.transactionAPI.getTransactionId(this.transactionId).subscribe(res=>{
            this.resData = res;
            this.formData = this.fb.group({
              transactionId: [this.resData.transactionId],
              chequeNo: [this.resData.chequeNo],
              currency: [this.resData.currency],
              deleteFlag: [this.resData.deleteFlag],
              exchangeRate: [this.resData.exchangeRate],
              postedBy: [this.resData.postedBy],
              postedFlag: [this.resData.postedFlag],
              postedTime: [this.resData.postedTime],
              transactionSubType: [this.resData.transactionSubType],
              transactionType: [this.resData.transactionType],
              verifiedBy: [this.resData.verifiedBy],
              verifiedFlag: [this.resData.verifiedFlag],
              verifiedTime: [this.resData.verifiedTime],
              partTrans: new FormArray([]),
            })
            // get lenght of part trans
            for (let i = 0; i < this.resData.partTrans.length; i++) {
              this.onPreviewField(this.resData.partTrans[i])
            }
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          })
          
        }
        else if(this.function_type == "M-Modify"){
          this.transactionAPI.getTransactionId(this.transactionId).subscribe(res=>{
            this.resData = res;
            this.formData = this.fb.group({
              transactionId: [this.resData.transactionId],
              chequeNo: [this.resData.chequeNo],
              currency: [this.resData.currency],
              deleteFlag: [this.resData.deleteFlag],
              exchangeRate: [this.resData.exchangeRate],
              postedBy: [this.resData.postedBy],
              postedFlag: [this.resData.postedFlag],
              postedTime: [this.resData.postedTime],
              transactionSubType: [this.resData.transactionSubType],
              transactionType: [this.resData.transactionType],
              verifiedBy: [this.resData.verifiedBy],
              verifiedFlag: [this.resData.verifiedFlag],
              verifiedTime: [this.resData.verifiedTime],
              partTrans: new FormArray([]),
            })
            // get lenght of part trans
            for (let i = 0; i < this.resData.partTrans.length; i++) {
              this.onPreviewField(this.resData.partTrans[i])
            }
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          })
        }
        else if(this.function_type == "V-Verify"){
          // this.isDisable = true;
          this.transactionAPI.getTransactionId(this.transactionId).subscribe(res=>{
            this.resData = res;
            this.formData = this.fb.group({
              transactionId: [this.resData.transactionId],
              chequeNo: [this.resData.chequeNo],
              currency: [this.resData.currency],
              deleteFlag: [this.resData.deleteFlag],
              exchangeRate: [this.resData.exchangeRate],
              postedBy: [this.resData.postedBy],
              postedFlag: [this.resData.postedFlag],
              postedTime: [this.resData.postedTime],
              transactionSubType: [this.resData.transactionSubType],
              transactionType: [this.resData.transactionType],
              verifiedBy: [this.resData.verifiedBy],
              verifiedFlag: ["Y"],
              verifiedTime: [new Date()],
              partTrans: new FormArray([]),
            })
            // get lenght of part trans
            for (let i = 0; i < this.resData.partTrans.length; i++) {
              this.onPreviewField(this.resData.partTrans[i])
            }
          this.formData.disable()

          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          })
        }
    });
  }

  transactionArray = new Array();
  initTransactionArray(){
    this.transactionArray = new Array();
  }
  getTransactions(){
    this.dataSource = new MatTableDataSource(this.transactionArray );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addToArray(){
    if(this.transactionForm.valid){
      this.p.push(this.fb.group(this.transactionForm.value));
      this.transactionArray.push(this.transactionForm.value);
     
      this.partTranType = this.transactionForm.controls.partTranType.value
      this.transactionAmount = this.transactionForm.controls.transactionAmount.value
      console.log("hey form data", this.partTranType );
      
      if (this.partTranType == "Debit") {
        this.debit_value = this.debit_value + this.transactionAmount
      } else if (this.partTranType == "Credit") {
        this.credit_value = this.credit_value + this.transactionAmount
      }
      this.total_value = this.debit_value - this.credit_value
      if (this.total_value != 0) {
      this.Valid = false;
        this._snackBar.open("Transaction is not Valid! Balance Debit & Credit", "Try again!", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 500,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      } else {
      this.Valid = true;
        this._snackBar.open("Transaction accepted!", "X", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 500,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      }
      this.getTransactions();
      this.initTransactionForm();
      // for (var i = 0; i < this.transactionArray.length; i++) {
      //   this.partTranType = this.transactionArray[i].partTranType;
      //   this.transactionAmount = this.transactionArray[i].transactionAmount;
      //   if (this.partTranType == "Debit") {
      //     this.debit_value = this.debit_value + this.transactionAmount
      //   } else if (this.partTranType == "Credit") {
      //     this.credit_value = this.credit_value + this.transactionAmount
      //   }
      // }
      // this.total_value = this.debit_value - this.credit_value
    }
  }





  onSubmit() {
    console.log("Form Data", this.formData.value);
    
    this.formData.controls.postedTime.setValue(
      this.datepipe.transform(
        this.f.postedTime.value,
        'yyyy-MM-ddTHH:mm:ss'
      )
    );
    this.formData.controls.verifiedTime.setValue(
      this.datepipe.transform(
        this.f.verifiedTime.value,
        'yyyy-MM-ddTHH:mm:ss'
      )
    );

    if (this.formData.valid) {

      if (this.total_value != 0) {
        this._snackBar.open("Transaction is not Valid! Balance Debit & Credit", "Try again!", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      } else {
        this._snackBar.open("Transaction accepted!", "X", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 3000,
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        // Call api to submit transactions
        if(this.function_type == "A-Add"){
          this.transactionAPI.createTransaction(this.formData.value).subscribe(res=>{
            this._snackBar.open("Transaction Successful!", "X", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar'],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: "end",
              verticalPosition: "top",
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar'],
            });
          })
        }else if(this.function_type == "V-Verify"){
         
        }
        else if(this.function_type == "M-Modify"){
         
        }
      }
      this.submitted = true;
      this.router.navigate(['system/transactions/maintenance'], {skipLocationChange:true});

    }
    else {
      this._snackBar.open("Invalid Form! Check your inputs", "Try again!", {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }

  }
}


