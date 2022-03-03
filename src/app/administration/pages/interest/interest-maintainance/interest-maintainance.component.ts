import { Interest } from '../interfaces/interest';
import {InterestService} from '../interest.service'
import { InterestLookupComponent } from '../interest-lookup/interest-lookup.component';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interest-maintainance',
  templateUrl: './interest-maintainance.component.html',
  styleUrls: ['./interest-maintainance.component.css']
})
export class InterestMaintainanceComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any='A-Add';

  loading = false;
  submitted = false;

  functionArray: any = [
    'A-Add','I-Inquire','M-Modify','V-Verify','X-Cancel'
  ]

  interestTabIndex: number = 1 ;
  interestCode: string;

  constructor(private router: Router,private interestService: InterestService,private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  
  onTabClick(value: any){
    // this.interestTabIndex = value.target.value;
    this.function_type= value.target.value;
    
 }
 
 navigate(){
     this.router.navigate(['system/interest/data/view'], {
       state:{
         code : this.interestCode,
         type: this.function_type
       }
     });
 }
 
 interestLookup(): void {
   const cdialogRef = this.dialog.open(InterestLookupComponent, {
     height: '400px',
     width: '600px',
   });
   cdialogRef.afterClosed().subscribe((result) => {
     console.log(result.data);
     this.interestCode = result.data.interestCode;
   });
 }

}
