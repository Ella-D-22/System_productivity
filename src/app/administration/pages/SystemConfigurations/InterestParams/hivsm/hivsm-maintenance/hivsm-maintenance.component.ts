import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { LinkedEventIdLookupComponent } from '../../../ChargesParams/event-id/linked-event-id-lookup/linked-event-id-lookup.component';
import { EventTypeLookupComponent } from '../../../ChargesParams/event-type/event-type-lookup/event-type-lookup.component';
import { version } from 'jszip';
import { HivsmService } from '../hivsm.service';
import { CurrencyLookupComponent } from '../../../GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { HivsmLookUpComponent } from '../hivsm-look-up/hivsm-look-up.component';

@Component({
  selector: 'app-hivsm-maintenance',
  templateUrl: './hivsm-maintenance.component.html',
  styleUrls: ['./hivsm-maintenance.component.scss']
})
export class HivsmMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  int_tbl_ccy: any;
  int_tbl_code: any;
  params: any;
  error: any;
  newData: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private hivsmAPI:HivsmService,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]
  event_type = "";
  event_id = "";
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    int_tbl_code: ['',[Validators.required]],
    int_tbl_ccy: [''],
    base_indicator: [''],
    version: ['']
  });

  hivsmLookup(): void {
    const dialogRef = this.dialog.open(HivsmLookUpComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.int_tbl_code = result.data;
      this.formData.controls.int_tbl_code.setValue(result.data);
    });
  }

 interestTableCcyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.int_tbl_ccy = result.data;
      // this.formData.controls.int_tbl_ccy.setValue(result.data);
      // this.int_tbl_ccy_name = result.data.ccy_name;
      this.formData.controls.int_tbl_ccy.setValue(result.data.ccy);
      this.formData.controls.int_tbl_ccy_data.setValue(result.data);
    });
  }

  // interestTableCcyLookup(): void {
  //   const dialogRef = this.dialog.open(CurrencyLookupComponent, {
  //     height: '400px',
  //     width: '600px',
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.int_tbl_ccy_name = result.data.ccy_name;
  //     this.formData.controls.int_tbl_ccy.setValue(result.data.ccy);
  //     this.formData.controls.int_tbl_ccy_data.setValue(result.data);
  //   });
  // }

      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSelectFunction(event:any){
        if(event.target.value == "A-Add"){
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([Validators.required])
          this.formData.controls.base_indicator.setValidators([Validators.required])
          this.newData= true; 
        }else if(event.target.value == "I-Inquire"){
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([])
          this.formData.controls.base_indicator.setValidators([])
          this.newData= false;    
         }else if(event.target.value == "M-Modify"){
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([])
          this.formData.controls.base_indicator.setValidators([]) 
          this.newData= false;
         }else if(event.target.value == "V-Verify"){
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([])
          this.formData.controls.base_indicator.setValidators([]) 
          this.newData= false;
         }else if(event.target.value == "X-Cancel"){
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([])
          this.formData.controls.base_indicator.setValidators([]) 
          this.newData= false;
         }
      }
      

  onSubmit(){
    console.log("form data", this.formData.value)
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
      this.int_tbl_code = this.f.int_tbl_code.value;
      this.function_type =  this.f.function_type.value;
      if(this.function_type == "A-Add"){
        console.log("found here", this.int_tbl_code)
        // check if code exists
        this.params = new HttpParams()
        .set('int_tbl_code',this.int_tbl_code);
        this.subscription = this.hivsmAPI.checkHivsm(this.params).subscribe(res=>{
          // not available else proceed
        this.hivsmAPI.changeMessage(this.formData.value)
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hivsm/data/view'));
        }, err=>{
          // exist else show error
          this.error = err;
            this.loading = false;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });

        })
      }else{
        this.hivsmAPI.changeMessage(this.formData.value)
        // this.dialogRef.close({ event: 'close', data:this.formData.value });
    this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hivsm/data/view'));
      }

      // checkHitcm

      // check if adding 
  }else{
    this.loading = false;
    this._snackBar.open("Invalid Form Data", "Try again!", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });

  }


  }


}
