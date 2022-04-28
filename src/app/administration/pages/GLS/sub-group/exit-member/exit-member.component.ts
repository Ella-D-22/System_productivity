import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainGroupLookupComponent } from '../../main-group/main-group-lookup/main-group-lookup.component';
import { SubGroupLookupComponent } from '../sub-group-lookup/sub-group-lookup.component';
import { SubGroupService } from '../sub-group.service';

@Component({
  selector: 'app-exit-member',
  templateUrl: './exit-member.component.html',
  styleUrls: ['./exit-member.component.scss']
})
export class ExitMemberComponent implements OnInit {
  dialogData:any
  function_type:any
  showSubgroupCode:any
  submitted= false;
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  mainGroupCode: any;
  mainGroupName: any;
  subGroupCode: any;
  subGroupName: any;
  customerData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subService:SubGroupService,
    private router:Router,
    private _snackbar:MatSnackBar,
    private fb:FormBuilder,
    private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.mainGroupCode = this.data.mainGroupCode,
    this.mainGroupName = this.data.mainGroupName,
    this.subGroupCode = this.data.subGroupCode,
    this.subGroupName = this.data.subGroupName,
    this.customerData = this.data.customerData
  }
  exitReason:any = ['Voluntary','Death','Exit by expulsion']
  formData = this.fb.group({
    id:[''],
    customerCode:['', [Validators.required]],
    exitReason:['', [Validators.required]],
    freeText:[''],
    subGroupCode:['', [Validators.required]],
    mainGroupCode:['', [Validators.required]],
    exitDate:[new Date()],
    modifiedBy:["user"],
    modifiedTime:[new Date()],
    postedBy:["user"],
    postedFlag:['Y'],
    postedTime:[new Date()],
    verifiedBy:["user"],
    verifiedFlag:['Y'],
    verifiedTime:[new Date()],
    deletedBy:["user"],
    deletedFlag:['Y'],
    deletedTime:[new Date()]
  })

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
      this.submitted = true;
      if(this.formData.valid){
        this.subService.changeMessage(this.formData.value)
        if(this.function_type == 'A-Add'){
          this.router.navigate([`/system/GLS/sub-group/data/view`], { skipLocationChange: true });
        }else if (this.function_type != 'A-Add'){
          this.router.navigate([`/system/GLS/sub-group/data/view`], { skipLocationChange: true });
        }
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
