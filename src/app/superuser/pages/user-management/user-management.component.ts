import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['index','username','fullName','phoneNo','email','solCode','acctActive','acctLocked','createdOn','modifiedOn','modifiedBy','verifiedBy','deleteFlag','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  constructor(    
        private authService: AuthService,
        private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    ) { }
    ngOnInit() {
      this.getDepartmentData();
    }
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
    getDepartmentData() {
     this.subscription =  this.authService.allUsers().subscribe(res => {
       this.data = res;
       console.log("this.res", res);
       
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    onDelete(id: any) {
      if (window.confirm('Are you sure to delete?')) {
     
      }
    }
    onResetPassword(data){
      let password = Math.random().toString(36).slice(-8);
      let resetPassForm  = this.fb.group({    
          emailAddress: [data.email],
          password: [password],
          confirmPassword: [password],
      });
      this.subscription = this.authService.resetPassword(resetPassForm.value).subscribe(res=>{
        this._snackBar.open("Successfull!", "X", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['green-snackbar','login-snackbar'],
        });
      }, err=>{
        this._snackBar.open(this.error, "Try again!", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      })
      
    }
}