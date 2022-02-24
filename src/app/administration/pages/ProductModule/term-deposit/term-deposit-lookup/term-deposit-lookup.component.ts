import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';
import { LinkedEventIdLookupComponent } from '../../../SystemConfigurations/ChargesParams/event-id/linked-event-id-lookup/linked-event-id-lookup.component';
import { HitcmService } from '../../../SystemConfigurations/InterestParams/hitcm/hitcm.service';

@Component({
  selector: 'app-term-deposit-lookup',
  templateUrl: './term-deposit-lookup.component.html',
  styleUrls: ['./term-deposit-lookup.component.scss']
})
export class TermDepositLookupComponent implements OnInit {
  subscription!:Subscription;
  fromDialog: any;

  results: any;
  constructor(
    public dialogRef: MatDialogRef<LinkedEventIdLookupComponent>,
    private hitcmAPI: HitcmService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.hitcmAPI.getHitcms().subscribe(res=>{
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


