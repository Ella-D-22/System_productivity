import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlSubheadLookupComponent } from '../gl-subhead-lookup/gl-subhead-lookup.component';
import { GlSubheadService } from '../gl-subhead.service';

@Component({
  selector: 'app-gl-subhead-maintenance',
  templateUrl: './gl-subhead-maintenance.component.html',
  styleUrls: ['./gl-subhead-maintenance.component.scss']
})
export class GlSubheadMaintenanceComponent implements OnInit {
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
  ref_code: any;
  existingData = false;
  code = 0;
  glSubheadCode: any;     
  glDescription: any;
  glSubheadDescription: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private glSubheadCodeAPI: GlSubheadService
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
    glSubheadCode: ['']
  });
  refCodeLookup(): void {
    const dialogRef = this.dialog.open(GlSubheadLookupComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.glSubheadCode = this.lookupData.glSubheadCode;
      this.glSubheadDescription = this.lookupData.glSubheadDescription;
      this.formData.controls.glSubheadCode.setValue(this.glSubheadCode);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.glSubheadCode.setValue("")
      this.formData.controls.glSubheadCode.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.existingData = false;;
      this.formData.controls.glSubheadCode.setValidators([])
      this.formData.controls.glSubheadCode.setValue("");
    }
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
  onSubmit(){
    console.log(this.formData.value);
    
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
    this.glSubheadCodeAPI.changeMessage(this.formData.value)
    this.router.navigate(['system/configurations/global/gl-subhead/data/view'], {skipLocationChange:true})
  }else{
    this.router.navigate(['system/configurations/global/gl-subhead/data/view'], {skipLocationChange:true})
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
