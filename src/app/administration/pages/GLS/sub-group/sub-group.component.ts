import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubGroupService } from './sub-group.service';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent implements OnInit {
  isEnabled =  false
  subscription:Subscription
  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition
  results: any
  error: any
  function_type:any
  message:any
  subgroup_code:any
  constructor(private subService:SubGroupService,
    private _snackbar:MatSnackBar,
    private router:Router,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getPage()
    this.onAddField()

  }

  formData = this.fb.group({
    branch_name: [''],
    chairperson: [''],
    deleteFlag: [''],
    deletedBy: [''],
    deletedTime: [''],
    first_meeting_date: [''],
    subGroupCode:[''],
    subgroupManager_ID: [''],
    groupStatus:[''],
    subgroup_formation_date:[''],
    subgroup_location:[''],
    subgroup_name:[''],
    subgroup_phone:[''],
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

  get f() { 
    return this.formData.controls; }

  get g(){return this.f.groupMembers as FormArray}


  onAddField(){

    this.g.push(this.fb.group({
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
    }))
    
  }
  onRemoveField(i:any){
    this.g.removeAt(i)
  }
  disabledFormControl(){
    this.formData.disable()
  }




  customerLookup():void{

  }
  branchLookup():void{

  }

  getPage(){
    this.subscription = this.subService.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        this.subgroup_code = this.message.subGroupCode

        if(this.function_type == "A-Add"){
          
          this.formData = this.fb.group({
            branch_name: [''],
            chairperson: [''],
            deleteFlag: [''],
            deletedBy: [''],
            deletedTime: [''],
            first_meeting_date: [''],
            subGroupCode:[''],
            subgroupManager_ID: [''],
            groupStatus:[''],
            subgroup_formation_date:[''],
            subgroup_location:[''],
            subgroup_name:[''],
            subgroup_phone:[''],
            maxAllowedMembers:[''],
            maxAllowedSubGroups:[''],
            meeting_frequency:[''],
            modifiedBy:[''],
            modifiedTime:[''],
            next_meeting_date:[''],
            postedBy:["user"],
            postedFlag:['Y'],
            postedTime:[new Date()],
            reg_no:[''],
            secretary:[''],
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

          });
        } else if(this.function_type == "I-Inquire"){
          this.disabledFormControl()
          this.subscription = this.subService.getMainGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                subgroup_formation_date:[this.results.subgroup_formation_date],
                subgroup_location:[this.results.subgroup_location],
                subgroup_name:[this.results.subgroup_name],
                subgroup_phone:[this.results.subgroup_phone],
                maxAllowedMembers:[this.results.maxAllowedMembers],
                maxAllowedSubGroups:[this.results.maxAllowedSubGroups],
                meeting_frequency:[this.results.meeting_frequency],
                next_meeting_date:[this.results.next_meeting_date],
                reg_no:[this.results.reg_no],
                secretary:[this.results.secretary],
                sn:[this.results.sn],
                sol_id:[this.results.sol_id],
                total_loanAccs:[this.results.total_loanAccs],
                total_loanBalance:[this.results.total_loanBalance],
                total_members:[this.results.total_members],
                total_savingBalance:[this.results.total_savingBalance],
                total_savingsAccs:[this.results.total_savingsAccs],
                treasurer:[this.results.treasurer],
                
                modifiedBy:[this.results.modifiedBy],
                modifiedTime:[this.results.modifiedTime],
                postedBy:[this.results.postedBy],
                postedFlag:[this.results.postedFlag],
                postedTime:[this.results.postedTime],
                deleteFlag: [this.results.deletedFlag],
                deletedBy: [this.results.deletedBy],
                deletedTime: [this.results.deletedTime],
                verifiedBy:[this.results.verifiedBy],
                verifiedFlag:[this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                groupMembers: new FormArray([])
              })
  
            }
          )
        } else if(this.function_type == "M_Modify"){
          this.subscription = this.subService.getMainGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                subgroup_formation_date:[this.results.subgroup_formation_date],
                subgroup_location:[this.results.subgroup_location],
                subgroup_name:[this.results.subgroup_name],
                subgroup_phone:[this.results.subgroup_phone],
                maxAllowedMembers:[this.results.maxAllowedMembers],
                maxAllowedSubGroups:[this.results.maxAllowedSubGroups],
                meeting_frequency:[this.results.meeting_frequency],
                next_meeting_date:[this.results.next_meeting_date],
                reg_no:[this.results.reg_no],
                secretary:[this.results.secretary],
                sn:[this.results.sn],
                sol_id:[this.results.sol_id],
                total_loanAccs:[this.results.total_loanAccs],
                total_loanBalance:[this.results.total_loanBalance],
                total_members:[this.results.total_members],
                total_savingBalance:[this.results.total_savingBalance],
                total_savingsAccs:[this.results.total_savingsAccs],
                treasurer:[this.results.treasurer],
                
                modifiedBy:["user"],
                modifiedTime:[new Date()],
                postedBy:[this.results.postedBy],
                postedFlag:[this.results.postedFlag],
                postedTime:[this.results.postedTime],
                deleteFlag: [this.results.deletedFlag],
                deletedBy: [this.results.deletedBy],
                deletedTime: [this.results.deletedTime],
                verifiedBy:[this.results.verifiedBy],
                verifiedFlag:[this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                groupMembers: new FormArray([])
              });
            },
            err =>{

              this.router.navigateByUrl("system/GLS/sub-group/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })

            }
          )
        } else if(this.function_type == "X-Delete"){
          this.subscription = this.subService.getMainGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.results = res

              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                subgroup_formation_date:[this.results.subgroup_formation_date],
                subgroup_location:[this.results.subgroup_location],
                subgroup_name:[this.results.subgroup_name],
                subgroup_phone:[this.results.subgroup_phone],
                maxAllowedMembers:[this.results.maxAllowedMembers],
                maxAllowedSubGroups:[this.results.maxAllowedSubGroups],
                meeting_frequency:[this.results.meeting_frequency],
                next_meeting_date:[this.results.next_meeting_date],
                reg_no:[this.results.reg_no],
                secretary:[this.results.secretary],
                sn:[this.results.sn],
                sol_id:[this.results.sol_id],
                total_loanAccs:[this.results.total_loanAccs],
                total_loanBalance:[this.results.total_loanBalance],
                total_members:[this.results.total_members],
                total_savingBalance:[this.results.total_savingBalance],
                total_savingsAccs:[this.results.total_savingsAccs],
                treasurer:[this.results.treasurer],
                
                modifiedBy:[this.results.modifiedBy],
                modifiedTime:[this.results.modifiedTime],
                postedBy:[this.results.postedBy],
                postedFlag:[this.results.postedFlag],
                postedTime:[this.results.postedTime],
                deleteFlag: ["Y"],
                deletedBy: ["user"],
                deletedTime: [new Date()],
                verifiedBy:[this.results.verifiedBy],
                verifiedFlag:[this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                groupMembers: new FormArray([])
              });
            },
            err =>{

              this.router.navigateByUrl("system/GLS/sub-group/maintenance")
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })

            } )
        }
      }
    )

  }


  onSubmit(){

  }

}
