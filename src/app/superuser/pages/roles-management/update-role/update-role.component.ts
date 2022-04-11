import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { BranchesLookupComponent } from 'src/app/administration/pages/branches/branches-lookup/branches-lookup.component'

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  lookupData: any;
  solCode: any;
  loading = false;
  subscription!: Subscription;
  error: string;
  results: any;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authService: AuthService,    
    private actRoute: ActivatedRoute,

  ) { }
  ngOnInit(): void {
    this.getData()
  }
   password = Math.random().toString(36).slice(-8);

  formData = this.fb.group({          
      sn: ['', [Validators.required]],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: [this.password],
      email: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      createdOn: ['', [Validators.required]],
      solCode: ['', [Validators.required]],
      modifiedBy: ['', [Validators.required]],
      modifiedOn: ['', [Validators.required]],
      verifiedBy: ['', [Validators.required]],
      deleteFlag: ['', [Validators.required]],
      firstLogin: ['', [Validators.required]],
      acctActive: ['', [Validators.required]],
      acctLocked: ['', [Validators.required]],
  });
  getData(){
   const username = this.actRoute.snapshot.paramMap.get('username');  
   this.subscription = this.authService.getUserByUsername(username).subscribe(res=>{
     this.results = res;
     this.formData = this.fb.group({ 
      sn: [this.results.sn],
      username: [this.results.username],
      firstName: [this.results.firstName],
      lastName: [this.results.lastName],
      password: [this.password],
      email: [this.results.email],
      phoneNo: [this.results.phoneNo],
      createdOn: [this.results.createdOn],
      solCode: [this.results.solCode],
      modifiedBy: [this.results.modifiedBy],
      modifiedOn: [this.results.modifiedOn],
      verifiedBy: [this.results.verifiedBy],
      deleteFlag: [this.results.deleteFlag],
      firstLogin: [this.results.firstLogin],
      acctActive: [this.results.acctActive],
      acctLocked: [this.results.acctLocked],
  });
   }, err=>{
     this.error = err;
    this._snackBar.open(this.error, "Try again!", {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['red-snackbar','login-snackbar'],
    });

   })
  }

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
    this.subscription = this.authService.updateUser(this.formData.value).subscribe(res=>{
      this._snackBar.open("Successfull!", "X", {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['green-snackbar','login-snackbar'],
      });
      this.loading = false;
      // /superuser/manage/user
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


