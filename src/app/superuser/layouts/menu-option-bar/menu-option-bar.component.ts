import { HttpClient } from '@angular/common/http';
import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { TokenStorageService } from 'src/@core/AuthService/token-storage.service';

@Component({
  selector: 'app-menu-option-bar',
  templateUrl: './menu-option-bar.component.html',
  styleUrls: ['./menu-option-bar.component.scss']
})
export class MenuOptionBarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  function_type: any;
  isRequired = false;
  function_type_data: any;
  subscription!:Subscription;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private tokenStorage: TokenStorageService,
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
  eventTypeArray: any = [
    'ACSK','AHJA','uKKAA','AKAKAKA'
  ]
  event_type = "";
  event_id = "";
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    event_type: [this.event_type, [Validators.required]],
    event_id: ['', [Validators.required]]
  });


  addEventId(){
    this.ngZone.run(() => this.router.navigateByUrl('system/event_id'));
  }



      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }

  onSubmit(){
    console.log("form data", this.formData.value)
    this.loading = true;
    this.submitted = true;
    if(this.formData.valid){
    this.function_type = this.f.function_type.value;
    this.function_type_data = this.f.function_type.value;
    this.event_type =  this.f.event_type.value;
    this.event_id =  this.f.event_id.value;
    // this.dialogRef.close({ event: 'close', data:this.formData.value });
    this.ngZone.run(() => this.router.navigateByUrl('system/event_id_module/'+this.function_type_data+'/'+this.event_type+'/'+this.event_id));

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
