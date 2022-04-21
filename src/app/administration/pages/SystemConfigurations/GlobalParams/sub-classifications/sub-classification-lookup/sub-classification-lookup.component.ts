import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SubClassificationMaintenanceComponent } from '../sub-classification-maintenance/sub-classification-maintenance.component';
import { SubClassificationService } from '../sub-classification.service';

@Component({
  selector: 'app-sub-classification-lookup',
  templateUrl: './sub-classification-lookup.component.html',
  styleUrls: ['./sub-classification-lookup.component.scss']
})
export class SubClassificationLookupComponent implements OnInit {

  
  fromDialog: any;
  subscription!:Subscription;
  subData: any;
  constructor(
    public dialogRef: MatDialogRef<SubClassificationMaintenanceComponent>,
    private subAPI:SubClassificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.subAPI.getAllSubClassifications().subscribe(res=>{
      this.subData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }


}
