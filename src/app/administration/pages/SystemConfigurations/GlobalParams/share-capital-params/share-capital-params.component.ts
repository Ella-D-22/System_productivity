import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoanAccountLookupComponent } from '../../../loan-account/loan-account-lookup/loan-account-lookup.component';
import { ShareCapitalParamsService } from './share-capital-params.service';

@Component({
  selector: 'app-share-capital-params',
  templateUrl: './share-capital-params.component.html',
  styleUrls: ['./share-capital-params.component.scss']
})
export class ShareCapitalParamsComponent implements OnInit {
 subscription:Subscription
 results:any
 error:any
 horizontalPosition:MatSnackBarHorizontalPosition
 verticalPosition:MatSnackBarVerticalPosition
  message: any;
  function_type: any;
  scheme_id: any;
  organization_id: any;
  isEnabled: boolean;
  _snackBar: any;
  ngZone: any;
  dtype: any;
  constructor(
    private ParamsService:ShareCapitalParamsService,
    private fb:FormBuilder,
    private dialog:MatDialog,
    private _snackbar:MatSnackBar,
    private router:Router) { }
  ngOnInit(){
    this.getPage()
  }

  officeAccountLookup(): void {
    this.dtype="oa"  
    const dconfig= new MatDialogConfig()
    dconfig.data={
      type:this.dtype
    }
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      console.log(result.data);
      this.formData.controls.account_code.setValue(result.data.acid);
    });
  }
  
  formData = this.fb.group({
    id: [''],
    share_capital_unit:[''],
    share_capital_amount_per_unit:[''],
    share_min_unit:[''],
    shares_office_ac:[''],
    modifiedBy: ['N'],
    modifiedTime: [new Date()],
    postedBy: ['N'],
    postedFlag: ['Y'],
    postedTime:[new Date()],
    verifiedBy:['N'],
    verifiedFlag: ['N'],
    verifiedTime:[new Date()],
    deleteFlag: ['N'],
    deletedBy: ['N'],
    deletedTime: [new Date()],
  })
  get f() { return this.formData.controls; }

getPage(){
  this.subscription = this.ParamsService.currentMessage.subscribe(message =>{
    this.message = message;      
    this.function_type = this.message.function_type
  if(this.function_type == "A-Add"){
    this.isEnabled = true;
    this.formData = this.fb.group({
      id: [''],
      share_capital_unit:[''],
      share_capital_amount_per_unit:[''],
      share_min_unit:[''],
      shares_office_ac:[''],
      modifiedBy: ['N'],
      modifiedTime: [new Date()],
      postedBy: ['N'],
      postedFlag: ['Y'],
      postedTime:[new Date()],
      verifiedBy:['N'],
      verifiedFlag: ['N'],
      verifiedTime:[new Date()],
      deleteFlag: ['N'],
      deletedBy: ['N'],
      deletedTime: [new Date()],
    });
  this.formData.controls.is_verified.disable();
  this.formData.controls.is_deleted.disable();
  }
  else if(this.function_type == "I-Inquire"){
    this.formData.disable()
    this.isEnabled = false;
    this.subscription = this.ParamsService.getLastEntry().subscribe(res=>{
      this.results = res;
      this.formData = this.fb.group({
        id: [this.results.id],
        share_capital_unit:[this.results.share_capital_unit],
        share_capital_amount_per_unit:[this.results.share_capital_amount_per_unit],
        share_min_unit:[this.results.share_min_unit],
        shares_office_ac:[this.results.shares_office_ac],
        modifiedBy: [this.results.modifiedBy],
        modifiedTime: [this.results.modifiedTime],
        postedBy: [this.results.postedBy],
        postedFlag: [this.results.postedFlag],
        postedTime:[this.results.postedTime],
        verifiedBy:[this.results.verifiedBy],
        verifiedFlag: [this.results.verifiedFlag],
        verifiedTime:[this.results.verifiedTime],
        deleteFlag: [this.results.deleteFlag],
        deletedBy: [this.results.deletedBy],
        deletedTime: [this.results.deletedTime],
      });
    }, err=>{
      this.error = err;
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
    })
  }
  else if(this.function_type == "V-Verify"){
    this.formData.disable()
    this.isEnabled = true;
    this.subscription = this.ParamsService.getLastEntry().subscribe(res=>{
      this.results = res;
      this.formData = this.fb.group({
        id: [this.results.id],
        share_capital_unit:[this.results.share_capital_unit],
        share_capital_amount_per_unit:[this.results.share_capital_amount_per_unit],
        share_min_unit:[this.results.share_min_unit],
        shares_office_ac:[this.results.shares_office_ac],
        modifiedBy: [this.results.modifiedBy],
        modifiedTime: [this.results.modifiedTime],
        postedBy: [this.results.postedBy],
        postedFlag: [this.results.postedFlag],
        postedTime:[this.results.postedTime],
        verifiedBy:[this.results.verifiedBy],
        verifiedFlag: [this.results.verifiedFlag],
        verifiedTime:[this.results.verifiedTime],
        deleteFlag: [this.results.deleteFlag],
        deletedBy: [this.results.deletedBy],
        deletedTime: [this.results.deletedTime],
      });
      }, err=>{
        this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
      })
  }
})
}
  disabledFormControll() {
    throw new Error('Method not implemented.');
  }

  onSubmit(){
    
    if(this.formData.valid){
      this.subscription = this.ParamsService.createShareCapitalParams(this.formData.value).subscribe(
        res =>{
          this.results = res
          this._snackbar.open("Executted Successfully","X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']
          });
          this.router.navigate(["system/configurations/global/share-capital/params/maintenance"],{skipLocationChange:true})
        },
        err =>{
          this.error = err
          this._snackbar.open(this.error,"Try Again",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-snackbar', 'login-snackbar']
          })
        }
      )
    }else {
      this._snackbar.open("Invalid Form Data Valua", "Try Again",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar','login-snackbar']
      })
    }
  }

}
