import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GroupLendingLookupComponent } from '../group-lending-lookup/group-lending-lookup.component';
import { GroupLendingService } from '../group-lending.service';

@Component({
  selector: 'app-group-lending-maintenance',
  templateUrl: './group-lending-maintenance.component.html',
  styleUrls: ['./group-lending-maintenance.component.scss']
})
export class GroupLendingMaintenanceComponent implements OnInit {
  dialogData: any
  function_type: any
  dataExist = false;
  submitted = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  group_name: any;
  mainGroupCode: any;
  mainGroupName: any;
  mainGroupId: any;
  constructor(
    private groupLendingAPI: GroupLendingService,
    private router: Router,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  functionArray: any = [
    'A-Add', 'I-Inquire', 'M-Modify', 'V-Verify', 'X-Delete'
  ]
  formData = this.fb.group({
    function_type: [''],
    groupId: [''],
    groupCode: ['', [Validators.required]],
    groupName: ['', [Validators.required]],
  })
  get f() {
    return this.formData.controls;
  }
  onSelectFunction(event: any) {
    if (event.target.value == "A-Add") {
      this.dataExist = false;
      // this.formData.controls.groupCode.setValue("")
      // this.formData.controls.groupCode.setValidators([Validators.required])
    } else if (event.target.value != "A-Add") {
      this.dataExist = true;
      // this.formData.controls.groupCode.setValue("")
      // this.formData.controls.groupCode.setValidators([Validators.required])
    }
  }
  groupLookup(): void {
    const dialogRef = this.dialog.open(GroupLendingLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(results => {
      this.dialogData = results.data;
      this.formData.controls.groupId.setValue(results.data.groupId)
      this.formData.controls.groupCode.setValue(results.data.groupCode)
      this.formData.controls.groupName.setValue(results.data.groupName)
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.formData.valid) {
      this.groupLendingAPI.changeMessage(this.formData.value)
      if (this.function_type == 'A-Add') {
        this.router.navigate([`/system/group-lending/data/view`], { skipLocationChange: true });
      } else if (this.function_type != 'A-Add') {
        this.router.navigate([`/system/group-lending/data/view`], { skipLocationChange: true });
      }
    } else {
      this._snackbar.open("Invalid form data", "Try Again", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar']
      })
    }
  }
}
