import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountsService } from '../../accounts-module/accounts.service';
import { BranchesService } from '../../branches/branches.service';
@Component({
  selector: 'app-account-lookup',
  templateUrl: './account-lookup.component.html',
  styleUrls: ['./account-lookup.component.scss']
})
export class AccountLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = [ 'index','cust_code','cust_name','cust_id','cust_occupation','cust_joiningdate'];
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
  loading = false;
  customer_branch_array: Object;
  branchesdata: any;
  constructor(    
    public dialogRef: MatDialogRef<AccountLookupComponent>,
    private accountsAPI: AccountsService,
    private branchesAPI:BranchesService,
    public fb: FormBuilder,

    ) { }
    ngOnInit() {
      this.getBranches();
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    customerTypeArray: any = [
      'Retail Customer','Coorporate Customer'
    ]
    accountTypeArray: any = [
      'Office Account','Customer Account'
    ]
    accountStatusArray: any = [
      'Active','Suspended','Frozen','Dormant'
    ]
    getBranches(){
      this.subscription = this.branchesAPI.getBranchs().subscribe(res=>{
        this.branchesdata = res;
        this.customer_branch_array = this.branchesdata.entity;
      }, err=>{
      });
    }
    formData = this.fb.group({
      customerType:['', [Validators.required]],
      accountType:['',[Validators.required]],
      solCode:['', [Validators.required]],
      accountStatus:['',[Validators.required]]
    })
  
    getFilteredCustomers(){
      console.log("form Data", this.formData.value);
    
     let customer_type: any = this.formData.controls.cust_type.value;
     let branch_code: any = this.formData.controls.branch_code.value;
    
     let params = new HttpParams()
     .set('solCode',branch_code);
      // if(customer_type = 'Retail Customer'){
      //   this.loading = true;
      //   this.subscription = this.retailCustAPI.getRetailCustomerPerSolCode(params).subscribe(res=>{
      //     this.loading = false;
      //     this.respData = res;
      //     this.dataSource = new MatTableDataSource(this.respData.entity);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   }, err=>{
      //     this.loading = false;
  
      //   });
      // }else if(customer_type = 'Coorporate Customer'){
      //   this.loading = true;
      //   this.subscription = this.retailCustAPI.getRetailCustomerPerSolCode(params).subscribe(res=>{
      //     this.loading = false;
      //     this.respData = res;
      //     //     console.log("Getting all data",this.respData);
      //     this.dataSource = new MatTableDataSource(this.respData.entity);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   }, err=>{
      //     this.loading = false;
      //   });
      // } 
    }    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    onSelect(data:any){
      this.dialogRef.close({ event: 'close', data:data });
    } 
}
