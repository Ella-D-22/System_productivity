import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  submitted = false
  function_type:any
  dialogData:any
  horizontalPosition: MatSnackBarHorizontalPosition
  verticalPosition :MatSnackBarVerticalPosition
  constructor(private mainService:MainGroupService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }

    
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]

  formData = this.fb.group({
    function_type:[''],
    group_code:['']
  })
  get f() { 
    return this.formData.controls; }

    onSelectFunction(event:any){
      if(event.target.value == "A-Add"){
         this.showGroupCode = false;
         this.formData.controls.function_type.setValue("")
        //  this.formData.controls.function_type.setValue("")
      }else if (event.target.value != "A-Add"){
         this.showGroupCode = true;
        //  this.formData.controls.function_type.setValue("")
         this.formData.controls.group_code.setValue("")
      }
  
    }
    mainGroupLookup():void{
      const dialogRef =  this.dialog.open(MainGroupLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(this.dialogData);
        
        this.formData.controls.group_code.setValue(results.data.group_code)
       
      })
    }

    onSubmit(){
      this.submitted = true;
      
      if(this.formData.valid){
        this.mainService.changeMessage(this.formData.value)
        if(this.function_type == 'A-Add'){
  
          this.router.navigateByUrl("system/GLS/main-group/data/view")
        }else if (this.function_type != 'A-Add'){
          this.router.navigateByUrl("system/GLS/main-group/data/view")
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
