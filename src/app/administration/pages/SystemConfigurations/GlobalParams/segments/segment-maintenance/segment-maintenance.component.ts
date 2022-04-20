import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SegmentLookupComponent } from '../segment-lookup/segment-lookup.component';
import { SegmentsService } from '../segments.service';

@Component({
  selector: 'app-segment-maintenance',
  templateUrl: './segment-maintenance.component.html',
  styleUrls: ['./segment-maintenance.component.scss']
})
export class SegmentMaintenanceComponent implements OnInit {
 
  submitted = false;
  dialogData:any
  function_type:any
  showSegmentCode = false
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition

  constructor(private fb:FormBuilder,
    private segService:SegmentsService,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    function_type:[''],
    segmentCode:['']
  })
  
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ] 
  onFunctionSelection(event:any){
    if(event.target.value != "A-Add"){
      this.showSegmentCode = true;
      this.formData.controls.segmentCode.setValidators([])
      this.formData.controls.segmentCode.setValue("")
    }else if(event.target.value == "A-Add"){
      // this.formData.controls.segmentCode.setValidators([])
      // this.formData.controls.segmentCode.setValue("")
    }
  }
  get f() { 
    return this.formData.controls; }

    segmentLookup(){
      const dialogRef = this.dialog.open(SegmentLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(results.data);
        
        this.formData.controls.segmentCode.setValue(this.dialogData.segmentCode)
      })

    }
    onSubmit(){
      this.submitted = true;
      if(this.formData.valid){
        this.segService.changeMessage(this.formData.value)
        if(this.function_type == "A-Add"){
          this.router.navigateByUrl("system/configurations/global/segment/data/view")
        }else if(this.function_type != "A-Add"){
          this.router.navigateByUrl("system/configurations/global/segment/data/view")
        }
      }else{
        // this.loading = false;
        this._snackbar.open("Invalid Form Data", "Try Again", {
          horizontalPosition:this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration : 3000,
          panelClass:['red-snackbar', 'login-snackbar']
   
        })
      }

    }
}
