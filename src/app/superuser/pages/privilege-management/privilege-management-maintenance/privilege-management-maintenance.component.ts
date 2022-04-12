import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PrivilegeManagementLookupComponent } from '../privilege-management-lookup/privilege-management-lookup.component';
import { PrivilegeManagementService } from '../privilege-management.service';

@Component({
  selector: 'app-privilege-management-maintenance',
  templateUrl: './privilege-management-maintenance.component.html',
  styleUrls: ['./privilege-management-maintenance.component.scss']
})
export class PrivilegeManagementMaintenanceComponent implements OnInit {
  showGroupCode: any
  existingData = false
  submitted = false
  function_type:any
  dialogData:any
  groupCode:any
  horizontalPosition: MatSnackBarHorizontalPosition
  verticalPosition :MatSnackBarVerticalPosition
  constructor(
    private privilegeService: PrivilegeManagementService,
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
    names:['', [Validators.required]]
  })
  get f() { 
    return this.formData.controls; }

    onSelectFunction(event:any){
      if(event.target.value == "A-Add"){
         this.existingData = false;
      }else if (event.target.value != "A-Add"){
        this.existingData = true;
         this.showGroupCode = true;
      }
    }
    mainGroupLookup():void{
      const dialogRef =  this.dialog.open(PrivilegeManagementLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.groupCode.setValue(results.data.groupCode)
      })
    }
    onSubmit(){
      this.submitted = true;
      if(this.formData.valid){
        this.privilegeService.changeMessage(this.formData.value)        
        if(this.function_type == 'A-Add'){
          this.router.navigateByUrl("superuser/manage/preveleges")
        }else if (this.function_type != 'A-Add'){
          this.router.navigateByUrl("superuser/manage/preveleges")
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
