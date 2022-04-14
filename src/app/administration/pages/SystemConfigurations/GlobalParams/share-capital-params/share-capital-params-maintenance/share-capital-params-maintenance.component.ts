import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareCapitalParamsService } from '../share-capital-params.service';

@Component({
  selector: 'app-share-capital-params-maintenance',
  templateUrl: './share-capital-params-maintenance.component.html',
  styleUrls: ['./share-capital-params-maintenance.component.scss']
})
export class ShareCapitalParamsMaintenanceComponent implements OnInit {
  existingData: boolean;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private actRoute: ActivatedRoute,
    private shareCapitalParams: ShareCapitalParamsService,
    private dialog: MatDialog,
    ) { }
  ngOnInit(): void {
  }
  loading = false;
  submitted = false;
  functionArray: any = [
    'A-Add','I-Inquire','V-Verify','X-Delete'
  ]
  formData = this.fb.group({
    function_type: ['', [Validators.required]],
    id: [''],
  });
  onSelectFunction(event:any){
    if(event.target.value != "A-Add"){
      this.existingData = true;
    }else if(event.target.value == "A-Add"){
      this.existingData = false;
    }
  }
      // convenience getter for easy access to form fields
      get f() { return this.formData.controls; }
      onSubmit(){
        this.loading = true;
        this.submitted = true;
        if(this.formData.valid){
        this.shareCapitalParams.changeMessage(this.formData.value)
        this.ngZone.run(() => this.router.navigateByUrl('system/configurations/global/share-capital/params'));
      }else{
        this.loading = false;
        this._snackBar.open("Invalid Form Data", "Try again!", {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
        });
      }
      }

}
