import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { EventTypeLookupComponent } from '../../event-type/event-type-lookup/event-type-lookup.component';
import { LinkedEventIdLookupComponent } from '../linked-event-id-lookup/linked-event-id-lookup.component';

@Component({
  selector: 'app-event-id-maintenance',
  templateUrl: './event-id-maintenance.component.html',
  styleUrls: ['./event-id-maintenance.component.scss']
})
export class EventIdMaintenanceComponent implements OnInit {
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
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private eventIdAPI:EventIdService,
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

  event_id = "";
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    event_type: ['', [Validators.required]],
    event_type_data:[''],
    event_id: ['', [Validators.required]]
  });

  eventType(): void {
    const dialogRef = this.dialog.open(EventTypeLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_description  = result.data.description
      this.formData.controls.event_type.setValue(result.data.code);
      this.formData.controls.event_type_data.setValue(result.data);

    });
  }
  eventId(): void {
    const dialogRef = this.dialog.open(LinkedEventIdLookupComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data;
      this.formData.controls.event_id.setValue(result.data);
    });
  }

  onChange(state:any){
    this.function_type = state.target.value;
    switch(this.function_type){
      case "1: add":
        this.addEventId();
        break;
      case "2: enquire":
          break;
      case "3: update":
            break;
      case "4: remove":
          break;
    }
  }
  addEventId(){
    this.ngZone.run(() => this.router.navigateByUrl('system/event_id'));
  }
        // convenience getter for easy access to form fields
        get f() { return this.formData.controls; }

        onSubmit(){
          console.log(this.formData.value)
          this.loading = true;
          this.submitted = true;
          if(this.formData.valid){
            // this.int_tbl_code = this.f.int_tbl_code.value;
            this.function_type =  this.f.function_type.value;
            if(this.function_type == "A-Add"){
              // console.log("found here", this.int_tbl_code)
              // check if code exists
              // this.params = new HttpParams()
              // .set('int_tbl_code',this.int_tbl_code);
              this.subscription = this.eventIdAPI.checkExistence(this.formData.value).subscribe(res=>{
                // not available else proceed
              this.eventIdAPI.changeMessage(this.formData.value)
             this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-id/data/view'));
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
              this.eventIdAPI.changeMessage(this.formData.value)
              // this.dialogRef.close({ event: 'close', data:this.formData.value });
             this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-id/data/view'));
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
