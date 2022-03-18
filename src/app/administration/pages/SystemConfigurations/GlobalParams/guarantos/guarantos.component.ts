import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-guarantos',
  templateUrl: './guarantos.component.html',
  styleUrls: ['./guarantos.component.scss']
})
export class GuarantosComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
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

  onSubmit(){
    
  }

}
