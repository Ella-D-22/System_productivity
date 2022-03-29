import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GuarantosService } from './guarantos.service';

@Component({
  selector: 'app-guarantos',
  templateUrl: './guarantos.component.html',
  styleUrls: ['./guarantos.component.scss']
})
export class GuarantosComponent implements OnInit {
  subscription!:Subscription;
  resData: any;

  constructor(
    private fb:FormBuilder,
    private guarantorAPI: GuarantosService,
    ) { }

  ngOnInit(): void {
    this.guarantorAPI.getTermDeposits();
  }
  formData = this.fb.group({
    check_cust_activeness: [''],
    check_cust_guarantee_active_no: [''],
    check_cust_loan_status: [''],
    check_cust_shares_qualification: [''],
    check_cust_subsequent_guarantee_status:[''],
    deletedBy: [''],
    deletedFlag: [''],
    deletedTime: [''],
    id: [''],
    modifiedBy: [''],
    modifiedFlag: [''],
    modifiedTime: [''],
    postedBy: [''],
    postedFlag: [''],
    postedTime: [''],
    verifiedBy: [''],
    verifiedFlag: [''],
    verifiedTime: ['']
  })
  getGuarantorsConfig(){
    let id = 1;
    this.subscription = this.guarantorAPI.getGuarantorsConfig(id).subscribe(res=>{
      this.resData = res;
      this.formData = this.fb.group({
        check_cust_activeness: [this.resData.check_cust_activeness],
        check_cust_guarantee_active_no: [this.resData.check_cust_guarantee_active_no],
        check_cust_loan_status: [this.resData.check_cust_loan_status],
        check_cust_shares_qualification: [this.resData.check_cust_shares_qualification],
        check_cust_subsequent_guarantee_status:[this.resData.check_cust_subsequent_guarantee_status],
        deletedBy: [this.resData.deletedBy],
        deletedFlag: [this.resData.deletedFlag],
        deletedTime: [this.resData.deletedTime],
        id: [this.resData.id],
        modifiedBy: [this.resData.modifiedBy],
        modifiedFlag: [this.resData.modifiedFlag],
        modifiedTime: [this.resData.modifiedTime],
        postedBy: [this.resData.postedBy],
        postedFlag: [this.resData.postedFlag],
        postedTime: [this.resData.postedTime],
        verifiedBy: [this.resData.verifiedBy],
        verifiedFlag: [this.resData.verifiedFlag],
        verifiedTime: [this.resData.verifiedTime]
      })
    })
  }


  onSubmit(){
    
  }

}
