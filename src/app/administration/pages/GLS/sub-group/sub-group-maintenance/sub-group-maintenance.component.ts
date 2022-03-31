import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    function_type:[''],
    subgroup_code:['']
  })

  get f() { 
    return this.formData.controls; }

    onSelectFunction(event:any){
      if(event.target.value == "A-Add"){
         this.showSubgroupCode = false;
         this.formData.controls.limitId.setValue("")
        //  this.formData.controls.function_type.setValue("")
      }else if (event.target.value != "A-Add"){
         this.showSubgroupCode = true;
        //  this.formData.controls.function_type.setValue("")
         this.formData.controls.group_code.setValue("")
      }
  
    }
  
    subGroupLookup():void{
      const dialogRef =  this.dialog.open(SubGroupLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(this.dialogData);
        
        this.formData.controls.subgroup_code.setValue(results.data.subgroup_code)
       
      })
    }
    
    onSubmit(){
      this.submitted = true;
      
      if(this.formData.valid){
        this.subService.changeMessage(this.formData.value)
        if(this.function_type == 'A-Add'){
  
          this.router.navigateByUrl("system/GLS/sub-group/data/view")
        }else if (this.function_type != 'A-Add'){
          this.router.navigateByUrl("system/GLS/sub-group/data/view")
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
