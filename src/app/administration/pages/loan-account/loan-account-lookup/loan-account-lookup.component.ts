import { Component, Inject, OnInit,ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoanAccountService} from '../loan-account.service'




@Component({
  selector: 'app-loan-account-lookup',
  templateUrl: './loan-account-lookup.component.html',
  styleUrls: ['./loan-account-lookup.component.scss']
})
export class LoanAccountLookupComponent implements OnInit {
  isLoadingResults: boolean = true;
  displayedColumns: string[] = ['index','acid','accountName','accountStatus','currency','solCode','schemeType','customerCode'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  account_type: string;

  constructor(public dialogRef: MatDialogRef<LoanAccountLookupComponent>,private accountService: LoanAccountService,@Inject(MAT_DIALOG_DATA) data: any ) { 
    this.accountService.retrieveAllAccounts(data.type).subscribe(
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
    console.log("this is data type", data.type)

    if(data.type=="la"){
      this.account_type="LOAN"
    }
    else if(data.type=="oa"){
      this.account_type="OFFICE"       
    }
    else if(data.type=="sb"){ 
      this.account_type="SAVINGS"  
    }
    else if(data.type=="od"){
      this.account_type="OVERDRAFTS"          
    }
    else if(data.type=="ca"){  
      this.account_type="CURRENT"       
    }
    else if(data.type=="td"){ 
      this.account_type="TERM-DEPOSIT"         
    }
    

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
