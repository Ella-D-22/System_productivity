import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlCodeLookupComponent } from '../../SystemConfigurations/GlobalParams/gl-code/gl-code-lookup/gl-code-lookup.component';
import { BranchesLookupComponent } from '../branches-lookup/branches-lookup.component';
import { BranchesService } from '../branches.service';

@Component({
  selector: 'app-branches-maintenance',
  templateUrl: './branches-maintenance.component.html',
  styleUrls: ['./branches-maintenance.component.scss']
})
export class BranchesMaintenanceComponent implements OnInit {
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
  glCode: any;
  glDescription: any;
  solCode: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private branchAPI:BranchesService,
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
    solCode: [''],
  });
  branchesCodeLookup(): void {
    const dialogRef = this.dialog.open(BranchesLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.solCode = this.lookupData.solCode;
      this.glDescription = this.lookupData.glDescription;
      this.formData.controls.solCode.setValue(this.solCode);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.solCode.setValue("")
      this.formData.controls.solCode.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.existingData = false;;
      this.formData.controls.solCode.setValidators([])
      this.formData.controls.solCode.setValue("");
    }
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
  onSubmit(){
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
    this.branchAPI.changeMessage(this.formData.value)
    this.ngZone.run(() => this.router.navigateByUrl('system/branches/data/view'));
  }else{
    this.ngZone.run(() => this.router.navigateByUrl('system/branches/data/view'));
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
