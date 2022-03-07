import { Component, OnInit } from '@angular/core';
import { Interest } from './interfaces/interest';
import { Slab } from './interfaces/slab';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { InterestService } from './interest.service';
import { Router } from '@angular/router';

import { CurrencyLookupComponent } from '../SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {

  message!: any;

  horizontalPosition :MatSnackBarHorizontalPosition = 'end';
  verticalPosition : MatSnackBarVerticalPosition = 'top';
  loading: any=false

  
  code!: any;

  interest!: Interest;

  rinterest!: Interest;
  
  sn!: number;
  interestCode!: string;
  currency!: string;
  startDate!: Date;
  endDate!: Date;
  fullDiff: string = 'F';
  dlength: number;
  clength: number;

  cfrom!: number;
  cto!: number;
  crate!: number;
  cdrCr: string = 'C';
  cfslab: Slab = {};

  dfrom!: number;
  dto!: number;
  drate!: number;
  ddrCr: string = 'D';
  dfslab: Slab = {};

  dslab: Slab = {};
  dslabs: Slab[] = [];

  cslab: Slab = {};
  cslabs: Slab[] = [];

  rcSlabs: Slab[]=[]
  rdSlabs: Slab[]=[]
  currency_name: any;

  // slabs: Slab[]=[]

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private interestservice: InterestService) {
      this.code = this.router.getCurrentNavigation()?.extras.state;
      this.interestCode=this.code.code
      if(this.code.type!="A-Add"){
        this.interestservice.retriveInterestDefinition(this.code.code).subscribe(
          (data)=>{
            this.rinterest=data
    
            for (let csl of this.rinterest.amountSlabs) {
              if(csl.drCr=="D"){
                this.rdSlabs.push(csl)
              }
              else{
                this.rcSlabs.push(csl)
              }
            }
            console.log(data)
          },
          (error)=>{
     console.log("error");
     
          }
        )
      }


      this.interest = { amountSlabs: [] };
      this.cslab = { fromAmount: 0, drCr: 'C' };
      this.dslab = { fromAmount: 0, drCr: 'D' };
  
      this.dslabs.push(this.dslab);
      this.cslabs.push(this.cslab);
  
      this.dlength = this.dslabs.length;
      this.clength = this.cslabs.length;
     }

  ngOnInit(): void {

  }
  removeDSlab() {
    this.dslabs.splice(this.dslabs.length - 1, 1);
    this.dlength = this.dslabs.length;
  }

  removeCSlab() {
    this.cslabs.splice(this.cslabs.length - 1, 1);
    this.clength = this.cslabs.length;
  }

  addDSlab() {
    if (this.dlength == 0) {
      this.dslab = { fromAmount: 0, drCr: 'D' };
      this.dslabs.push(this.dslab);
    } else {
      this.dslab = {
        fromAmount: this.dslabs[this.dslabs.length - 1].toAmount + 1,
        drCr: 'D',
      };
      this.dslabs.push(this.dslab);
    }
    this.dlength = this.dslabs.length;
  }

  addCSlab() {
    if (this.clength == 0) {
      this.cslab = { fromAmount: 0, drCr: 'D' };
      this.cslabs.push(this.cslab);
    } else {
      this.cslab = {
        fromAmount: this.cslabs[this.cslabs.length - 1].toAmount + 1,
        drCr: 'C',
      };
      this.cslabs.push(this.cslab);
    }
    this.clength = this.cslabs.length;
  }

  submitInterest() {
    this.interest.interestCode = this.interestCode;
    this.interest.currency = this.currency;
    this.interest.fullDiff = this.fullDiff;
    this.interest.startDate = this.startDate;
    this.interest.endDate = this.endDate;

    this.interest.postedBy = 'KAMAU';
    this.interest.postedFlag = 'Y';
    this.interest.postedTime = new Date();
    this.interest.modifiedBy = 'KAMAU';
    this.interest.modifiedTime = new Date();
    this.interest.verifiedBy = 'KAMAU';
    this.interest.verifiedTime = new Date();
    this.interest.verifiedFlag = 'Y';
    this.interest.deletedFlag = 'N';

    if (this.fullDiff == 'F') {
      this.cfslab.drCr = this.cdrCr;
      this.cfslab.rate = this.crate;
      this.cfslab.interestCode = this.interestCode;
      this.cfslab.postedBy = 'KAMAU';
      this.cfslab.modifiedBy = 'KAMAU';
      this.cfslab.postedTime = new Date();
      this.cfslab.verifiedFlag = 'Y';
      this.cfslab.postedFlag = 'Y';
      this.cfslab.deletedFlag = 'N';
      this.interest.amountSlabs.push(this.cfslab);

      this.dfslab.drCr = this.ddrCr;
      this.dfslab.rate = this.drate;
      this.dfslab.interestCode = this.interestCode;
      this.dfslab.postedBy = 'KAMAU';
      this.dfslab.modifiedBy = 'KAMAU';
      this.dfslab.postedTime = new Date();
      this.dfslab.verifiedFlag = 'Y';
      this.dfslab.postedFlag = 'Y';
      this.dfslab.deletedFlag = 'N';
      this.interest.amountSlabs.push(this.dfslab);
    }
    if (this.fullDiff == 'D') {
      for (let sl of this.dslabs) {
        sl.interestCode = this.interestCode;
        sl.postedTime = new Date();
        sl.postedBy = 'KAMAU';
        sl.modifiedBy = 'KAMAU';
        sl.verifiedFlag = 'N';
        sl.postedFlag = 'Y';
        sl.deletedFlag = 'N';
      }

      for (let Csl of this.cslabs) {
        Csl.interestCode = this.interestCode;
        Csl.postedTime = new Date();
        Csl.modifiedBy = 'KAMAU';
        Csl.postedBy = 'KAMAU';
        Csl.verifiedFlag = 'N';
        Csl.postedFlag = 'Y';
        Csl.deletedFlag = 'N';
      }

      this.interest.amountSlabs = this.dslabs.concat(this.cslabs);
    }

    this.interestservice.createInterest(this.interest).subscribe(
      (data) => {
        this.loading=false
        console.log(data.message)
        this.message=data.message
              this._snackBar.open(this.message, "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 10000,
              panelClass: ['green-snackbar'],
            });
      },
      (error) => {
        this.loading=false
        //console.log("error")
          this._snackBar.open(error.error.message, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
            panelClass: ['red-snackbar'],
          });
      }
    );

    console.log(this.interest);
  }

  updateInterest(){
    console.log("d", this.rdSlabs)
    console.log("c", this.rcSlabs)

    this.rinterest.amountSlabs=this.rdSlabs.concat(this.rcSlabs)
    console.log(this.rinterest)

    this.interestservice.updateInterestDefinition(this.rinterest).subscribe(

      (data) => {
        this.loading=false
        console.log(data.message)
        this.message=data.message
              this._snackBar.open(this.message, "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 10000,
              panelClass: ['green-snackbar'],
            });
      },
      (error) => {
        this.loading=false
        //console.log("error")
          this._snackBar.open(error.error.message, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
            panelClass: ['red-snackbar'],
          });
      }

    )
  }
  deleteInterest(){
    this.interest.deletedFlag="Y"
    this.interest.deletedTime=new Date()
    this.interest.deletedBy="KAMAU"
    console.log(this.interest)

    this.interestservice.updateInterestDefinition(this.interest).subscribe(

      (data) => {
        this.loading=false
        console.log(data.message)
        this.message=data.message
              this._snackBar.open(this.message, "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 10000,
              panelClass: ['green-snackbar'],
            });
      },
      (error) => {
        this.loading=false
        //console.log("error")
          this._snackBar.open(error.error.message, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 10000,
            panelClass: ['red-snackbar'],
          });
      }
    );

  }

  currencyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.currency_name = result.data.ccy_name;
      this.currency = result.data.ccy;
      //this.formData.controls.chrg_calc_crncy.setValue(result.data);
    });
  }
}
