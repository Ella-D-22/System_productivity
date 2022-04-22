import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { SchemeTypeLookupComponent } from '../../../SystemConfigurations/GlobalParams/scheme-type/scheme-type-lookup/scheme-type-lookup.component';
import { TermDepositLookupComponent } from '../term-deposit-lookup/term-deposit-lookup.component';
import { TermDepositServiceService } from '../term-deposit-service.service';

@Component({
  selector: 'app-term-deposit-maintenance',
  templateUrl: './term-deposit-maintenance.component.html',
  styleUrls: ['./term-deposit-maintenance.component.scss']
})
export class TermDepositMaintenanceComponent implements OnInit {
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
  scheme_code_desc: any;
  existingData = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private tdaAPI: TermDepositServiceService,

   

    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  scheme_code: any; 
  scheme_type: any;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    scheme_code: ['', [Validators.required]],
    // scheme_type:[''],
    scheme_code_desc:['']
  });
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.scheme_code_desc.disable();
    }else if(event.target.value == "A-Add"){
      this.existingData = false;
      this.formData.controls.scheme_code_desc.enable()
    }
  }
  
  schemeCodeLookup(): void {
    const dialogRef = this.dialog.open(TermDepositLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("lookup results", result);
      
      this.lookupdata= result.data;
      this.scheme_code = this.lookupdata.scheme_code;
      this.scheme_code_desc= this.lookupdata.scheme_code_desc;
      this.formData.controls.scheme_code.setValue(this.scheme_code);
    });
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
              // check if code exists
              this.params = new HttpParams().set('scheme_code', this.f.scheme_code.value);
              this.subscription = this.tdaAPI.checkTermDeposit(this.params).subscribe(res=>{
                // not available else proceed
              this.tdaAPI.changeMessage(this.formData.value)
             this.router.navigate(['system/configurations/product/term-deposit/data/view'], {skipLocationChange:true})
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
              this.tdaAPI.changeMessage(this.formData.value)
              this.router.navigate(['system/configurations/product/term-deposit/data/view'], {skipLocationChange:true})
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

