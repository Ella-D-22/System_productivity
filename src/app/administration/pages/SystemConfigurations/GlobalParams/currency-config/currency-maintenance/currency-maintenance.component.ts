import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { CurrencyLookupComponent } from '../currency-lookup/currency-lookup.component';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-maintenance',
  templateUrl: './currency-maintenance.component.html',
  styleUrls: ['./currency-maintenance.component.scss']
})
export class CurrencyMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  showOrganizationId = true;
  showCurrencyId: any;
  ccy: any;
  ccy_name: any;
  dialoData: any;
  dialogData: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private currencyAPI: CurrencyService,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  currency_ccy: any;
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    currency_ccy: [''],
  });
  currencyLookup(): void {
    const dialogRef = this.dialog.open(CurrencyLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogData = result.data;
      this.ccy_name = this.dialogData.ccy_name;
      this.formData.controls.currency_ccy.setValue(result.data);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.showCurrencyId = true;
      this.formData.controls.currency_ccy.setValue("")
      this.formData.controls.currency_ccy.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.formData.controls.currency_ccy.setValidators([])
      this.formData.controls.currency_ccy.setValue("");
      this.showCurrencyId= false;
    }
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
    this.currencyAPI.changeMessage(this.formData.value)
    this.router.navigate([`/system/configurations/global/currency/data/view`], { skipLocationChange: true });
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
