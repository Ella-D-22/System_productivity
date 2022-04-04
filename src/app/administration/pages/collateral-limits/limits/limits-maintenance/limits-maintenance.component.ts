import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LimitsLookupComponent } from '../limits-lookup/limits-lookup.component';
import { LimitsService } from '../limits.service';

@Component({
  selector: 'app-limits-maintenance',
  templateUrl: './limits-maintenance.component.html',
  styleUrls: ['./limits-maintenance.component.scss']
})
export class LimitsMaintenanceComponent implements OnInit {

  existingData = false;
  submitted = false
  function_type:any;
  dialogData:any;
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  limitCode: any;
  limit_description: any;
  limitDescription: any;
  limit_code: any;
  

  constructor(private fb:FormBuilder,
    private NodesAPI:LimitsService,
    private router:Router,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]
  
  formData = this.fb.group({
    function_type:[''],
    limitCode : [''],
    limitDescription:[''],
    limit_lookup_data:[''],
  })
  get f() { 
    return this.formData.controls; }

  onSelectFunction(event:any){
    if(event.target.value == "A-Add"){
       this.existingData = false;
       this.formData.controls.limitId.setValue("")
      //  this.formData.controls.function_type.setValue("")
    }else if (event.target.value != "A-Add"){
       this.existingData = true;
      //  this.formData.controls.function_type.setValue("")
       this.formData.controls.limitId.setValue("")
    }

  }

  //lookup
  limitNodesLookup():void{
    const dialogRef =  this.dialog.open(LimitsLookupComponent,{
    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
      console.log("this is the data", this.dialogData);
      
      this.limit_code = this.dialogData.limit_code;
      this.limit_description = this.dialogData.limit_description;
      this.formData.controls.limit_lookup_data.setValue(this.dialogData)
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.formData.valid){
      this.NodesAPI.changeMessage(this.formData.value)
      this.router.navigateByUrl("system/configurations/collateral-limits/Limits/data/view")
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
