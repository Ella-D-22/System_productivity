import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainClassificationLookupComponent } from '../../main-classifications/main-classification-lookup/main-classification-lookup.component';
import { SubClassificationLookupComponent } from '../sub-classification-lookup/sub-classification-lookup.component';
import { SubClassificationService } from '../sub-classification.service';

@Component({
  selector: 'app-sub-classification-maintenance',
  templateUrl: './sub-classification-maintenance.component.html',
  styleUrls: ['./sub-classification-maintenance.component.scss']
})
export class SubClassificationMaintenanceComponent implements OnInit {

 
   // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user = "kiprotich"

  dialogData:any
  function_type:any
  showMainCode = false
  showSubCode = false
  submitted = false
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  constructor(private subService:SubClassificationService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
  }
  formData = this.fb.group({
    function_type :[''],
    sub_classification_code:[''],
    main_classification_code:[''],
    main_id:['']
  })
  
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]
  onFunctionSelection(event:any){
    if(event.target.value == "A-Add"){
     this.showMainCode = true
    }else if(event.target.value != "A-Add"){
       this.showSubCode = true;
       this.formData.controls.sub_classification_code.setValidators([])
       this.formData.controls.sub_classification_code.setValue("")
    }
  }
  get f() { return this.formData.controls; }
  mainLookup():void{
    const dialogRef = this.dialog.open(MainClassificationLookupComponent, {
      width: '45%',
    })
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results;
      console.log(results);
      // this.formData.controls.main_classification_code.setValue(this.dialogData.main_classification_code)
      // this.formData.controls.main_id.setValue(this.dialogData.id)
    })
  }
  subLookup():void{
    const dialogRef = this.dialog.open(SubClassificationLookupComponent, {
      width:'45%',

    })
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results;
      console.log(results);
      this.formData.controls.sub_classification_code.setValue(this.dialogData.subClassificationCode)
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.formData.valid){
      this.subService.changeMessage(this.formData.value)
      if(this.function_type == "A-Add"){
        this.router.navigate(['system/configurations/global/sub-classification/data/view'], {skipLocationChange:true})
      }else if(this.function_type != "A-Add"){
        this.router.navigate(['system/configurations/global/sub-classification/data/view'], {skipLocationChange:true})
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
