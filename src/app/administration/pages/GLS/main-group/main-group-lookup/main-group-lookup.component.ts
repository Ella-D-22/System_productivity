import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainGroupService } from '../main-group.service';

@Component({
  selector: 'app-main-group-lookup',
  templateUrl: './main-group-lookup.component.html',
  styleUrls: ['./main-group-lookup.component.scss']
})
export class MainGroupLookupComponent implements OnInit {

  results:any
  displayedColumns : string[]= ['index','mainGroupCode','mainGroupName','mainGroupPhone','mainGroupChairperson','mainGroupFormationDate']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  constructor(private mainService:MainGroupService,
    private dialogRef:MatDialogRef<MainGroupLookupComponent>,
    private fb:FormBuilder) { 
      this.mainService.getMainGroups().subscribe(
        data =>{
            this.results = data
            this.dataSource = new MatTableDataSource(this.results)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort; 
        }
      )
    }
  ngOnInit(): void {
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }
}
