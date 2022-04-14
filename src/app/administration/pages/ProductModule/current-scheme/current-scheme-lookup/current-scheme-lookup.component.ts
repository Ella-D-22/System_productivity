import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentSchemeService } from '../current-scheme.service';
export interface ApiData{}
@Component({
  selector: 'app-current-scheme-lookup',
  templateUrl: './current-scheme-lookup.component.html',
  styleUrls: ['./current-scheme-lookup.component.scss']
})


export class CurrentSchemeLookupComponent implements OnInit {
  results:any;
  formData : any;
  displayedColumns : string[]= ['Scheme Code','Scheme Description']
  dataSource !: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
   constructor(private currentSchemeService:CurrentSchemeService,
     private dialogRef:MatDialogRef<CurrentSchemeLookupComponent>,
     public formBuilder:FormBuilder) { 
       this.currentSchemeService.getCurrentschemes().subscribe(
         (data) =>{   
           console.log(data);
           this.results = data;
           console.log(this.results);
           this.dataSource = new MatTableDataSource(this.results)
           this.dataSource.paginator = this.paginator;
           this.dataSource.sort = this.sort;  
         },
         (error) =>{}
       )
     
     }
 
   ngOnInit(): void {
     // this.getData();
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
