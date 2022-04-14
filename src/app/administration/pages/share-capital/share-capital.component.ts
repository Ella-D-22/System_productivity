import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RetailCustomerLookupComponent } from '../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { LoanAccountLookupComponent } from '../loan-account/loan-account-lookup/loan-account-lookup.component';
import { LoanAccountService } from '../loan-account/loan-account.service';
import { ShareCapitalParamsService } from '../SystemConfigurations/GlobalParams/share-capital-params/share-capital-params.service';
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
  requireMemberAc: boolean;
  requireSaccoAc: boolean;
  account_type: string;
  dtype: string;
  cust_account_caa: any;
  currentAcctiveShare: any;
  constructor(private fb:FormBuilder,
    private dialog:MatDialog,
    private shareService:ShareCapitalService, 
    private ParamsService:ShareCapitalParamsService,
    private _snackbar:MatSnackBar) { }
    
  
  ngOnInit(): void {
    this.getCurrentShareValue()
    this.getPage()
  }

  getCurrentShareValue(){
    this.subscription = this.ParamsService.getLastEntry().subscribe(res=>{
      this.currentAcctiveShare = res;
    })
  }
  
   authuser  = "P"
 formData = this.fb.group({
  id: 0,
  buy_shares_from: [''],
  cust_code:[''],
  deleteFlag:['N'],
  deletedBy:['N'],
  deletedTime:[new Date()],
  modifiedBy:['N'],
  modifiedTime:[new Date()],
  partner_customer_account:[''],
  payment_account:[''],
  payment_means:[''],
  postedBy:[this.authuser],
  postedFlag:['Y'],
  postedTime:[new Date()],
  share_capital:[''],
  share_capital_paid:[''],
  shareholder_account:[''],
  shares_office_account:[''],
  shares_amount:[''],
  verifiedBy:['N'],
  verifiedFlag:['N'],
  verifiedTime:[new Date]
 })

 customerLookup():void{
  const dialogRef = this.dialog.open(RetailCustomerLookupComponent,{

  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data;
    this.formData.controls.cust_code.setValue(this.dialogData.customerCode)
    this.formData.controls.cust_name.setValue(this.dialogData.middleName)
  })
 }
  disabledFormData(){
    return this.formData.disable
  }
  onBuyFrmSacco(event:any){
    this.requireMemberAc = false
    this.requireSaccoAc = true
  }
  onBuyFrmMember(event:any){
    this.requireSaccoAc = false
    this.requireMemberAc = true
  }
  onSharesKeypressEvent(event){
    let shares_qt = event.target.value;
    let min_share_qt = this.currentAcctiveShare.share_min_unit
    let current_share_value = (this.currentAcctiveShare.share_capital_amount_per_unit/this.currentAcctiveShare.share_capital_unit)

    if(shares_qt<min_share_qt){
      this._snackbar.open("Current Minimum Shares is "+min_share_qt, "Try Again",{
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }else{
      let share_cal_amount = shares_qt * current_share_value
      this.formData.controls.shares_amount.setValue(share_cal_amount);
    }
  }

  officeAccountLookup(): void {
    this.dtype="oa"  
    const dconfig= new MatDialogConfig()
    dconfig.data={
      type:this.dtype
    }
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      console.log(result.data);
      this.formData.controls.account_code.setValue(result.data.acid);
    });
  }
  customerAccountLookup(): void {
    this.dtype="ca"
    const dconfig= new MatDialogConfig()
    dconfig.data={
      type:this.dtype
    }
    const cdialogRef = this.dialog.open(LoanAccountLookupComponent,dconfig);
    cdialogRef.afterClosed().subscribe((result) => {
      console.log(result.data);
      this.formData.controls.account_code.setValue(result.data.acid);
    });
  }


  
 getPage(){
   this.subscription = this.shareService.currentMessage.subscribe(
     message =>{
       this.message = message
       this.function_type = this.message.function_type
       this.cust_code = this.message.cust_code
       this.cust_name = this.message.cust_name
       this.cust_account_caa = this.message.cust_account_caa
      //  call to get account

       if(this.function_type == "A-Add"){
        this.formData = this.fb.group({
        })
        this.formData = this.fb.group({
          id: 0,
          buy_shares_from: [''],
          cust_code:[this.cust_code],
          cust_name:[this.cust_name],
          deleteFlag:['N'],
          deletedBy:['N'],
          deletedTime:[new Date()],                                                                                                                                                                     
          modifiedBy:['N'],
          modifiedTime:[new Date()],
          partner_customer_account:[''],
          payment_account:[''],
          payment_means:[''],
          postedBy:[this.authuser],
          postedFlag:['Y'],
          postedTime:[new Date()],
          share_capital:[''],
          share_capital_paid:[''],
          shareholder_account:[''],
          shares_office_account:[''],
          shares_amount:[''],
          verifiedBy:['N'],
          verifiedFlag:['N'],
          verifiedTime:[new Date]
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
    console.log(this.formData.value);
    
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
