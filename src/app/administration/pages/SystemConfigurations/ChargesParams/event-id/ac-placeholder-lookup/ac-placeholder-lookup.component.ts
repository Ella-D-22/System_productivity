import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ac-placeholder-lookup',
  templateUrl: './ac-placeholder-lookup.component.html',
  styleUrls: ['./ac-placeholder-lookup.component.scss']
})
export class AcPlaceholderLookupComponent implements OnInit {
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
  constructor(
    public dialogRef: MatDialogRef<AcPlaceholderLookupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
