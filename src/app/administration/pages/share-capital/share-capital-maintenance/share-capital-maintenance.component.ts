import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetailCustomerLookupComponent } from '../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { ShareCapitalService } from '../share-capital.service';

@Component({
  selector: 'app-share-capital-maintenance',
  templateUrl: './share-capital-maintenance.component.html',
  styleUrls: ['./share-capital-maintenance.component.scss']
})
export class ShareCapitalMaintenanceComponent implements OnInit {
  function_type:any
  dialogData:any
  submitted = false
  subscription:Subscription
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  constructor(private shareService:ShareCapitalService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog, 
    private router:Router) { }

  ngOnInit(): void {
  }

  functionArray = [
    'A-Add', 'I-Inquire', 'M-modify', 'X-Delete'
  ]

  formData = this.fb.group({
    function_type:[''],
    cust_code:[''],
    cust_name:['']
  })
  get f(){return this.formData.controls; }

  onSelectFunction(event:any){
    if(event.target.value == "A-Add"){
      this.formData.controls.cust_code.setValue("")
      this.formData.controls.cust_code.setValidators([Validators.required])
    }else if (event.target.value != "A-Add"){
      this.formData.controls.cust_code.setValue("")
      this.formData.controls.cust_code.setValidators([Validators.required])
    }
  }

  customerLookup():void{
     const dialogRef = this.dialog.open(RetailCustomerLookupComponent,{
      
     });
     dialogRef.afterClosed().subscribe(results =>{
       this.dialogData = results.data
       console.log(this.dialogData);    
    this.formData.controls.cust_code.setValue(this.dialogData.customerCode)
    this.formData.controls.cust_name.setValue(this.dialogData.firstName +" " + this.dialogData.middleName +" "+ this.dialogData.surname)

     })
  }

  onSubmit(){

    this.submitted = true;
    if(this.formData.valid){
      this.shareService.changeMessage(this.formData.value)
      console.log(this.formData.value);
      
      if(this.function_type == 'A-Add'){
        this.router.navigateByUrl("system/share-capital/data/view")
      }else if(this.function_type != 'A-Add'){
        this.router.navigateByUrl("system/share-capital/data/view")
      }
    }else{
      this._snackbar.open("Invalid form Data value", "Try Again",{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }

      }
}
