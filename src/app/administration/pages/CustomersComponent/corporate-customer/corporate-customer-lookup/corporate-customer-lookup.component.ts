import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CorporateCustomerService } from '../corporate-customer.service';

@Component({
  selector: 'app-corporate-customer-lookup',
  templateUrl: './corporate-customer-lookup.component.html',
  styleUrls: ['./corporate-customer-lookup.component.scss']
})
export class CorporateCustomerLookupComponent implements OnInit {
  results:any
  entity:any
  displayedColumns : string[]= ['sn','Customer Code','Organisation Name']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;

  constructor(private corpService:CorporateCustomerService,
    private dialogRef:MatDialogRef<CorporateCustomerLookupComponent>) { }

  ngOnInit(): void {
    this.getData()
  }


  getData(){
    this.corpService.getAllCorporates().subscribe(
      data =>{
        this.results = data
        console.log(data);
        
        this.dataSource = new MatTableDataSource(this.results.entity)
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
