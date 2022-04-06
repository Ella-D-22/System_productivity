import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RetailCustomerLookupComponent } from '../retail-customer-lookup/retail-customer-lookup.component';
import { RetailCustomerService } from '../retail-customer.service';

@Component({
  selector: 'app-retail-customer-maintenance',
  templateUrl: './retail-customer-maintenance.component.html',
  styleUrls: ['./retail-customer-maintenance.component.scss']
})
export class RetailCustomerMaintenanceComponent implements OnInit {
  showGroupCode: any
  existingData = false
  submitted = false
  function_type:any
  dialogData:any
  customerCode:any
  horizontalPosition: MatSnackBarHorizontalPosition
  verticalPosition :MatSnackBarVerticalPosition
  constructor(
    private retailCustAPI: RetailCustomerService,
    private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private router:Router,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  functionArray:any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]

  formData = this.fb.group({
    function_type:[''],
    customerCode:['', [Validators.required]],
    customer_info:['']
  })
  get f() {return this.formData.controls; }

    onSelectFunction(event:any){
      if(event.target.value == "A-Add"){
         this.existingData = false
         this.formData.controls.customerCode.setValue(this.customerCode)
         this.formData.controls.customerCode.setValidators([Validators.required])
      }else if (event.target.value != "A-Add"){
        this.existingData = true;
         this.showGroupCode = true;
         this.formData.controls.customerCode.setValue("")
         this.formData.controls.customerCode.setValidators([Validators.required])
      }
    }
    customerLookup():void{
      const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(this.dialogData);
      
        this.formData.controls.customerCode.setValue(results.data.customerCode)
       
      })
    }

    onSubmit(){
      this.submitted = true;
      
      if(this.formData.valid){
        this.retailCustAPI.changeMessage(this.formData.value)
        console.log(this.formData.value);
        
        if(this.function_type == 'A-Add'){
  
          this.router.navigateByUrl("system/customer/retail/data/view")
        }else if (this.function_type != 'A-Add'){
          this.router.navigateByUrl("system/customer/retail/data/view")
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
