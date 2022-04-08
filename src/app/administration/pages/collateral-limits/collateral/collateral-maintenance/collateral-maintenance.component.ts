import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollateralLookupComponent } from '../collateral-lookup/collateral-lookup.component';
import { CollateralService } from '../collateral.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RetailCustomerLookupComponent } from '../../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
export interface ApiData {
  collateralType?: string;
  collateralCode?: string;
  description?: string;
  companyCode?: string;
  companyDetails?: string;
  contactDetails?: string;
  customerCode?: string;
  faceValue?: 0;
  margin?: 0;
  marketValue?: 0;
  otherDetails?: string;
  chargeEventForLodging?: string;
  chargEventForWithdrawal?: string;
  percentageDrawingPower?: 0;
  percentageLoanToTake?: 0;
  shareCapital?: 0;
  shareIssued?: 0;
  deletedBy?: string;
  deletedTime?: Date;
  deletedFlag?: string;
  verifiedBy?: string;
  verifiedTime?: Date;
  verifiedFlag?: string;
  postedBy?: string;
  postedTime?: string;
  postedFlag?: string;
  modifiedBy?: string;
  modifiedTime?: Date;
  sn?: 0;
}

@Component({
  selector: 'app-collateral-maintenance',
  templateUrl: './collateral-maintenance.component.html',
  styleUrls: ['./collateral-maintenance.component.scss'],
})
export class CollateralMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  subscription!: Subscription;
  params: any;
  lookupdata: any;
  newData = true;
  allcoretarals: ApiData[] = [];
  loading = false;
  submitted = false;
  collateralCode: any;
  function_type: any;
  error: any;
  description: any;
  available = false;
  show: boolean = false;
  showCode: boolean = false;

  functionArray: any = ['A-Add', 'I-Inquire', 'M-Modify', 'D-Delete'];
  Code: any;
  dialogData: any;
  customerCode: any;
  customerName: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private collateralService: CollateralService
  ) {}

  ngOnInit(): void {
    this.collateralService
      .retrieveAllColletaralsDefinitions()
      .subscribe((data) => {
        this.allcoretarals = data.entity;
      });
  }
  formData = this.formBuilder.group({
    function_type: ['', [Validators.required]],
    collateralCode: ['', [Validators.required]],
    customerCode: [''],
    customerName: ['']
  });
  collateralLookup() {
    const dialogRef = this.dialog.open(CollateralLookupComponent, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.lookupdata = result.data;
      this.collateralCode = this.lookupdata.collateralCode;
      this.description = this.lookupdata.description;
      this.formData.controls['collateralCode'].setValue(
        result.data.collateralCode
      );
    });
  }
  customerLookup():void{
    const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;    
      this.customerCode =   this.dialogData.customerCode
      this.customerName =   this.dialogData.firstName + " " + "" + this.dialogData.middleName + " " + "" + this.dialogData.surname
      this.formData.controls.customerCode.setValue(results.data.customerCode) 
      this.formData.controls.customerName.setValue(this.customerName)    
    })
  }
  onSelectionFunction(event: any) {
    this.function_type = event.target.value;
    if (event.target.value != 'A-Add') {
      this.formData.controls['collateralCode'].setValidators([
        Validators.required,
      ]);
    } else if (event.target.value == 'A-Add') {
      this.formData.controls['collateralCode'].setValidators([]);
    }
  }
  get f() {
    return this.formData.controls;
  }
  onSubmit() {
    this.Code = this.formData.value['colletaralCode'];
    for (let cls of this.allcoretarals) {

      if (this.formData.value.collateralCode == cls.collateralCode) {
        this.available = true;
        break;
      } else {
        this.available = false;
      }
    }

    this.loading = false;
    this.submitted = true;
    if (this.formData.valid) {

      this.function_type = this.formData.value['function_type'];
      if (this.available == false && this.function_type == 'A-Add') {
        this.router.navigate(
          ['configurations/collateral-limits/Collateral/data/view'],
          {
            state: this.formData.value,
          }
        );
      } else if (this.available == false && this.function_type != 'A-Add') {
        // this.available = false;
        this.showCode = true;
        this.loading = false;
      } else if (this.available == true && this.function_type == 'A-Add') {
        //this.available = false;
        this.show = true;
        this.loading = false;
      } else if (this.available == true && this.function_type != 'A-Add') {
        this.router.navigate(
          ['configurations/collateral-limits/Collateral/data/view'],
          {
            state: this.formData.value,
          }
        );
      }
    } else {
      this.loading = false;
      this._snackBar.open('Invalid Form Data', 'Try Again!', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackBar', 'login-snackBar'],
      });
    }
  }
}
