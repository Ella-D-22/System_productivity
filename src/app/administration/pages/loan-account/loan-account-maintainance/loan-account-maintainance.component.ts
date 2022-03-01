import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {LoanAccountLookupComponent} from '../loan-account-lookup/loan-account-lookup.component'

@Component({
  selector: 'app-loan-account-maintainance',
  templateUrl: './loan-account-maintainance.component.html',
  styleUrls: ['./loan-account-maintainance.component.css']
})
export class LoanAccountMaintainanceComponent implements OnInit {
  dtype!:string
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  account_type: any;
  customer_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  event_type: any;
  event_description: any;
  error: any;
  event_type_data: any;
  params:any;
  lookupdata: any;
  lookupData: any;
  //account_code: string

  constructor(   
    public fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {


  }


   loading = false;
  submitted = false;
  account_code: any; 
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]

  AccountTypeArray: any = [
    'Loan','Office','Savings','Term-Deposit','Overdraft','Current'
  ]
  CustomerTypeArray: any = [
    'Retail','Corporate'
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    account_type: ['', [Validators.required]],
    customer_type: ['', [Validators.required]],
    account_code: ['',[Validators.required]],
  });



  // onChange(event:any){
  //   this.function_type = event.target.value;
  // }

  onChange(event:any){
    this.function_type = event.target.value;
    if(event.target.value != "A-Add"){
    console.log(event.target.value)
     // this.existingData = true;
      //this.formData.controls.account_code.setValue("")
      //this.f.account_code.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
     // this.existingData = false;;
      this.formData.controls.account_code.setValidators([])
      this.formData.controls.account_code.setValue("");
    }
  }

    onAccountChange(event:any){
    this.account_type = event.target.value;
  }
    onCustomerChange(event:any){
    this.customer_type = event.target.value;
  }





 
        // convenience getter for easy access to form fields
        get f() { return this.formData.controls; }

        onSubmit(){
          
          console.log(this.formData.value)
          this.loading = true;
          this.submitted = true;
          if(this.formData.valid){

            this.function_type =  this.f.function_type.value;
            this.account_code=this.f.account_code.value;
            if(this.function_type == "A-Add"){
              this.router.navigate(['system/accounts/data/view'], {
                state: this.formData.value
                  
                ,
              });
            
           }
           else{
            this.router.navigate(['system/accounts/data/view'], {
              state: this.formData.value   
              ,
            });
            }
        }
        else{
          this.loading = false;
          console.log("invalid form")
          // this._snackBar.open("Invalid Form Data", "Try again!", {
          //   horizontalPosition: this.horizontalPosition,
          //   verticalPosition: this.verticalPosition,
          //   duration: 3000,
          //   panelClass: ['red-snackbar','login-snackbar'],
          // });
        }
        }

        // type(): string{  
        //   if(this.account_type=="Loan"){
        //     this.dtype="la"
        //   }
        //   else if(this.account_type=="Office"){
        //     this.dtype="aa"           
        //   }
        //   else if(this.account_type=="Savings"){   
        //     this.dtype="sb"         
        //   }
        //   else if(this.account_type=="Overdraft"){
        //     this.dtype="oa"            
        //   }
        //   else if(this.account_type=="Current"){  
        //     this.dtype="ca"         
        //   }
        //   else if(this.account_type=="Term-Deposit"){ 
        //     this.dtype="td"          
        //   }
        //   return this.dtype
        //   console.log("chege")
        // }

        accountLookup(): void {
          if(this.account_type=="Loan"){
            this.dtype="la"
          }
          else if(this.account_type=="Office"){
            this.dtype="oa"           
          }
          else if(this.account_type=="Savings"){   
            this.dtype="sb"         
          }
          else if(this.account_type=="Overdraft"){
            this.dtype="od"            
          }
          else if(this.account_type=="Current"){  
            this.dtype="ca"         
          }
          else if(this.account_type=="Term-Deposit"){ 
            this.dtype="td"          
          }
          console.log(this.account_type)
          console.log(this.dtype)
          const dconfig= new MatDialogConfig()
          dconfig.data={
            type:this.dtype
          }
          const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
          cdialogRef.afterClosed().subscribe((result) => {
            console.log(result.data);
            // this.schemeCode = result.data.schemeCode;
            this.formData.controls.account_code.setValue(result.data.acid);
            //this.account_code=result.data.accountCode
            // this.schemeDescription=result.data.productDescription
          });
        }



}
