import { HttpClient} from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { LinkedorganizationService } from './linkedorganization.service';
import { CurrencyLookupComponent } from '../currency-config/currency-lookup/currency-lookup.component';
import { EventIdLookupComponent } from '../../ChargesParams/event-id/event-id-lookup/event-id-lookup.component';

@Component({
  selector: 'app-linked-organization',
  templateUrl: './linked-organization.component.html',
  styleUrls: ['./linked-organization.component.scss']
})
export class LinkedOrganizationComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  dialogValue: any;
  dialogData: any;
  function_type: any;
  event_type: any;
  event_id: any;
  subscription!:Subscription;
  error: any;
  results: any;
  showContractInput = false;
  showDerivationInput = false;
  showAmtDerivationInput= false;
  showPercentageDerivationInput= false;
  showFilenameDerivationInput= false;
  showChargecodeDerivationInput= false;
  showMrtFilenameDerivationInput= false;
  chrg_calc_crncy: any;
  chrg_coll_crncy: any;
  showExerciseDutyPercentageInput = false;
  params: any;
  organization_id: any;
  submitted = false;
  message: any;
  organization_name: any;
  showPercentageField = false;
  showFixedAmtField = false;
  org_chrg_crncy: any;
  formn: any;
  formcontrOrg: any;
  infosecdes: any;

  prioritizationArray: any = [
    'Customer Level','Account Level','Charge Level','Contract Level'
  ] 
  

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private linkedOrganizationAPI: LinkedorganizationService,
    ) { }
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.linkedOrganizationAPI.currentMessage.subscribe(message =>{
        this.message = message;
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/maintenance'));
        }else{
          null;
        }
      })
    }
 

      showChargeInput = false;
      requireCif = false;


      onAll(event:any){
        this.formData.controls.org_cust_cif.clearValidators()
        this.formData.controls.org_cust_cif.setValue("")
        this.formData.controls.org_cust_cif.updateValueAndValidity()
        this.requireCif = false;
      }
      onSpecific(event:any){
        this.formData.controls.org_cust_cif.setValidators([Validators.required])
        this.requireCif = true;
        this.onAddField();
      }
      

    amtDerivationArrays: any = [
      'Percentage','Fixed'
    ]
      onSelectAmountDerv(event:any){
        if(event.target.value == "Percentage"){
          this.formData.controls.org_fixed_amt.setValidators([])
          this.formData.controls.org_fixed_amt.setValue("")
          this.showFixedAmtField = false;
          this.formData.controls.org_percentage_val.setValidators([Validators.required])
          this.showPercentageField = true;
        }else if(event.target.value == "Fixed"){
          this.formData.controls.org_percentage_val.setValidators([])
          this.formData.controls.org_percentage_val.setValue("")
          this.showPercentageField = false;
          this.formData.controls.org_fixed_amt.setValidators([Validators.required]) 
          this.showFixedAmtField = true;
        }
      }
      
      chrgCalcCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.org_chrg_crncy = result.data.ccy_name;
          this.formData.controls.org_chrg_crncy.setValue(result.data.ccy);
        });
      }
      // subscribeChargeMessage(){
      //   this.subscription = this.linkedOrganizationAPI.currentMessage.subscribe(message =>{
      //     return message
      //     console.log("hey message communicated",this.message )
      //   })
      // }
      ac_placeholder = "";
      min_amt_ccy = "";
      max_amt_ccy = "";
      linked_event_id = "";
      formData = this.fb.group({
        organization_name: ['', [Validators.required]],
        organization_tel: ['', [Validators.required]],
        organization_mail: ['', [Validators.required, Validators.email]],
        organization_address: ['', [Validators.required]],
        organization_website: ['', [Validators.required]],
        organization_country: ['', [Validators.required]],
        organization_main_office: ['', [Validators.required]],

        org_chrg_derivation: [''],
        org_percentage_val: [''],
        org_fixed_amt: [''],
        org_chrg_application: [''],
        org_cust_cif: [''],
        first_priority:[''],
        second_priority:[''],
        third_priority:[''],
        fourth_priority:[''],

        // Dynamic Form
        organization_charges: new FormArray([])
      });

    get f() { return this.formData.controls; }
    get t() { return this.f.organization_charges as FormArray; }

    newFormDkkata = this.fb.group({
      org_lnk_event_id: ['', Validators.required],
    });

    // onAddField(){
      
    //   this.t.push(this.newFormData);
      
    // }
    onAddField(){
      this.t.push(this.fb.group({
        org_lnk_event_id: ['', Validators.required],
    }));
    }
    onRemoveField(i:any){
      if(i>0){
        this.t.removeAt(i);
      }
    }
    eventId(i: any): void {
      const dialogRef = this.dialog.open(EventIdLookupComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.event_id = result.data;
        this.formn = this.t.controls[i];
        this.formn.controls.org_lnk_event_id.setValue(result.data);
      });
    }
      disabledFormControll(){
        this.formData.controls.organization_name.disable();
        this.formData.controls.organization_tel.disable();
        this.formData.controls.organization_mail.disable();
        this.formData.controls.organization_address.disable();
        this.formData.controls.organization_website.disable();
        this.formData.controls.organization_country.disable();
        this.formData.controls.organization_main_office.disable();
        
        this.formData.controls.org_chrg_derivation.disable();
        this.formData.controls.org_percentage_val.disable();
        this.formData.controls.org_fixed_amt.disable();
        this.formData.controls.org_chrg_application.disable();
        this.formData.controls.org_cust_cif.disable();

        this.formData.controls.first_priority.disable();
        this.formData.controls.second_priority.disable();
        this.formData.controls.third_priority.disable();
        this.formData.controls.fourth_priority.disable();
      }

      getPage(){
        this.subscription = this.linkedOrganizationAPI.currentMessage.subscribe(message =>{
          console.log("data here",message )
          this.message = message;      
          this.function_type = this.message.function_type
          this.organization_id = this.message.organization_id
          this.organization_name = this.message.organization_id.organization_name
        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({
            organization_name: ['', [Validators.required]],
            organization_tel: ['', [Validators.required]],
            organization_mail: ['', [Validators.required, Validators.email]],
            organization_address: ['', [Validators.required]],
            organization_website: ['', [Validators.required]],
            organization_country: ['', [Validators.required]],
            organization_main_office: ['', [Validators.required]],

            org_chrg_derivation: [''],
            org_percentage_val: [''],
            org_fixed_amt: [''],
            org_chrg_application: [''],
            org_cust_cif: [''],
            first_priority:[''],
            second_priority:[''],
            third_priority:[''],
            fourth_priority:[''],
            
            // Dynamic Form
            organization_charges: new FormArray([])
          });
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.linkedOrganizationAPI.getLinkedorganizationId(this.organization_id.id).subscribe(res=>{
            this.results = res;
            
            this.formData = this.fb.group({
              organization_name: [this.results.organization_name, [Validators.required]],
              organization_tel: [this.results.organization_tel, [Validators.required]],
              organization_mail: [this.results.organization_mail, [Validators.required, Validators.email]],
              organization_address: [this.results.organization_address, [Validators.required]],
              organization_website: [this.results.organization_website, [Validators.required]],
              organization_country: [this.results.organization_country, [Validators.required]],
              organization_main_office: [this.results.organization_main_office, [Validators.required]],
              
              org_chrg_derivation: [this.results.org_chrg_derivation],
              org_percentage_val: [this.results.org_percentage_val],
              org_fixed_amt: [this.results.org_fixed_amt],
              org_chrg_application: [this.results.org_chrg_application],
              org_cust_cif: [this.results.org_cust_cif],
              first_priority:[this.results.first_priority],
              second_priority:[this.results.second_priority],
              third_priority:[this.results.third_priority],
              fourth_priority:[this.results.fourth_priority],
              // Dynamic Form
              organization_charges: new FormArray([])
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){
          this.subscription = this.linkedOrganizationAPI.getLinkedorganizationId(this.organization_id.id).subscribe(res=>{
            this.results = res;
    
            this.formData = this.fb.group({
              organization_name: [this.results.organization_name, [Validators.required]],
              organization_tel: [this.results.organization_tel, [Validators.required]],
              organization_mail: [this.results.organization_mail, [Validators.required, Validators.email]],
              organization_address: [this.results.organization_address, [Validators.required]],
              organization_website: [this.results.organization_website, [Validators.required]],
              organization_country: [this.results.organization_country, [Validators.required]],
              organization_main_office: [this.results.organization_main_office, [Validators.required]],

              org_chrg_derivation: [this.results.org_chrg_derivation],
              org_percentage_val: [this.results.org_percentage_val],
              org_fixed_amt: [this.results.org_fixed_amt],
              org_chrg_application: [this.results.org_chrg_application],
              org_cust_cif: [this.results.org_cust_cif],
              first_priority:[this.results.first_priority],
              second_priority:[this.results.second_priority],
              third_priority:[this.results.third_priority],
              fourth_priority:[this.results.fourth_priority],
              // Dynamic Form
              organization_charges: new FormArray([])
              
            });
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "V-Verify"){
          // Populate data with rotected fileds only verification is enabled
        }
        else if(this.function_type == "C-Cancle"){
          // should open a page with data and show remove button
        } 
      })
      }
      // convenience getter for easy access to form fields

      onSubmit() {
          this.submitted = true;
          console.log(this.formData.value)
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.linkedOrganizationAPI.createLinkedorganization(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/maintenance'));
            },err=>{
              this.error = err;
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
              // this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/maintenance'));
            })
            }else if(this.function_type == "M-Modify"){
              this.subscription = this.linkedOrganizationAPI.updateLinkedorganization(this.organization_id.id, this.formData.value).subscribe(res=>{
                this.results = res;
                  this._snackBar.open("Executed Successfully!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/maintenance'));
                  // system/configurations/global/linked/organization/maintenance system/configurations/global/linked/organization/maintenance
              },err=>{
                this.error = err;
                this._snackBar.open(this.error, "Try again!", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['red-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/maintenance'));
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