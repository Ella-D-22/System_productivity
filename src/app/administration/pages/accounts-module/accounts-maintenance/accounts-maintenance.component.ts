import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RetailCustomerLookupComponent } from '../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountLookupComponent } from '../../loan-account/loan-account-lookup/loan-account-lookup.component';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-accounts-maintenance',
  templateUrl: './accounts-maintenance.component.html',
  styleUrls: ['./accounts-maintenance.component.scss']
})
export class AccountsMaintenanceComponent implements OnInit {
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

  ngOnInit(): void {}


  loading = false;
  submitted = false;
  account_code: any; 
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]

  AccountTypeArray: any = [
    {
      accountType:'LAA',
      accountRef:'Loan'
    },
    {
      accountType:'OAB',
      accountRef:'Office'
    },
    {
      accountType:'SBA',
      accountRef:'Savings'
    },
    {
      accountType:'TDA',
      accountRef:'Term-Deposit'
    },
    {
      accountType:'ODA',
      accountRef:'OverDraft'
    },
    {
      accountType:'CAA',
      accountRef:'Current'
    },
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
  onChange(event:any){
    this.function_type = event.target.value;
    if(event.target.value != "A-Add"){
    console.log(event.target.value)
    
    }else if(event.target.value == "A-Add"){
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
              this.router.navigate(['system/accounts/data/view'], { state: this.formData.value
                  
                
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
        
        }
        }

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
          const dconfig= new MatDialogConfig()
          dconfig.data={
            type:this.dtype
          }
          const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
          cdialogRef.afterClosed().subscribe((result) => {
            console.log(result.data);
            // this.schemeCode = result.data.schemeCode;
            this.formData.controls.account_code.setValue(result.data.acid);
           
          });
        }



}
