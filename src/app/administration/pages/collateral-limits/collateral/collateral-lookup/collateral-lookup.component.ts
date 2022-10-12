import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CollateralService } from '../collateral.service';

export interface ApiData{
  collateralType ?: string;
  collateralCode ?: string;
  description ?: string;
  companyCode ?: string;
  companyDetails ?: string;
  contactDetails ?: string;
  customerCode?:string;
  faceValue?: 0;
  margin ?: 0;
  marketValue ?:0,
  otherDetails ?:string;
  chargeEventForLodging ?:string,
  chargEventForWithdrawal ?:string;
  percentageDrawingPower ?:0,
  percentageLoanToTake ?:0,
  shareCapital ?:0,
  shareIssued ?:0,
  deletedBy ?: string;
  deletedTime ?: Date;
  deletedFlag ?:string
  verifiedBy ?: string;
  verifiedTime ?:  Date;
  verifiedFlag ?: string;
  postedBy ?:string;
  postedTime ?: string;
  postedFlag ?: string;
  modifiedBy ?: string;
  modifiedTime ?: Date;
  sn ?: 0

}

@Component({
  selector: 'app-collateral-lookup',
  templateUrl: './collateral-lookup.component.html',
  styleUrls: ['./collateral-lookup.component.scss']
})
export class CollateralLookupComponent implements OnInit {
  loading = false

 
  formData : any;
 
  displayedColumns : string[]= ['Collateral Code', 'Collateral Type']
 
  dataSource !: MatTableDataSource<ApiData>
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
   constructor(private collateralService:CollateralService,
     private dialogRef:MatDialogRef<CollateralLookupComponent>,
     public formBuilder:FormBuilder) { 
      
     }
 
   ngOnInit(): void {
     this.getData();
   }
  
   getData(){
     this.loading = true;
    this.collateralService.retrieveAllColletaralsDefinitions().subscribe(
      (data) =>{   
        this.loading = false
        this.dataSource = new MatTableDataSource(data.entity)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      },
      (error) =>{}
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
 