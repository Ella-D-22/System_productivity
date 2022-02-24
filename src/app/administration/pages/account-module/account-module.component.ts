import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GlSubheadLookupComponent } from '../SystemConfigurations/GlobalParams/gl-subhead/gl-subhead-lookup/gl-subhead-lookup.component';


@Component({
  selector: 'app-account-module',
  templateUrl: './account-module.component.html',
  styleUrls: ['./account-module.component.scss']
})
export class AccountModuleComponent implements OnInit {
  message!:any;
  lookupData: any;
  glSubheadCode: any;
  glSubheadDescription: any;

  constructor(private router: Router,
    public fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    
    ) { 
    this.message = this.router.getCurrentNavigation()?.extras.state;
  }

  refCodeLookup(): void {
    const dialogRef = this.dialog.open(GlSubheadLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.glSubheadCode = this.lookupData.glSubheadCode;
      this.glSubheadDescription = this.lookupData.glSubheadDescription;
      this.formData.controls.glSubheadCode.setValue(this.glSubheadCode);
    });
  }

  ngOnInit(): void {
    this.getPage()
  }
  loading = false;

  formData = this.fb.group({
    accountManager:['KAMAU'],
    currency:[''],
    glSubhead:[''],
    lienAmount:[''],
    referredBy:[''],
    schemeCode:[''],
    solCode:[''],
    withholdingTax:[''],
    amountDisbursed:[''],
    repaymentPeriod:[''],

  })

  disabledFormControll(){
    this.formData.controls.accountManager.disable();
    this.formData.controls.repaymentPeriod.disable();
    this.formData.controls.currency.disable();
    this.formData.controls.glSubhead.disable();
    this.formData.controls.lienAmount.disable();
    this.formData.controls.referredBy.disable();
    this.formData.controls.schemeCode.disable();
    this.formData.controls.solCode.disable();
    this.formData.controls.withholdingTax.disable();
    this.formData.controls.amountDisbursed.disable();


  }

          // convenience getter for easy access to form fields
          get f() { return this.formData.controls; }

          getPage(){
            console.log(this.message.function_type)
            if(this.message.function_type == "A-Add" && this.message.account_type=="Loan"){

            this.formData = this.fb.group({
              accountManager:['KAMAU'],
              currency:[''],
              glSubhead:[''],
              lienAmount:[''],
              referredBy:[''],
              schemeCode:[''],
              solCode:[''],
              withholdingTax:[''],
              amountDisbursed:[''],
              repaymentPeriod:['45'],

            })

            }
            if(this.message.function_type == "A-Add"){

              this.formData = this.fb.group({
                accountManager:['KAMAU'],
                currency:[''],
                glSubhead:[''],
                lienAmount:[''],
                referredBy:[''],
                schemeCode:[''],
                solCode:[''],
                withholdingTax:[''],
                amountDisbursed:[''],
                repaymentPeriod:['45'],
  
              })
  
              }
              if(this.message.function_type == "A-Add"){

                this.formData = this.fb.group({
                  accountManager:['KAMAU'],
                  currency:[''],
                  glSubhead:[''],
                  lienAmount:[''],
                  referredBy:[''],
                  schemeCode:[''],
                  solCode:[''],
                  withholdingTax:[''],
                  amountDisbursed:[''],
                  repaymentPeriod:['45'],
    
                })
    
                }
                if(this.message.function_type == "A-Add"){

                  this.formData = this.fb.group({
                    accountManager:['KAMAU'],
                    currency:[''],
                    glSubhead:[''],
                    lienAmount:[''],
                    referredBy:[''],
                    schemeCode:[''],
                    solCode:[''],
                    withholdingTax:[''],
                    amountDisbursed:[''],
                    repaymentPeriod:['45'],
      
                  })
      
                  }
            //'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
            else if(this.message.function_type == "I-Inquire"){
              this.disabledFormControll();
              this.formData.controls['solCode'].disable();
              this.formData = this.fb.group({
                accountManager:['KAMAU'],
                currency:[''],
                glSubhead:[''],
                lienAmount:[''],
                referredBy:['CHEGE'],
                schemeCode:[''],
                solCode:[''],
                withholdingTax:[''],
                amountDisbursed:[''],
                repaymentPeriod:[''],
  
              })
  
              }

              else if(this.message.function_type == "M-Modify"){

                this.formData = this.fb.group({
                  accountManager:['KAMAU'],
                  currency:[''],
                  glSubhead:[''],
                  lienAmount:[''],
                  referredBy:[''],
                  schemeCode:[''],
                  solCode:[''],
                  withholdingTax:[''],
                  amountDisbursed:['40000'],
                  repaymentPeriod:[''],
    
                })
    
                }

                else if(this.message.function_type == "V-Verify"){
                  this.disabledFormControll()
                  this.formData = this.fb.group({
                    accountManager:['KAMAU'],
                    currency:[''],
                    glSubhead:[''],
                    lienAmount:[''],
                    referredBy:[''],
                    schemeCode:[''],
                    solCode:['S001'],
                    withholdingTax:[''],
                    amountDisbursed:[''],
                    repaymentPeriod:[''],
      
                  })
      
                  }
                  else if(this.message.function_type == "X-Cancel"){
                    this.disabledFormControll()
                    this.formData = this.fb.group({
                      accountManager:['KAMAU'],
                      currency:['KES'],
                      glSubhead:[''],
                      lienAmount:[''],
                      referredBy:[''],
                      schemeCode:[''],
                      solCode:[''],
                      withholdingTax:[''],
                      amountDisbursed:[''],
                      repaymentPeriod:[''],
        
                    })
        
                    }

          }

  onSubmit(){
    console.log(this.formData.value)

  }

}
