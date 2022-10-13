import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ChrgPreferentialServiceService } from '../chrg-preferential-service.service';

@Component({
  selector: 'app-chrg-preferential-lookup',
  templateUrl: './chrg-preferential-lookup.component.html',
  styleUrls: ['./chrg-preferential-lookup.component.scss']
})
export class ChrgPreferentialLookupComponent implements OnInit {
  fromDialog: any;
  subscription!:Subscription;
  chrgPrefData: any;
  constructor(
    public dialogRef: MatDialogRef<ChrgPreferentialLookupComponent>,
    private chrgPreferentialAPI: ChrgPreferentialServiceService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.chrgPreferentialAPI.getChrgPreferentials().subscribe(res=>{
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