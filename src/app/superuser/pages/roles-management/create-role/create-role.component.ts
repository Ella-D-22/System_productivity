import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { BranchesLookupComponent } from 'src/app/administration/pages/branches/branches-lookup/branches-lookup.component';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  lookupData: any;
  solCode: any;
  loading = false;
  subscription!: Subscription;
  error: string;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
  }
   password = Math.random().toString(36).slice(-8);

  formData = this.fb.group({    
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      modifiedBy: ['N'],
      password: [this.password],
      phoneNo: ['', [Validators.required]],
      solCode: ['', [Validators.required]],
      username: ['', [Validators.required]],
  });

  branchesCodeLookup(): void {
    const dialogRef = this.dialog.open(BranchesLookupComponent, {
      // height: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.lookupData = result.data;
      this.solCode = this.lookupData.solCode;
      this.formData.controls.solCode.setValue(this.solCode);
    });
  }
  onSubmit(){
    this.loading = true;
    this.subscription = this.authService.registerUser(this.formData.value).subscribe(res=>{
      this._snackBar.open("Successfull!", "X", {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      this.loading = false;
    this.ngZone.run(() => this.router.navigateByUrl('superuser/manage/user'));
    },err=>{
      this._snackBar.open(this.error, "Try again!", {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['red-snackbar','login-snackbar'],
      });
      this.loading = false;
    })

  }
}

