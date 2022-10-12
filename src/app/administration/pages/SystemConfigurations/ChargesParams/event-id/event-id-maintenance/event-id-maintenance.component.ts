import { HttpClient} from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';
import { EventTypeLookupComponent } from '../../event-type/event-type-lookup/event-type-lookup.component';
import { EventIdLookupComponent } from '../event-id-lookup/event-id-lookup.component';

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
  event_type_code: any;
  event_id_desc: any;
  existingData: boolean;
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
    event_id: ['', [Validators.required]],
    event_id_desc:[''],
  });
  
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.event_id_desc.disable()
    }else if(event.target.value == "A-Add"){
      this.formData.controls.event_id_desc.enable()
      this.existingData = false;
    }
  }

  eventType(): void {
    const dialogRef = this.dialog.open(EventTypeLookupComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_description  = result.data.description
      this.event_type_code = result.data.code
      this.formData.controls.event_type.setValue(result.data.code);
      this.formData.controls.event_type_data.setValue(result.data);
    });
  }
  eventId(): void {
    const dialogRef = this.dialog.open(EventIdLookupComponent , {
     
    });
    dialogRef.afterClosed().subscribe(result => {
      this.event_id = result.data.event_id;
      this.event_id_desc = result.data.event_id_desc;
      this.formData.controls.event_id.setValue(result.data);
      this.formData.controls.event_type.setValue(result.data.event_type);
    });
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
