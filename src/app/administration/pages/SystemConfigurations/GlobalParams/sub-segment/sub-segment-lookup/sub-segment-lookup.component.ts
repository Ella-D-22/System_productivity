import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SubSegmentMaintenanceComponent } from '../sub-segment-maintenance/sub-segment-maintenance.component';
import { SubSegmentService } from '../sub-segment.service';

@Component({
  selector: 'app-sub-segment-lookup',
  templateUrl: './sub-segment-lookup.component.html',
  styleUrls: ['./sub-segment-lookup.component.scss']
})
export class SubSegmentLookupComponent implements OnInit {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = [ 'index','subSegmentCode','subSegmentDescription','action'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean = false;
 
  fromDialog: any;
  subscription!:Subscription;
  subSegmentData: any;
  constructor(
    public dialogRef: MatDialogRef<SubSegmentMaintenanceComponent>,
    private subSegmentAPI:SubSegmentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.loading = true;
    this.subscription = this.subSegmentAPI.getAllSubSegment().subscribe(res=>{
      this.subSegmentData = res;
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.subSegmentData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
