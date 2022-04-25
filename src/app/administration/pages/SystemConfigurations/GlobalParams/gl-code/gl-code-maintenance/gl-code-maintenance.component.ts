import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlCodeLookupComponent } from '../gl-code-lookup/gl-code-lookup.component';
import { GlCodeService } from '../gl-code.service';

@Component({
  selector: 'app-gl-code-maintenance',
  templateUrl: './gl-code-maintenance.component.html',
  styleUrls: ['./gl-code-maintenance.component.scss']
})
export class GlCodeMaintenanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  classification: any;
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
  results: any;
  error: any;
  verifyformData: any;
  deleteformData: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private glcodeAPI:GlCodeService,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Delete'
  ]
  classificationArray: any = [
    'ASSETS','LIABILITIES','INCOMES','EXPENSES'
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    glCode: [''],
    classification: ['']
  });



  refCodeLookup(): void {
    const dialogRef = this.dialog.open(GlCodeLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.glCode = this.lookupData.glCode;
      this.glDescription = this.lookupData.glDescription;
      this.formData.controls.glCode.setValue(this.glCode);
    });
  }
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
      this.formData.controls.glCode.setValue("")
      this.formData.controls.glCode.setValidators([Validators.required])
    }else if(event.target.value == "A-Add"){
      this.existingData = false;
      this.formData.controls.glCode.setValidators([])
      this.formData.controls.glCode.setValue("");
    }
  }

  onClassificationFunction(event:any){

  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

      onVerify(){

        this.subscription = this.glcodeAPI.getGlcodeByCode(this.glCode).subscribe(res=>{
          this.results = res;
          this.verifyformData = this.fb.group({
            deleteFlag: [this.results.entity.deleteFlag],
            deletedBy: [this.results.entity.deletedBy],
            deletedTime: [this.results.entity.deletedTime],
            glCode: [this.results.entity.glCode],
            glDescription: [this.results.entity.glDescription],
            modifiedBy: [this.results.entity.modifiedBy],
            modifiedTime: [this.results.entity.modifiedTime],
            postedBy: [this.results.entity.postedBy],
            postedFlag: [this.results.entity.postedFlag],
            postedTime: [this.results.entity.postedTime],
            sn: [this.results.entity.sn],
            verifiedBy: [this.results.entity.verifiedBy],
            verifiedFlag: ["Y"],
            // verifiedTime: [this.results.entity.verifiedTime]
          });
          // call to update the data
          this.subscription = this.glcodeAPI.updateGlcode(this.verifyformData.value).subscribe(res=>{
            this.results = res;
            this.loading = false;

              this._snackBar.open( this.results.message, "X", {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar','login-snackbar'],
              });

          },err=>{
            this.error = err;
            this.loading = false;
            this._snackBar.open(this.error, "Try again!", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
          })

        }, err=>{
          this.error = err;
            this._snackBar.open(this.error, "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
        })
      }

      onDelete(){
        this.subscription = this.glcodeAPI.getGlcodeByCode(this.glCode).subscribe(res=>{
          this.results = res;
          this.deleteformData = this.fb.group({
            deleteFlag: ["Y"],
            deletedBy: [this.results.entity.deletedBy],
            deletedTime: [this.results.entity.deletedTime],
            glCode: [this.results.entity.glCode],
            glDescription: [this.results.entity.glDescription],
            modifiedBy: [this.results.entity.modifiedBy],
            modifiedTime: [this.results.entity.modifiedTime],
            postedBy: [this.results.entity.postedBy],
            postedFlag: [this.results.entity.postedFlag],
            postedTime: [this.results.entity.postedTime],
            sn: [this.results.entity.sn],
            verifiedBy: [this.results.entity.verifiedBy],
            verifiedFlag: [this.results.entity.verifiedFlag],
            // verifiedTime: [this.results.entity.verifiedTime]
          });
          // call to update the data
                    // this.formData.controls.glCode.disable();
                    this.subscription = this.glcodeAPI.updateGlcode(this.deleteformData.value).subscribe(res=>{
                      this.results = res;
                      this.loading = false;

                        this._snackBar.open( this.results.message, "X", {
                          horizontalPosition: this.horizontalPosition,
                          verticalPosition: this.verticalPosition,
                          duration: 3000,
                          panelClass: ['green-snackbar','login-snackbar'],
                        });

                    },err=>{
                      this.error = err;
                      this.loading = false;
                      this._snackBar.open(this.error, "Try again!", {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: 3000,
                        panelClass: ['red-snackbar','login-snackbar'],
                      });
                    })


        }, err=>{
          this.error = err;
            this._snackBar.open(this.error, "X", {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['red-snackbar','login-snackbar'],
            });
        })
      }

  onSubmit(){
    this.loading = true;
    this.submitted = true;
    this.function_type = this.formData.controls.function_type.value

    if(this.formData.valid){
      if(this.function_type == "V-Verify"){
        // call to update verify flag
        this.onVerify();
        // update

      }
      if(this.function_type == "X-Delete"){
        // call to update delete flag
        this.onDelete()
        console.log("got called for delete");

      }else{
        this.glcodeAPI.changeMessage(this.formData.value)
        this.router.navigate(['system/configurations/global/gl-code/data/view'], {skipLocationChange:true})
      }
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
