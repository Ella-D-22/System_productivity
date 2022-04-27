import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainGroupLookupComponent } from '../../main-group/main-group-lookup/main-group-lookup.component';
import { SubGroupLookupComponent } from '../sub-group-lookup/sub-group-lookup.component';
import { SubGroupService } from '../sub-group.service';

@Component({
  selector: 'app-sub-group-maintenance',
  templateUrl: './sub-group-maintenance.component.html',
  styleUrls: ['./sub-group-maintenance.component.scss']
})
export class SubGroupMaintenanceComponent implements OnInit {
  
  dialogData:any
  function_type:any
  dataExist = false;
  submitted= false;
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  group_name: any;
  mainGroupCode: any;
  mainGroupName: any;
  mainGroupId: any;
  constructor(private subService:SubGroupService,
    private router:Router,
    private _snackbar:MatSnackBar,
    private fb:FormBuilder,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]
  formData = this.fb.group({
    function_type:[''],
    mainGroupId:['', [Validators.required]],
    mainGroupCode:['', [Validators.required]],
    mainGroupName:['', [Validators.required]],
    subGroupCode:['', [Validators.required]],
    subGroupName:['', [Validators.required]],
  })
  get f() { 
    return this.formData.controls; }
    onSelectFunction(event:any){
      if(event.target.value == "A-Add"){
         this.dataExist = false;
         this.formData.controls.subGroupCode.setValue("")
         this.formData.controls.subGroupCode.setValidators([Validators.required])
      }else if (event.target.value != "A-Add"){
         this.dataExist = true;
         this.formData.controls.subGroupCode.setValue("")
         this.formData.controls.subGroupCode.setValidators([Validators.required])
      }
    }
    
    subGroupLookup():void{
      const dialogRef =  this.dialog.open(SubGroupLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.mainGroupId.setValue(results.data.mainGroupId)
        this.formData.controls.mainGroupCode.setValue(results.data.mainGroupCode)
        this.formData.controls.mainGroupName.setValue(results.data.mainGroupName)
        this.formData.controls.subGroupCode.setValue(results.data.subGroupCode)
        this.formData.controls.subGroupName.setValue(results.data.subGroupName)
      })
    }
    mainGroupLookup():void{
      const dialogRef =  this.dialog.open(MainGroupLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.mainGroupId = this.dialogData.id,
        this.mainGroupCode = this.dialogData.mainGroupCode 
        this.mainGroupName = this.dialogData.mainGroupName
        this.formData.controls.mainGroupId.setValue(this.mainGroupId)
        this.formData.controls.mainGroupCode.setValue(this.mainGroupCode)
        this.formData.controls.mainGroupName.setValue(this.mainGroupName)
      })
    }
    onSubmit(){
      console.log(this.formData.value);
      
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
