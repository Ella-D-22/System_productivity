import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MisSubSectorComponent } from '../mis-sub-sector.component';
import { MisSubSectorService } from '../mis-sub-sector.service';

@Component({
  selector: 'app-mis-sub-sector-lookup',
  templateUrl: './mis-sub-sector-lookup.component.html',
  styleUrls: ['./mis-sub-sector-lookup.component.scss']
})
export class MisSubSectorLookupComponent implements OnInit {

 
  fromDialog: any;
  subscription!:Subscription;
  subSectorData: any;
  constructor(
    public dialogRef: MatDialogRef<MisSubSectorComponent>,
    private subSectorAPI:MisSubSectorService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.subSectorAPI.getSubSector().subscribe(res=>{
      this.subSectorData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }


}
