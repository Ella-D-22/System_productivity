import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { LoanproductService } from '../../loanproduct.service';
import { SchemeTypeLookupComponent } from 'src/app/administration/pages/SystemConfigurations/GlobalParams/scheme-type/scheme-type-lookup/scheme-type-lookup.component';
import { LoanproductLookupComponent } from '../../loanproduct-lookup/loanproduct-lookup.component';

@Component({
  selector: 'app-loan-fee',
  templateUrl: './loan-fee.component.html',
  styleUrls: ['./loan-fee.component.scss']
})
export class LoanFeeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  event_type: any;
  event_description: any;
  error: any;
  event_type_data: any;
  params:any;
  lookupdata: any;
  lookupData: any;
  scheme_type_id: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private loanproductAPI:LoanproductService,
    // public dialogRef: MatDialogRef<EventIdMaintenanceComponent>,
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any

    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  scheme_code: any; 
  scheme_type: any;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    scheme_code: ['', [Validators.required]],
    scheme_type:[''],
    scheme_code_desc:['']
  });

  schemeCodeLookup(): void {
    const dialogRef = this.dialog.open(LoanproductLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupdata= result.data;
      this.scheme_code = this.lookupdata.scheme_code;
      this.formData.controls.scheme_code.setValue(this.scheme_code);
    });
  }

  schemeTypeLookup(): void {
    const dialogRef = this.dialog.open(SchemeTypeLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.scheme_type = this.lookupData.scheme_type;
      this.formData.controls.scheme_type.setValue(this.scheme_type);
    });
  }


  onChange(state:any){
    this.function_type = state.target.value;
    switch(this.function_type){
      case "1: add":
        // this.addEventId();
        break;
      case "2: enquire":
          break;
      case "3: update":
            break;
      case "4: remove":
          break;
    }
  }
 
        // convenience getter for easy access to form fields
        get f() { return this.formData.controls; }

        onSubmit(){
          console.log(this.formData.value)
          this.loading = true;
          this.submitted = true;
          if(this.formData.valid){
            this.function_type =  this.f.function_type.value;
            if(this.function_type == "A-Add"){
            
              this.params = new HttpParams()
              .set('scheme_code', this.f.scheme_code.value);
              this.subscription = this.loanproductAPI.checkExistence(this.params).subscribe(res=>{
                // not available else proceed
              this.loanproductAPI.changeMessage(this.formData.value)
             this.router.navigate(['system/configurations/product/loan-product/data/view'], {skipLocationChange:true})
              }, err=>{


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
              this.loanproductAPI.changeMessage(this.formData.value)
            }
      
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

