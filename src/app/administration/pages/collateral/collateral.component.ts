import { HttpClient , HttpParams} from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollateralService } from './collateral.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EventIdLookupComponent } from '../SystemConfigurations/ChargesParams/event-id/event-id-lookup/event-id-lookup.component';

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
    const dialogRef = this.dialog.open(EventIdLookupComponent,{
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
    const dialogRef = this.dialog.open(EventIdLookupComponent,{
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
    'Vehicle and Machineries', 'Immovable Properties','Stock', 'Shares','Term Deposits'
  ]

  submissionFreqArray: any =[
    'Daily', 'Weekly','Monthly', 'Yearly', 'None'
  ]
  

  formData = this.formBuilder.group({

    // General detalails for collaterals
    collateralType : ['', [Validators.required]],
    collateralCode :['', [Validators.required, Validators.maxLength(4)]],
    description :['', [Validators.required]],
    ceilingLimit:[''],
    loanValue:['',Validators.required],
    marginPercent:['',Validators.required],
    marketValue:['', Validators.required],
    currencyCollateral:[''],
    otherDetails:[''],
    chargeEventForLodging:[''],
    chargeEventForWithdrawal:[''],
    percentageDrawingPower:[''],
    percentageLoanToTake:[''],
    lastEvaluationDate:[''],
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

    //Particulars details for collateral
    //1. Vehicle and Machineries
    yearofManufacture:[''],
    dateofPurchase:[''],
    registrationNumber:[''],
    chasisNumber:[''],
    engineNo:[''],
    registeredownerName:[''],
    model:[''],
    manufacture:[''],
    machineNo:[''],

    //2.Immovable Properties
    propertyDocumentNo:[''],
    purchaseDate:[''],
    builtArea:[''],
    landArea:[''],
    unitMeasurement:[''],
    propertyAddress:[''],
    leased:[''],
    leasedExpiryDate:[''],
    ageBuilding:[''],

    //3.Stock
    lodgedDate:[''],
    collateralValue:[''],
    frequencyforSubmission:[''],
    applypenalInterest:[''],
    reviewDate:[''],
    dueDate:[''],
    withdrawnDate:[''],

    //4.Term Deposits
    depositAccountNo:[''],
    denominationsNo:[''],
    fullBenefit:[''],
    apportionedValue:[''],
    lienAmount:[''],

    //5.Shares
    companyDetails:[''],
    sharesCapital:[''],
    nosharesIsssued:[''],
    contactDetails:[''],

    //Insurance Details
    insuranceType:[''],
    policyNo:[''],
    policyAmount:[''],
    insurerDetails:[''],
    risk_cover_start_date:[''],
    risk_cover_end_date:[''],
    last_premium_paid_date:[''],
    premiumAmount:[''],
    frequency:[''],
    itemsInsured:[''],
    notes:[''],

    //receipt and payment
    name:[''],
    city:[''],
    address:[''],
    state:[''],
    postal_code:[''],
    receipt_type:[''],
    receipt_amount:[''],
    payment_type:[''],
    payment_amount:[''],
    due_date:[''],
    paid_received_date:[''],
    date_from:[''],
    to_date:[''],
    proof_verified_date:[''],
    mode_of_pay:[''],
    remarks:[''],

    //inspection details
    inspection_type:[''],
    insp_address:[''],
    insp_city:[''],
    insp_state:[''],
    insp_postal_code:[''],
    insp_telephone_no:[''],
    due_date_for_visit:[''],
    date_of_visit:[''],
    inspected_value:[''],
    inspection_emp_id:[''],
    insp_remarks:['']


    //sales notes for Tradable Securities


    

  })
  

  disabledFormControl(){
    this.formData.controls['collateralCode'].disable();
    this.formData.controls['collateralType'].disable();
    this.formData.controls['description'].disable();
    this.formData.controls['loanValue'].disable();
    this.formData.controls['marginPercent'].disable();
    this.formData.controls['marketValue'].disable();
    this.formData.controls['otherDetails'].disable()
    this.formData.controls['chargeEventForLodging'].disable();
    this.formData.controls['chargeEventForWithdrawal'].disable();
    this.formData.controls['percentageDrawingPower'].disable();
    this.formData.controls['percentageLoanToTake'].disable();
    this.formData.controls['lastEvaluationDate'].disable();
    this.formData.controls['ceilingLimit'].disable();
    this.formData.controls['currencyCollateral'].disable();
     //1. Vehicle and Machineries
     this.formData.controls['yearofManufacture'].disable();
     this.formData.controls['dateofPurchase'].disable();
     this.formData.controls['registrationNumber'].disable();
     this.formData.controls['chasisNumber'].disable();
     this.formData.controls['engineNo'].disable();
     this.formData.controls['registeredownerName'].disable();
     this.formData.controls['model'].disable();
     this.formData.controls['manufacture'].disable();
     this.formData.controls['machineNo'].disable();

         //2.Immovable Properties
    this.formData.controls['propertyDocumentNo'].disable();
    this.formData.controls['purchaseDate'].disable();
    this.formData.controls['builtArea'].disable();
    this.formData.controls['landArea'].disable();
    this.formData.controls['unitMeasurement'].disable();
    this.formData.controls['propertyAddress'].disable();
    this.formData.controls['leased'].disable();
    this.formData.controls['leasedExpiryDate'].disable();
    this.formData.controls['ageBuilding'].disable();

     //3.Stock
     this.formData.controls['lodgedDate'].disable();
     this.formData.controls['collateralValue'].disable();
     this.formData.controls['frequencyforSubmission'].disable();
     this.formData.controls['applypenalInterest'].disable();
     this.formData.controls['reviewDate'].disable();
     this.formData.controls['dueDate'].disable();
     this.formData.controls['withdrawnDate'].disable();
    //4.Term Deposits
    this.formData.controls['depositAccountNo'].disable();
    this.formData.controls['denominationsNo'].disable();
    this.formData.controls['fullBenefit'].disable();
    this.formData.controls['apportionedValue'].disable();
    this.formData.controls['lienAmount'].disable();

    //5.Shares
    this.formData.controls['companyDetails:'].disable();
    this.formData.controls['sharesCapital'].disable();
    this.formData.controls['nosharesIsssued'].disable();
    this.formData.controls['contactDetails'].disable()

  

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
