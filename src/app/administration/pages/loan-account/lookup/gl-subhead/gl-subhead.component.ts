import { Component, Inject, OnInit,ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {GlSubheadService} from './gl-subhead.service'

export interface  GlSubhead {
  code: String;
  name: String;
}

@Component({
  selector: 'app-gl-subhead',
  templateUrl: './gl-subhead.component.html',
  styleUrls: ['./gl-subhead.component.css']
})
export class GlSubheadLookup2Component implements OnInit {
  isLoadingResults: boolean = true;
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<GlSubhead>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<GlSubheadLookup2Component>,private glsubheadService: GlSubheadService,@Inject(MAT_DIALOG_DATA) data) { 
    this.glsubheadService.retrieveAllSubheads().subscribe(
      (data) => {
        this.isLoadingResults = false;
        //console.log(data.entity)
        this.dataSource = new MatTableDataSource(data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(data);
      },
      (error) => {}
    );
  }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelect(data: any) {
    this.dialogRef.close({ event: 'close', data: data });
  }

}
