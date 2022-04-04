import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubGroupService } from '../sub-group.service';

@Component({
  selector: 'app-sub-group-lookup',
  templateUrl: './sub-group-lookup.component.html',
  styleUrls: ['./sub-group-lookup.component.scss']
})
export class SubGroupLookupComponent implements OnInit {
   results:any

   displayedColumns : string[]= ['sn','Subgroup Code', 'Subgroup Name']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;

  constructor(private fb:FormBuilder,
    private subService:SubGroupService,
    private dialogRef:MatDialogRef<SubGroupLookupComponent>) {
     }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.subService.getSubGroups().subscribe(
      data =>{
        this.results = data
        console.log(this.results, "lookup data");
        
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
