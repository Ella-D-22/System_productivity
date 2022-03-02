import { Component, Inject, OnInit,ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {productService} from './product.service'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

export interface  product {
  schemeCode: String;
  productDescription: String;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isLoadingResults: boolean = true;
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<product>;
  type!: string

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<ProductComponent>,private productservice: productService,@Inject(MAT_DIALOG_DATA) data ) { 
this.type=data.type 
console.log(this.type)
    this.productservice.retrieveAllProducts(data.type).subscribe(
      (data) => {
        this.isLoadingResults = false;
        //console.log(data.entity)
        this.dataSource = new MatTableDataSource(data);
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
