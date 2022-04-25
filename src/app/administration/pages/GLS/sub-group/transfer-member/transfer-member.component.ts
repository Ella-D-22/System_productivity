import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainGroupLookupComponent } from '../../main-group/main-group-lookup/main-group-lookup.component';
import { SubGroupLookupComponent } from '../sub-group-lookup/sub-group-lookup.component';
import { SubGroupService } from '../sub-group.service';

@Component({
  selector: 'app-transfer-member',
  templateUrl: './transfer-member.component.html',
  styleUrls: ['./transfer-member.component.scss']
})
export class TransferMemberComponent implements OnInit {
  dialogData:any
  function_type:any
  showSubgroupCode:any
  submitted= false;
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
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
    customerCode:['',[Validators.required]],
    mainGroup:['', [Validators.required]],
    subGroupCode:['', [Validators.required]]
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
