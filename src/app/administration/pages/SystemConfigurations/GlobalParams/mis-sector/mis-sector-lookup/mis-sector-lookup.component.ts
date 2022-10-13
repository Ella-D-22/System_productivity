import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MisSectorComponent } from '../mis-sector.component';
import { MisSectorService } from '../mis-sector.service';

@Component({
  selector: 'app-mis-sector-lookup',
  templateUrl: './mis-sector-lookup.component.html',
  styleUrls: ['./mis-sector-lookup.component.scss']
})
export class MisSectorLookupComponent implements OnInit {

  fromDialog: any;
  subscription!:Subscription;
  misData: any;
  constructor(
    public dialogRef: MatDialogRef<MisSectorComponent>,
    private sectorAPI:MisSectorService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.sectorAPI.getAllMissectors().subscribe(res=>{
      this.misData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
