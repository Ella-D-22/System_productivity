import { HttpClient, HttpParams } from '@angular/common/http';
import { Component,NgZone, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { LoanproductService } from '../loanproduct.service';
import { LoanproductLookupComponent } from '../loanproduct-lookup/loanproduct-lookup.component';

@Component({
  selector: 'app-loanproduct-maintenance',
  templateUrl: './loanproduct-maintenance.component.html',
  styleUrls: ['./loanproduct-maintenance.component.scss']
})
export class LoanproductMaintenanceComponent implements OnInit {
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
  laa_scheme_code: any;
  laa_scheme_code_desc: any;
  existingData = false;
  scheme_id: any;
  laa_scheme_type_id: any;
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
    

    ) { }
  ngOnInit(): void {
  }
  newData = false;

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
    scheme_code_desc:[''],
  });

  schemeCodeLookup(): void {
    const dialogRef = this.dialog.open(LoanproductLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupdata= result.data;
      this.laa_scheme_code = this.lookupdata.laa_scheme_code;
      this.laa_scheme_code_desc = this.lookupdata.laa_scheme_code_desc;
      this.formData.controls.scheme_code.setValue(this.laa_scheme_code);

    });
  }

 
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.scheme_code_desc.disable()
    }else if(event.target.value == "A-Add"){
      this.formData.controls.scheme_code_desc.enable()
      this.existingData = false;
    }
  }
        // convenience getter for easy access to form fields
        get f() { return this.formData.controls; }

        onSubmit(){
          // console.log(this.formData.value)
          this.loading = true;
          this.submitted = true;
          if(this.formData.valid){
            // this.int_tbl_code = this.f.int_tbl_code.value;
            this.function_type =  this.f.function_type.value;
            if(this.function_type == "A-Add"){
              this.newData = true;

              // console.log("found here", this.int_tbl_code)
              // check if code exists
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
              this.newData = false;
              this.loanproductAPI.changeMessage(this.formData.value)
              this.router.navigate(['system/configurations/product/loan-product/data/view'], {skipLocationChange:true})
              
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

