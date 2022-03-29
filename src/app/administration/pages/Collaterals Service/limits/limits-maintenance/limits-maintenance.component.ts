import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LimitsService } from '../limits.service';

@Component({
  selector: 'app-limits-maintenance',
  templateUrl: './limits-maintenance.component.html',
  styleUrls: ['./limits-maintenance.component.scss']
})
export class LimitsMaintenanceComponent implements OnInit {

  showLimitId = false;
  function_type:any;
  dialogData:any;
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  

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
    limit_code : ['']
  })
  get f() { 
    return this.formData.controls; }


  onSelectFunction(event:any){
    if(event.target.value == 'A-Add'){
       this.showLimitId = false;
    }else if (event.target.value != 'A-Add'){
       this.showLimitId = true;
    }

  }

  //lookup
  limitsNodesLookup():void{
    const dialogRef =  this.dialog.open(LimitsMaintenanceComponent,{

    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
     
      // this.formData.controls.miscode.setValue(results.data.miscode)
      // this.formData.controls.sectorId.setValue(results.data.id)
    })
  }


  onSubmit(){
    if(this.formData.valid){
      if(this.function_type == 'A-Add'){
        this.router.navigateByUrl("")
      }else if (this.function_type != 'A-Add'){
        this.router.navigateByUrl("")
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
