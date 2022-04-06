import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollateralLookupComponent } from '../collateral/collateral-lookup/collateral-lookup.component';
import { CustomerLookupComponent } from '../../CustomersComponent/customer-lookup/customer-lookup.component';
import { LimitsService } from './limits.service';

@Component({
  selector: 'app-limits',
  templateUrl: './limits.component.html',
  styleUrls: ['./limits.component.scss']
})
export class LimitsComponent implements OnInit {


  function_type:any
  message:any
  limitId:any
  results:any
  error:any
  subscription:Subscription
  customerData:any
  collateralData:any
  existingData = false;
  limitCode:any
  limitDescription: any;
  non_fund_based_value: number;
  fund_based_value: number;
  limit_code: any;
  limit_description: any;
  constructor(private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private limitAPI:LimitsService,
    private _snackbar:MatSnackBar,
    private router:Router, 
    private ngZone: NgZone,
    private dialog:MatDialog) { }

    isDeleted = false
    isEnabled = false
  ngOnInit(): void {
    this.redirectToMaintenancePage()
    this.getPage()
    this.onAddField()
  }
  redirectToMaintenancePage(){
    this.subscription = this.limitAPI.currentMessage.subscribe(message =>{
      this.message = message;
      if( this.message == "default message"){
        // Redirect to maintenace if no action header
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/collateral-limits/Limits/maintenance'));
      }else{
        null;
      }
    })
  }


  nonFundedLimitsArray = new Array()
  fundedLimitsArray = new Array()

  formData = this.fb.group({
  deletedBy: [''],
  deletedFlag: [''],
  deletedTime: [''],
  fund_based_pcnt: [''],
  funded_value: [''],
  id: [''],
  limit_code: [''],
  description: [''],
  limit_value: [''],
  modifiedBy: [''],
  modifiedTime: [''],
  non_fundbased_pcnt: [''],
  non_funded_value: [''],
  customer_code: [''],
  postedBy: [''],
  postedFlag: [''],
  postedTime: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: [''],
  collaterals: new FormArray([]),
  limit_nodes: new FormArray([]),
  })


  nonFundBasedForm = this.fb.group({
    limit_node_cust_code:[this.formData.controls.customer_code.value],
    limit_node_category:['Non Fundbased'],
    limit_node_name:[''],
    limit_node_value:['']
  })
  fundBasedForm = this.fb.group({
    limit_node_cust_code:[this.formData.controls.customer_code.value],
    limit_node_category:['Fundbased'],
    limit_node_name:[''],
    limit_node_value:['']
  })
  user = "Nobody"
  // get f() { return this.formData.controls; }
  get c(){return this.f.collaterals as FormArray}
    // define form
    onAddField(){
      this.c.push(this.fb.group({
        collateral_code:[''],
        collateral_value:['']
      }))
    }
    onReadField(e:any){
      console.log("called", e);
      
      this.c.push(this.fb.group({
        collateral_code:[e.collateral_code],
        collateral_value:[e.collateral_value]
      }))
    }
    // define a funcion to remove
    onRemoveField(i:any){
      this.c.removeAt(i)
    }


    
  
    disabledFormControl(){
      this.formData.disable()
    }
    customerLookup(){
     const dialogRef = this.dialog.open(CustomerLookupComponent,{
     
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customerData = result.data;
      this.formData.controls.customer_code.setValue(result.data.customer_code);
    });
    }

    collateralLookup(){
     const dialogRef = this.dialog.open(CollateralLookupComponent,{
       height: '400px',
       width: '600px'
     });
     dialogRef.afterClosed().subscribe(
      res =>{
        this.collateralData = res.data
      }
     )
    }
   
