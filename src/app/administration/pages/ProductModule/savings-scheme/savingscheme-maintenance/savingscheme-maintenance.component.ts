import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { SchemeTypeLookupComponent } from '../../../SystemConfigurations/GlobalParams/scheme-type/scheme-type-lookup/scheme-type-lookup.component';
import { LoanproductLookupComponent } from '../../loanproduct/loanproduct-lookup/loanproduct-lookup.component';
import { LoanproductService } from '../../loanproduct/loanproduct.service';
import { SavingschemeLookupComponent } from '../savingscheme-lookup/savingscheme-lookup.component';
import { SavingschemeService } from '../savingscheme.service';

@Component({
  selector: 'app-savingscheme-maintenance',
  templateUrl: './savingscheme-maintenance.component.html',
  styleUrls: ['./savingscheme-maintenance.component.scss']
})
export class SavingschemeMaintenanceComponent implements OnInit {
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
  sba_scheme_code: any;
  sba_scheme_code_desc: any;
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
    private sbaAPI:SavingschemeService ) { }
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
    scheme_code: [''],
    scheme_type:[''],
    scheme_code_desc:['']
  });


  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.scheme_code_desc.disable()
    }else if(event.target.value == "A-Add"){
      this.existingData = false;
      this.formData.controls.scheme_code_desc.enable()
    }
  }

  schemeCodeLookup(): void {
    const dialogRef = this.dialog.open(SavingschemeLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupdata= result.data;
      this.sba_scheme_code= this.lookupdata.sba_scheme_code;
      this.sba_scheme_code_desc = this.lookupdata.sba_scheme_code_desc;
      this.formData.controls.scheme_code.setValue(this.sba_scheme_code);
      this.formData.controls.scheme_code_desc.setValue(this.sba_scheme_code_desc);
    });
  }
  sba_scheme_type(sba_scheme_type: any) {
    throw new Error('Method not implemented.');
  }

  schemeTypeLookup(): void {
    const dialogRef = this.dialog.open(SchemeTypeLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.scheme_type = this.lookupData.scheme_type;
      this.formData.controls.scheme_type.setValue(this.scheme_type);
    });
  }
        get f() { return this.formData.controls; }
        onSubmit(){
          console.log(this.formData.value)
          this.loading = true;
          this.submitted = true;
          if(this.formData.valid){
            this.function_type =  this.f.function_type.value;
       
            this.sbaAPI.changeMessage(this.formData.value)
             this.router.navigate(['system/configurations/product/saving-scheme/data/view'], {skipLocationChange:true})
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

