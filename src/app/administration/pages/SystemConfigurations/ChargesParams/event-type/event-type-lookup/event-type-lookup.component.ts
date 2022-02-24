import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EventTypeService } from '../event-type.service';

@Component({
  selector: 'app-event-type-lookup',
  templateUrl: './event-type-lookup.component.html',
  styleUrls: ['./event-type-lookup.component.scss']
})
export class EventTypeLookupComponent implements OnInit {
  fromDialog: any;
  subscription!:Subscription;
  eventTypeData: any;
  constructor(
    public dialogRef: MatDialogRef<EventTypeLookupComponent>,
    private evenettypeAPI: EventTypeService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.evenettypeAPI.getEventTypes().subscribe(res=>{
      this.eventTypeData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
