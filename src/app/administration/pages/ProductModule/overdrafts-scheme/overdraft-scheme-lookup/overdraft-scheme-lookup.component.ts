import { Component, Inject, OnInit,ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import {LoanAccountService} from '../loan-account.service'
import { OverdraftService } from 'src/app/administration/pages/ProductModule/overdrafts-scheme/overdraft.service';


export interface  ApiData {
  oda_scheme_code: String;
  oda_scheme_code_desc: String;

}

@Component({
  selector: 'app-overdraft-scheme-lookup',
  templateUrl: './overdraft-scheme-lookup.component.html',
  styleUrls: ['./overdraft-scheme-lookup.component.scss']
})
export class OverdraftSchemeLookupComponent implements OnInit {
  isLoadingResults: boolean = true;
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<ApiData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<OverdraftSchemeLookupComponent>,private odaAPI: OverdraftService,) { 
    // this.odaAPI.getOverdrafts.subscribe(
    //   res => {
    //     this.isLoadingResults = false;
    //     //console.log(data.entity)
    //     this.dataSource = new MatTableDataSource(data.entity);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     console.log(data);
    //   },
    //   (error) => {}
    // );
    this.odaAPI.getOverdrafts().subscribe(
      (data) => {
        this.isLoadingResults = false;
        //console.log(data.entity)
        this.dataSource = new MatTableDataSource(data);
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
