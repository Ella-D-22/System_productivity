import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  
  constructor(private fb:FormBuilder,
    private NodesApi:LimitsService,
    private _snackbar:MatSnackBar,
    private router:Router) { }

    isDeleted = false
    isEnabled = false
  ngOnInit(): void {
    this.getPage()
  }

  formData = this.fb.group({
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
  })

  get f() { 
    return this.formData.controls; }

  
    disabledFormControl(){
      this.formData.disable()
    }
    customerLookup(){

    }
  getPage(){
    this.subscription = this.NodesApi.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        this.limitId = this.message.limitId
        if(this.function_type ==  'A-Add'){
          this.isDeleted = false;
          this.isEnabled = true;
          this.formData = this.fb.group({
            cust_code: [''],
            deleteFlag: ['N'],
            deletedBy: ['None'],
            deletedTime: [new Date()],
            limit_node: [''],
            limit_node_category: [''],
            limit_node_value: [''],
            modifiedBy: ['None'],
            modifiedTime: [new Date()],
            postedBy: ['User'],
            postedFlag: ['Y'],
            postedTime: [new Date()],
            verifiedBy: ['None'],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()]

          });
    
        }else if(this.function_type == 'I-Inquire'){
          this.isDeleted = false;
          this.isEnabled = false
          this.disabledFormControl()
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
            res =>{
                this.results = res

                this.formData = this.fb.group({
                  cust_code: [this.results.cust_code],
                  deleteFlag: [this.results.deleteFlag],
                  deletedBy: [this.results.deletedBy],
                  deletedTime: [this.results.deletedTime],
                  id: [this.results.id],
                  limit_node: [this.results.limit_node],
                  limit_node_category: [this.results.limit_node_category],
                  limit_node_value: [this.results.limit_node_value],
                  modifiedBy: [this.results.modifiedBy],
                  modifiedTime: [this.results.modifiedTime],
                  postedBy: [this.results.postedBy],
                  postedFlag: [this.results.postedFlag],
                  postedTime: [this.results.postedTime],
                  verifiedBy: [this.results.verifiedBy],
                  verifiedFlag: [this.results.verifiedFlag],
                  verifiedTime: [this.results.verifiedTime]
                });
                err =>{
                  this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")
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
          this.isDeleted = false;
          this.isEnabled = true
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
            res =>{
              this.results = res
              this.formData = this.fb.group({
                cust_code: [this.results.cust_code],
                deleteFlag: [this.results.deleteFlag],
                deletedBy: [this.results.deletedBy],
                deletedTime: [this.results.deletedTime],
                id: [this.results.id],
                limit_node: [this.results.limit_node],
                limit_node_category: [this.results.limit_node_category],
                limit_node_value: [this.results.limit_node_value],
                modifiedBy: ['None'],
                modifiedTime: [new Date()],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime]
              });
              err =>{
                this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")
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
          this.isDeleted = true;
          this.isEnabled = false
          this.disabledFormControl
          this.subscription = this.NodesApi.getLimitsNodesById(this.limitId).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
                cust_code: [this.results.cust_code],
                deleteFlag: ['Y'],
                deletedBy: ['User'],
                deletedTime: [new Date()],
                id: [this.results.id],
                limit_node: [this.results.limit_node],
                limit_node_category: [this.results.limit_node_category],
                limit_node_value: [this.results.limit_node_value],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
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
                cust_code: [this.results.cust_code],
                deleteFlag: [this.results.deleteFlag],
                deletedBy: [this.results.deletedBy],
                deletedTime: [this.results.deletedTime],
                id: [this.results.id],
                limit_node: [this.results.limit_node],
                limit_node_category: [this.results.limit_node_category],
                limit_node_value: [this.results.limit_node_value],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                verifiedBy: ["User"],
                verifiedFlag: ['Y'],
                verifiedTime: [new Date()]
              });
              err =>{
                this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")
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
    if(this.formData.valid){
      if(this.function_type == "A-Add"){
      console.log(this.formData.value);
      
        this.subscription = this.NodesApi.createLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")

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

            });
            this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")

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
        this.isDeleted = true;
        this.isEnabled = false;
        this.subscription = this.NodesApi.updateLimitNodes(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Record Deleted Successfully", "X",{
              horizontalPosition:this.horizonatalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")

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
        this.isDeleted = false;
        this.isEnabled = true
      }
    }else{
      this.router.navigateByUrl("system/configurations/limits and collateral/Limits Nodes/maintenance")

       this._snackbar.open("Invalid Form Data Value", "Try Again",{
         horizontalPosition:this.horizonatalPosition,
         verticalPosition:this.verticalPosition,
         duration:3000,
         panelClass:['red-snackbar', 'login-snackbar']
       })
    }
  }
}
