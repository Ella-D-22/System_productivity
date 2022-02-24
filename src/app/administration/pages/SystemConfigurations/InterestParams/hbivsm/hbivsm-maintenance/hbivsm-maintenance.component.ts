import { HttpParams } from '@angular/common/http';
import { Component, NgZone, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrencyLookupComponent } from '../../../GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { HbivsmService } from '../hbivsm.service';
import { HbivsmLookUpComponent } from '../hbivsm-look-up/hbivsm-look-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hbivsm-maintenance',
  templateUrl: './hbivsm-maintenance.component.html',
  styleUrls: ['./hbivsm-maintenance.component.scss']
})
export class HbivsmMaintenanceComponent implements OnInit {
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
  int_tbl_ccy_data: any;
  int_tbl_ccy_name: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private hbivsmAPI:HbivsmService,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  event_type = "";
  event_id = "";
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    int_tbl_code: ['',[Validators.required]],
    int_tbl_ccy: [''],
    int_tbl_ccy_data:[''],
    base_indicator: [''],
    version: ['']
  });

  hbivsmLookup(): void {
    const dialogRef = this.dialog.open(HbivsmLookUpComponent, {
      height: '400px',
      // width: '600px',
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
      this.int_tbl_ccy_name = result.data.ccy_name;
      this.formData.controls.int_tbl_ccy.setValue(result.data.ccy);
      this.formData.controls.int_tbl_ccy_data.setValue(result.data);
    });
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSelectFunction(event:any){
        if(event.target.value == "A-Add"){
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([Validators.required])
          this.formData.controls.base_indicator.setValidators([Validators.required])
          this.newData= true; 
        }else if(event.target.value != "A-Add"){
          this.newData= false;    
          this.formData.controls.function_type.setValidators([Validators.required])
          this.formData.controls.int_tbl_code.setValidators([Validators.required])
          this.formData.controls.int_tbl_ccy.setValidators([])
          this.formData.controls.base_indicator.setValidators([])
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
        this.subscription = this.hbivsmAPI.checkhbivsm(this.params).subscribe(res=>{
          // not available else proceed
        this.hbivsmAPI.changeMessage(this.formData.value)
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hbivsm/data/view'));
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
        this.hbivsmAPI.changeMessage(this.formData.value)
        // this.dialogRef.close({ event: 'close', data:this.formData.value });
    this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hbivsm/data/view'));
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
