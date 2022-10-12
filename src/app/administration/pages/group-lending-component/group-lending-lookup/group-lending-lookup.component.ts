import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GroupLendingService } from '../group-lending.service';

@Component({
  selector: 'app-group-lending-lookup',
  templateUrl: './group-lending-lookup.component.html',
  styleUrls: ['./group-lending-lookup.component.scss']
})
export class GroupLendingLookupComponent implements OnInit {
  results:any
  displayedColumns : string[]= ['index','mainGroupCode','mainGroupName','groupCode','groupName']
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 dataSource!: MatTableDataSource<any>;
 constructor(private fb:FormBuilder,
   private groupLendingAPI:GroupLendingService,
   private dialogRef:MatDialogRef<GroupLendingLookupComponent>) {
    }
 ngOnInit(): void {
   this.getData()
 }
 getData(){
   this.groupLendingAPI.getGroups().subscribe(
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
