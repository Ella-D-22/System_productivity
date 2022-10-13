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
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  miscode:any;
  dialogData:any;
  function_type:any;
  showMisCode:any;
  submitted = false;
  loading = false;
  sectorId:any
  constructor(private fb:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private misSectorService:MisSectorService) { }


formData = this.fb.group({
  function_type:[''],
  miscode:['']
})

functionArray:any = [
  'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
]

onFunctionSelection(event:any){
  if(event.target.value != "A-Add"){
    this.showMisCode = true;
    this.formData.controls.miscode.setValidators([])
    this.formData.controls.miscode.setValue("")
  }else if(event.target.value == "A-Add"){
    this.showMisCode = false;
    this.formData.controls.miscode.setValidators([])
    this.formData.controls.miscode.setValue("")
  }
}
get f() { 
  return this.formData.controls; }

misSectorLookup():void{
  const dialogRef =  this.dialog.open(MisSectorLookupComponent,{
width: '45%',
  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data;
    this.miscode = this.dialogData.miscode
    this.sectorId  = this.dialogData.id
    this.formData.controls.miscode.setValue(results.data.miscode)
    // this.formData.controls.sectorId.setValue(results.data.id)
    console.log("Data", this.dialogData);
  })
}
  ngOnInit(): void {
  }
  onSubmit(){
   console.log("data", this.formData.value);
   this.loading = true;
    this.submitted = true;
   if(this.formData.valid){
     this.misSectorService.changeMessage(this.formData.value)
     if(this.function_type == "A-Add"){
      this.router.navigate(['system/configurations/global/mis-sector/add'], {skipLocationChange:true})
     }else if(this.function_type != "A-Add"){
      this.router.navigate(['system/configurations/global/mis-sector/add'], {skipLocationChange:true})
     }
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
