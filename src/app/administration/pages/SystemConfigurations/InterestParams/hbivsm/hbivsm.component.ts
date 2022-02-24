import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { CurrencyLookupComponent } from '../../GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { HbivsmService } from './hbivsm.service';

@Component({
  selector: 'app-hbivsm',
  templateUrl: './hbivsm.component.html',
  styleUrls: ['./hbivsm.component.scss']
})
export class HbivsmComponent implements OnInit {
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
  int_tbl_code: any;
  int_tbl_ccy: any;
  base_indicator: any;
  version: any;
  int_tbl_ccy_name: any;
  showDynamicFrmBtns = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private hbivsmAPI:HbivsmService
    ) { }
    onSelectPreferential(event:any){
      if(event.target.value != "Contract Level"){
        this.showContractInput = false;
        this.formData.controls.linked_organization.setValue("")
        this.formData.controls.linked_organization_detail.setValue("")
        this.formData.controls.linked_organization.setValidators([])
      }else if(event.target.value == "Contract Level"){
        this.showContractInput = true;
        this.formData.controls.linked_organization.setValidators([Validators.required])
      }
    }
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
    submitted = false;
    ngOnInit() {
      this.redirectToMaintenancePage();
      this.getPage();
    }
    redirectToMaintenancePage(){
      this.subscription = this.hbivsmAPI.currentMessage.subscribe(message =>{
        this.message = message;
        if( this.message == "default message"){
          // Redirect to maintenace if no action header
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hbivsm/maintenance'));
        }else{
          null;
        }
      })
    }
      formData = this.fb.group({
        function_type: [''],
        int_tbl_code: [''],
        int_tbl_ccy: [''],
        base_indicator: [''],
        version: [''],
    
        hv_start_date: ['',[Validators.required]],
        hv_end_date: ['',[Validators.required]],
        base_int_pcnt_cr: [''],
        base_int_pcnt_dr: [''],
        version_desc: [''],
        version_desc_for_reports: [''],
        add_vers_info: [''],
        is_verified:[''],
        is_deleted:[''],

        // Dynamic Form
        hbivsmperiodslabs: new FormArray([])
      });

      get f() { return this.formData.controls; }
      get t() { return this.f.hbivsmperiodslabs as FormArray; }
  
    onAddField(){
      this.t.push(this.fb.group({
        int_rate_prd_mmm: ['', Validators.required],
        int_rate_prd_ddd: ['', Validators.required],
        rate: ['', Validators.required],
    }));
    }
    onRemoveField(i:any){
      if(i>0){
        this.t.removeAt(i);
      }
    }
      disabledFormControll(){
        this.formData.controls.hv_start_date.disable();
        this.formData.controls.hv_end_date.disable();
        this.formData.controls.base_int_pcnt_cr.disable();
        this.formData.controls.base_int_pcnt_dr.disable();
        this.formData.controls.version_desc.disable();
        this.formData.controls.version_desc_for_reports.disable();
        this.formData.controls.add_vers_info.disable();
        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();
      }
    
      getPage(){
        this.subscription = this.hbivsmAPI.currentMessage.subscribe(message =>{
          this.message = message;  
        this.function_type = this.message.function_type;
        this.int_tbl_code = this.message.int_tbl_code;
        this.int_tbl_ccy = this.message.int_tbl_ccy;
        this.int_tbl_ccy_name = this.message.int_tbl_ccy_data.ccy_name
        this.base_indicator = this.message.base_indicator;
        this.version = this.message.version;

        if(this.function_type == "A-Add"){
          this.showDynamicFrmBtns = true;
          
          // open empty forms
          this.formData = this.fb.group({
            function_type: [this.function_type],
            int_tbl_code: [this.int_tbl_code],
            int_tbl_ccy: [this.int_tbl_ccy],
            base_indicator: [this.base_indicator],
            version: [this.version],

            hv_start_date: ['',[Validators.required]],
            hv_end_date: ['',[Validators.required]],
            base_int_pcnt_cr: [''],
            base_int_pcnt_dr: [''],
            version_desc: [''],
            version_desc_for_reports: [''],
            add_vers_info: [''],
            hbivsmperiodslabs: new FormArray([])
          });
        this.onAddField();

        this.formData.controls.is_verified.disable();
        this.formData.controls.is_deleted.disable();

        }
        else if(this.function_type == "I-Inquire"){
          this.showDynamicFrmBtns = true;

          this.showDynamicFrmBtns = false;
          this.showContractInput = true;
          // call to disable edit
          this.disabledFormControll();
          // hide Buttons
          this.isEnabled = false;
          this.subscription = this.hbivsmAPI.gethbivsmByhbivsm(this.int_tbl_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              function_type: [this.function_type],
              int_tbl_code: [this.int_tbl_code],
              int_tbl_ccy: [this.int_tbl_ccy],
              base_indicator: [this.base_indicator],
              version: [this.version],
              
              hv_start_date: [this.results.hv_start_date],
              hv_end_date: [this.results.hv_end_date],
              base_int_pcnt_cr: [this.results.base_int_pcnt_cr],
              base_int_pcnt_dr: [this.results.base_int_pcnt_dr],
              version_desc: [this.results.version_desc],
              version_desc_for_reports: [this.results.version_desc_for_reports],
              add_vers_info: [this.results.add_vers_info],
              hbivsmperiodslabs: new FormArray([])
            });
            for(let i=0; i<this.results.hbivsmperiodslabs.length; i++){

              this.t.push(this.fb.group({
                int_rate_prd_mmm: [this.results.hbivsmperiodslabs[i].int_rate_prd_mmm],
                int_rate_prd_ddd: [this.results.hbivsmperiodslabs[i].int_rate_prd_ddd],
                rate: [this.results.hbivsmperiodslabs[i].rate],
            }));
           }
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

            this.showDynamicFrmBtns = true;
            this.showContractInput = true;
            this.isEnabled = true;
          // call to disable edit
          this.subscription = this.hbivsmAPI.gethbivsmByhbivsm(this.int_tbl_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              function_type: [this.function_type],
              int_tbl_code: [this.int_tbl_code],
              int_tbl_ccy: [this.int_tbl_ccy],
              base_indicator: [this.base_indicator],
              version: [this.version],

              hv_start_date: [this.results.hv_start_date, [Validators.required]],
              hv_end_date: [this.results.hv_end_date, [Validators.required]],
              base_int_pcnt_cr: [this.results.base_int_pcnt_cr],
              base_int_pcnt_dr: [this.results.base_int_pcnt_dr],
              version_desc: [this.results.version_desc],
              version_desc_for_reports: [this.results.version_desc_for_reports],
              add_vers_info: [this.results.add_vers_info],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted],

              hbivsmperiodslabs: new FormArray([])
            });
            for(let i=0; i<this.results.hbivsmperiodslabs.length; i++){
              this.t.push(this.fb.group({
                int_rate_prd_mmm: [this.results.hbivsmperiodslabs[i].int_rate_prd_mmm],
                int_rate_prd_ddd: [this.results.hbivsmperiodslabs[i].int_rate_prd_ddd],
                rate: [this.results.hbivsmperiodslabs[i].rate],
            }));
           }
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

            this.showDynamicFrmBtns = true;
            this.showContractInput = true;
            this.isEnabled = true;
          // call to disable edit
          this.subscription = this.hbivsmAPI.gethbivsmByhbivsm(this.int_tbl_code).subscribe(res=>{
            this.results = res;
            this.formData = this.fb.group({
              function_type: [this.function_type],
              int_tbl_code: [this.int_tbl_code],
              int_tbl_ccy: [this.int_tbl_ccy],
              base_indicator: [this.base_indicator],
              version: [this.version],

              hv_start_date: [this.results.hv_start_date, [Validators.required]],
              hv_end_date: [this.results.hv_end_date, [Validators.required]],
              base_int_pcnt_cr: [this.results.base_int_pcnt_cr],
              base_int_pcnt_dr: [this.results.base_int_pcnt_dr],
              version_desc: [this.results.version_desc],
              version_desc_for_reports: [this.results.version_desc_for_reports],
              add_vers_info: [this.results.add_vers_info],
              is_verified:[this.results.is_verified],
              is_deleted:[this.results.is_deleted],
              
              hbivsmperiodslabs: new FormArray([])
            });
            for(let i=0; i<this.results.hbivsmperiodslabs.length; i++){
              this.t.push(this.fb.group({
                int_rate_prd_mmm: [this.results.hbivsmperiodslabs[i].int_rate_prd_mmm],
                int_rate_prd_ddd: [this.results.hbivsmperiodslabs[i].int_rate_prd_ddd],
                rate: [this.results.hbivsmperiodslabs[i].rate],
            }));
           }
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
  
              this.showDynamicFrmBtns = true;
              this.showContractInput = true;
              this.isEnabled = true;
            // call to disable edit
            this.subscription = this.hbivsmAPI.gethbivsmByhbivsm(this.int_tbl_code).subscribe(res=>{
              this.results = res;
              this.formData = this.fb.group({
                function_type: [this.function_type],
                int_tbl_code: [this.int_tbl_code],
                int_tbl_ccy: [this.int_tbl_ccy],
                base_indicator: [this.base_indicator],
                version: [this.version],
  
                hv_start_date: [this.results.hv_start_date, [Validators.required]],
                hv_end_date: [this.results.hv_end_date, [Validators.required]],
                base_int_pcnt_cr: [this.results.base_int_pcnt_cr],
                base_int_pcnt_dr: [this.results.base_int_pcnt_dr],
                version_desc: [this.results.version_desc],
                version_desc_for_reports: [this.results.version_desc_for_reports],
                add_vers_info: [this.results.add_vers_info],
                is_verified:[this.results.is_verified],
                is_deleted:[this.results.is_deleted],
                
                hbivsmperiodslabs: new FormArray([])
              });
              for(let i=0; i<this.results.hbivsmperiodslabs.length; i++){
                this.t.push(this.fb.group({
                  int_rate_prd_mmm: [this.results.hbivsmperiodslabs[i].int_rate_prd_mmm],
                  int_rate_prd_ddd: [this.results.hbivsmperiodslabs[i].int_rate_prd_ddd],
                  rate: [this.results.hbivsmperiodslabs[i].rate],
              }));
             }
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
      chrgCalcCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.chrg_calc_crncy = result.data;
          this.formData.controls.chrg_calc_crncy.setValue(result.data);
        });
      }
      chrgCollCrncyLookup(): void {
        const dialogRef = this.dialog.open(CurrencyLookupComponent, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          this.chrg_coll_crncy= result.data;
          this.formData.controls.chrg_coll_crncy.setValue(result.data);
        });
      }

      onSubmit() {
        console.log(this.formData.value)
         
          this.submitted = true;
          // stop here if form is invalid
          if (this.formData.valid) {
            if(this.function_type == "A-Add"){
            this.subscription = this.hbivsmAPI.createhbivsm(this.formData.value).subscribe(res=>{
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
            }else if(this.function_type == "M-Modify"){

          this.subscription = this.hbivsmAPI.gethbivsmByhbivsm(this.int_tbl_code).subscribe(res=>{
            this.results = res;
            var id = this.results.id;

            this.subscription = this.hbivsmAPI.updatehbivsm(id, this.formData.value).subscribe(res=>{
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
