import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-param-add',
  templateUrl: './param-add.component.html',
  styleUrls: ['./param-add.component.scss']
})
export class ParamAddComponent implements OnInit {
  param: any;
  acceptMinors!: string
  checkWithCreditBureau!: string
  minorMinimumAge!: number
  registrationFee!: number

  constructor(private customerservice:CustomerService ) {
    this.param={}
   }

  ngOnInit(): void {
  }

  paramSave(){
    this.param.acceptMinors=this.acceptMinors
    this.param.checkWithCreditBureau=this.checkWithCreditBureau
    this.param.minorMinimumAge=this.minorMinimumAge
    this.param.registrationFee=this.registrationFee
    this.customerservice.createParam(this.param).subscribe(
      (data)=>{
console.log("works");

      },
      (error)=>{
        console.log("error");
      }
    )
  }

}
