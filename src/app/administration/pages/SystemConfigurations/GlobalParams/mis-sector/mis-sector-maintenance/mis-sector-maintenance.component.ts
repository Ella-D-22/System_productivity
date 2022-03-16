import { ThrowStmt } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MisSectorLookupComponent } from '../mis-sector-lookup/mis-sector-lookup.component';
import { MisSectorService } from '../mis-sector.service';

@Component({
  selector: 'app-mis-sector-maintenance',
  templateUrl: './mis-sector-maintenance.component.html',
  styleUrls: ['./mis-sector-maintenance.component.scss']
})
export class MisSectorMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition:MatSnackBarVerticalPosition
  miscode:any;
   dialogData:any;




   showMisCode:false;
  submitted:false;
  loading:false;

  constructor(private fb:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private misSectorService:MisSectorService) { }


formData = this.fb.group({
  fuction_type:['', [Validators.required]],
  miscode:['']
})

function_Array = [
  'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
]

onFunctionSelection(event:any){
  if(event.target.value != "A-Add"){
    this.showMisCode = true;
    this.formData.controls.miscode.setValidators([Validators.required])
    this.formData.controls.miscode.setValue("")
  }else if(event.target.value == "A-Add"){
    this.showMisCode = false;
    this.formData.controls.miscode.setValidators([Validators.required])
    this.formData.controls.miscode.setValue("")
    
  }
}
misSectorLookup(){
  const dialogRef =  this.dialog.open(MisSectorLookupComponent,{

  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data;
    this.miscode = this.dialogData.miscode
    
  })
}
  ngOnInit(): void {
  }

  onSubmit(){
   

   if(this.formData.valid){
     this.misSectorService.changeMessage(this.formData.value)
     this.router.navigateByUrl('system/configurations/global/mis-sub-sector/data/view')
   }else{
     this.loading = false;
     this._snackbar.open("Invalid Form Data", "Try Again", {
       horizontalPosition:this.horizontalPosition,
       verticalPosition: this.verticalPosition,
       duration : 3000,
       panelClass:['red-snackbar', 'login-snackbar']

     })
   }
  }
}
