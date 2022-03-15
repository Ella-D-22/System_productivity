import { HttpClient , HttpParams} from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollateralService } from './collateral.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EventIdLookupComponent } from '../SystemConfigurations/ChargesParams/event-id/event-id-lookup/event-id-lookup.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-collateral',
  templateUrl: './collateral.component.html',
  styleUrls: ['./collateral.component.scss']
})
export class CollateralComponent implements OnInit {
 
  subscription !:Subscription
  deleting = false;
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

   

     vehicle_and_machineries = false;
     immovable = false;
     shares = false;
     stocks = false;
     term_deposits = false;

  
     onSelectionType(event:any){
       this.collateralType= event.target.value
       if(this.collateralType == "VEHICLE & MACHINERIES"){
         this.vehicle_and_machineries = true;
       }else if(this.collateralType == "IMMOVABLE"){
         this.immovable = true;
       }else if(this.collateralType == "SHARES"){
         this.shares = true;
       }else if(this.collateralType == "STOCKS"){
         this.stocks = true;
       }else if(this.collateralType == "TERM DEPOSITS"){
         this.term_deposits = true;
       }
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
  
 

  submissionFreqArray: any =[
    'DAILY', 'WEEKLY','MONTHLY', 'YEARLY', 'NONE'
  ]
  
  formData = this.formBuilder.group({
    // General detalails for collaterals
    collateralType : [''],
    collateralCode :[''],
    customerCode:[''],
    description :['', ],
    ceilingLimit:[''],
    loanValue:[''],
    marginPercent:[''],
    marketValue:[''],
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
    due_date_for_rec:[''],
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
    insp_remarks:[''],


    //sales notes for Tradable Securities

    brokerName:[''],
    sent_for_sale_on:[''],
    sales_due_date:[''],
    sales_review_date:[''],
    proceeds_received_on:[''],
    stock_exchange:[''],
    expected_min_price:[''],
    sales_proceed_received:[''],
    sales_notes:[''],
   
    //fees
    percentage_amount_collected:[''],
    collected_amount:['']



    

  })
  

  disabledFormControl(){
    this.formData.disable()
  }
  getPage(){
    this.function_type = this.message.function_type;
    this.collateralCode = this.message.collateralCode;
        if(this.message.function_type == "A-Add"){
            console.log(this.message);
                this.formData = this.formBuilder.group({
                  collateralCode:[this.collateralCode],
                  collateralType:[''],
                  customerCode:[''],
                  description:[''],
                  ceilingLimit:[''],
                  currencyCollateral:[''],
                  marginPercent:[''],
                  marketValue:[''],
                  loanValue:[''],
                  otherDetails:[''],
                  chargeEventForLodging:[''],
                  chargeEventForWithdrawal:[''],
                  percentageDrawingPower:[''],
                  percentageLoanToTake:[''],
                  lastEvaluationDate:[''],
                  deletedBy:[''],
                  deletedTime:[''],
                  deletedFlag:['N'],
                  verifiedBy:[''],
                  verifiedTime:[''],
                  verifiedFlag:['Y'],
                  postedBy:['Ann'],
                  postedTime:[new Date()],
                  postedFlag:['Y'],
                  modifiedBy:[''],
                  modifiedTime:[''],
                  // sn:[0]

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
                  due_date_for_rec:[''],
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
                  insp_remarks:[''],


                  //sales notes for Tradable Securities

                  brokerName:[''],
                  sent_for_sale_on:[''],
                  sales_due_date:[''],
                  sales_review_date:[''],
                  proceeds_received_on:[''],
                  stock_exchange:[''],
                  expected_min_price:[''],
                  sales_proceed_received:[''],
                  sales_notes:[''],
                
                  //fees 
                  percentage_amount_collected:[''],
                  collected_amount:['']
            
                });
              
            
            
       
        }
          else if(this.message.function_type == "I-Inquire"){
           console.log(this.message);
           
          // let code = 'rete'
          this.collateralService.getCollateralByCode(this.message.collateralCode).subscribe(
            res =>{
              this.resData = res;         
              console.log(this.resData);

              this.collateralType= this.resData.entity.collateralType;
              if(this.collateralType == "VEHICLE & MACHINERIES"){
                this.disabledFormControl()
                this.vehicle_and_machineries = true;
              }else if(this.collateralType == "IMMOVABLE"){
                this.disabledFormControl()
                this.immovable = true;
              }else if(this.collateralType == "SHARES"){
                this.disabledFormControl()
                this.shares = true;
              }else if(this.collateralType == "STOCKS"){
                this.disabledFormControl()
                this.stocks = true;
              }else if(this.collateralType == "TERM DEPOSITS"){
                this.disabledFormControl()
                this.term_deposits = true;
              }
             
              
                 
               this.formData = this.formBuilder.group({
                collateralCode:[this.resData.entity.collateralCode],
                collateralType:[this.collateralType],
                customerCode:[this.resData.entity.customerCode],
                description:[this.resData.entity.description],
                currencyCollateral:[this.resData.entity.currencyCollateral],
                ceilingLimit:[this.resData.entity.ceilingLimit],
                loanValue:[this.resData.entity.loanValue],
                marginPercent:[this.resData.entity.marginPercent],
                marketValue:[this.resData.entity.marketValue],
                otherDetails:[this.resData.entity.otherDetails],
                chargeEventForLodging:[this.resData.entity.chargeEventForLodging],
                chargeEventForWithdrawal:[this.resData.entity.chargeEventForWithdrawal],
                percentageDrawingPower:[this.resData.entity.percentageDrawingPower],
                percentageLoanToTake:[this.resData.entity.percentageLoanToTake],
                lastEvaluationDate:[this.resData.entity.lastEvaluationDate],

                            //1. Vehicle and Machineries
                yearofManufacture:[this.resData.entity.yearofManufacture],
                dateofPurchase:[this.resData.entity.dateofPurchase],
                registrationNumber:[this.resData.entity.registrationNumber],
                chasisNumber:[this.resData.entity.chasisNumber],
                engineNo:[this.resData.entity.engineNo],
                registeredownerName:[this.resData.entity.registeredownerName],
                model:[this.resData.entity.model],
                manufacture:[this.resData.entity.manufacture],
                machineNo:[this.resData.entity.machineNo],

                //2.Immovable Properties
                propertyDocumentNo:[this.resData.entity.propertyDocumentNo],
                purchaseDate:[this.resData.entity.purchaseDate],
                builtArea:[this.resData.entity.builtArea],
                landArea:[this.resData.entity.landArea],
                unitMeasurement:[this.resData.entity.unitMeasurement],
                propertyAddress:[this.resData.entity.propertyAddress],
                leased:[this.resData.entity.leased],
                leasedExpiryDate:[this.resData.entity.leasedExpiryDate],
                ageBuilding:[this.resData.entity.ageBuilding],

                //3.Stock
                lodgedDate:[this.resData.entity.lodgedDate],
                collateralValue:[this.resData.entity.collateralValue],
                frequencyforSubmission:[this.resData.entity.frequencyforSubmission],
                applypenalInterest:[this.resData.entity.applypenalInterest],
                reviewDate:[this.resData.entity.reviewDate],
                dueDate:[this.resData.entity.duedate],
                withdrawnDate:[this.resData.entity.withdrawnDate],

                //4.Term Deposits
                depositAccountNo:[this.resData.entity.depositAccountNo],
                denominationsNo:[this.resData.entity.denominationsNo],
                fullBenefit:[this.resData.entity.fullBenefit],
                apportionedValue:[this.resData.entity.apportionedValue],
                lienAmount:[this.resData.entity.lienAmount],

                //5.Shares
                companyDetails:[this.resData.entity.companyDetails],
                contactDetails:[this.resData.entity.contactDetails],
                shareCapital:[this.resData.entity.shareCapital],
                sharesIssued:[this.resData.entity.sharesIssued],


              

                 
                  //Insurance Details
                  insuranceType:[this.resData.entity.insuranceType],
                  policyNo:[this.resData.entity.policyNo],
                  policyAmount:[this.resData.entity.policyAmount],
                  insurerDetails:[this.resData.entity.insurerDetails],
                  risk_cover_start_date:[this.resData.entity.risk_cover_start_date],
                  risk_cover_end_date:[this.resData.entity.risk_cover_end_date],
                  last_premium_paid_date:[this.resData.entity.last_premium_paid_date],
                  premiumAmount:[this.resData.entity.premiumAmount],
                  frequency:[this.resData.entity.frequency],
                  itemsInsured:[this.resData.entity.itemsInsured],
                  notes:[this.resData.entity.notes],

                  //receipt and payment
                  name:[this.resData.entity.name],
                  city:[this.resData.entity.city],
                  address:[this.resData.entity.address],
                  state:[this.resData.entity.state],
                  postal_code:[this.resData.entity.postal_code],
                  receipt_type:[this.resData.entity.receipt_type],
                  receipt_amount:[this.resData.entity.receipt_amount],
                  payment_type:[this.resData.entity.payment_type],
                  payment_amount:[this.resData.entity.payment_amount],
                  due_date:[this.resData.entity.due_date_for_rec],
                  paid_received_date:[this.resData.entity.paid_received_date],
                  date_from:[this.resData.entity.date_from],
                  to_date:[this.resData.entity.to_date],
                  proof_verified_date:[this.resData.entity.proof_verified_date],
                  mode_of_pay:[this.resData.entity.mode_of_pay],
                  remarks:[this.resData.entity.remarks],

                  //inspection details
                  inspection_type:[this.resData.entity.inspection_type],
                  insp_address:[this.resData.entity.insp_address],
                  insp_city:[this.resData.entity.insp_city],
                  insp_state:[this.resData.entity.insp_state],
                  insp_postal_code:[this.resData.entity.insp_postal_code],
                  insp_telephone_no:[this.resData.entity.insp_telephone_no],
                  due_date_for_visit:[this.resData.entity.due_date_for_visit],
                  date_of_visit:[this.resData.entity.date_of_visit],
                  inspected_value:[this.resData.entity.inspected_value],
                  inspection_emp_id:[this.resData.entity.inspection_emp_id],
                  insp_remarks:[this.resData.entity.insp_remarks],


                  //sales notes for Tradable Securities

                  brokerName:[this.resData.entity.brokerName],
                  sent_for_sale_on:[this.resData.entity.sent_for_sale_on],
                  sales_due_date:[this.resData.entity.sales_due_date],
                  sales_review_date:[this.resData.entity.sales_review_date],
                  proceeds_received_on:[this.resData.entity.proceeds_received_on],
                  stock_exchange:[this.resData.entity.stock_exchange],
                  expected_min_price:[this.resData.entity.expected_min_price],
                  sales_proceed_received:[this.resData.entity.sales_proceed_received],
                  sales_notes:[''],

                  //fees
                  percentage_amount_collected:[this.resData.entity.percentage_amount_collected],
                  collected_amount:[this.resData.entity.collected_amount],
                
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

              this.collateralType= this.resData.entity.collateralType;
              if(this.collateralType == "VEHICLE & MACHINERIES"){
                this.vehicle_and_machineries = true;
              }else if(this.collateralType == "IMMOVABLE"){
                this.immovable = true;
              }else if(this.collateralType == "SHARES"){
                this.shares = true;
              }else if(this.collateralType == "STOCKS"){
                this.stocks = true;
              }else if(this.collateralType == "TERM DEPOSITS"){
                this.term_deposits = true;
              }
                this.formData = this.formBuilder.group({
                  collateralCode:[this.resData.entity.collateralCode],
                  collateralType:[this.resData.entity.collateralType],
                  description:[this.resData.entity.description],
                  customerCode:[this.resData.entity.customerCode],
                  loanValue:[this.resData.entity.loanValue],
                  marginPercent:[this.resData.entity.marginPercent],
                  marketValue:[this.resData.entity.marketValue],
                  otherDetails:[this.resData.entity.otherDetails],
                  chargeEventForLodging:[this.resData.entity.chargeEventForLodging],
                  chargeEventForWithdrawal:[this.resData.entity.chargeEventForWithdrawal],
                  percentageDrawingPower:[this.resData.entity.percentageDrawingPower],
                  percentageLoanToTake:[this.resData.entity.percentageLoanToTake],
                  lastEvaluationDate:[this.resData.entity.lastEvaluationDate],
                  

                  deletedBy:[this.resData.entity.deletedBy],
                  deletedTime:[this.resData.entity.deletedTime],
                  deletedFlag:[this.resData.entity.deletedFlag],
                  verifiedBy:[this.resData.entity.verifiedBy],
                  verifiedTime:[this.resData.entity.verifiedTime],
                  verifiedFlag:[this.resData.entity.verifiedFlag],
                  postedBy:[this.resData.entity.postedBy],
                  postedTime:[this.resData.entity.postedTime],
                  postedFlag:[this.resData.entity.postedFlag],
                  modifiedBy:['Ann'],
                  modifiedTime:[new Date()],
                               //1. Vehicle and Machineries
                yearofManufacture:[this.resData.entity.yearofManufacture],
                dateofPurchase:[this.resData.entity.dateofPurchase],
                registrationNumber:[this.resData.entity.registrationNumber],
                chasisNumber:[this.resData.entity.chasisNumber],
                engineNo:[this.resData.entity.engineNo],
                registeredownerName:[this.resData.entity.registeredownerName],
                model:[this.resData.entity.model],
                manufacture:[this.resData.entity.manufacture],
                machineNo:[this.resData.entity.machineNo],

                //2.Immovable Properties
                propertyDocumentNo:[this.resData.entity.propertyDocumentNo],
                purchaseDate:[this.resData.entity.purchaseDate],
                builtArea:[this.resData.entity.builtArea],
                landArea:[this.resData.entity.landArea],
                unitMeasurement:[this.resData.entity.unitMeasurement],
                propertyAddress:[this.resData.entity.propertyAddress],
                leased:[this.resData.entity.leased],
                leasedExpiryDate:[this.resData.entity.leasedExpiryDate],
                ageBuilding:[this.resData.entity.ageBuilding],

                //3.Stock
                lodgedDate:[this.resData.entity.lodgedDate],
                collateralValue:[this.resData.entity.collateralValue],
                frequencyforSubmission:[this.resData.entity.frequencyforSubmission],
                applypenalInterest:[this.resData.entity.applypenalInterest],
                reviewDate:[this.resData.entity.reviewDate],
                dueDate:[this.resData.entity.duedate],
                withdrawnDate:[this.resData.entity.withdrawnDate],

                //4.Term Deposits
                depositAccountNo:[this.resData.entity.depositAccountNo],
                denominationsNo:[this.resData.entity.denominationsNo],
                fullBenefit:[this.resData.entity.fullBenefit],
                apportionedValue:[this.resData.entity.apportionedValue],
                lienAmount:[this.resData.entity.lienAmount],

                //5.Shares
                companyDetails:[this.resData.entity.companyDetails],
                contactDetails:[this.resData.entity.contactDetails],
                sharesCapital:[this.resData.entity.sharesCapital],
                nosharesIsssued:[this.resData.entity.nosharesIsssued],


              

                 
                  //Insurance Details
                  insuranceType:[this.resData.entity.insuranceType],
                  policyNo:[this.resData.entity.policyNo],
                  policyAmount:[this.resData.entity.policyAmount],
                  insurerDetails:[this.resData.entity.insurerDetails],
                  risk_cover_start_date:[this.resData.entity.risk_cover_start_date],
                  risk_cover_end_date:[this.resData.entity.risk_cover_end_date],
                  last_premium_paid_date:[this.resData.entity.last_premium_paid_date],
                  premiumAmount:[this.resData.entity.premiumAmount],
                  frequency:[this.resData.entity.frequency],
                  itemsInsured:[this.resData.entity.itemsInsured],
                  notes:[this.resData.entity.notes],

                  //receipt and payment
                  name:[this.resData.entity.name],
                  city:[this.resData.entity.city],
                  address:[this.resData.entity.address],
                  state:[this.resData.entity.state],
                  postal_code:[this.resData.entity.postal_code],
                  receipt_type:[this.resData.entity.receipt_type],
                  receipt_amount:[this.resData.entity.receipt_amount],
                  payment_type:[this.resData.entity.payment_type],
                  payment_amount:[this.resData.entity.payment_amount],
                  due_date:[this.resData.entity.due_date_for_rec],
                  paid_received_date:[this.resData.entity.paid_received_date],
                  date_from:[this.resData.entity.date_from],
                  to_date:[this.resData.entity.to_date],
                  proof_verified_date:[this.resData.entity.proof_verified_date],
                  mode_of_pay:[this.resData.entity.mode_of_pay],
                  remarks:[this.resData.entity.remarks],

                  //inspection details
                  inspection_type:[this.resData.entity.inspection_type],
                  insp_address:[this.resData.entity.insp_address],
                  insp_city:[this.resData.entity.insp_city],
                  insp_state:[this.resData.entity.insp_state],
                  insp_postal_code:[this.resData.entity.insp_postal_code],
                  insp_telephone_no:[this.resData.entity.insp_telephone_no],
                  due_date_for_visit:[this.resData.entity.due_date_for_visit],
                  date_of_visit:[this.resData.entity.date_of_visit],
                  inspected_value:[this.resData.entity.inspected_value],
                  inspection_emp_id:[this.resData.entity.inspection_emp_id],
                  insp_remarks:[this.resData.entity.insp_remarks],


                  //sales notes for Tradable Securities

                  brokerName:[this.resData.entity.brokerName],
                  sent_for_sale_on:[this.resData.entity.sent_for_sale_on],
                  sales_due_date:[this.resData.entity.sales_due_date],
                  sales_review_date:[this.resData.entity.sales_review_date],
                  proceeds_received_on:[this.resData.entity.proceeds_received_on],
                  stock_exchange:[this.resData.entity.stock_exchange],
                  expected_min_price:[this.resData.entity.expected_min_price],
                  sales_proceed_received:[this.resData.entity.sales_proceed_received],
                  sales_notes:[''],

                  //fees
                  percentage_amount_collected:[this.resData.entity.percentage_amount_collected],
                  collected_amount:[this.resData.entity.collected_amount],
                
                  sn:[this.resData.entity.sn]
                });
              }
            )
       
              
        

          
          }  else if(this.message.function_type == "D-Delete"){
            this.collateralService.getCollateralByCode(this.message.collateralCode).subscribe(
              res =>{

                // this.results = res['entity']
              this.resData = res;

              this.collateralType= this.resData.entity.collateralType;
              if(this.collateralType == "VEHICLE & MACHINERIES"){
                this.vehicle_and_machineries = true;
              }else if(this.collateralType == "IMMOVABLE"){
                this.immovable = true;
              }else if(this.collateralType == "SHARES"){
                this.shares = true;
              }else if(this.collateralType == "STOCKS"){
                this.stocks = true;
              }else if(this.collateralType == "TERM DEPOSITS"){
                this.term_deposits = true;
              }
                this.formData = this.formBuilder.group({
                  collateralCode:[this.resData.entity.collateralCode],
                  collateralType:[this.resData.entity.collateralType],
                  description:[this.resData.entity.description],
                  companyCode:[this.resData.entity.companyCode],
                  companyDetails:[this.resData.entity.companyDetails],
                  customerCode:[this.resData.entity.customerCode],
                  contactDetails:[this.resData.entity.contactDetails],
                  faceValue:[this.resData.entity.faceValue],
                  marginPercent:[this.resData.entity.marginPercent],
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
                  insp_remarks:[''],


                  //sales notes for Tradable Securities

                  brokerName:[''],
                  sent_for_sale_on:[''],
                  sales_due_date:[''],
                  sales_review_date:[''],
                  proceeds_received_on:[''],
                  stock_exchange:[''],
                  expected_min_price:[''],
                  sales_proceed_received:[''],
                  sales_notes:[''],
                
                  //fees
                  percentage_amount_collected:[''],
                  collected_amount:[''],
                  sn:[this.resData.entity.sn]
  
  
                });
              }
            )
            this.disabledFormControl();
            }
          
    }
  onSubmit() {
    console.log("form data before validator", this.formData.value);
    console.log(this.message.function_type);
    
  
      // this.submitted = true;
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
