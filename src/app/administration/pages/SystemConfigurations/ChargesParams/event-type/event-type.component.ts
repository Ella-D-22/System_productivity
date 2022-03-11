import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { CurrencyService } from '../../GlobalParams/currency-config/currency.service';
import { EventTypeService } from './event-type.service';

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss']
})
export class EventTypeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  isDeleting = false;
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
  submitted = false;
  message: any;
  event_description: any;
  event_type_id: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private eventtypeAPI: EventTypeService,
    ) { }
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.eventtypeAPI.currentMessage.subscribe(message =>{
        this.message = message;
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-type/maintenance'));
        }else{
          null;
        }
      })
    }
      ac_placeholder = "";
      min_amt_ccy = "";
      max_amt_ccy = "";
      linked_event_id = "";
      formData = this.fb.group({
        code: ['', [Validators.required]],
        description: ['', [Validators.required]],
        is_verified: [false],
        is_deleted: [false],
      });
      disabledFormControll(){
        this.formData.controls.code.disable();
        this.formData.controls.description.disable();
        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();
      }
      getPage(){
        this.subscription = this.eventtypeAPI.currentMessage.subscribe(message =>{
        this.message = message;
     
        
        this.function_type = this.message.function_type
        this.event_type_id = this.message.eventtype_code.id
        console.log("hey responded",this.message.eventtype_code )
        this.event_description = this.message.eventtype_code.description

        console.log("THis is the event id", this.event_type_id);
        
        if(this.function_type == "A-Add"){
          this.formData = this.fb.group({
            code: ['', [Validators.required]],
            description: ['', [Validators.required]],
            is_verified: [false],
            is_deleted: [false],
          });
        }
        else if(this.function_type == "I-Inquire"){
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.eventtypeAPI.getEventTypeId(this.event_type_id).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              code: [this.results.code, [Validators.required]],
              description: [this.results.description, [Validators.required]],
              is_verified: [this.results.is_verified],
              is_deleted: [this.results.is_deleted],
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
        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();

          this.subscription = this.eventtypeAPI.getEventTypeId(this.event_type_id).subscribe(res=>{
            this.results = res;
            this.currency_id = this.results.id;
            this.formData = this.fb.group({
              code: [this.results.code, [Validators.required]],
              description: [this.results.description, [Validators.required]],
              is_verified: [this.results.is_verified],
              is_deleted: [this.results.is_deleted],
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

          this.disabledFormControll();

        this.formData.controls.is_verified.enable();

        this.subscription = this.eventtypeAPI.getEventTypeId(this.event_type_id).subscribe(res=>{
          this.results = res;
          this.currency_id = this.results.id;
          this.formData = this.fb.group({
            code: [this.results.code, [Validators.required]],
            description: [this.results.description, [Validators.required]],
            is_verified: [true],
            is_deleted: [this.results.is_deleted],
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
        else if(this.function_type == "X-Delete"){

          this.disabledFormControll();
         
        this.formData.controls.is_deleted.enable();

          this.subscription = this.eventtypeAPI.getEventTypeId(this.event_type_id).subscribe(res=>{
            this.results = res;
            this.currency_id = this.results.id;
            this.formData = this.fb.group({
              code: [this.results.code, [Validators.required]],
              description: [this.results.description, [Validators.required]],
              is_verified: [this.results.is_verified],
              is_deleted: [true],
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
      })
      }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSubmit() {
          this.submitted = true;
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.eventtypeAPI.createEventType(this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Executed Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-type/maintenance'));
            },err=>{
              this.error = err;
              this._snackBar.open(this.error, "Try again!", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar','login-snackbar'],
              });
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-type/maintenance'));
            })
            }
            else if(this.function_type == "M-Modify"){
              this.subscription = this.eventtypeAPI.updateEventType(this.event_type_id, this.formData.value).subscribe(res=>{
                this.results = res;
                  this._snackBar.open("Record Updated Successfully!", "X", {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                    duration: 3000,
                    panelClass: ['green-snackbar','login-snackbar'],
                  });
            this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-type/maintenance'));
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
          else if(this.function_type == "X-Delete"){
            this.isEnabled = false;
            this.isDeleting = true;
            this.subscription = this.eventtypeAPI.updateEventType(this.event_type_id, this.formData.value).subscribe(res=>{
              this.results = res;
                this._snackBar.open("Recorded Deleted Successfully!", "X", {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: 3000,
                  panelClass: ['green-snackbar','login-snackbar'],
                });
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-type/maintenance'));
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