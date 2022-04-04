import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LimitsService } from '../limits.service';

@Component({
  selector: 'app-limits-lookup',
  templateUrl: './limits-lookup.component.html',
  styleUrls: ['./limits-lookup.component.scss']
})
export class LimitsLookupComponent implements OnInit {


  formData : any;
  results : any
  displayedColumns : string[]= ['Customer Code','Limit ID', 'Fund Based','Non Fundbased', 'Limit Descrition']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
 
   constructor(private NodesApi:LimitsService,
     private dialogRef:MatDialogRef<LimitsLookupComponent>,
     public formBuilder:FormBuilder) { 
       
     
     }
 
   ngOnInit(): void {
     this.getData();
   }
  
   
   applyFilter(event:Event){
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
   }

   getData(){
    this.NodesApi.getLimitNodes().subscribe(
      (data) =>{   
        console.log("hey data",data);
        this.results = data
        this.dataSource = new MatTableDataSource(this.results)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      },
      (error) =>{}
    )
   }
 
 
   onSelect(data:any){
     this.dialogRef.close({ event: 'close', data:data });
   }
 
}
