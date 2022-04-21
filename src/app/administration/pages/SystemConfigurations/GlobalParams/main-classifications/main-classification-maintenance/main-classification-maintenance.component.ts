import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainClassificationLookupComponent } from '../main-classification-lookup/main-classification-lookup.component';
import { MainClassificationService } from '../main-classification.service';

@Component({
  selector: 'app-main-classification-maintenance',
  templateUrl: './main-classification-maintenance.component.html',
  styleUrls: ['./main-classification-maintenance.component.scss']
})
export class MainClassificationMaintenanceComponent implements OnInit {


   // currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
  // auth_user = this.currentUser.username;
  auth_user = "nobody"

  dialogData:any
  function_type:any
  showMainCode = false
  submitted = false
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  constructor(private mainService:MainClassificationService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private router:Router) { }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    function_type :[''],
    main_classification_code:['']
  })
  
  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]

  onFunctionSelection(event:any){
    if(event.target.value == "A-Add"){
     
    }else if(event.target.value != "A-Add"){
       this.showMainCode = true;
       this.formData.controls.main_classification_code.setValidators([])
       this.formData.controls.main_classification_code.setValue("")
    }
  }

  get f() { return this.formData.controls; }

  mainLookup():void{
    const dialogRef = this.dialog.open(MainClassificationLookupComponent,{

    })
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
      console.log(results.data);
      
      this.formData.controls.main_classification_code.setValue(this.dialogData.mainClassificationCode)
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.formData.valid){
      this.mainService.changeMessage(this.formData.value)
      if(this.function_type == "A-Add"){
        this.router.navigate(['system/configurations/global/main-classification/data/view'], {skipLocationChange:true})
      }else if(this.function_type != "A-Add"){
        this.router.navigate(['system/configurations/global/main-classification/data/view'], {skipLocationChange:true})
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
