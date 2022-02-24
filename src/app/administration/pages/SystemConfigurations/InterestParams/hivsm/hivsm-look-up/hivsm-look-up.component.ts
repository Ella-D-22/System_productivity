import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HivsmService } from '../hivsm.service';

@Component({
  selector: 'app-hivsm-look-up',
  templateUrl: './hivsm-look-up.component.html',
  styleUrls: ['./hivsm-look-up.component.scss']
})
export class HivsmLookUpComponent implements OnInit {
  fromDialog: any;
  subscription!:Subscription;
  chrgPrefData: any;
  constructor(
    public dialogRef: MatDialogRef<HivsmLookUpComponent>,
    private hivsmAPI: HivsmService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.hivsmAPI.getHivsms().subscribe(res=>{
      this.chrgPrefData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}