  getPage(){
    this.subscription = this.limitAPI.currentMessage.subscribe(
      message =>{
        this.message = message
        console.log("message", this.message);
        
      
        this.function_type = this.message.function_type
        this.limitId = this.message.limit_lookup_data.id
        this.limit_code = this.message.limit_code
        this.limit_description = this.message.limit_description

        if(this.function_type ==  'A-Add'){
          this.isDeleted = false;
          this.isEnabled = true;

          this.formData = this.fb.group({    
            deletedBy: ['None'],
            deletedFlag: ['N'],
            deletedTime: [new Date()],
            fund_based_pcnt: [''],
            funded_value: [''],
            limit_code: [''],
            limit_description: [''],
            limit_value: [''],
            modifiedBy: ['None'],
            modifiedTime: [new Date()],
            non_fundbased_pcnt: [''],
            non_funded_value: [''],
            customer_code: [''],
            postedBy: ['User'],
            postedFlag: ['Y'],
            postedTime: [new Date()],
            verifiedBy: ['None'],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()],
            collaterals: new FormArray([]),
            limit_nodes: new FormArray([]),
          });
        
    
        }else if(this.function_type == 'I-Inquire'){
          this.isDeleted = false;
          this.isEnabled = false
          this.disabledFormControl()
          this.subscription = this.limitAPI.getLimitsNodesById(this.limitId).subscribe(
            res =>{
                this.results = res
                // Initialise arrays

                this.formData = this.fb.group({
                  collateral_code: [this.results.collateral_code],
                  customer_code: [this.results.customer_code],
                  deletedBy: [this.results.deletedBy],
                  deletedFlag: [this.results.deletedFlag],
                  deletedTime: [this.results.deletedTime],
                  fund_based_pcnt: [this.results.fund_based_pcnt],
                  funded_value: [this.results.funded_value],
                  id: [this.results.id],
                  limit_code: [this.results.limit_code],
                  description: [this.results.description],
                  limit_value: [this.results.limit_value],
                  modifiedBy: [this.results.modifiedBy],
                  modifiedTime: [this.results.modifiedTime],
                  non_fundbased_pcnt: [this.results.non_fundbased_pcnt],
                  non_funded_value: [this.results.non_funded_value],
                  collateral_value: [this.results.collateral_value],
                  postedBy: [this.results.postedBy],
                  postedFlag: [this.results.postedFlag],
                  postedTime: [this.results.postedTime],
                  verifiedBy: [this.results.verifiedBy],
                  verifiedFlag: [this.results.verifiedFlag],
                  verifiedTime: [this.results.verifiedTime],
                  collaterals: new FormArray([]),
                });

                for( let i = 0; i < this.results.collaterals.length; i++){
                  this.onReadField(this.results.collaterals[i]);
                }
                //reinitialise arrays
                this.fundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Fundbased');
                this.nonFundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Non Fundbased');
            
            },err =>{
              this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:'end',
               verticalPosition:'top',
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
    
        }else if(this.function_type == 'M-Modify'){
          this.isDeleted = false;
          this.isEnabled = true
          this.subscription = this.limitAPI.getLimitsNodesById(this.limitId).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                collateral_code: [this.results.collateral_code],
                customer_code: [this.results.customer_code],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                fund_based_pcnt: [this.results.fund_based_pcnt],
                funded_value: [this.results.funded_value],
                id: [this.results.id],
                limit_code: [this.results.limit_code],
                description: [this.results.description],
                limit_value: [this.results.limit_value],
                modifiedBy: [this.user],
                modifiedTime: [new Date()],
                non_fundbased_pcnt: [this.results.non_fundbased_pcnt],
                non_funded_value: [this.results.non_funded_value],
                collateral_value: [this.results.collateral_value],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                collaterals: new FormArray([]),
              });
              for( let i = 0; i < this.results.collaterals.length; i++){
                this.onReadField(this.results.collaterals[i]);
              }
              //reinitialise arrays
              this.fundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Fundbased');
              this.nonFundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Non Fundbased');

            }, err =>{
              this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:'end',
                verticalPosition:'top',
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
         
        }else if(this.function_type == 'X-Delete'){
          this.isDeleted = true;
          this.isEnabled = false
          this.disabledFormControl
          this.subscription = this.limitAPI.getLimitsNodesById(this.limitId).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
            
                deletedBy: [this.user],
                deletedFlag: ['Y'],
                deletedTime: [new Date()],
                fund_based_pcnt: [this.results.fund_based_pcnt],
                funded_value: [this.results.funded_value],
                id: [this.results.id],
                limit_code: [this.results.limit_code],
                description: [this.results.description],
                limit_value: [this.results.limit_value],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                non_fundbased_pcnt: [this.results.non_fundbased_pcnt],
                non_funded_value: [this.results.non_funded_value],
                collateral_value: [this.results.collateral_value],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime]
              });
              for( let i = 0; i < this.results.collaterals.length; i++){
                this.onReadField(this.results.collaterals[i]);
              }
              //reinitialise arrays
              this.fundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Fundbased');
              this.nonFundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Non Fundbased');
            },
            err =>{
              this.router.navigateByUrl("")
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:'end',
               verticalPosition:'top',
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
          
    
        }else if(this.function_type == 'V-verify'){
          this.disabledFormControl
          this.subscription = this.limitAPI.getLimitsNodesById(this.limitId).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
            
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                fund_based_pcnt: [this.results.fund_based_pcnt],
                funded_value: [this.results.funded_value],
                id: [this.results.id],
                limit_code: [this.results.limit_code],
                description: [this.results.description],
                limit_value: [this.results.limit_value],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                non_fundbased_pcnt: [this.results.non_fundbased_pcnt],
                non_funded_value: [this.results.non_funded_value],
                collateral_value: [this.results.collateral_value],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: ['Y'],
                verifiedTime: [new Date()]
              });
              for( let i = 0; i < this.results.collaterals.length; i++){
                this.onReadField(this.results.collaterals[i]);
              }
              //reinitialise arrays
              this.fundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Fundbased');
              this.nonFundedLimitsArray =  this.results.limit_nodes.filter(d => d.limit_node_category === 'Non Fundbased');
            },
            err =>{
              this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:'end',
               verticalPosition:'top',
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }  )}
})


  }

    get f() { return this.formData.controls; }
    get fd() { return this.f.limit_nodes as FormArray;}
    get nfd() {return this.f.limit_nodes as FormArray;}


  onAddNonFundBased(){
    // Get value of non fundbased
    this.non_fund_based_value = (this.formData.controls.non_fundbased_pcnt.value * 0.01 *  this.formData.controls.limit_value.value)
    console.log("This is the non funde based value", this.non_fund_based_value);
    
    const current_total_of_non_funded = this.nonFundedLimitsArray.reduce((sum, current) => sum + current.limit_node_value, 0);
    console.log("this is the total non funded", current_total_of_non_funded);

    let fund_based_remainder = this.non_fund_based_value - current_total_of_non_funded;
    
  
    // Get difference between the optimum value and array value
    if(this.nonFundBasedForm.controls.limit_node_value.value > fund_based_remainder  ){
      this._snackbar.open("You have reach 0 Limit for Non-Fund-based Limits", "Try Again",{
        horizontalPosition:'end',
       verticalPosition:'top',
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }else{
      this.nonFundedLimitsArray.push(this.nonFundBasedForm.value)
      this.nfd.push(this.fb.group(
        this.nonFundBasedForm.value
        ));
    }
  }
  onAddFundBased(){
    // Get value of non fundbased
    this.fund_based_value = (this.formData.controls.fund_based_pcnt.value * 0.01 *  this.formData.controls.limit_value.value)
    const current_total_of_funded = this.fundedLimitsArray.reduce((sum, current) => sum + current.limit_node_value, 0);
    let fund_based_remainder = this.fund_based_value - current_total_of_funded;
    // Get difference between the optimum value and array value
    if(this.fundBasedForm.controls.limit_node_value.value > this.fund_based_value - current_total_of_funded){
      this._snackbar.open("You have reach 0 Limit for Fund-based Limits", "Try Again",{
        horizontalPosition:'end',
       verticalPosition:'top',
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }else{
      this.fundedLimitsArray.push(this.fundBasedForm.value)
      // this.fd.push(this.fb.group(
      //   this.fundBasedForm.value
      //   ));
    window.localStorage.setItem("Funded_based_Details", JSON.stringify(this.fundedLimitsArray));

    }
    // compare the difference between difference and the new value
  }
  editFundedValue(i){
    this.fundBasedForm = this.fb.group({
      limit_node_cust_code:[this.formData.controls.customer_code.value],
      limit_node_category:['Fundbased'],
      limit_node_name:[this.fundedLimitsArray[i].limit_node_name],
      limit_node_value:[this.fundedLimitsArray[i].limit_node_value]
    })
  }
  onUpdateFundbased(i:any){
    // let element = this.documentsArray.findIndex(i);
    this.fundedLimitsArray[i] = this.formData.value

    window.localStorage.removeItem("Funded_based_Details");
    window.localStorage.setItem("Funded_based_Details", JSON.stringify(this.fundedLimitsArray));
    this._snackBar.open('Updated', 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onDeleteFundbased(i:any){
    this.fundedLimitsArray.splice(i, 1);
    console.log("Funded based array slice", this.fundedLimitsArray );

    this.fundedLimitsArray = this.fundedLimitsArray;
    console.log("Funded based array", this.fundedLimitsArray );
    
    window.localStorage.removeItem("Funded_based_Details");
    window.localStorage.setItem("Funded_based_Details", JSON.stringify(this.fundedLimitsArray));
    this._snackBar.open('Deleted', 'X', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onSubmit(){
    // this.formData.controls.limit_nodes.push(this.fundedLimitsArray);
    // this.formData.controls.limit_nodes.setValue(this.nonFundedLimitsArray);
  
    if(this.formData.valid){
      if(this.function_type == "A-Add"){
        this.subscription = this.limitAPI.createLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:'end',
             verticalPosition:'top',
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']
            });
            this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")
          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:'end',
             verticalPosition:'top',
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )

      }else if(this.function_type == "I-Iquire"){
     

      }else if(this.function_type == "M-Modify"){
      
        this.subscription = this.limitAPI.updateLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:'end',
             verticalPosition:'top',
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")

          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:'end',
             verticalPosition:'top',
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )

      }else if(this.function_type == "X-Delete"){
        this.isDeleted = true;
        this.isEnabled = false;
        this.subscription = this.limitAPI.updateLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Record Deleted Successfully", "X",{
              horizontalPosition:'end',
             verticalPosition:'top',
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")

          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:'end',
             verticalPosition:'top',
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )


      }else if(this.function_type == "V-verify"){
        this.isDeleted = false;
        this.isEnabled = true
      }
    }else{
      this.router.navigateByUrl("system/configurations/collateral-limits/Limits/maintenance")

       this._snackbar.open("Invalid Form Data Value", "Try Again",{
         horizontalPosition:'end',
        verticalPosition:'top',
         duration:3000,
         panelClass:['red-snackbar', 'login-snackbar']
       })
    }
  }
  
}
