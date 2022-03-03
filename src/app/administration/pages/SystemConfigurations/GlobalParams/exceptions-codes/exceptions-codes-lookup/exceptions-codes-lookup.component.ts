import { Component, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiData } from '../../scheme-type/scheme-type-lookup/scheme-type-lookup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/@core/Service/AuthService/auth.service';
import { ExceptionsCodesServiceService } from '../exceptions-codes-service.service';

@Component({
  selector: 'app-exceptions-codes-lookup',
  templateUrl: './exceptions-codes-lookup.component.html',
  styleUrls: ['./exceptions-codes-lookup.component.scss']
})


export class ExceptionsCodesLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = [ 'index','exception_code','exce_description','exce_code_type','exce_working_class','is_verified','is_deleted'];
  dataSource!: MatTableDataSource<ApiData>;
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
    public dialogRef: MatDialogRef<ExceptionsCodesLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    private exceptionCodeAPI: ExceptionsCodesServiceService
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
      this.subscription = this.exceptionCodeAPI.getException_codes().subscribe(res => {
       this.data = res;
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
