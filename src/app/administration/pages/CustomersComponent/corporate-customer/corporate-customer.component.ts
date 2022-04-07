import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CorporateCustomerService } from './corporate-customer.service';

@Component({
  selector: 'app-corporate-customer',
  templateUrl: './corporate-customer.component.html',
  styleUrls: ['./corporate-customer.component.scss']
})
export class CorporateCustomerComponent implements OnInit {
  results:any
  message:any
  function_type:any
  cust_code:any
  error:any
  isDeleted = false;
  isSubmitted = false;
  submitted = false;
  isEnabled = false
  subscription:Subscription
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  constructor(private corpService:CorporateCustomerService,
    private router:Router,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getPage()
  }
  user = "Nobody"

  formData = this.fb.group({
  contactPersonName: [''],
  corporateSegment: [''],
  custCode: [''],
  headOffice: [''],
  inCorporationDate: [''],
  joiningDate:[''],
  kraPin: [''],
  legalEntityType: [''],
  organisationName:[''],
  region: [''],
  registrationPin: [''],
  shortName: [''],
  sn: [''],
  subSegment: [''],
  postedBy: [''],
  postedFlag: [''],
  postedTime: [''],
  deletedBy:[''],
  deletedFlag: [''],
  deletedTime: [''],
  verifiedFlag: [''],
  verifiedTime: [''],
  modifiedBy: [''],
  modifiedOn: [''],
  })
   get f(){
    return this.formData.controls;
   }
   disabledFormControl(){
    this.formData.disable()
  }
  getPage(){
    this.subscription = this.corpService.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        console.log("message", this.message);
        console.log(this.function_type);
        this.cust_code = this.message.cust_code
         console.log("code",this.cust_code);
         
        if(this.function_type == "A-Add"){
          this.isSubmitted = true;
          this.isEnabled = true;

          this.formData = this.fb.group({
            contactPersonName: [''],
            corporateSegment: [''],
            custCode: [''],
            headOffice: [''],
            inCorporationDate: [''],
            joiningDate:[''],
            kraPin: [''],
            legalEntityType: [''],
            organisationName:[''],
            region: [''],
            registrationPin: [''],
            shortName: [''],
            subSegment: [''],

            postedBy: [this.user],
            postedFlag: ['Y'],
            postedTime: [new Date()],
            deletedBy:[this.user],
            deletedFlag: ['N'],
            deletedTime: [new Date()],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()],
            modifiedBy: [this.user],
            modifiedOn: [new Date()],
          });

        }else if(this.function_type == "I-Inquire"){
          this.disabledFormControl()
          this.subscription = this.corpService.getCorporateByCode(this.cust_code).subscribe(
            res =>{
              this.results = res.entity;

              this.formData = this.fb.group({
                contactPersonName: [this.results.contactPersonName],
                corporateSegment: [this.results.corporateSegment],
                custCode: [this.results.custCode],
                headOffice: [this.results.headOffice],
                inCorporationDate: [this.results.inCorporationDate],
                joiningDate:[this.results.joiningDate],
                kraPin: [this.results.kraPin],
                legalEntityType: [this.results.legalEntityType],
                organisationName:[this.results.organisationName],
                region: [this.results.region],
                registrationPin: [this.results.registrationPin],
                shortName: [this.results.shortName],
                sn: [this.results.sn],
                subSegment: [this.results.subSegment],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                deletedBy:[this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
              })
            }, )
        } else if(this.function_type == "M-Modify"){
          this.isSubmitted = true;
          this.isEnabled = true;
          this.subscription = this.corpService.getCorporateByCode(this.cust_code).subscribe(
            res =>{
              this.results = res.entity;
              this.formData = this.fb.group({
                contactPersonName: [this.results.contactPersonName],
                corporateSegment: [this.results.corporateSegment],
                custCode: [this.results.custCode],
                headOffice: [this.results.headOffice],
                inCorporationDate: [this.results.inCorporationDate],
                joiningDate:[this.results.joiningDate],
                kraPin: [this.results.kraPin],
                legalEntityType: [this.results.legalEntityType],
                organisationName:[this.results.organisationName],
                region: [this.results.region],
                registrationPin: [this.results.registrationPin],
                shortName: [this.results.shortName],
                sn: [this.results.sn],
                subSegment: [this.results.subSegment],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                deletedBy:[this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                modifiedBy: [this.user],
                modifiedOn: [new Date()],
              })
            }
          )

        }else if(this.function_type == "X-Delete"){
          this.isDeleted = true;
          this.disabledFormControl()
          this.subscription = this.corpService.getCorporateByCode(this.cust_code).subscribe(
            res =>{
              this.results = res.entity
              this.formData = this.fb.group({
                contactPersonName: [this.results.contactPersonName],
                corporateSegment: [this.results.corporateSegment],
                custCode: [this.results.custCode],
                headOffice: [this.results.headOffice],
                inCorporationDate: [this.results.inCorporationDate],
                joiningDate:[this.results.joiningDate],
                kraPin: [this.results.kraPin],
                legalEntityType: [this.results.legalEntityType],
                organisationName:[this.results.organisationName],
                region: [this.results.region],
                registrationPin: [this.results.registrationPin],
                shortName: [this.results.shortName],
                sn: [this.results.sn],
                subSegment: [this.results.subSegment],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                deletedBy:[this.user],
                deletedFlag: ["Y"],
                deletedTime: [new Date()],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
              })
            }
          )

        }else if(this.function_type == "V-Verify"){
          this.isSubmitted = true;
          this.disabledFormControl()
          this.subscription = this.corpService.getCorporateByCode(this.cust_code).subscribe(
            res =>{
              this.results = res.entity
              this.formData = this.fb.group({
                contactPersonName: [this.results.contactPersonName],
                corporateSegment: [this.results.corporateSegment],
                custCode: [this.results.custCode],
                headOffice: [this.results.headOffice],
                inCorporationDate: [this.results.inCorporationDate],
                joiningDate:[this.results.joiningDate],
                kraPin: [this.results.kraPin],
                legalEntityType: [this.results.legalEntityType],
                organisationName:[this.results.organisationName],
                region: [this.results.region],
                registrationPin: [this.results.registrationPin],
                shortName: [this.results.shortName],
                sn: [this.results.sn],
                subSegment: [this.results.subSegment],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                deletedBy:[this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                verifiedFlag: ["Y"],
                verifiedTime: [new Date()],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
              })
            }) } })


  }
  onSubmit(){

    this.submitted = true;
    if(this.formData.valid){
      if(this.function_type == "A-Add"){

        this.subscription = this.corpService.createCorporate(this.formData.value).subscribe(
          res =>{
            this.results = res;

            this._snackbar.open("Executed Successfully", "X", {
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']
            });
            this.router.navigateByUrl("system/customers/corporate/maintenance")
          }
        )
      }else if(this.function_type != "A-Add"){

        this.subscription = this.corpService.updateCorporateRecords(this.formData.value).subscribe(
          res =>{
            this.results = res;
           
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']
            });
            this.router.navigateByUrl("system/customers/corporate/maintenance")

          }
        )
      }
    } else{
       this._snackbar.open("Invalid form data", "Try Again",{
         horizontalPosition:this.horizontalPosition,
         verticalPosition:this.verticalPosition,
         duration:3000,
         panelClass:['red-snackbar', 'login-snackbar']
       })
    }

  }
}
