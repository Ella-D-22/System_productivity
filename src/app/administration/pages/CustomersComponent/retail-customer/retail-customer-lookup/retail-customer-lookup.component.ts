import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { BranchesService } from '../../../branches/branches.service';
import { RetailCustomerService } from '../retail-customer.service';

@Component({
  selector: 'app-retail-customer-lookup',
  templateUrl: './retail-customer-lookup.component.html',
  styleUrls: ['./retail-customer-lookup.component.scss']
})
export class RetailCustomerLookupComponent implements OnInit, OnDestroy {
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
    public dialogRef: MatDialogRef<RetailCustomerLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    private retailCustAPI: RetailCustomerService,
    private branchesAPI:BranchesService,
    public fb: FormBuilder,

    ) { }
    ngOnInit() {
      this.getBranches();
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  customer_type_array: any = [
    {
      id: 1,
      value: 'retail', 
      name: 'Retail Customer'
    },
    {
      id: 2,
      value: 'corporate',
      name: 'Coorporate Customer'
    }
    ]
    // customer_branch_array: any = [
    //   ,'001- Main Office','049- Machakos Branch','072-Makueni Branch','078-Thika Branch'
    // ]
    getBranches(){
      this.subscription = this.branchesAPI.getBranchs().subscribe(res=>{
        console.log("The data from Branches", res);
        this.branchesdata = res;
        this.customer_branch_array = this.branchesdata.entity;

      }, err=>{

      });
    }

    formData = this.fb.group({
      branch_code:['', [Validators.required]],
      cust_type:['',[Validators.required]]
    })
  
    getFilteredCustomers(){
      console.log("form Data", this.formData.value);
     let customer_type: any = this.formData.controls.cust_type.value;
     let branch_code: any = this.formData.controls.branch_code.value;
    
     let params = new HttpParams()
     .set('solCode',branch_code);
      if(customer_type = 'retail'){
        this.loading = true;
        this.subscription = this.retailCustAPI.getRetailCustomerPerSolCode(params).subscribe(res=>{
          this.loading = false;
          this.respData = res;
          this.dataSource = new MatTableDataSource(this.respData.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err=>{
          this.loading = false;
  
        });
      }else if(customer_type = 'corporate'){
        this.loading = true;
        this.subscription = this.retailCustAPI.getRetailCustomerPerSolCode(params).subscribe(res=>{
          this.loading = false;
          this.respData = res;
          //     console.log("Getting all data",this.respData);
          this.dataSource = new MatTableDataSource(this.respData.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err=>{
          this.loading = false;
        });
      } 
    }

  onSubmit() {
      
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
