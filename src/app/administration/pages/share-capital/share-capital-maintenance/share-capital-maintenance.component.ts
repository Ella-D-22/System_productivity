import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetailCustomerLookupComponent } from '../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountService } from '../../loan-account/loan-account.service';
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
  resAccountData: any
  subscription:Subscription
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  constructor(
    private shareService:ShareCapitalService,
    private accountAPI:LoanAccountService,
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
    function_type:['',[Validators.required]],
    cust_code:['',[Validators.required]],
    cust_name:['',[Validators.required]],
    cust_account_caa:['',[Validators.required]],
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

  getCaaCustomerAccount(customerCode){
    console.log("this is customer code",customerCode);
    
    this.subscription = this.accountAPI.getCaaCustomerAccount(customerCode).subscribe(res=>{
      console.log(res);
      this.resAccountData = res;
    this.formData.controls.cust_account_caa.setValue(this.resAccountData.entity.acid)

      
    },err=>{
      this._snackbar.open("No Customer Current Account!Kindly Open a Current Account or Consult your Account Manager", "X",{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    });
   }


  customerLookup():void{
     const dialogRef = this.dialog.open(RetailCustomerLookupComponent,{
      
     });
     dialogRef.afterClosed().subscribe(results =>{
       this.dialogData = results.data 
    this.formData.controls.cust_code.setValue(this.dialogData.customerCode)
    this.formData.controls.cust_name.setValue(this.dialogData.firstName +" " + this.dialogData.middleName +" "+ this.dialogData.surname)
    this.getCaaCustomerAccount(this.dialogData.customerCode)


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
