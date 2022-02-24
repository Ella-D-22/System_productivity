import { HttpClient , HttpParams} from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollateralService } from './collateral.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LinkedEventIdLookupComponent } from '../SystemConfigurations/ChargesParams/event-id/linked-event-id-lookup/linked-event-id-lookup.component';
// import { ChargesLookupComponent } from './charges-lookup/charges-lookup.component';

@Component({
  selector: 'app-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss']
})
export class CollateralComponent implements OnInit {
 
  subscription !:Subscription
  isEnabled = true;
  isDisabled = false;
  submitted = false;
  event_id:any;
  params:any;
  eventId:any;
  LodgingDesc: any;
  withdrawalDesc: any;

  function_type:any;
  description:any;
  collateralType:any;
  collateralCode:any;
  message !:any;
  results:any
  error: any;
  lookupdata: any;

  showContractInput =false;

  horizontalPosition :MatSnackBarHorizontalPosition = 'end';
  verticalPosition : MatSnackBarVerticalPosition = 'top';
  flagArray: any = [

    'Y','N'
  ]
  resData: any;
  with_collateralCode: any;
  with_description: any;
  lodge_collateralCode: any;
  lodge_description: any;
 

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private http:HttpClient,
    private dialog:MatDialog,
    private collateralService:CollateralService,
    private _snackBar : MatSnackBar,
    private ngZone: NgZone,
    private route:ActivatedRoute
    ) {
    this.message = this.router.getCurrentNavigation()?.extras.state;
  
    console.log(this.message);
    
   
     }
  
  
  ngOnInit(): void {
    this.getPage()
  }

