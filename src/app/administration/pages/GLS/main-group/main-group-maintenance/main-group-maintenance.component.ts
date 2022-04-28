import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainGroupService } from '../main-group.service';
import { MainGroupLookupComponent } from '../main-group-lookup/main-group-lookup.component';

@Component({
  selector: 'app-main-group-maintenance',
  templateUrl: './main-group-maintenance.component.html',
  styleUrls: ['./main-group-maintenance.component.scss']
})
export class MainGroupMaintenanceComponent implements OnInit {
  showGroupCode: any
  existingData = false
  submitted = false
  function_type:any
  dialogData:any
  groupCode:any
  horizontalPosition: MatSnackBarHorizontalPosition
  verticalPosition :MatSnackBarVerticalPosition
  mainGroupCode: any;
  mainGroupName: any;
  constructor(private mainService:MainGroupService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getApiData()
  }

  getApiData(){
    this.mainService.getMainGroupByCode('001').subscribe(res=>{
      console.log("test with", res);
      
    })
  }

  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]

  formData = this.fb.group({
    function_type:[''],
    groupCode:['', [Validators.required]]
  })
  get f() { 
    return this.formData.controls; }

    onSelectFunction(event:any){
      if(event.target.value == "A-Add"){
         
         this.existingData = false
        //  this.formData.controls.function_type.setValue("")
         this.formData.controls.groupCode.setValue(this.groupCode)
         this.formData.controls.groupCode.setValidators([Validators.required])
      }else if (event.target.value != "A-Add"){
        this.existingData = true;
         this.showGroupCode = true;
        //  this.formData.controls.function_type.setValue("")
         this.formData.controls.groupCode.setValue("")
         this.formData.controls.groupCode.setValidators([Validators.required])

      }
  
    }
    mainGroupLookup():void{
      const dialogRef =  this.dialog.open(MainGroupLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.mainGroupCode = this.dialogData.mainGroupCode 
        this.mainGroupName = this.dialogData.mainGroupName
        this.formData.controls.groupCode.setValue(this.mainGroupCode)
      })
    }

    onSubmit(){
      this.submitted = true;
      
      if(this.formData.valid){
        this.mainService.changeMessage(this.formData.value)
        
        if(this.function_type == 'A-Add'){
        this.router.navigate([`/system/GLS/main-group/data/view`], { skipLocationChange: true });

        }else if (this.function_type != 'A-Add'){
        this.router.navigate([`/system/GLS/main-group/data/view`], { skipLocationChange: true });
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
