import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SubSegmentMaintenanceComponent } from '../sub-segment-maintenance/sub-segment-maintenance.component';
import { SubSegmentService } from '../sub-segment.service';

@Component({
  selector: 'app-sub-segment-lookup',
  templateUrl: './sub-segment-lookup.component.html',
  styleUrls: ['./sub-segment-lookup.component.scss']
})
export class SubSegmentLookupComponent implements OnInit {

 
  fromDialog: any;
  subscription!:Subscription;
  subSegmentData: any;
  constructor(
    public dialogRef: MatDialogRef<SubSegmentMaintenanceComponent>,
    private subSegmentAPI:SubSegmentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.subSegmentAPI.getAllSubSegment().subscribe(res=>{
      this.subSegmentData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
