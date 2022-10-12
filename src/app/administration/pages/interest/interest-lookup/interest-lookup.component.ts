import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Interest } from '../interfaces/interest';
import { InterestService } from '../interest.service';

@Component({
  selector: 'app-interest-lookup',
  templateUrl: './interest-lookup.component.html',
  styleUrls: ['./interest-lookup.component.scss']
})
export class InterestLookupComponent implements OnInit {

  isLoadingResults: boolean = true;
  displayedColumns: string[] = ['interestCode','startDate','endDate','fullDiff','currency','verifiedFlag'];
  // dataSource = branches;
  dataSource: MatTableDataSource<Interest>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<InterestLookupComponent>,
    private interestService: InterestService) { 
      this.interestService.retrieveAllInterestDefinitions().subscribe(
        (data) => {
          this.isLoadingResults = false;
          console.log(data.entity)
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
