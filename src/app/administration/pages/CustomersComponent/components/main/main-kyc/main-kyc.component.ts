import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerLookupComponent } from '../../../customer-lookup/customer-lookup.component';

@Component({
  selector: 'app-main-kyc',
  templateUrl: './main-kyc.component.html',
  styleUrls: ['./main-kyc.component.css']
})
export class MainKycComponent implements OnInit {
  customerTypeTabIndex: number = 1 ;
  customerTabIndex: number = 1 ;

  customerCode: string;
  lookupData: any;

  constructor(
    private router:Router,
    private dialog: MatDialog,

    ) { }

  ngOnInit(): void {
  }
  onTabClick(value: any){
    this.customerTypeTabIndex = value.target.value;
   
}
 onKycTabClick(value: any){
    this.customerTabIndex = value.target.value;
   
}

// getCustomers(){
  
// }

getCustomers(): void {
  const dialogRef = this.dialog.open(CustomerLookupComponent , {
    // height: '400px',
  });
  dialogRef.afterClosed().subscribe(result => {
    this.lookupData = result.data;
  });
}

navigate(){
  if (this. customerTypeTabIndex == 1 && this.customerTabIndex==1) {
    this.router.navigate(['system/customers/retail/add']);
  }
  if (this. customerTypeTabIndex == 1 && this. customerTabIndex == 2) {
    this.router.navigate(['system/customers/retail/inquire',this.customerCode]);
  }
  if (this. customerTypeTabIndex == 1 && this. customerTabIndex == 3) {
    this.router.navigate(['system/customers/retail/modify',this.customerCode]);
  }
  if (this. customerTypeTabIndex == 1 && this. customerTabIndex == 4) {
    this.router.navigate(['system/customers/retail/delete',this.customerCode]);
  }

  if (this. customerTypeTabIndex == 2 && this.customerTabIndex==1) {
    this.router.navigate(['system/customers/cooporate/add']);
  }
  if (this. customerTypeTabIndex == 2 && this. customerTabIndex == 2) {
    this.router.navigate(['system/customers/cooporate/inquire',this.customerCode]);
  }
  if (this. customerTypeTabIndex == 2 && this. customerTabIndex == 3) {
    this.router.navigate(['system/customers/cooporate/modify',this.customerCode]);
  }
  if (this. customerTypeTabIndex == 2 && this. customerTabIndex == 4) {
    this.router.navigate(['system/customers/cooporate/delete',this.customerCode]);
  }
}
}
