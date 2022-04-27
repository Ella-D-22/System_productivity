import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainGroupLookupComponent } from '../../main-group/main-group-lookup/main-group-lookup.component';
import { SubGroupLookupComponent } from '../sub-group-lookup/sub-group-lookup.component';
import { SubGroupService } from '../sub-group.service';
import { TransferMemberService } from './transfer-member.service';

@Component({
  selector: 'app-transfer-member',
  templateUrl: './transfer-member.component.html',
  styleUrls: ['./transfer-member.component.scss']
})
export class TransferMemberComponent implements OnInit {
  dialogData:any
  function_type:any
  showSubgroupCode:any
  subscription!:Subscription
  submitted= false;
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  mainGroupCode: any;
  mainGroupName: any;
  subGroupCode: any;
  subGroupName: any;
  customerData: any;
  error: string;
  customerCode: any;
  customerName: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transaferAPI:TransferMemberService,
    private router:Router,
    private _snackbar:MatSnackBar,
    private fb:FormBuilder,
    private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getData();
  }
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]
  formData = this.fb.group({
    fromMainGroupCode:['',[Validators.required]],
    fromSubGroupCode:['',[Validators.required]],
    toMainGroupCode:['',[Validators.required]],
    toSubGroupCode:['',[Validators.required]],
    customerCode:['',[Validators.required]],
    customerName:['',[Validators.required]],
    transferedOn:[new Date()],
    transferReason:[''],

    verifiedBy:["user"],
    verifiedFlag:['N'],
    verifiedTime: [new Date()],
    deletedBy:["user"],
    deletedFlag:['N'],
    deletedTime:[new Date()],
    modifiedBy:["user"],
    modifiedTime:[new Date()],
    postedBy:["user"],
    postedFlag:['Y'],
    postedTime:[new Date()],
  })
  getData(){
    console.log(this.customerData);
    
    this.mainGroupCode = this.data.mainGroupCode,
    this.mainGroupName = this.data.mainGroupName,
    this.subGroupCode = this.data.subGroupCode,
    this.subGroupName = this.data.subGroupName,
    this.customerCode = this.data.customerData.customerCode
    this.customerName = this.data.customerData.customerName
    this.formData.controls.fromMainGroupCode.setValue(this.mainGroupCode);
    this.formData.controls.fromSubGroupCode.setValue(this.subGroupCode);
    this.formData.controls.customerCode.setValue(this.customerCode);
    this.formData.controls.customerName.setValue(this.customerName);
  }
  get f() { 
    return this.formData.controls; }
    
    mainGroupLookup():void{
      const dialogRef =  this.dialog.open(MainGroupLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.groupCode.setValue(results.data.groupCode)
      })
    }
    subGroupLookup():void{
      const dialogRef =  this.dialog.open(SubGroupLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.subGroupCode.setValue(results.data.subGroupCode)
      })
    }

    onSubmit(){
      console.log("This is the form Data", this.formData.value);
      this.submitted = true;
      if(this.formData.valid){
        this.subscription = this.transaferAPI.create(this.formData.value).subscribe(res=>{
          this._snackbar.open("Successfull Transfered Member", "X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']
          });
        }, err=>{
          this.error = err;
          this._snackbar.open(this.error, "Try Again", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar', 'login-snackbar']
          })
        })
      }else{
        this._snackbar.open("Invalid form data", "Try Again", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar']
        })
      }
    }
}
