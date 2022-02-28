import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency-lookup',
  templateUrl: './currency-lookup.component.html',
  styleUrls: ['./currency-lookup.component.scss']
})
export class CurrencyLookupComponent implements OnInit {
  fromDialog: any;
  subscription!:Subscription;
  currencyData: any;
  constructor(
    public dialogRef: MatDialogRef<CurrencyLookupComponent>,
    private currencyAPI: CurrencyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.subscription = this.currencyAPI.getCurrencys().subscribe(res=>{
      console.log("Hey data responded", res);
      
      this.currencyData = res;
    })
  }

  onSelect(data:any){
    this.dialogRef.close({ event: 'close', data:data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}

