import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventIdService } from 'src/app/administration/pages/SystemConfigurations/ChargesParams/event-id/event-id.service';

@Component({
  selector: 'app-linked-event-id-lookup',
  templateUrl: './linked-event-id-lookup.component.html',
  styleUrls: ['./linked-event-id-lookup.component.scss']
})
export class LinkedEventIdLookupComponent implements OnInit {
  subscription!:Subscription;
  fromDialog: any;
  accountsArray: any = [
         {id:'ACCLS', description:'Account closure'},
         {id:'ACMNT', description:'Account maintenance'},
         {id:'ACOPN', description:'Account opening'},
         {id:'BGADD', description:'Bank Guarantee Issue'},
         {id:'BGREV', description:'Bank Guarantee Reversal'},
         {id:'BGINV', description:'Bank Guarantee Invocation'},
         {id:'BGMOD', description:'Bank Guarantee Amendment'},
         {id:'BGDUE', description:'BG Overdue Charges'},
         {id:'BGMIS', description:'BG Miscellaneous Charges'},
         {id:'BIDEF', description:'Loan Bank Deferment Charges'}
  ]
  results: any;
  constructor(
    public dialogRef: MatDialogRef<LinkedEventIdLookupComponent>,
    private eventIdAPI: EventIdService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.eventIdAPI.getEventIds().subscribe(res=>{
      this.results = res;
      console.log("data records", this.results)
    })

  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}

