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
import { SavingschemeService } from '../savingscheme.service';
// import { LoanproductService } from '../loanproduct.service';

@Component({
  selector: 'app-savingscheme-lookup',
  templateUrl: './savingscheme-lookup.component.html',
  styleUrls: ['./savingscheme-lookup.component.scss']
})
export class SavingschemeLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = [ 'index','scheme_code','scheme_type','scheme_code_desc'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData:any;
  

  constructor(    
    private savingProductAPI:SavingschemeService,
    public dialogRef: MatDialogRef<SavingschemeLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    ) { }
    ngOnInit() {
      this.getData();
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
    getData() {
      this.subscription = this.savingProductAPI.getSavingschemes().subscribe(res => {
       this.data = res;
       console.log(res);
       
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    onSelect(data:any){
      this.dialogRef.close({ event: 'close', data:data });
    }
  
}
