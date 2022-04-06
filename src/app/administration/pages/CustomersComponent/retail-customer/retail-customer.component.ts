import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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
  isEnabled = false;
  submitted = false;
  subscription: Subscription
  message: any
  function_type: any
  group_code: any
  results: any
  error: any
  dialogData: any
  customerCode: any
  isSubmitted = false;
  isDeleted = false

  horizontalPosition: MatSnackBarHorizontalPosition
  verticalPosition: MatSnackBarVerticalPosition

  user = "Nobody"
  imgfile: any;
  signatureImage: string | ArrayBuffer;
  imgSignSrc: string | ArrayBuffer;
  passportImage: any;
  passportImageSrc: string | ArrayBuffer;
  signatureImageSrc: string | ArrayBuffer;
  constructor(private fb: FormBuilder,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,
    private retailCustAPI: RetailCustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPage()
    this.onAddCustomerInfoField()
    this.onAddKinsField()
    this.onAddNominiesField()
    this.onAddImageField();
    this.onAddImageField();
  }
  formData = this.fb.group({
    birthCertificate: [''],
    citizen: [''],
    customerCode: [''],
    deletedBy: [''],
    deletedFlag: [''],
    deletedTime: [''],
    dob: [''],
    employerCode: [''],
    firstName: [''],
    gender: [''],
    identificationNo: [''],
    joiningDate: [''],
    kraPin: [''],
    middleName: [''],
    minor: [''],
    modifiedBy: [''],
    modifiedOn: [''],
    occupation: [''],
    passportNo: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    signatureImage: [''],
    sn: [''],
    solCode: [''],
    subGroupCode: [''],
    surname: [''],
    verifiedFlag: [''],
    verifiedTime: [''],
    contactInformationList: new FormArray([]),
    customerImageList: new FormArray([]),
    kins: new FormArray([]),
    nominees: new FormArray([]),
  })
  get f() { return this.formData.controls; }
  get cinfol() { return this.f.contactInformationList as FormArray }
  get cimgl() { return this.f.contactInformationList as FormArray }
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
  onRemoveCustomerInfoField(i: any) {
    this.cinfol.removeAt(i)
  }

  // Customer Image List
  onAddImageField() {
    this.cimgl.push(this.fb.group({
      fromDate: [''],
      image: [''],
      image_name:[''],
      modifiedBy: [''],
      modifiedOn: [''],
      postedBy: [''],
      postedFlag: [''],
      postedTime: [''],
      toDate: ['']
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
      surname: [e.surname]
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
      phone: [e.phone]
    }))
  }
  onRemoveNominiesField(i: any) {
    this.n.removeAt(i)
  }

  onPassportPhotoChange(event) {
    this.passportImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.passportImageSrc = reader.result;
          // set value to form
          this.formData.controls.file.setValue(this.imgSignSrc);
        }
        reader.onerror = function (error) {
        };
    }
  }
  onSignaturePhotoChange(event) {
    this.signatureImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          this.signatureImageSrc = reader.result;
          // set value to form
          this.formData.controls.file.setValue(this.imgSignSrc);
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
  }

  getPage() {
    this.subscription = this.retailCustAPI.currentMessage.subscribe(
      message => {
        this.message = message
        this.function_type = this.message.function_type
        this.group_code = this.message.customerCode
        console.log(this.group_code);
        console.log(this.message);
        if (this.function_type == "A-Add") {
          this.isEnabled = true;
          this.isSubmitted = true;
          this.formData = this.fb.group({
            birthCertificate: [''],
            citizen: [''],
            customerCode: [''],
            deletedBy: [''],
            deletedFlag: [''],
            deletedTime: [''],
            dob: [''],
            employerCode: [''],
            firstName: [''],
            gender: [''],
            identificationNo: [''],
            joiningDate: [''],
            kraPin: [''],
            middleName: [''],
            minor: [''],
            modifiedBy: [''],
            modifiedOn: [''],
            occupation: [''],
            passportNo: [''],
            postedBy: [''],
            postedFlag: [''],
            postedTime: [''],
            signatureImage: [''],
            sn: [''],
            solCode: [''],
            subGroupCode: [''],
            surname: [''],
            verifiedFlag: [''],
            verifiedTime: [''],
            contactInformationList: new FormArray([]),
            customerImageList: new FormArray([]),
            kins: new FormArray([]),
            nominees: new FormArray([]),
          })
        } else if (this.function_type == "I-Inquire") {
          this.disabledFormControl()
          console.log("hellp");

          this.subscription = this.retailCustAPI.getMainGroupByCode(this.group_code).subscribe(
            res => {
              this.results = res
            }
          )
        } else if (this.function_type == "M-Modify") {
          this.isSubmitted = true
          this.subscription = this.retailCustAPI.getMainGroupByCode(this.group_code).subscribe(
            res => {
              this.results = res
            },
            err => {

              this.router.navigateByUrl("system/customer/retail/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar']
              })
            }
          )
        } else if (this.function_type == "X-Delete") {
          this.disabledFormControl()
          this.isDeleted = true
          this.subscription = this.retailCustAPI.getMainGroupByCode(this.group_code).subscribe(
            res => {
              this.results = res
            },
            err => {
              this.router.navigateByUrl("system/customer/retail/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar']
              })

            })
        } else if (this.function_type == "V-Verify") {
          this.isSubmitted = true;
          this.subscription = this.retailCustAPI.getMainGroupByCode(this.group_code).subscribe(
            res => {
              this.results = res;
            },
            err => {

              this.router.navigateByUrl("system/customer/retail/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar']
              })
            })
        }
      }
    )
  }

  onSubmit() {
    console.log("Form Data Results", this.formData.value);

    if (this.formData.valid) {
      if (this.function_type == "A-Add") {
        this.isEnabled = true;
        this.subscription = this.retailCustAPI.createMainGroup(this.formData.value).subscribe(
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
      } else if (this.function_type == "M-Modify") {
        this.subscription = this.retailCustAPI.updateMainGroup(this.formData.value).subscribe(
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
      } else if (this.function_type == "X-Delete") {
        this.subscription = this.retailCustAPI.updateMainGroup(this.formData.value).subscribe(
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