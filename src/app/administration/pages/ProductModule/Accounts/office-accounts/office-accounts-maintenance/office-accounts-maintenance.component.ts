import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { HbivsmService } from 'src/app/administration/pages/SystemConfigurations/InterestParams/hbivsm/hbivsm.service';
import { HbivsmLookUpComponent } from 'src/app/administration/pages/SystemConfigurations/InterestParams/hbivsm/hbivsm-look-up/hbivsm-look-up.component';
import { CurrencyLookupComponent } from 'src/app/administration/pages/SystemConfigurations/GlobalParams/currency-config/currency-lookup/currency-lookup.component';
import { OfficeAccountService } from '../office-account.service';

@Component({
  selector: 'app-office-accounts-maintenance',
  templateUrl: './office-accounts-maintenance.component.html',
  styleUrls: ['./office-accounts-maintenance.component.scss']
})
export class OfficeAccountsMaintenanceComponent implements OnInit {
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
  newData = true;
  int_tbl_ccy_data: any;
  int_tbl_ccy_name: any;
  ac_id: any;
  ccy_data: any;
  ccy_name: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private officeacAPI:OfficeAccountService,
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
    sol_id: [''],
    ac_id: ['', [Validators.required]],
    ccy:[''],
    gl_subhead_code: [''],
    scheme_code: ['']
  });

  officeAccountLookup(){

  }
  hbivsmLookup(): void {
    // const dialogRef = this.dialog.open(HbivsmLookUpComponent, {
    //   height: '400px',
    //   // width: '600px',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.int_tbl_code = result.data;
    //   this.formData.controls.int_tbl_code.setValue(result.data);
    // });
  }

 CcyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ccy_data = result.data
      this.ccy_name = this.ccy_data.ccy_name
      this.formData.controls.ccy.setValue(this.ccy_data);
    });
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onSelectFunction(event:any){
        if(event.target.value == "A-Add"){
          // this.formData.controls.function_type.setValidators([Validators.required])
          // this.formData.controls.int_tbl_code.setValidators([Validators.required])
          // this.formData.controls.int_tbl_ccy.setValidators([Validators.required])
          // this.formData.controls.base_indicator.setValidators([Validators.required])
          this.newData= true; 
        }else if(event.target.value == "I-Inquire"){
          // this.formData.controls.function_type.setValidators([Validators.required])
          // this.formData.controls.int_tbl_code.setValidators([Validators.required])
          // this.formData.controls.int_tbl_ccy.setValidators([])
          // this.formData.controls.base_indicator.setValidators([])
          this.newData= false;    
         }else if(event.target.value == "M-Modify"){
          // this.formData.controls.function_type.setValidators([Validators.required])
          // this.formData.controls.int_tbl_code.setValidators([Validators.required])
          // this.formData.controls.int_tbl_ccy.setValidators([])
          // this.formData.controls.base_indicator.setValidators([]) 
          this.newData= false;
         }else if(event.target.value == "V-Verify"){
          // this.formData.controls.function_type.setValidators([Validators.required])
          // this.formData.controls.int_tbl_code.setValidators([Validators.required])
          // this.formData.controls.int_tbl_ccy.setValidators([])
          // this.formData.controls.base_indicator.setValidators([]) 
          this.newData= false;
         }else if(event.target.value == "X-Cancel"){
          // this.formData.controls.function_type.setValidators([Validators.required])
          // this.formData.controls.int_tbl_code.setValidators([Validators.required])
          // this.formData.controls.int_tbl_ccy.setValidators([])
          // this.formData.controls.base_indicator.setValidators([]) 
          this.newData= false;
         }
      }


      // finale
  // onSubmit(){
  //   this.loading = true;
  //   this.submitted = true;
  //   if(this.formData.valid){
  //     this.ac_id = this.f.ac_id.value;
  //     this.function_type =  this.f.function_type.value;
  //     if(this.function_type == "A-Add"){
  //       // check if code exists
  //       this.params = new HttpParams()
  //       .set('ac_id',this.ac_id);
  //       this.subscription = this.officeacAPI.checkhbivsm(this.params).subscribe(res=>{
  //         // not available else proceed
  //       this.officeacAPI.changeMessage(this.formData.value)
  //       this.ngZone.run(() => this.router.navigateByUrl('system/configurations/accounts/office/data/view'));
  //       }, err=>{
  //         // exist else show error
  //         this.error = err;
  //           this.loading = false;
  //           this._snackBar.open(this.error, "Try again!", {
  //             horizontalPosition: this.horizontalPosition,
  //             verticalPosition: this.verticalPosition,
  //             duration: 3000,
  //             panelClass: ['red-snackbar','login-snackbar'],
  //           });
  //       })
  //     }else{
  //       this.officeacAPI.changeMessage(this.formData.value)
  //       // this.dialogRef.close({ event: 'close', data:this.formData.value });
  //   this.ngZone.run(() => this.router.navigateByUrl('system/configurations/accounts/office/data/view'));
  //     }
  //     // check if adding 
  // }else{
  //   this.loading = false;
  //   this._snackBar.open("Invalid Form Data", "Try again!", {
  //     horizontalPosition: this.horizontalPosition,
  //     verticalPosition: this.verticalPosition,
  //     duration: 3000,
  //     panelClass: ['red-snackbar','login-snackbar'],
  //   });
  // }
  // }

  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
      this.ac_id = this.f.ac_id.value;
      this.function_type =  this.f.function_type.value;
      if(this.function_type == "A-Adld"){
        // check if code exists
        this.params = new HttpParams()
        .set('ac_id',this.ac_id);
        this.subscription = this.officeacAPI.checkOfficeaccount(this.params).subscribe(res=>{
          // not available else proceed
        this.officeacAPI.changeMessage(this.formData.value)
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/accounts/office/data/view'));
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
        this.officeacAPI.changeMessage(this.formData.value)
        // this.dialogRef.close({ event: 'close', data:this.formData.value });
    this.ngZone.run(() => this.router.navigateByUrl('system/configurations/accounts/office/data/view'));
      }
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
