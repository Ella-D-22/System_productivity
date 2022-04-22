import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MainClassificationMaintenanceComponent } from '../main-classification-maintenance/main-classification-maintenance.component';
import { MainClassificationService } from '../main-classification.service';

@Component({
  selector: 'app-main-classification-lookup',
  templateUrl: './main-classification-lookup.component.html',
  styleUrls: ['./main-classification-lookup.component.scss']
})
export class MainClassificationLookupComponent implements OnInit {

  fromDialog: any;
  subscription!:Subscription;
  mainData: any;
  constructor(
    public dialogRef: MatDialogRef<MainClassificationMaintenanceComponent>,
    private mainAPI:MainClassificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.mainAPI.getAllMainClassifications().subscribe(res=>{
      this.mainData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
