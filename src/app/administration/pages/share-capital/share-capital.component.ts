import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RetailCustomerLookupComponent } from '../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { ShareCapitalService } from './share-capital.service';

@Component({
  selector: 'app-share-capital',
  templateUrl: './share-capital.component.html',
  styleUrls: ['./share-capital.component.scss']
})
export class ShareCapitalComponent implements OnInit {
 dialogData:any
 loading = false
 function_type:any
 cust_code:any
 cust_name:any
 message:any
 results:any
 error:any
 subscription:Subscription
 horizontalPosition:MatSnackBarHorizontalPosition
 verticalPosition:MatSnackBarVerticalPosition
  constructor(private fb:FormBuilder,
    private dialog:MatDialog,
    private shareService:ShareCapitalService, 
    private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.getPage()
  }
 formData = this.fb.group({

  id: 0,
  share_capital_amount: [''],
  shares: [''],
  cust_code: [''],
  cust_name: [''],
  modifiedBy: [''],
  modifiedTime: [''],
  postedBy: [''],
  postedFlag: [''],
  postedTime: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: [''],
  deleteFlag: [''],
  deletedBy: [''],
  deletedTime: [''],
 })

 customerLookup():void{
  const dialogRef = this.dialog.open(RetailCustomerLookupComponent,{

  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data;
    console.log(this.dialogData);
    
    this.formData.controls.cust_code.setValue(this.dialogData.customerCode)
    this.formData.controls.cust_name.setValue(this.dialogData.middleName)
  })
 }
  disabledFormData(){
    return this.formData.disable
  }
 
 getPage(){
   this.subscription = this.shareService.currentMessage.subscribe(
     message =>{
       this.message = message
       console.log(message);
       this.function_type = this.message.function_type
       this.cust_code = this.message.cust_code
       this.cust_name = this.message.cust_name
       if(this.function_type == "A-Add"){
        this.formData = this.fb.group({

        })
        this.formData = this.fb.group({
          
          share_capital_amount: [''],
          shares: [''],
          cust_code: [this.cust_code],
          cust_name: [this.cust_name],
          modifiedBy: ['user'],
          modifiedTime: [new Date()],
          postedBy: ['user'],
          postedFlag: ['Y'],
          postedTime: [new Date()],
          verifiedBy: ['user'],
          verifiedFlag: ['N'],
          verifiedTime: [new Date()],
          deleteFlag: ['N'],
          deletedBy: ['user'],
          deletedTime: [new Date()],
        })
       }else if(this.function_type == 'I-Inquire'){
         this.disabledFormData()
      this.subscription = this.shareService.getShareCapitalByCode(this.cust_code).subscribe(
        res =>{
            this.results = res

            this.formData = this.fb.group({
              id:[this.results.id],
              share_capital_amount: [this.results.share_capital_amount],
              shares: [this.results.shares],
              cust_code: [this.results.cust_code],
              cust_name: [this.results.cust_name],
              modifiedBy: [this.results.modifiedBy],
              modifiedTime: [this.results.modifiedTime],
              postedBy: [this.results.postedBy],
              postedFlag: [this.results.postedFlag],
              postedTime: [this.results.postedTime],
              verifiedBy: [this.results.verifiedBy],
              verifiedFlag: [this.results.verifiedFlag],
              verifiedTime: [this.results.verifiedTime],
              deleteFlag: [this.results.deleteFlag],
              deletedBy: [this.results.deletedBy],
              deletedTime: [this.results.deletedTime],
            })
        }
      )

       }else if(this.function_type == 'M-Modify'){
         this.subscription = this.shareService.getShareCapitalByCode(this.cust_code).subscribe(
           res=>{
            this.results = res

            this.formData = this.fb.group({
              id:[this.results.id],
              share_capital_amount: [this.results.share_capital_amount],
              shares: [this.results.shares],
              cust_code: [this.results.cust_code],
              cust_name: [this.results.cust_name],
              modifiedBy: ['user'],
              modifiedTime: [new Date()],
              postedBy: [this.results.postedBy],
              postedFlag: [this.results.postedFlag],
              postedTime: [this.results.postedTime],
              verifiedBy: [this.results.verifiedBy],
              verifiedFlag: [this.results.verifiedFlag],
              verifiedTime: [this.results.verifiedTime],
              deleteFlag: [this.results.deleteFlag],
              deletedBy: [this.results.deletedBy],
              deletedTime: [this.results.deletedTime],
            })
           }
         )

       }else if(this.function_type == 'X-Delete'){
        this.subscription = this.shareService.getShareCapitalByCode(this.cust_code).subscribe(
          res=>{
           this.results = res

           this.formData = this.fb.group({
             id:[this.results.id],
             share_capital_amount: [this.results.share_capital_amount],
             shares: [this.results.shares],
             cust_code: [this.results.cust_code],
             cust_name: [this.results.cust_name],
             modifiedBy: [this.results.modifiedBy],
             modifiedTime: [this.results.modifiedTime],
             postedBy: [this.results.postedBy],
             postedFlag: [this.results.postedFlag],
             postedTime: [this.results.postedTime],
             verifiedBy: [this.results.verifiedBy],
             verifiedFlag: [this.results.verifiedFlag],
             verifiedTime: [this.results.verifiedTime],
             deleteFlag: ['Y'],
             deletedBy: ['user'],
             deletedTime: [new Date()],
           })
          } ) }
       
     }) }

 onSubmit(){
   
  if(this.formData.valid){
    if(this.function_type == "A-Add"){
      this.subscription = this.shareService.createShareCapital(this.formData.value).subscribe(
        res =>{ this.results = res
          this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']
          })},
          err=>{
              this.error = err
              this._snackbar.open("Invalid Form Data Value", "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
          }   
      )
    }else if(this.function_type != "A-Add"){
      this.subscription = this.shareService.updateShareCapital(this.formData.value).subscribe(
        res =>{
          this.results
          this._snackbar.open("Updated Successfully", "X",{
            horizontalPosition:this.horizontalPosition,
            verticalPosition:this.verticalPosition,
            duration:3000,
            panelClass:['red-snackbar', 'login-snackbar']
          })
        }
      )
    }
  }
 }
}
