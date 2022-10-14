import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MisSectorLookupComponent } from '../../mis-sector/mis-sector-lookup/mis-sector-lookup.component';
import { MisSubSectorLookupComponent } from '../mis-sub-sector-lookup/mis-sub-sector-lookup.component';
import { MisSubSectorService } from '../mis-sub-sector.service';

@Component({
  selector: 'app-mis-sub-sector-maintenance',
  templateUrl: './mis-sub-sector-maintenance.component.html',
  styleUrls: ['./mis-sub-sector-maintenance.component.scss']
})
export class MisSubSectorMaintenanceComponent implements OnInit {
  submitted = false;
  loading = false;
  function_type: any;
  showSubSectorId: any;
  dialogData: any;
  miscode: any;
  missubcode: any;
  subSectorId = false;
  showMisCode = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder,
    private SubSectorAPI: MisSubSectorService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  formData = this.fb.group({
    function_type: [''],
    miscode: [''],
    missubcode: [''],
    missector_id: ['']
  })
  functionArray: any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ];
  get f() {
    return this.formData.controls;
  }

  SectorLookup(): void {
    const dialogRef = this.dialog.open(MisSectorLookupComponent, {
      width: '35%',
    });
    dialogRef.afterClosed().subscribe(results => {
      this.dialogData = results
      // this.miscode = this.dialogData.miscode
      // console.log("data", results);
      // this.formData.controls.miscode.setValue(results.data.miscode)
      // this.formData.controls.missector_id.setValue(results.data.id)
    })
  }
  subSectorLookup(): void {
    const dialogRef = this.dialog.open(MisSubSectorLookupComponent, {
      width: '35%'

    });
    dialogRef.afterClosed().subscribe(results => {
      this.dialogData = results;
      // this.subSectorId = this.dialogData.id
      // this.missubcode = this.dialogData.missubcode
      // this.formData.controls.missubcode.setValue(results.missubcode)
    })
  }
  onFunctionSelection(event: any) {
    if (event.target.value != "A-Add") {
      this.showSubSectorId = true;
      this.showMisCode = false;
    } else if (event.target.value == "A-Add") {
      this.showMisCode = true;
      this.showSubSectorId = false;
    }
  }
  onSubmit() {
    console.log("Form Data", this.formData.value);
    this.loading = true;
    this.submitted = true
    if (this.formData.valid) {
      this.SubSectorAPI.changeMessage(this.formData.value)
      if (this.function_type == "Add") {
        this.router.navigate(["system/configurations/global/mis-sub-sector"], { skipLocationChange: true })
      } else if (this.function_type != "A-Add") {
        this.router.navigate(["system/configurations/global/mis-sub-sector"], { skipLocationChange: true })
      }
    } else {
      this.loading = false;
      this._snackbar.open("Invalid form data", "Try Again", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar']
      })
    }
  }
}
