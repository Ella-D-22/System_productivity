import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareCapitalParamsService } from './share-capital-params.service';

@Component({
  selector: 'app-share-capital-params',
  templateUrl: './share-capital-params.component.html',
  styleUrls: ['./share-capital-params.component.scss']
})
export class ShareCapitalParamsComponent implements OnInit {

 subscription:Subscription
 results:any
 error:any
 horizontalPosition:MatSnackBarHorizontalPosition
 verticalPosition:MatSnackBarVerticalPosition

  constructor(private ParamsService:ShareCapitalParamsService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  formData = this.fb.group({
  
    id: [''],
    min_shares: [''],
    share_quantity:[''] ,
    share_value: [''],
    shares_office_ac: [''],
    modifiedBy: [''],
    modifiedTime: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime:[''],
    verifiedBy:[''],
    verifiedFlag: [''],
    verifiedTime:[''],
    deleteFlag: [''],
    deletedBy: [''],
    deletedTime: [''],
  })
  get f() { return this.formData.controls; }

getPage(){
  this.formData = this.fb.group({
  
    min_shares: [''],
    share_quantity:[''] ,
    share_value: [''],
    shares_office_ac: [''],
    modifiedBy: [''],
    modifiedTime: [''],
    postedBy: ["user"],
    postedFlag: ['Y'],
    postedTime:[new Date()],
    verifiedBy:['user'],
    verifiedFlag: ['N'],
    verifiedTime:[new Date()],
    deleteFlag: ['N'],
    deletedBy: ['User'],
    deletedTime: [new Date()],
  })
}
  onSubmit(){
    
    if(this.formData.valid){
      this.subscription = this.ParamsService.createShareCapitalParams(this.formData.value).subscribe(
        res =>{
          this.results = res
          this._snackbar.open("Executted Successfully","X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['green-snackbar', 'login-snackbar']
          });
          this.router.navigateByUrl("system/configurations/global/mis-sector/maintenance")
        },
        err =>{
          this.error = err
          this._snackbar.open(this.error,"Try Again",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-snackbar', 'login-snackbar']
          })
        }
      )
    }else {
      this._snackbar.open("Invalid Form Data Valua", "Try Again",{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar','login-snackbar']
      })
    }
  }

}
