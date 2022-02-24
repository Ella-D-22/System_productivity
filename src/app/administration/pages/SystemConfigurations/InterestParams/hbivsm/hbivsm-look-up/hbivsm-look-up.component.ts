import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { LinkedEventIdLookupComponent } from '../../../ChargesParams/event-id/linked-event-id-lookup/linked-event-id-lookup.component';
import { HitcmService } from '../../hitcm/hitcm.service';
import { HbivsmService } from '../hbivsm.service';

@Component({
  selector: 'app-hbivsm-look-up',
  templateUrl: './hbivsm-look-up.component.html',
  styleUrls: ['./hbivsm-look-up.component.scss']
})
export class HbivsmLookUpComponent implements OnInit {
  subscription!:Subscription;
  fromDialog: any;

  results: any;
  constructor(
    public dialogRef: MatDialogRef<LinkedEventIdLookupComponent>,
    private hbivsmAPI: HbivsmService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.hbivsmAPI.gethbivsms().subscribe(res=>{
      this.results = res;
    })

  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}


