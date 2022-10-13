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
import { GlCodeLookupComponent } from '../../gl-code/gl-code-lookup/gl-code-lookup.component';
import { GlSubheadService } from '../gl-subhead.service';

@Component({
  selector: 'app-gl-subhead-lookup',
  templateUrl: './gl-subhead-lookup.component.html',
  styleUrls: ['./gl-subhead-lookup.component.scss']
})
export class GlSubheadLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = [ 'index','glCode','glSubheadCode','glSubheadDescription','is_verified','is_deleted'];
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
  respData: any;

  constructor(    
    public dialogRef: MatDialogRef<GlCodeLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    private glSubheadCodeAPI: GlSubheadService,
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
      
      this.subscription = this.glSubheadCodeAPI.getGlSubheadCodes().subscribe(res => {
       this.respData = res;
        console.log("Getting all data",this.respData);
        
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.respData.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    onSelect(data:any){
      this.dialogRef.close({ event: 'close', data:data });
    } 
}
