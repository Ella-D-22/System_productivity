import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { CountriesLookupComponent } from './countries-lookup/countries-lookup.component';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency-config',
  templateUrl: './currency-config.component.html',
  styleUrls: ['./currency-config.component.scss']
})
export class CurrencyConfigComponent implements OnInit { 
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
  currency_id: any;
  currency_ccy: any;
  submitted = false;
  message: any;
  ccy_id: any;
  ccy_name: any;
  respData: Object;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private currencyAPI: CurrencyService,
    ) { }
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
      this.getData();
    }
    currentUser = JSON.parse(sessionStorage.getItem('auth-user'));
    auth_user = this.currentUser.username;
    
    redirectToMaintenancePage(){
      this.subscription = this.currencyAPI.currentMessage.subscribe(message =>{
        this.message = message;
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
        }else{
          null;
        }
      })
    }

    countryLookup(): void {
        const dialogRef = this.dialog.open(CountriesLookupComponent, {
          // height: '400px',
          // width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.dialogData = result.data;
          this.ccy_name = this.dialogData.ccy_name;
          this.formData.controls.currency_ccy.setValue(result.data);
        });
      }
      getData() {
        this.subscription = this.currencyAPI.getAllCountries().subscribe(res => {
         this.respData = res;
        })
      }
      ac_placeholder = "";
      min_amt_ccy = "";
      max_amt_ccy = "";
      linked_event_id = "";
      
      formData = this.fb.group({
        ccy: ['', [Validators.required]],
        country: ['', [Validators.required]],
        ccy_name: ['', [Validators.required]],
        is_deleted: [''],
        is_verified: [''],
      });
      disabledFormControll(){
        this.formData.controls.ccy.disable();
        this.formData.controls.country.disable();
        this.formData.controls.ccy_name.disable();
        this.formData.controls.is_deleted.disable();
        this.formData.controls.is_verified.disable();
      }

      getPage(){
        this.subscription = this.currencyAPI.currentMessage.subscribe(message =>{
          this.message = message;    
        this.function_type = this.message.function_type;
        this.ccy_id = this.message.currency_ccy.id
        this.ccy_name = this.message.currency_ccy.ccy_name
        this.currency_ccy = this.message.currency_ccy;
        this.formData.controls.is_verified.disable();

        if(this.function_type == "A-Add"){
          
          // open empty forms
          this.formData = this.fb.group({
            id:[''],
            ccy: ['', [Validators.required]],
            country: ['', [Validators.required]],
            ccy_name: ['', [Validators.required]],
            is_deleted: [false],
            is_verified: [false],
          });
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.currencyAPI.getCurrencyId(this.ccy_id).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              id:[this.results.id],
              ccy: [this.results.ccy, [Validators.required]],
              country: [this.results.country, [Validators.required]],
              ccy_name: [this.results.ccy_name, [Validators.required]],
              is_deleted: [this.results.is_deleted],
              is_verified: [this.results.is_verified],
            });
          }, err=>{
            this.error = err;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
          })
        }
        else if(this.function_type == "M-Modify"){
          this.formData.controls.is_deleted.disable();
          this.formData.controls.is_verified.disable();

          this.subscription = this.currencyAPI.getCurrencyId(this.ccy_id).subscribe(res=>{
            this.results = res;
            this.currency_id = this.results.id;
            this.formData = this.fb.group({
              id:[this.results.id],
              ccy: [this.results.ccy, [Validators.required]],
              country: [this.results.country, [Validators.required]],
              ccy_name: [this.results.ccy_name, [Validators.required]],
              is_deleted: [this.results.is_deleted],
              is_verified: [this.results.is_verified],
            });
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "V-Verify"){
          this.subscription = this.currencyAPI.getCurrencyId(this.ccy_id).subscribe(res=>{
            this.results = res;
            this.currency_id = this.results.id;
            this.formData = this.fb.group({
              id:[this.results.id],
              ccy: [this.results.ccy, [Validators.required]],
              country: [this.results.country, [Validators.required]],
              ccy_name: [this.results.ccy_name, [Validators.required]],
              is_deleted: [this.results.is_deleted],
              is_verified: [true],
            });
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }
        else if(this.function_type == "X-Delete"){
          this.subscription = this.currencyAPI.getCurrencyId(this.ccy_id).subscribe(res=>{
            this.results = res;
            this.currency_id = this.results.id;
            this.formData = this.fb.group({
              id:[this.results.id],
              ccy: [this.results.ccy, [Validators.required]],
              country: [this.results.country, [Validators.required]],
              ccy_name: [this.results.ccy_name, [Validators.required]],
              is_deleted: [true],
              is_verified: [this.results.is_verified],
            });
          }, err=>{
            this.error = err;
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
          })
        }    
      })
      }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSubmit() {
        console.log(this.formData.value);
        
          this.submitted = true;
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.currencyAPI.createCurrency(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
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
            else if(this.function_type != "A-Add"){

              this.subscription = this.currencyAPI.updateCurrency(this.currency_id, this.formData.value).subscribe(res=>{
                this.results = res;
                  this._snackBar.open("Executed Successfully!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
              this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/currency/maintenance'));
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