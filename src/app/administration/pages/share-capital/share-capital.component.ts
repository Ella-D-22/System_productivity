import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-share-capital',
  templateUrl: './share-capital.component.html',
  styleUrls: ['./share-capital.component.scss']
})
export class ShareCapitalComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
 formData = this.fb.group({
  cust_code: [''],
  cust_name: [''],
  deleteFlag: [''],
  deletedBy: [''],
  deletedTime: [''],
  id: 0,
  modifiedBy: [''],
  modifiedTime: [''],
  postedBy: [''],
  postedFlag: [''],
  postedTime: [''],
  share_capital_amount: [''],
  shares: [''],
  verifiedBy: [''],
  verifiedFlag: [''],
  verifiedTime: ['']
 })

 getPage(){

 }

 onSubmit(){
   
 }
}
