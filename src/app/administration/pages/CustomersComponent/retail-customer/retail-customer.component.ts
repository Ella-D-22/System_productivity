import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchesLookupComponent } from '../../branches/branches-lookup/branches-lookup.component';
import { CustomerLookupComponent } from '../../CustomersComponent/customer-lookup/customer-lookup.component';
import { RetailCustomerService } from './retail-customer.service';

@Component({
  selector: 'app-retail-customer',
  templateUrl: './retail-customer.component.html',
  styleUrls: ['./retail-customer.component.scss']
})
export class RetailCustomerComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  subscription!: Subscription;
  authUser = "N"
  isEnabled = false;
  submitted = false;
  message: any
  function_type: any
  group_code: any
  results: any
  error: any
  dialogData: any
  customerCode: any
  isSubmitted = false;
  isDeleted = false
  user = "Nobody"
  imgfile: any;
  signatureImage: string | ArrayBuffer;
  imgSignSrc: string | ArrayBuffer;
  passportImage: any;
  passportImageSrc: string | ArrayBuffer;
  signatureImageSrc: string | ArrayBuffer;
  imageTypeArray:any = [
    'Passport', 'Signature'
  ]
  currImageSrc: any;
  existingData: boolean;
  signfile: any;
  document_details_validity: boolean;
  _snackBar: any;
  index: any;
  uploadedImages: any;
  lookupData: any;
  solCode: any;
  glDescription: any;
  solDescription: any;
  isDisabled = false;
  constructor(private fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,
    private retailCustAPI: RetailCustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPage()
  }

  
  formData = this.fb.group({
    birthCertificate: [''],
    citizen: [''],
    customerCode: [''],
    deletedBy: ['N'],
    deletedFlag: ['N'],
    deletedTime: [new Date()],
    dob: [''],
    employerCode: [''],
    firstName: [''],
    gender: [''],
    identificationNo: [''],
    joiningDate: [''],
    kraPin: [''],
    middleName: [''],
    minor: [''],
    modifiedBy: ['N'],
    modifiedOn: [new Date()],
    occupation: [''],
    passportNo: [''],
    postedBy: [this.authUser],
    postedFlag: ['N'],
    postedTime: [new Date()],
    signatureImage: [''],
    solCode: [''],
    subGroupCode: [''],
    surname: [''],
    preferedName:[''],
    verifiedFlag: ['N'],
    verifiedTime: [new Date()],
    contactInformationList: new FormArray([]),
    customerImageList: new FormArray([]),
    kins: new FormArray([]),
    nominees: new FormArray([]),
  })
  get f() { return this.formData.controls; }
  get cinfol() { return this.f.contactInformationList as FormArray }
  get cimgl() { return this.f.customerImageList as FormArray }
  get k() { return this.f.kins as FormArray }
  get n() { return this.f.nominees as FormArray }
  // Customer Information List
  onAddCustomerInfoField() {
    this.cinfol.push(this.fb.group({
      boxOfficeNo: [''],
      emailAddress: [''],
      phoneNumber: [''],
      postalCode: [''],
      residentialTown: [''],
      sn: ['']
    }))
  }
  onReadCustomerInfoField(e: any) {
    this.cinfol.push(this.fb.group({
      boxOfficeNo: [e.boxOfficeNo],
      emailAddress: [e.emailAddress],
      phoneNumber: [e.phoneNumber],
      postalCode: [e.postalCode],
      residentialTown: [e.residentialTown],
      sn: [e.sn]
    }))
  }
  // Customer Image List
  onAddImageField() {
    this.cimgl.push(this.fb.group({
      fromDate: [''],
      image: [''],
      image_name:[''],
      modifiedBy: ['N'],
      modifiedOn: [new Date()],
      postedBy: [this.authUser],
      postedFlag: ['Y'],
      postedTime: [new Date()],
      toDate: ['']
    }))
  }
  onReadImageField(e: any) {
    this.cimgl.push(this.fb.group({
      fromDate: [e.fromDate],
      image: [e.image],
      image_name:[e.image_name],
      modifiedBy: [e.modifiedBy],
      modifiedOn: [e.modifiedOn],
      postedBy: [e.postedBy],
      postedFlag: [e.postedFlag],
      postedTime: [e.postedTime],
      toDate: [e.toDate],
      sn: [e.sn]
    }))
  }
  // Customer Kins
  onAddKinsField() {
    this.k.push(this.fb.group({
      dob: [''],
      emailAddress: [''],
      firstName: [''],
      idNo: [''],
      middleName: [''],
      occupation: [''],
      phoneNo: [''],
      relationship: [''],
      surname: ['']
    }))
  }
  onReadKinsField(e: any) {
    this.k.push(this.fb.group({
      dob: [e.dob],
      emailAddress: [e.emailAddress],
      firstName: [e.firstName],
      idNo: [e.idNo],
      middleName: [e.middleName],
      occupation: [e.occupation],
      phoneNo: [e.phoneNo],
      relationship: [e.relationship],
      surname: [e.surname],
      sn: [e.sn]
    }))
  }
  onRemoveKinsField(i: any) {
    this.k.removeAt(i)
  }
  // Customer Nominees
  onAddNominiesField() {
    this.n.push(this.fb.group({
      dob: [''],
      emailAddress: [''],
      firstName: [''],
      identificationNo: [''],
      lastName: [''],
      middleName: [''],
      occupation: [''],
      phone: ['']
    }))
  }
  onReadNominiesField(e: any) {
    this.n.push(this.fb.group({
      dob: [e.dob],
      emailAddress: [e.emailAddress],
      firstName: [e.firstName],
      middleName: [e.middleName],
      occupation: [e.occupation],
      phoneNo: [e.phoneNo],
      identificationNo: [e.identificationNo],
      lastName: [e.lastName],
      phone: [e.phone],
      sn: [e.sn]
    }))
  }
  onSignaturePhotoChange(event, i:any) {
    this.signatureImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.signatureImageSrc = reader.result;
          // set value to form
          this.cimgl.at(i).get('image').setValue(this.signatureImageSrc);
          this.currImageSrc =  this.cimgl.at(i).get('image').value
        }
        reader.onerror = function (error) {
        };
    }
  }
  branchLookup(): void {
    const dialogRef = this.dialog.open(BranchesLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(results => {
      this.dialogData = results.data;
      console.log(this.dialogData);

      this.formData.controls.sol_id.setValue(results.data.sol_code)
      this.formData.controls.branch_name.setValue(this.dialogData.sol_description)

    })
  }


  customerLookup(): void {
    const dialogRef = this.dialog.open(CustomerLookupComponent, {

    });
    dialogRef.afterClosed().subscribe(results => {
      this.dialogData = results.data;
      console.log(this.dialogData);

      this.formData.controls.cust_code.setValue(results.data.customer_code)
      this.formData.controls.chairperson.setValue(this.dialogData.customer_code)
      this.formData.controls.secretary.setValue(this.dialogData.customer_code)
      this.formData.controls.treasurer.setValue(this.dialogData.customer_code)
      this.formData.controls.groupMembers['cust_name'].setValue(this.dialogData.firstName)

    })
  }


  disabledFormControl() {
    this.formData.disable()

    this.isDisabled = true;
    
  }


  branchesCodeLookup(): void {
    const dialogRef = this.dialog.open(BranchesLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.solCode = this.lookupData.solCode;
      this.solDescription = this.lookupData.solDescription;
      this.formData.controls.solCode.setValue(this.solCode);
    });
  }

  getPage() {
    this.subscription = this.retailCustAPI.currentMessage.subscribe(
      message => {
        this.message = message
        this.function_type = this.message.function_type
        this.customerCode = this.message.customerCode
        console.log(this.group_code);
        console.log(this.message);
        if (this.function_type == "A-Add") {
          this.isEnabled = true;
          this.isSubmitted = true;
          this.formData = this.fb.group({
              birthCertificate: [''],
              citizen: [''],
              customerCode: [this.customerCode],
              deletedBy: ['N'],
              deletedFlag: ['N'],
              deletedTime: [new Date()],
              dob: [''],
              employerCode: [''],
              firstName: [''],
              gender: [''],
              identificationNo: [''],
              joiningDate: [''],
              kraPin: [''],
              middleName: [''],
              minor: [''],
              modifiedBy: ['N'],
              modifiedOn: [new Date()],
              occupation: [''],
              passportNo: [''],
              postedBy: [this.authUser],
              postedFlag: ['N'],
              postedTime: [new Date()],
              signatureImage: [''],
              solCode: [''],
              subGroupCode: [''],
              surname: [''],
              preferedName:[''],
              verifiedFlag: ['N'],
              verifiedTime: [new Date()],
              contactInformationList: new FormArray([]),
              customerImageList: new FormArray([]),
              kins: new FormArray([]),
              nominees: new FormArray([]),
          })
          this.onAddCustomerInfoField()
          this.onAddKinsField()
          this.onAddNominiesField()
          this.onAddImageField();
          this.onAddImageField();
        } else if (this.function_type == "I-Inquire") {
          this.disabledFormControl()
          this.subscription = this.retailCustAPI.getRetailCustomerByCode(this.customerCode).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                sn:[this.results.sn],
                birthCertificate: [this.results.birthCertificate],
                citizen: [this.results.citizen],
                customerCode: [this.results.customerCode],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                dob: [this.results.dob],
                employerCode: [this.results.employerCode],
                firstName: [this.results.firstName],
                gender: [this.results.gender],
                identificationNo: [this.results.identificationNo],
                joiningDate: [this.results.joiningDate],
                kraPin: [this.results.kraPin],
                middleName: [this.results.middleName],
                minor: [this.results.minor],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
                occupation: [this.results.occupation],
                passportNo: [this.results.passportNo],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                signatureImage: [this.results.signatureImage],
                solCode: [this.results.solCode],
                subGroupCode: [this.results.subGroupCode],
                surname: [this.results.surname],
                preferedName:[this.results.preferedName],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],

                contactInformationList: new FormArray([]),
                customerImageList: new FormArray([]),
                kins: new FormArray([]),
                nominees: new FormArray([]),
            })
            let contactInformationList = this.results.contactInformationList
            let customerImageList = this.results.customerImageList
            let kins =  this.results.kins
            let nominees = this.results.nominees

            for(let i=0; i<contactInformationList.length; i++){
              this.onReadCustomerInfoField(contactInformationList[i])
            }
            for(let i=0; i<customerImageList.length; i++){
              this.onReadImageField(customerImageList[i]) 
            }
            for(let i=0; i<kins.length; i++){
              this.onReadKinsField(kins[i]);
            }
            for(let i=0; i<nominees.length; i++){
              this.onReadNominiesField(nominees[i])
            }
            }
          )
        } else if (this.function_type == "M-Modify") {
          this.isDisabled = false;
          this.subscription = this.retailCustAPI.getRetailCustomerByCode(this.customerCode).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                sn:[this.results.sn],
                birthCertificate: [this.results.birthCertificate],
                citizen: [this.results.citizen],
                customerCode: [this.results.customerCode],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                dob: [this.results.dob],
                employerCode: [this.results.employerCode],
                firstName: [this.results.firstName],
                gender: [this.results.gender],
                identificationNo: [this.results.identificationNo],
                joiningDate: [this.results.joiningDate],
                kraPin: [this.results.kraPin],
                middleName: [this.results.middleName],
                minor: [this.results.minor],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
                occupation: [this.results.occupation],
                passportNo: [this.results.passportNo],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                signatureImage: [this.results.signatureImage],
                solCode: [this.results.solCode],
                subGroupCode: [this.results.subGroupCode],
                surname: [this.results.surname],
                preferedName:[this.results.preferedName],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],

                contactInformationList: new FormArray([]),
                customerImageList: new FormArray([]),
                kins: new FormArray([]),
                nominees: new FormArray([]),
            })
            let contactInformationList = this.results.contactInformationList
            let customerImageList = this.results.customerImageList
            let kins =  this.results.kins
            let nominees = this.results.nominees

            for(let i=0; i<contactInformationList.length; i++){
              this.onReadCustomerInfoField(contactInformationList[i])
            }
            for(let i=0; i<customerImageList.length; i++){
              this.onReadImageField(customerImageList[i]) 
            }
            for(let i=0; i<kins.length; i++){
              this.onReadKinsField(kins[i]);
            }
            for(let i=0; i<nominees.length; i++){
              this.onReadNominiesField(nominees[i])
            }
            }
          )

        } else if (this.function_type == "X-Delete") {
          this.subscription = this.retailCustAPI.getRetailCustomerByCode(this.customerCode).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                sn:[this.results.sn],
                birthCertificate: [this.results.birthCertificate],
                citizen: [this.results.citizen],
                customerCode: [this.results.customerCode],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                dob: [this.results.dob],
                employerCode: [this.results.employerCode],
                firstName: [this.results.firstName],
                gender: [this.results.gender],
                identificationNo: [this.results.identificationNo],
                joiningDate: [this.results.joiningDate],
                kraPin: [this.results.kraPin],
                middleName: [this.results.middleName],
                minor: [this.results.minor],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
                occupation: [this.results.occupation],
                passportNo: [this.results.passportNo],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                signatureImage: [this.results.signatureImage],
                solCode: [this.results.solCode],
                subGroupCode: [this.results.subGroupCode],
                surname: [this.results.surname],
                preferedName:[this.results.preferedName],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],

                contactInformationList: new FormArray([]),
                customerImageList: new FormArray([]),
                kins: new FormArray([]),
                nominees: new FormArray([]),
            })
            let contactInformationList = this.results.contactInformationList
            let customerImageList = this.results.customerImageList
            let kins =  this.results.kins
            let nominees = this.results.nominees

            for(let i=0; i<contactInformationList.length; i++){
              this.onReadCustomerInfoField(contactInformationList[i])
            }
            for(let i=0; i<customerImageList.length; i++){
              this.onReadImageField(customerImageList[i]) 
            }
            for(let i=0; i<kins.length; i++){
              this.onReadKinsField(kins[i]);
            }
            for(let i=0; i<nominees.length; i++){
              this.onReadNominiesField(nominees[i])
            }
            }
          )
         
        } else if (this.function_type == "V-Verify") {
          this.subscription = this.retailCustAPI.getRetailCustomerByCode(this.customerCode).subscribe(
            res => {
              this.results = res
              this.formData = this.fb.group({
                sn:[this.results.sn],
                birthCertificate: [this.results.birthCertificate],
                citizen: [this.results.citizen],
                customerCode: [this.results.customerCode],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                dob: [this.results.dob],
                employerCode: [this.results.employerCode],
                firstName: [this.results.firstName],
                gender: [this.results.gender],
                identificationNo: [this.results.identificationNo],
                joiningDate: [this.results.joiningDate],
                kraPin: [this.results.kraPin],
                middleName: [this.results.middleName],
                minor: [this.results.minor],
                modifiedBy: [this.results.modifiedBy],
                modifiedOn: [this.results.modifiedOn],
                occupation: [this.results.occupation],
                passportNo: [this.results.passportNo],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                signatureImage: [this.results.signatureImage],
                solCode: [this.results.solCode],
                subGroupCode: [this.results.subGroupCode],
                surname: [this.results.surname],
                preferedName:[this.results.preferedName],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],

                contactInformationList: new FormArray([]),
                customerImageList: new FormArray([]),
                kins: new FormArray([]),
                nominees: new FormArray([]),
            })
            let contactInformationList = this.results.contactInformationList
            let customerImageList = this.results.customerImageList
            let kins =  this.results.kins
            let nominees = this.results.nominees

            for(let i=0; i<contactInformationList.length; i++){
              this.onReadCustomerInfoField(contactInformationList[i])
            }
            for(let i=0; i<customerImageList.length; i++){
              this.onReadImageField(customerImageList[i]) 
            }
            for(let i=0; i<kins.length; i++){
              this.onReadKinsField(kins[i]);
            }
            for(let i=0; i<nominees.length; i++){
              this.onReadNominiesField(nominees[i])
            }
            }
          )
          
        }
      }
    )
  }

  onSubmit() {
    console.log("Form Data Results", this.formData.value);

    if (this.formData.valid) {
      if (this.function_type == "A-Add") {
        this.isEnabled = true;
        this.subscription = this.retailCustAPI.createRetailCustomer(this.formData.value).subscribe(
          res => {
            this.results = res
            this._snackbar.open("Executed Successfully", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/customer/retail/maintenance")
          },
          err => {
            this.error = err
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar']
            })
          }
        )
      } else{
        this.subscription = this.retailCustAPI.updateRetailCustomer(this.formData.value).subscribe(
          res => {
            this.results = res
            this._snackbar.open("Executed Successfully", "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/customer/retail/maintenance")
          },
          err => {
            this.error = err
            this._snackbar.open(this.error, "Try Again", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar', 'login-snackbar']
            })
          }
        )
      } 
    }
  }



}