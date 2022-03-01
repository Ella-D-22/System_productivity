import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SchemeTypeLookupComponent } from '../../scheme-type/scheme-type-lookup/scheme-type-lookup.component';
import { CurrencyLookupComponent } from '../../currency-config/currency-lookup/currency-lookup.component';
import { ExceptionsCodesServiceService } from '../exceptions-codes-service.service';
import { ExceptionsCodesLookupComponent } from '../exceptions-codes-lookup/exceptions-codes-lookup.component';
@Component({
  selector: 'app-exceptions-codes-maintenance',
  templateUrl: './exceptions-codes-maintenance.component.html',
  styleUrls: ['./exceptions-codes-maintenance.component.scss']
})
export class ExceptionsCodesMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  showOrganizationId = true;
  organization_id: any;
  organization_name: any;
  scheme_type_id: any;
  lookupData: any;
  scheme_type: any;
  ccy_name: any;
  ccy: any;
  sol_id = 0;
  subhead_code   = 0;
  

  newData = false;
  exception_code_value: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private exceptionCodeApi: ExceptionsCodesServiceService,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
<<<<<<< HEAD
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
=======
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Deleted'
>>>>>>> 70e7bfa5032dd3866b5460a7aeba9623807eaf0c
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    exception_code: ['', [Validators.required]],
  });


  exception_codeLookup(): void {
    const dialogRef = this.dialog.open(ExceptionsCodesLookupComponent,{
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.exception_code_value = this.lookupData.exception_code;
      this.formData.controls.exception_code.setValue(this.lookupData.id);
    });
  }

  


  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.newData = true;
    }else if(event.target.value == "A-Add"){
      this.newData= false;
    }
  }
 
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
    this.exceptionCodeApi.changeMessage(this.formData.value)
    this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/exceptions-codes/data/view'));
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

