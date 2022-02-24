import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/Service/token-storage.service';
import { LinkedorganizationService } from '../../linked-organization/linkedorganization.service';
import { LinkedOrganizationLookupComponent } from '../../linked-organization/linked-organization-lookup/linked-organization-lookup.component';
import { SchemeTypeService } from '../scheme-type.service';
import { SchemeTypeLookupComponent } from '../scheme-type-lookup/scheme-type-lookup.component';

@Component({
  selector: 'app-scheme-type-maintenance',
  templateUrl: './scheme-type-maintenance.component.html',
  styleUrls: ['./scheme-type-maintenance.component.scss']
})
export class SchemeTypeMaintenanceComponent implements OnInit {
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
  showFormGroup = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private schemeTypeAPI:  SchemeTypeService,

    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    scheme_type: ['', [Validators.required]],
    lookupData: ['']
  });

  schemeTypeLookup(): void {
    const dialogRef = this.dialog.open(SchemeTypeLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.scheme_type = this.lookupData.scheme_type;
      this.scheme_type_id = this.lookupData.id;
      this.formData.controls.scheme_type.setValue(this.scheme_type);
      this.formData.controls.lookupData.setValue(this.lookupData);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.showFormGroup= true;
      this.formData.controls.scheme_type.setValue("")
      this.formData.controls.scheme_type.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.showFormGroup= false;
      this.formData.controls.scheme_type.setValidators([])
      this.formData.controls.scheme_type.setValue("");
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
    this.schemeTypeAPI.changeMessage(this.formData.value)
    this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/scheme-type/data/view'));
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
