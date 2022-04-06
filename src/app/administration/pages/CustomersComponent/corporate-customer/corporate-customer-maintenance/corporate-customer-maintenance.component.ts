import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CorporateCustomerLookupComponent } from '../corporate-customer-lookup/corporate-customer-lookup.component';
import { CorporateCustomerService } from '../corporate-customer.service';

@Component({
  selector: 'app-corporate-customer-maintenance',
  templateUrl: './corporate-customer-maintenance.component.html',
  styleUrls: ['./corporate-customer-maintenance.component.scss']
})
export class CorporateCustomerMaintenanceComponent implements OnInit {
   function_type:any
   submitted = false
   dialogData:any
   showCustCode = false
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition

  constructor(private corpService:CorporateCustomerService,
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
    cust_code:['']
  })
  get f() { 
    return this.formData.controls; }

    onSelectFunction(event:any){
     if(event.target.value == "A-Add"){
      // this.formData.controls.cust_code.setValue([])
     }else if(event.target.value != "A-Add"){
       this.showCustCode = true;
      this.formData.controls.cust_code.setValue([])
      this.formData.controls.cust_code.setValidators([Validators.required])
     }
    }
    corporateCustomerLookup():void{
      const dialogRef = this.dialog.open(CorporateCustomerLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(
        results =>{
          this.dialogData = results
          console.log(results);
          
          this.formData.controls.cust_code.setValue(this.dialogData.custCode)
        } )
    }
    onSubmit(){
      this.submitted = true
      if(this.formData.valid){
        this.corpService.changeMessage(this.formData.value)
        if(this.function_type == "A-Add"){
          this.router.navigateByUrl("system/customers/corporate/data/view")
        }else if( this.function_type != "A-Add"){
          this.router.navigateByUrl("system/customers/corporate/data/view")
        }
      }else{
        this._snackbar.open("Invalid form Data", "X",{
          horizontalPosition:this.horizontalPosition,
          verticalPosition:this.verticalPosition,
          duration:3000,
          panelClass:['red-snackbar', 'login-snackbar']
        })
      }
    }

}
