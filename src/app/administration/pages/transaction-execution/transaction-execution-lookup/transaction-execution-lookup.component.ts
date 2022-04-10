import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionExecutionService } from '../transaction-execution.service';

@Component({
  selector: 'app-transaction-execution-lookup',
  templateUrl: './transaction-execution-lookup.component.html',
  styleUrls: ['./transaction-execution-lookup.component.scss']
})
export class TransactionExecutionLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = ['index','transactionId','transactionType','transactionSubType','currency','postedTime','verifiedFlag'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  respData: any;

  constructor(    
    public dialogRef: MatDialogRef<TransactionExecutionLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    public fb: FormBuilder,
    private transactionAPI: TransactionExecutionService,

    ) { }
    ngOnInit() {
      this.getData()
    }
    accountTypeArray: any = [
      'Office Account','Customer Account',
    ]

    

    formData = this.fb.group({
      account_type: [''],
    });

    // onSelectFunction(event:any){
    //   console.log("Selected Value", event.target.value);
      
    //   if(event.target.value == "Office Account"){
    //     this.getData("O");
    //   }
    //   if(event.target.value == "Customer Account"){
    //     this.getData("CL");
    //   }
    // }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    getData() {
      this.subscription = this.transactionAPI.getTransactions().subscribe(res => {
       this.respData = res;
       console.log(res);
    
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.respData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    onSelect(data:any){
      this.dialogRef.close({ event: 'close', data:data });
    } 
}


