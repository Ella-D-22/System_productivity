import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SegmentLookupComponent } from '../../segments/segment-lookup/segment-lookup.component';
import { SubSegmentLookupComponent } from '../sub-segment-lookup/sub-segment-lookup.component';
import { SubSegmentService } from '../sub-segment.service';

@Component({
  selector: 'app-sub-segment-maintenance',
  templateUrl: './sub-segment-maintenance.component.html',
  styleUrls: ['./sub-segment-maintenance.component.scss']
})
export class SubSegmentMaintenanceComponent implements OnInit {


  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  dialogData:any
  submitted = false
  function_type:any
  showSegmentId = false
  showSubSegmentId = false
  constructor(private fb:FormBuilder,
    private router:Router,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private subSegmentService:SubSegmentService) { }


formData = this.fb.group({
  function_type:[''],
  subSegmentCode:[''],
  segment_id:[''],
  segmentCode:['']
})

functionArray:any = [
  'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
]

onFunctionSelection(event:any){
  if(event.target.value != "A-Add"){
    this.showSubSegmentId = true;
    this.formData.controls.subSegmentCode.setValidators([])
    this.formData.controls.subSegmentCode.setValue("")
  }else if(event.target.value == "A-Add"){
    this.showSegmentId = true;
  this.formData.controls.segmentCode.setValue("")
  this.formData.controls.segmentCode.setValidators([])
  }
}
get f() { 
  return this.formData.controls; }

// segmentLookup():void{
//   const dialogRef =  this.dialog.open(SegmentLookupComponent,{

//   });
//   dialogRef.afterClosed().subscribe(results =>{
//     this.dialogData = results.data;
//     this.formData.controls.segmentCode.setValue(this.dialogData.segmentCode)
//     this.formData.controls.segment_id.setValue(this.dialogData.id)
//   })
// }

subSegmentLookup():void{
  const dialogRef = this.dialog.open(SubSegmentLookupComponent, {
    width: '35%'
  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data
    this.formData.controls.subSegmentCode.setValue(this.dialogData.subSegmentCode)
  })
}
  ngOnInit(): void {
  }

  onSubmit(){
   console.log("data", this.formData.value);
  //  this.loading = true;
    this.submitted = true;
   if(this.formData.valid){
     this.subSegmentService.changeMessage(this.formData.value)
     if(this.function_type == "A-Add"){
      this.router.navigate(['system/configurations/global/sub-segment/add'],{skipLocationChange:true} )
     }else if(this.function_type != "A-Add"){
      this.router.navigate(['system/configurations/global/sub-segment/add'],{skipLocationChange:true} )

     }
   }else{
    //  this.loading = false;
     this._snackbar.open("Invalid Form Data", "Try Again", {
       horizontalPosition:this.horizontalPosition,
       verticalPosition: this.verticalPosition,
       duration : 3000,
       panelClass:['red-snackbar', 'login-snackbar']

     })
   }
  }

}
