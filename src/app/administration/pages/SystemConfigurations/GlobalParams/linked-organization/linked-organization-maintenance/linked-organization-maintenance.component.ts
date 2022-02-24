import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { LinkedOrganizationLookupComponent } from '../linked-organization-lookup/linked-organization-lookup.component';
import { LinkedorganizationService } from '../linkedorganization.service';

@Component({
  selector: 'app-linked-organization-maintenance',
  templateUrl: './linked-organization-maintenance.component.html',
  styleUrls: ['./linked-organization-maintenance.component.scss']
})
export class LinkedOrganizationMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  showOrganizationId = true;
  organization_id: any;
  organization_name: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private linkedOrganizationAPI: LinkedorganizationService,
    private eventIdAPI:EventIdService,
    // public dialogRef: MatDialogRef<EventIdMaintenanceComponent>,
    // @Optional() @Inject(MAT_DIALOG_DATA) public data: any

    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]
  
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    organization_id: ['', [Validators.required]],
  });

  organizationLookup(): void {
    const dialogRef = this.dialog.open(LinkedOrganizationLookupComponent, {
      height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.organization_id = result.data;
      this.organization_name = this.organization_id.organization_name
      this.formData.controls.organization_id.setValue(result.data);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.showOrganizationId = true;
      this.formData.controls.organization_id.setValue("")
      this.formData.controls.organization_id.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.showOrganizationId = false;;
      this.formData.controls.organization_id.setValidators([])
      this.formData.controls.organization_id.setValue("");
    }
  }
  addEventId(){
    this.ngZone.run(() => this.router.navigateByUrl('system/event_id'));
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
    this.linkedOrganizationAPI.changeMessage(this.formData.value)
    this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/linked/organization/data/view'));
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
