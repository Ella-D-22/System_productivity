import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MisSubSectorComponent } from '../mis-sub-sector.component';
import { MisSubSectorService } from '../mis-sub-sector.service';

@Component({
  selector: 'app-mis-sub-sector-lookup',
  templateUrl: './mis-sub-sector-lookup.component.html',
  styleUrls: ['./mis-sub-sector-lookup.component.scss']
})
export class MisSubSectorLookupComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'miscode',
    'mis_sector',
    'mis_sector_desc',
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
  subSectorData: any;
  constructor(
    public dialogRef: MatDialogRef<MisSubSectorComponent>,
    private subSectorAPI:MisSubSectorService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.subSectorAPI.getSubSector().subscribe(res => {
      this.subSectorData = res;
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.subSectorData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("sub Sector", this.subSectorData);
      
    },
      err => {
        this.error = err;
      }
    );
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
