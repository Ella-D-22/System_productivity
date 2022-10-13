import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MisSectorComponent } from '../mis-sector.component';
import { MisSectorService } from '../mis-sector.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mis-sector-lookup',
  templateUrl: './mis-sector-lookup.component.html',
  styleUrls: ['./mis-sector-lookup.component.scss']
})
export class MisSectorLookupComponent implements OnInit {
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
  misData: any;
  constructor(
    public dialogRef: MatDialogRef<MisSectorComponent>,
    private sectorAPI:MisSectorService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.loading = true;
    this.subscription = this.sectorAPI.getAllMissectors().subscribe(res => {
      this.misData = res;
      this.loading = false;
      this.dataSource = new MatTableDataSource(this.misData);
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
