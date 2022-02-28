import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-maintainance',
  templateUrl: './transaction-maintainance.component.html',
  styleUrls: ['./transaction-maintainance.component.scss']
})
export class TransactionMaintainanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  transaction_type: any;

  loading = false;
  submitted = false;
  transaction_code: any; 

  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]

  TransactionTypeArray: any = [
    'Cash',
  ]

  constructor(  
    public fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    transaction_type: ['', [Validators.required]],
    transaction_code: ['',[Validators.required]],
  });

  onTransactionChange(event:any){
    this.transaction_type = event.target.value;
  }

  onChange(event:any){
    this.function_type = event.target.value;
    if(event.target.value != "A-Add"){
    console.log(event.target.value)
    }else if(event.target.value == "A-Add"){
      this.formData.controls.transaction_code.setValidators([])
      this.formData.controls.transaction_code.setValue("");
    }
  }
  get f() { return this.formData.controls; }

  onSubmit(){
    console.log(this.formData.value)
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
      this.transaction_type=this.f.transaction_type.value
      this.function_type =  this.f.function_type.value;
      this.transaction_code=this.f.transaction_code.value;
      if(this.function_type == "A-Add"){
        this.router.navigate(['system/transactions/cash/data/view'], {
          state: this.formData.value
            
          ,
        });
      
     }
     else{
      this.router.navigate(['system/transactions/cash/data/view'], {
        state: this.formData.value   
        ,
      });
      }
  }
  else{
    this.loading = false;
    console.log("invalid form")
    // this._snackBar.open("Invalid Form Data", "Try again!", {
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    //   duration: 3000,
    //   panelClass: ['red-snackbar','login-snackbar'],
    // });
  }
  }

}
