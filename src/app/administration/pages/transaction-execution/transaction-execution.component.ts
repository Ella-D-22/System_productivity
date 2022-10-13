import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionExecutionLookupComponent } from './transaction-execution-lookup/transaction-execution-lookup.component';
import { MatDialog } from '@angular/material/dialog';
import { TransactionExecutionService } from './transaction-execution.service';

@Component({
  selector: 'app-transaction-execution',
  templateUrl: './transaction-execution.component.html',
  styleUrls: ['./transaction-execution.component.scss']
})
export class TransactionExecutionComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  spinnerVisible: boolean= true;
  errorVisible: boolean= false;
  transactionTabIndex: number = 1;
  selection: number = 1;
  transactionType: string = 'NC';
  transactionNumber!: string;
  customerCode!: string;
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
  accountlookupData: any;
  accountReference: any;
  description: any;
  partTransForm: any;
  lookupData: any;
  transactionId: any;
  constructor(private router:Router,
  private transactionAPI: TransactionExecutionService,
  private dialog: MatDialog,
  private fb : FormBuilder,) { }
  ngOnInit(): void {
  }
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify'
  ]
  formData = this.fb.group({
    function_type:['', [Validators.required]],
    transactionId:['']
  })
  transactionLookup() {
    const dialogRef = this.dialog.open(TransactionExecutionLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.transactionId = this.lookupData.transactionId;
      this.transactionType = this.lookupData.transactionType
      this.formData.controls.transactionId.setValue(this.transactionId)
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
     
    }else if(event.target.value == "A-Add"){
      this.existingData = false;;
    }
  }
  get f() { return this.formData.controls; }
  onSubmit(){
   this.submitted = true;
   if(this.formData.valid){
    this.transactionAPI.changeMessage(this.formData.value)
    this.router.navigate(['system/transactions/cash/data/view'], {skipLocationChange:true});
   }
  }
  // 
}

