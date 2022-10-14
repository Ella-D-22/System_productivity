import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MainClassificationMaintenanceComponent } from '../main-classification-maintenance/main-classification-maintenance.component';
import { MainClassificationService } from '../main-classification.service';

@Component({
  selector: 'app-main-classification-lookup',
  templateUrl: './main-classification-lookup.component.html',
  styleUrls: ['./main-classification-lookup.component.scss']
})
export class MainClassificationLookupComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'mainClassificationCode',
    'mainClassificationDescription',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading: boolean = false;
  error: any;
  fromDialog: any;
  subscription!:Subscription;
  mainData: any;
  constructor(
    public dialogRef: MatDialogRef<MainClassificationMaintenanceComponent>,
    private mainAPI:MainClassificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.loading = true;
    this.subscription = this.mainAPI.getAllMainClassifications().subscribe(res=>{
      this.mainData = res;
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.mainData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      err => {
        this.error = err;
    });
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
