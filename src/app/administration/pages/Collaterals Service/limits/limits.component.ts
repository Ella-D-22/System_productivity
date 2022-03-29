import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CollateralLookupComponent } from '../../collateral/collateral-lookup/collateral-lookup.component';
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
  horizonatalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  customerData:any
  collateralData:any
  constructor(private fb:FormBuilder,
    private NodesApi:LimitsService,
    private _snackbar:MatSnackBar,
    private router:Router, 
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPage()
    this.onAddField()
  }

  formData = this.fb.group({
  collateral_code: [''],
  customer_code: [''],
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
  collateral_value: [''],
  postedBy: [''],
  postedFlag: [''],
  postedTime: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: [''],
  collaterals: new FormArray([]),
  })
 user = "Nobody"
  get f() { return this.formData.controls; }
  get c(){return this.f.collaterals as FormArray}
    // define form
    onAddField(){
      this.c.push(this.fb.group({
        collateral_code:[''],
        collateral_value:['']
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
    removeCollaterals(){

    }

    addCollaterals(){

    }
  getPage(){
    this.subscription = this.NodesApi.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        this.limitId = this.message.limitId
        if(this.function_type ==  'A-Add'){
      
          this.formData = this.fb.group({
            collateral_code: [''],
            customer_code: [''],
            deletedBy: [''],
            deletedFlag: [''],
            deletedTime: [''],
            fund_based_pcnt: [''],
            funded_value: [''],
            limit_code: [''],
            description: [''],
            limit_value: [''],
            modifiedBy: [''],
            modifiedTime: [''],
            non_fundbased_pcnt: [''],
            non_funded_value: [''],
            collateral_value: [''],
            cust_code: [''],
            deleteFlag: [''],
            deletedBy: [''],
            deletedTime: [''],
            id: [],
            limit_node: [''],
            limit_node_category: [''],
            limit_node_value: [''],
            modifiedBy: [''],
            modifiedTime: [''],
            postedBy: [''],
            postedFlag: [''],
            postedTime: [''],
            verifiedBy: [''],
            verifiedFlag: [''],
            verifiedTime: ['']

          });
    
        }else if(this.function_type == 'I-Inquire'){
          this.disabledFormControl()
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
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
                err =>{
                  this.router.navigateByUrl("")
                  this.error = err
                  this._snackbar.open(this.error, "Try Again",{
                    horizontalPosition:this.horizonatalPosition,
                    verticalPosition:this.verticalPosition,
                    duration:3000,
                    panelClass:['red-snackbar', 'login-snackbar']
                  })
                }

            }
          )
    
        }else if(this.function_type == 'M-Modify'){
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
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
                verifiedTime: [this.results.verifiedTime]
              });
              err =>{
                this.router.navigateByUrl("")
                this.error = err
                this._snackbar.open(this.error, "Try Again",{
                  horizontalPosition:this.horizonatalPosition,
                  verticalPosition:this.verticalPosition,
                  duration:3000,
                  panelClass:['red-snackbar', 'login-snackbar']
                })
              }

            }
          )
    
        }else if(this.function_type == 'X-Delete'){
          this.disabledFormControl
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
                collateral_code: [this.results.collateral_code],
                customer_code: [this.results.customer_code],
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
              err =>{
                this.router.navigateByUrl("")
                this.error = err
                this._snackbar.open(this.error, "Try Again",{
                  horizontalPosition:this.horizonatalPosition,
                  verticalPosition:this.verticalPosition,
                  duration:3000,
                  panelClass:['red-snackbar', 'login-snackbar']
                })
              }

            }
          )
    
        }else if(this.function_type == 'V-verify'){
          this.disabledFormControl
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
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
              err =>{
                this.router.navigateByUrl("")
                this.error = err
                this._snackbar.open(this.error, "Try Again",{
                  horizontalPosition:this.horizonatalPosition,
                  verticalPosition:this.verticalPosition,
                  duration:3000,
                  panelClass:['red-snackbar', 'login-snackbar']
                })
              } } )}
})
    
  
  }


  onSubmit(){
    console.log("thi form", this.formData.value);
    
    console.log("hello");
    
    if(this.formData.valid){
      if(this.function_type == "A-Add"){
        this.subscription = this.NodesApi.createLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            })
          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )

      }else if(this.function_type == "I-Iquire"){
        

      }else if(this.function_type == "M-Modify"){
        this.subscription = this.NodesApi.updateLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            })
          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )

      }else if(this.function_type == "X-Delete"){
        this.subscription = this.NodesApi.updateLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Record Deleted Successfully", "X",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            })
          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )


      }else if(this.function_type == "V-verify"){

      }
    }else{
       this._snackbar.open("Invalid Form Data Value", "Try Again",{
         horizontalPosition:this.horizonatalPosition,
         verticalPosition:this.verticalPosition,
         duration:3000,
         panelClass:['red-snackbar', 'login-snackbar']
       })
    }
  }
}
