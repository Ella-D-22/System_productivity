import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-group',
  templateUrl: './main-group.component.html',
  styleUrls: ['./main-group.component.scss']
})
export class MainGroupComponent implements OnInit {
  isEnabled = false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getPage()
  }

  formData = this.fb.group({
    branch_name: [''],
    chairperson: [''],
    deleteFlag: [''],
    deletedBy: [''],
    deletedTime: [''],
    first_meeting_date: [''],
    groupCode:[''],
    groupManager_ID: [''],
    groupStatus:[''],
    group_formation_date:[''],
    group_location:[''],
    group_name:[''],
    group_phone:[''],
    maxAllowedMembers:[''],
    maxAllowedSubGroups:[''],
    meeting_frequency:[''],
    modifiedBy:[''],
    modifiedTime:[''],
    next_meeting_date:[''],
    postedBy:[''],
    postedFlag:[''],
    postedTime:[''],
    reg_no:[''],
    secretary:[''],
    sn:[''],
    sol_id:[''],
    total_loanAccs:[''],
    total_loanBalance:[''],
    total_members:[''],
    total_savingBalance:[''],
    total_savingsAccs:[''],
    treasurer:[''],
    verifiedBy:[''],
    verifiedFlag:[''],
    verifiedTime: [''],
    groupMembers: new FormArray([])

  })

  groupMemberData = this.fb.group({
      cust_code: [''],
      cust_name: [''],
      deletedBy:[''],
      deletedFlag:[''],
      deletedTime:[''],
      id:[''],
      main_group_id:[''],
      modifiedBy:[''],
      modifiedTime:[''],
      postedBy:[''],
      postedFlag:[''],
      postedTime:[''],
      present_on_mainGroup:[''],
      present_on_subGroup:[''],
      sub_group_id:[''],
      verifiedBy:[''],
      verifiedFlag:[''],
      verifiedTime:['']

  })
  get f() { 
    return this.formData.controls; }
    branchLookup():void{

    }
    customerLookup():void{

    }
    onAddField(){
      
    }
    onRemoveField(){

    }

    getPage(){

    }
}
