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
import { HitcmLookUpComponent } from '../hitcm-look-up/hitcm-look-up.component';
import { HitcmService } from '../hitcm.service';

@Component({
  selector: 'app-hitcm-maintenance',
  templateUrl: './hitcm-maintenance.component.html',
  styleUrls: ['./hitcm-maintenance.component.scss']
})
export class HitcmMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  params: any;
  error: any;
  newData = true;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private hitcmAPI:HitcmService,
    // public dialogRef: MatDialogRef<EventIdMaintenanceComponent>,
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  event_type = "";
  int_tbl_code = "";
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    // event_type: [this.event_type, [Validators.required]],
    int_tbl_code: [this.int_tbl_code, [Validators.required]]
  });
  hitcmLookup(): void {
    const dialogRef = this.dialog.open(HitcmLookUpComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_type = result.data;
      this.formData.controls.int_tbl_code.setValue(result.data);
    });
  }

  onSelectFunction(event: any){
    if(event.target.value == "A-Add"){
      this.newData = true;
    }else{
      this.newData = false;
    }
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

  onSubmit(){
    console.log("form data", this.formData.value)
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
      this.int_tbl_code = this.f.int_tbl_code.value;
      this.function_type =  this.f.function_type.value;
      if(this.function_type == "A-Add"){
        // check if code exists
        this.params = new HttpParams()
        .set('int_tbl_code',this.int_tbl_code);
        this.subscription = this.hitcmAPI.checkHitcm(this.params).subscribe(res=>{
          // not available else proceed
        this.hitcmAPI.changeMessage(this.formData.value)
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hitcm/data/view'));
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
        this.hitcmAPI.changeMessage(this.formData.value)
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/interest/hitcm/data/view'));
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
