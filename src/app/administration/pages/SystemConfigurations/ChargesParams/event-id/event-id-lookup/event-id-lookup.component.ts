import { Component, NgZone, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { EventIdService } from '../event-id.service';

@Component({
  selector: 'app-event-id-lookup',
  templateUrl: './event-id-lookup.component.html',
  styleUrls: ['./event-id-lookup.component.scss']
})
export class EventIdLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  title = 'export-table-data-to-any-format';
  displayedColumns: string[] = [ 'index','event_id','event_id_desc','event_type','event_type_desc','is_verified','is_deleted'];           
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
    public dialogRef: MatDialogRef<EventIdLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    private eventIdAPI: EventIdService
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
      this.subscription = this.eventIdAPI.getEventIds().subscribe(res => {
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
