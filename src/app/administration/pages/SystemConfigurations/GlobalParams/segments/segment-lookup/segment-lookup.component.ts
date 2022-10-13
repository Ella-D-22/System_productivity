import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SegmentMaintenanceComponent } from '../segment-maintenance/segment-maintenance.component';
import { SegmentsService } from '../segments.service';

@Component({
  selector: 'app-segment-lookup',
  templateUrl: './segment-lookup.component.html',
  styleUrls: ['./segment-lookup.component.scss']
})
export class SegmentLookupComponent implements OnInit {

  
  fromDialog: any;
  subscription!:Subscription;
  segmentData: any;
  constructor(
    public dialogRef: MatDialogRef<SegmentMaintenanceComponent>,
    private segmentAPI:SegmentsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.segmentAPI.getAllSegments().subscribe(res=>{
      this.segmentData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
