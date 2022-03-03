import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { EventTypeLookupComponent } from '../event-type-lookup/event-type-lookup.component';
import { EventTypeService } from '../event-type.service';

@Component({
  selector: 'app-event-type-maintenance',
  templateUrl: './event-type-maintenance.component.html',
  styleUrls: ['./event-type-maintenance.component.scss']
})
export class EventTypeMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  showOrganizationId = true;
  description!: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private eventTypeAPI:EventTypeService,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  eventtype_code = "";
  eventlookupres:any;
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    eventtype_code: [this.eventtype_code, [Validators.required]],
  });

  eventTypeLookup(): void {
    const dialogRef = this.dialog.open(EventTypeLookupComponent, {
     
    });
    dialogRef.afterClosed().subscribe(result => {
      this.eventlookupres = result.data;
      this.description = this.eventlookupres.description
      this.eventtype_code = this.eventlookupres.code
      this.formData.controls.eventtype_code.setValue(result.data);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.showOrganizationId = true;
      this.formData.controls.eventtype_code.setValue("")
      this.formData.controls.eventtype_code.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.showOrganizationId = false;;
      this.formData.controls.eventtype_code.setValue("?");
      this.formData.controls.eventtype_code.setValidators([])
    }
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
        onSubmit(){
          console.log("form data", this.formData.value)
          this.loading = true;
          this.submitted = true;
          if(this.formData.valid){
          this.eventTypeAPI.changeMessage(this.formData.value)
          this.ngZone.run(() => this.router.navigateByUrl('system/configurations/charge/event-type/data/view')); 
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
