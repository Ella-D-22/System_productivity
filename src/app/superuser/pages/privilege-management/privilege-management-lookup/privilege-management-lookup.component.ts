import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrivilegeManagementService } from '../privilege-management.service';

@Component({
  selector: 'app-privilege-management-lookup',
  templateUrl: './privilege-management-lookup.component.html',
  styleUrls: ['./privilege-management-lookup.component.scss']
})
export class PrivilegeManagementLookupComponent implements OnInit {

  results:any
  displayedColumns : string[]= ['sn','Group Code', 'Group Name']


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;

  constructor(
    private privilegeService: PrivilegeManagementService,
    private dialogRef:MatDialogRef<PrivilegeManagementLookupComponent>,
    private fb:FormBuilder) { 
    }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.privilegeService.getPrivilegeManagements().subscribe(
      data =>{
          this.results = data
          this.dataSource = new MatTableDataSource(this.results)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
      }
    )
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
