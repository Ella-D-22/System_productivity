import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router} from '@angular/router';
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
    private _snackBar: MatSnackBar,
    private shareCapitalParams: ShareCapitalParamsService,
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
        this.router.navigate(['system/configurations/global/share-capital/params'], {skipLocationChange:true});
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