// charge event for withdrawal
  withdrawalLookup(){
    const dialogRef = this.dialog.open(LinkedEventIdLookupComponent,{
      height: '400px',
      width:'600px'

    });
    dialogRef.afterClosed().subscribe(
      result =>{
        console.log("with lokup",result);
        
        this.lookupdata = result.data;
        this.with_collateralCode = this.lookupdata.collateralCode;
        this.with_description = this.lookupdata.description;
        this.formData.controls['chargeEventForWithdrawal'].setValue(this.with_collateralCode)
      }
    )

  }
  //charge event for Lodging
  LodgingLookup(){
    const dialogRef = this.dialog.open(LinkedEventIdLookupComponent,{
      height: '400px',
      width:'600px'

    });
    dialogRef.afterClosed().subscribe(
      result =>{
        this.lookupdata = result.data;
        this.lodge_collateralCode = this.lookupdata.collateralCode;
        this.lodge_description = this.lookupdata.description;
        this.formData.controls['chargeEventForLodging'].setValue(this.lodge_description)
      }
    )

  }


  get f(){return this.formData.controls}
  
  collateralTypeArray : any = [
    'Vehicle', 'consumer_goods','equipment', 'inventory','farm products'
  ]
  

  formData = this.formBuilder.group({
    collateralType : ['', [Validators.required]],
    collateralCode :['', [Validators.required, Validators.maxLength(4)]],
    description :['', [Validators.required]],
    companyCode:['', Validators.maxLength(4)],
    companyDetails:[''],
    contactDetails:[''],
    customerCode:[''],
    faceValue:['',Validators.required],
    margin:['',Validators.required],
    marketValue:[ Validators.required],
    otherDetails:[''],
    chargeEventForLodging:[''],
    chargeEventForWithdrawal:[''],
    percentageDrawingPower:[''],
    percentageLoanToTake:[''],
    shareCapital:[''],
    sharesIssued:[''],
    deletedBy:['Ann'],
    deletedTime:[new Date()],
    deletedFlag:['N'],
    verifiedBy:['Ann'],
    verifiedTime:[new Date()],
    verifiedFlag:[''],
    postedBy:['Ann'],
    postedTime:[new Date()],
    postedFlag:['Y'],
    modifiedBy:['Ann'],
    modifiedTime:[new Date()],
    

  })
  

  disabledFormControl(){
    this.formData.controls['collateralCode'].disable();
    this.formData.controls['collateralType'].disable();
    this.formData.controls['description'].disable();
    this.formData.controls['companyCode'].disable();
    this.formData.controls['companyDetails'].disable();
    this.formData.controls['contactDetails'].disable();
    this.formData.controls['customerCode'].disable();
    this.formData.controls['faceValue'].disable();
    this.formData.controls['margin'].disable();
    this.formData.controls['marketValue'].disable();
    this.formData.controls['otherDetails'].disable()
    this.formData.controls['chargeEventForLodging'].disable();
    this.formData.controls['chargeEventForWithdrawal'].disable();
    this.formData.controls['percentageDrawingPower'].disable();
    this.formData.controls['percentageLoanToTake'].disable();
    this.formData.controls['shareCapital'].disable();
    this.formData.controls['sharesIssued'].disable();

  

  }
  getPage(){
    this.function_type = this.message.function_type;
    this.collateralCode = this.message.collateralCode;
        if(this.message.function_type == "A-Add"){
            console.log(this.message);
                this.formData = this.formBuilder.group({
                  collateralCode:[this.collateralCode],
                  collateralType:['',[Validators.required]],
                  description:['',[Validators.required]],
                  companyCode:['', [Validators.required, Validators.maxLength(6)]],
                  contactDetails:[''],
                  companyDetails:[''],
                  customerCode:[''],
                  faceValue:['', [Validators.required]],
                  margin:['', [Validators.required]],
                  marketValue:[, [Validators.required]],
                  otherDetails:[''],
                  chargeEventForLodging:[,],
                  chargeEventForWithdrawal:[,],
                  percentageDrawingPower:[,],
                  percentageLoanToTake:[,],
                  shareCapital:[,],
                  sharesIssued:[,],
                  deletedBy:[''],
                  deletedTime:[''],
                  deletedFlag:['N'],
                  verifiedBy:['Ann'],
                  verifiedTime:[new Date()],
                  verifiedFlag:['Y'],
                  postedBy:['Ann'],
                  postedTime:[new Date()],
                  postedFlag:['Y'],
                  modifiedBy:['Ann'],
                  modifiedTime:[new Date()],
                  // sn:[0]
            
                });
              
            
            
       
        }
          else if(this.message.function_type == "I-Inquire"){
           console.log(this.message);
           
          // let code = 'rete'
          this.collateralService.getCollateralByCode(this.message.collateralCode).subscribe(
            res =>{
             
              //  this.resData = res['entity'];
              this.resData = res;            

               this.formData = this.formBuilder.group({
                collateralCode:[this.resData.entity.collateralCode],
                collateralType:[this.resData.entity.collateralType],
                description:[this.resData.entity.description],
                companyCode:[this.resData.entity.companyCode],
                companyDetails:[this.resData.entity.companyDetails],
                contactDetails:[this.resData.entity.contactDetails],
                customerCode:[this.resData.entity.customerCode],
                faceValue:[this.resData.entity.faceValue],
                margin:[this.resData.entity.margin],
                marketValue:[this.resData.entity.marketValue],
                otherDetails:[this.resData.entity.otherDetails],
                chargeEventForLodging:[this.resData.entity.chargeEventForLodging],
                chargeEventForWithdrawal:[this.resData.entity.chargeEventForWithdrawal],
                percentageDrawingPower:[this.resData.entity.percentageDrawingPower],
                percentageLoanToTake:[this.resData.entity.percentageLoanToTake],
                shareCapital:[this.resData.entity.shareCapital],
                sharesIssued:[this.resData.entity.sharesIssued],
                // deletedBy:[this.resData.entity.deletedBy],
                // deletedTime:[this.resData.entity.deletedTime],
                // deletedFlag:[this.resData.entity.deletedFlag],
                // verifiedBy:[this.resData.entity.verifiedBy],
                // verifiedTime:[this.resData.entity.verifiedTime],
                // verifiedFlag:[this.resData.entity.verifiedFlag],
                // postedBy:[this.resData.entity.postedBy],
                // postedTime:[this.resData.entity.postedTime],
                // postedFlag:[this.resData.entity.postedFlag],
                // modifiedBy:[this.resData.entity.modifiedBy],
                // modifiedTime:[this.resData.entity.modifiedTime],
                
                sn:[this.resData.entity.sn]


              });
           
            }
          )
          this.disabledFormControl();

          }
          else if(this.message.function_type == "M-Modify"){
            console.log("Modifying",this.message);
            
            this.collateralService.getCollateralByCode(this.message.collateralCode).subscribe(
              res =>{

                // this.results = res['entity']
              this.resData = res;
                this.formData = this.formBuilder.group({
                  collateralCode:[this.resData.entity.collateralCode],
                  collateralType:[this.resData.entity.collateralType],
                  description:[this.resData.entity.description],
                  companyCode:[this.resData.entity.companyCode],
                  companyDetails:[this.resData.entity.companyDetails],
                  contactDetails:[this.resData.entity.contactDetails],
                  customerCode:[this.resData.entity.customerCode],
                  faceValue:[this.resData.entity.faceValue],
                  margin:[this.resData.entity.margin],
                  marketValue:[this.resData.entity.marketValue],
                  otherDetails:[this.resData.entity.otherDetails],
                  chargeEventForLodging:[this.resData.entity.chargeEventForLodging],
                  chargeEventForWithdrawal:[this.resData.entity.chargeEventForWithdrawal],
                  percentageDrawingPower:[this.resData.entity.percentageDrawingPower],
                  percentageLoanToTake:[this.resData.entity.percentageLoanToTake],
                  shareCapital:[this.resData.entity.shareCapital],
                  sharesIssued:[this.resData.entity.sharesIssued],

                  deletedBy:[''],
                  deletedTime:[''],
                  deletedFlag:['N'],
                  verifiedBy:[this.resData.entity.verifiedBy],
                  verifiedTime:[this.resData.entity.verifiedTime],
                  verifiedFlag:[this.resData.entity.verifiedFlag],
                  postedBy:[this.resData.entity.postedBy],
                  postedTime:[this.resData.entity.postedTime],
                  postedFlag:[this.resData.entity.postedFlag],
                  modifiedBy:['Ann'],
                  modifiedTime:[new Date()],
                  sn:[this.resData.entity.sn]
  
  
                });
              }
            )
       
              
        

          
          }  else if(this.message.function_type == "D-Delete"){
            this.collateralService.getCollateralByCode(this.message.collateralCode).subscribe(
              res =>{

                // this.results = res['entity']
              this.resData = res;
                this.formData = this.formBuilder.group({
                  collateralCode:[this.resData.entity.collateralCode],
                  collateralType:[this.resData.entity.collateralType],
                  description:[this.resData.entity.description],
                  companyCode:[this.resData.entity.companyCode],
                  companyDetails:[this.resData.entity.companyDetails],
                  customerCode:[this.resData.entity.customerCode],
                  contactDetails:[this.resData.entity.contactDetails],
                  faceValue:[this.resData.entity.faceValue],
                  margin:[this.resData.entity.margin],
                  marketValue:[this.resData.entity.marketValue],
                  otherDetails:[this.resData.entity.otherDetails],
                  chargeEventForLodging:[this.resData.entity.chargeEventForLodging],
                  chargeEventForWithdrawal:[this.resData.entity.chargeEventForWithdrawal],
                  percentageDrawingPower:[this.resData.entity.percentageDrawingPower],
                  percentageLoanToTake:[this.resData.entity.percentageLoanToTake],
                  shareCapital:[this.resData.entity.shareCapital],
                  sharesIssued:[this.resData.entity.sharesIssued],

                  deletedBy:['Ann'],
                  deletedTime:[new Date()],
                  deletedFlag:['Y'],
                  verifiedBy:[this.resData.entity.verifiedBy],
                  verifiedTime:[this.resData.entity.verifiedTime],
                  verifiedFlag:[this.resData.entity.verifiedFlag],
                  postedBy:[this.resData.entity.postedBy],
                  postedTime:[this.resData.entity.postedTime],
                  postedFlag:[this.resData.entity.postedFlag],
                  modifiedBy:[this.resData.entity.modifiedBy],
                  modifiedTime:[this.resData.entity.modifiedTime],
                  sn:[this.resData.entity.sn]
  
  
                });
              }
            )
            this.disabledFormControl();
            }
          
    }
  onSubmit() {
    console.log("form data before validator", this.formData.value);
    
  
      this.submitted = true;
      // stop here if form is invalid
      if (this.formData.valid){
        if(this.message.function_type == "A-Add"){
          console.log(this.formData.value);
          
           this.collateralService.createCollateral(this.formData.value).subscribe(res=>{
             console.log(res);
             
           this.results = res;
           console.log(this.results);
           
            this._snackBar.open("Executed Successfully!", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar','login-snackbar'],
            });
        },err=>{
          this.error = err;
          this._snackBar.open(this.error, "Try again!", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: ['red-snackbar','login-snackbar'],
          });
        })
        }else if(this.function_type == "M-Modify"){
          // this.eventId = this.activatedRoute.snapshot.paramMap.get('event_id');
          // this.collaterals: = this.route.snapshot.
          console.log(this.message.entity);
          console.log("This formData",this.formData.value);
          
          this.collateralService.updateCollateral(this.formData.value).subscribe(res=>{
            console.log(this.message.entity);
            console.log(res);
            console.log(this.formData.value);
            
            this.results = res;
              this._snackBar.open("Executed Successfully!", "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar','login-snackbar'],
              });
          },err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
          })  
        }else if(this.function_type == "D-Delete"){
          console.log("formdata", this.formData.value);
          
          this.collateralService.updateCollateral(this.formData.value).subscribe(res=>{
            this.results = res;
            console.log(this.results);
            
              this._snackBar.open("Deleted Successfully!", "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar','login-snackbar'],
              });
          },err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
          })

        }

      }else{
      
        this._snackBar.open("Invalid Form Data", "Try again!", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      }
  }  

 



}
