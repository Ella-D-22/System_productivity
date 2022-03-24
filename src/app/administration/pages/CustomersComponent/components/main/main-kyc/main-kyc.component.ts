import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-kyc',
  templateUrl: './main-kyc.component.html',
  styleUrls: ['./main-kyc.component.css']
})
export class MainKycComponent implements OnInit {
  customerTypeTabIndex: number = 1 ;
  customerTabIndex: number = 1 ;

  customerCode: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onTabClick(value: any){
    this.customerTypeTabIndex = value.target.value;
   
}
 onKycTabClick(value: any){
    this.customerTabIndex = value.target.value;
   
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
