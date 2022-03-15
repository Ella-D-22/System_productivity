import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { CurrencyLookupComponent } from '../../GlobalParams/currency-config/currency-lookup/currency-lookup.component';

@Component({
  selector: 'app-event-id',
  templateUrl: './event-id.component.html',
  styleUrls: ['./event-id.component.scss']
})
export class EventIdComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading = false;
  isDisabled = false;
  isEnabled = true;
  flagArray: any = [

    'Y','N'
  ]
  amt_derivation_Array: any = [
    {code:'CHRG', description:'Free Code'},
    {code:'FIXED', description:'Fixed Amt'},
    {code:'MRT', description:'Formula Based'},
    {code:'PCNT', description:'Percentage'},
    {code:'SCRPT', description:'Script Based'},
    {code:'USTM', description:'Unit Charge Code'},
  ]
  chargePreferetialsArrays: any = [
    'Custmer Level','Account Level','Charge Level','Contract Level'
  ]

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
  eventId: any;
  message: any;
  event_description: any;
  event_type_description: any;
  event_type_desc: any;
  eventid_id: any;
  event_id_desc: any;
  min_amt_ccy_name: any;
  chrg_coll_crncy_name: any;
  max_amt_ccy_name: any;
  chrg_calc_crncy_name: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private eventIdAPI:EventIdService,
    ) { }
    
    onYesExerciseDuty(event:any){
      this.showExerciseDutyPercentageInput = true;
      this.formData.controls.exercise_duty_percentage.setValidators([Validators.required])
    }
    onNoExerciseDuty(event:any){
      this.showExerciseDutyPercentageInput = false;
      this.formData.controls.exercise_duty_percentage.setValue("0")
    }

    onSelectAmtDerivationType(event:any){
      console.log("this is selected", event.target.value)
      if(event.target.value != "FIXED"){
        this.showAmtDerivationInput = false;
        this.formData.controls.amt.setValue(0)
        this.formData.controls.amt.setValidators([])
      }else if(event.target.value == "FIXED"){
        this.showAmtDerivationInput = true;
        this.formData.controls.amt.setValidators([Validators.required])
      }
      
      if(event.target.value != "PCNT"){
        this.showPercentageDerivationInput = false;
        this.formData.controls.percentage.setValue(0)
        this.formData.controls.percentage.setValidators([])
      }else if(event.target.value == "PCNT"){
        this.showPercentageDerivationInput = true;
        this.formData.controls.percentage.setValidators([Validators.required])
      }
      if(event.target.value != "CHRG"){
        this.showChargecodeDerivationInput = false;
        this.formData.controls.chrg_code.setValue(0)
        this.formData.controls.chrg_code.setValidators([])
      }else if(event.target.value == "CHRG"){
        this.showChargecodeDerivationInput = true;
        this.formData.controls.chrg_code.setValidators([Validators.required])
      }
      if(event.target.value != "MRT"){
        this.showMrtFilenameDerivationInput = false;
        this.formData.controls.file_name.setValue("NULL")
        this.formData.controls.file_name.setValidators([])
      }else if(event.target.value == "MRT"){
        this.showMrtFilenameDerivationInput = true;
        this.formData.controls.file_name.setValidators([Validators.required])
      }
      if(event.target.value != "SCRPT" ){
        this.showFilenameDerivationInput = false;
        this.formData.controls.file_name.setValue("NULL")
        this.formData.controls.file_name.setValidators([])
      }else if(event.target.value == "SCRPT"){
        this.showFilenameDerivationInput = true;
        this.formData.controls.file_name.setValidators([Validators.required])
      }
    }
    // fixed -> amt
    // PCNT‟/‟MRT  -> percent
    // „CHRG‟->charge-code
    // MRT or SCRIPT =>filename
    submitted = false;
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.eventIdAPI.currentMessage.subscribe(message =>{
        this.message = message;
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-id/maintenance'));
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
        event_id:[''],
        event_type:[''],
        event_type_desc:[''],
        event_id_desc:[''],
        ac_placeholder: [this.ac_placeholder, [Validators.required]],
        amt_derivation_type: ['', [Validators.required]],
        amt: [''],
        percentage : [''],
        chrg_code: [''],
        file_name : [''],
        chrg_calc_crncy: [''],
        chrg_coll_crncy : [''],
        min_amt_ccy: ['', [Validators.required]],
        min_amt: [''],
        max_amt_ccy: ['', [Validators.required]],
        max_amt: ['', [Validators.required]],
        fee_report_code: [''],
        rate_code: [''],
        tran_remarks_state: [''],
        tran_remarks: [''],
        tran_particulars_state: [''],
        tran_particulars: [''],
        round_off_flag: [''],
        round_off_value: [''],
        has_exercise_duty: [''],
        exercise_duty_percentage:[''],
        is_verified:[false],
        is_deleted:[false]
      });
      disabledFormControll(){
        this.formData.disable()
      }

      getPage(){
        this.subscription = this.eventIdAPI.currentMessage.subscribe(message =>{
          this.message = message;  
          
        this.function_type =this.message.function_type;
        this.event_type = this.message.event_id.event_type;
        this.event_type_desc = this.message.event_id.event_type_desc
        
        this.event_id = this.message.event_id.event_id;
        this.event_id_desc  =this.message.event_id.event_id_desc

        
        


        if(this.function_type == "A-Add"){
          // open empty forms
          this.formData = this.fb.group({
            event_id:[this.event_id],
            event_type:[this.event_type],
            event_type_desc:[this.event_type_desc],
            ac_placeholder: [this.ac_placeholder, [Validators.required]],
            amt_derivation_type: ['', [Validators.required]],
            amt: [''],
            percentage : [''],
            chrg_code: [''],
            file_name : [''],
            chrg_calc_crncy: [''],
            chrg_coll_crncy : [''],
            min_amt_ccy: ['', [Validators.required]],
            min_amt: [''],
            max_amt_ccy: ['', [Validators.required]],
            max_amt: ['', [Validators.required]],
            fee_report_code: [''],
            rate_code: [''],
            tran_remarks_state: [''],
            tran_remarks: [''],
            tran_particulars_state: [''],
            tran_particulars: [''],
            round_off_flag: [''],
            round_off_value: [''],
            has_exercise_duty: [''],
            exercise_duty_percentage:[''],
            is_verified:[false],
            is_deleted:[false]
          });
        }
        else if(this.function_type == "I-Inquire"){
          //load the page with form data submit disabled
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('event_id',this.event_id)
          .set('event_type', this.event_type);
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.eventIdAPI.getEventIdByEventId(this.params).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              event_id:[this.event_id],
              ac_placeholder: [this.results.ac_placeholder,{disable: true}, [Validators.required]],
              amt_derivation_type: [this.results.amt_derivation_type, [Validators.required]],
              amt: [this.results.amt],
              percentage : [this.results.percentage],
              chrg_code: [this.results.chrg_code],
              file_name : [this.results.file_name],
              chrg_calc_crncy: [this.results.chrg_calc_crncy],
              chrg_coll_crncy : [this.results.chrg_coll_crncy],
              min_amt_ccy: [this.results.min_amt_ccy, [Validators.required]],
              min_amt: [this.results.min_amt],
              max_amt_ccy: [this.results.max_amt_ccy, [Validators.required]],
              max_amt: [this.results.max_amt, [Validators.required]],
              fee_report_code: [this.results.fee_report_code],
              rate_code: [this.results.rate_code],
              tran_remarks_state: [this.results.tran_remarks_state],
              tran_remarks: [this.results.tran_remarks],
              tran_particulars_state: [this.results.tran_particulars_state],
              tran_particulars: [this.results.tran_particulars],
              round_off_flag: [this.results.round_off_flag],
              round_off_value: [this.results.round_off_value],
              has_exercise_duty: [this.results.has_exercise_duty],
              exercise_duty_percentage:[this.results.exercise_duty_percentage],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
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
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('event_id',this.event_id)
          .set('event_type', this.event_type);
          // call to disable edit
          this.subscription = this.eventIdAPI.getEventIdByEventId(this.params).subscribe(res=>{
            this.results = res;
            this.eventid_id  = this.results.id
            this.formData = this.fb.group({
              event_id:[this.event_id],
              ac_placeholder: [this.results.ac_placeholder,{disable: true}, [Validators.required]],
              amt_derivation_type: [this.results.amt_derivation_type, [Validators.required]],
              amt: [this.results.amt],
              percentage : [this.results.percentage],
              chrg_code: [this.results.chrg_code],
              file_name : [this.results.file_name],
              chrg_calc_crncy: [this.results.chrg_calc_crncy],
              chrg_coll_crncy : [this.results.chrg_coll_crncy],
              min_amt_ccy: [this.results.min_amt_ccy, [Validators.required]],
              min_amt: [this.results.min_amt],
              max_amt_ccy: [this.results.max_amt_ccy, [Validators.required]],
              max_amt: [this.results.max_amt, [Validators.required]],
              fee_report_code: [this.results.fee_report_code],
              rate_code: [this.results.rate_code],
              tran_remarks_state: [this.results.tran_remarks_state],
              tran_remarks: [this.results.tran_remarks],
              tran_particulars_state: [this.results.tran_particulars_state],
              tran_particulars: [this.results.tran_particulars],
              round_off_flag: [this.results.round_off_flag],
              round_off_value: [this.results.round_off_value],
              has_exercise_duty: [this.results.has_exercise_duty],
              exercise_duty_percentage:[this.results.exercise_duty_percentage],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted]
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
          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('event_id',this.event_id)
          .set('event_type', this.event_type);
          // call to disable edit
          this.subscription = this.eventIdAPI.getEventIdByEventId(this.params).subscribe(res=>{
            this.results = res;
            this.eventid_id  = this.results.id
            this.formData = this.fb.group({
              event_id:[this.event_id],
              ac_placeholder: [this.results.ac_placeholder,{disable: true}, [Validators.required]],
              amt_derivation_type: [this.results.amt_derivation_type, [Validators.required]],
              amt: [this.results.amt],
              percentage : [this.results.percentage],
              chrg_code: [this.results.chrg_code],
              file_name : [this.results.file_name],
              chrg_calc_crncy: [this.results.chrg_calc_crncy],
              chrg_coll_crncy : [this.results.chrg_coll_crncy],
              min_amt_ccy: [this.results.min_amt_ccy, [Validators.required]],
              min_amt: [this.results.min_amt],
              max_amt_ccy: [this.results.max_amt_ccy, [Validators.required]],
              max_amt: [this.results.max_amt, [Validators.required]],
              fee_report_code: [this.results.fee_report_code],
              rate_code: [this.results.rate_code],
              tran_remarks_state: [this.results.tran_remarks_state],
              tran_remarks: [this.results.tran_remarks],
              tran_particulars_state: [this.results.tran_particulars_state],
              tran_particulars: [this.results.tran_particulars],
              round_off_flag: [this.results.round_off_flag],
              round_off_value: [this.results.round_off_value],
              has_exercise_duty: [this.results.has_exercise_duty],
              exercise_duty_percentage:[this.results.exercise_duty_percentage],
              is_verified:[true],
              is_deleted:[this.results.is_deleted]
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

          // find by event id
          this.showContractInput = true;
          this.params = new HttpParams()
          .set('event_id',this.event_id)
          .set('event_type', this.event_type);
          // call to disable edit
          this.subscription = this.eventIdAPI.getEventIdByEventId(this.params).subscribe(res=>{
            this.results = res;
            this.eventid_id  = this.results.id
            this.formData = this.fb.group({
              event_id:[this.event_id],
              ac_placeholder: [this.results.ac_placeholder,{disable: true}, [Validators.required]],
              amt_derivation_type: [this.results.amt_derivation_type, [Validators.required]],
              amt: [this.results.amt],
              percentage : [this.results.percentage],
              chrg_code: [this.results.chrg_code],
              file_name : [this.results.file_name],
              chrg_calc_crncy: [this.results.chrg_calc_crncy],
              chrg_coll_crncy : [this.results.chrg_coll_crncy],
              min_amt_ccy: [this.results.min_amt_ccy, [Validators.required]],
              min_amt: [this.results.min_amt],
              max_amt_ccy: [this.results.max_amt_ccy, [Validators.required]],
              max_amt: [this.results.max_amt, [Validators.required]],
              fee_report_code: [this.results.fee_report_code],
              rate_code: [this.results.rate_code],
              tran_remarks_state: [this.results.tran_remarks_state],
              tran_remarks: [this.results.tran_remarks],
              tran_particulars_state: [this.results.tran_particulars_state],
              tran_particulars: [this.results.tran_particulars],
              round_off_flag: [this.results.round_off_flag],
              round_off_value: [this.results.round_off_value],
              has_exercise_duty: [this.results.has_exercise_duty],
              exercise_duty_percentage:[this.results.exercise_duty_percentage],
              is_verified:[this.results.is_verified],
              is_deleted:[true]
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
      accountLookup(): void {
        // const dialogRef = this.dialog.open(AcPlaceholderLookupComponent, {
        //   height: '400px',
        //   width: '600px',
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   this.ac_placeholder = result.data;
        //   this.dialogValue = result.data;
        //   this.formData.controls.ac_placeholder.setValue(result.data);
        // });
      }
      minAmtCurrencyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
        
        });
        dialogRef.afterClosed().subscribe(result => {
          this.min_amt_ccy = result.data.ccy;
          this.min_amt_ccy_name = result.data.ccy_name;
          this.formData.controls.min_amt_ccy.setValue(result.data.ccy);
        });
      }
      maxAmtCurrencyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          
        });
        dialogRef.afterClosed().subscribe(result => {
          this.max_amt_ccy = result.data.ccy;
          this.max_amt_ccy_name = result.data.ccy_name;
          this.formData.controls.max_amt_ccy.setValue(result.data.ccy);
        });
      }
      chrgCalcCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
         
        });
        dialogRef.afterClosed().subscribe(result => {
          this.chrg_calc_crncy = result.data.ccy;
          this.chrg_calc_crncy_name = result.data.ccy_name;
          this.formData.controls.chrg_calc_crncy.setValue(result.data.ccy);
        });
      }
      chrgCollCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
         
        });
        dialogRef.afterClosed().subscribe(result => {
          this.chrg_coll_crncy= result.data.ccy;
          this.chrg_coll_crncy_name = result.data.ccy_name;
          this.formData.controls.chrg_coll_crncy.setValue(result.data.ccy);
        });
      }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSubmit() {
        console.log("event id", this.eventid_id);
        
          this.submitted = true;
          console.log("hello",this.formData.value)
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.eventIdAPI.createEventId(this.formData.value).subscribe(res=>{
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
            }else if(this.function_type != "A-Add"){
              this.eventId = this.actRoute.snapshot.paramMap.get('event_id');
              this.subscription = this.eventIdAPI.updateEventId(this.eventid_id, this.formData.value).subscribe(res=>{
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