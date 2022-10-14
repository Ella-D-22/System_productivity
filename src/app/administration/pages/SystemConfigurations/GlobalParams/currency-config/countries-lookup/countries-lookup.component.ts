import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { CurrencyService } from '../currency.service';


@Component({
  selector: 'app-countries-lookup',
  templateUrl: './countries-lookup.component.html',
  styleUrls: ['./countries-lookup.component.scss']
})
export class CountriesLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = [ 'index','ccy','country','ccy_name','del','verified'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data: any;
  error: any;
  employeeEmail: any;
  employee_id: any;
  creatingAccount = false;
  formData:any;
  respData: any;
  countryCode: any;
  loading: boolean = false;
  constructor(    
    public dialogRef: MatDialogRef<CountriesLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    private currencyAPI: CurrencyService

    ) { }
    ngOnInit() {
      this.getData();
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  getData() {
    this.loading = true;
      this.subscription = this.currencyAPI.getAllCountries().subscribe(res => {
       this.respData = res;
      for( let i=0; i<this.respData.length; i++){
        console.log("hey array",this.respData[i].currencies);
        
        let objKey = Object.keys(this.respData[i].currencies)
        if(objKey != null){
          this.countryCode = objKey;
        }else{
          this.countryCode = "Nill"
        }
      //  this.countryCode = 


       console.log("hey it shoul be ", Object.keys(this.respData[i].currencies));
       

      }
       console.log("hey form name", this.respData );
      //  console.log("hey form name", this.respData.currencies);
       
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.respData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      })
    }
    onSelect(data:any){
      this.dialogRef.close({ event: 'close', data:data });
    } 
}
