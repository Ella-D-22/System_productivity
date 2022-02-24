import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LinkedorganizationService } from '../linkedorganization.service';

@Component({
  selector: 'app-linked-organization-lookup',
  templateUrl: './linked-organization-lookup.component.html',
  styleUrls: ['./linked-organization-lookup.component.scss']
})
export class LinkedOrganizationLookupComponent implements OnInit {
  fromDialog: any;
  subscription!:Subscription;
  organizationData: any;
  constructor(
    public dialogRef: MatDialogRef<LinkedOrganizationLookupComponent>,
    private linkedOrgAPI: LinkedorganizationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.linkedOrgAPI.getLinkedorganizations().subscribe(res=>{
      this.organizationData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
