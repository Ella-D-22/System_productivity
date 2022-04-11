import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchesLookupComponent } from '../../branches/branches-lookup/branches-lookup.component';
import { RetailCustomerLookupComponent } from '../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { MainGroupLookupComponent } from '../main-group/main-group-lookup/main-group-lookup.component';
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
  loading = false
  function_type:any
  message:any
  subgroup_code:any
  dialogData:any
  subGroupCode:any
  isSubmitted = false
  isDeleted = false;
  group_name:any
  submitted = false
  constructor(private subService:SubGroupService,
    private _snackbar:MatSnackBar,
     private router:Router,
     private fb:FormBuilder,
    private dialog:MatDialog) { }

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
    maingroup_sn:[''],
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
      deletedBy:['user'],
      deletedFlag:['N'],
      deletedTime:[new Date()],
      main_group_id:[''],
      modifiedBy:['user'],
      modifiedTime:[new Date()],
      postedBy:['user'],
      postedFlag:['Y'],
      postedTime:[new Date()],
      present_on_mainGroup:['N'],
      present_on_subGroup:['Y'],
      sub_group_id:[''],
      verifiedBy:['user'],
      verifiedFlag:['N'],
      verifiedTime:[new Date()]
    }))
    
  }

  onReadFile(e:any){
    this.g.push(this.fb.group({
      cust_code: [e.cust_code],
      cust_name: [e.cust_name],
      deletedBy:[e.deletedBy],
      deletedFlag:[e.deletedFlag],
      deletedTime:[e.deletedTime],
      main_group_id:[e.main_group_id],
      modifiedBy:[e.modifiedBy],
      modifiedTime:[e.modifiedTime],
      postedBy:[e.postedBy],
      postedFlag:[e.postedFlag],
      postedTime:[e.postedTime],
      present_on_mainGroup:[e.present_on_mainGroup],
      present_on_subGroup:[e.present_on_subGroup],
      sub_group_id:[e.sub_group_id],
      verifiedBy:[e.verifiedBy],
      verifiedFlag:[e.verifiedFlag],
      verifiedTime:[e.verifiedTime]

    }))
  }
  onRemoveField(i:any){
    this.g.removeAt(i)
  }
  disabledFormControl(){
    this.formData.disable()
  }

  mainGroupLookup(): void {
    const dialogRef = this.dialog.open(MainGroupLookupComponent,{

    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
      console.log(this.dialogData);
      
      this.formData.controls.maingroup_sn.setValue(this.dialogData.groupCode)
      this.group_name = this.dialogData.group_name
    })
  }

  branchLookup():void{
    const dialogRef =  this.dialog.open(BranchesLookupComponent,{

    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
      console.log(this.dialogData);
      
      this.formData.controls.sol_id.setValue(results.data.sol_code)
        this.formData.controls.branch_name.setValue(this.dialogData.sol_description)
     
    })

  }
  customerLookup():void{
    const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{

    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
      console.log(this.dialogData);

      this.formData.controls.cust_code.setValue(this.dialogData.customer_code)
      this.formData.controls.chairperson.setValue(this.dialogData.customer_code)
      this.formData.controls.secretary.setValue(this.dialogData.customer_code)
      this.formData.controls.treasurer.setValue(this.dialogData.customer_code)
     
    })
  }
  getPage(){
    this.subscription = this.subService.currentMessage.subscribe(
      message =>{
        this.message = message
        this.function_type = this.message.function_type
        this.subgroup_code = this.message.subGroupCode
        if(this.function_type == "A-Add"){
          this.isEnabled = true;
          this.isSubmitted = true;
          this.formData = this.fb.group({
            branch_name: [''],
            chairperson: [''],
          
            first_meeting_date: [''],
            subGroupCode:[this.subgroup_code],
            subgroupManager_ID: [''],
            groupStatus:[''],
            maingroup_sn:[],
            subgroup_formation_date:[''],
            subgroup_location:[''],
            subgroup_name:[''],
            subgroup_phone:[''],
            maxAllowedMembers:[''],
          
            meeting_frequency:[''],
           
            next_meeting_date:[''],
          
            reg_no:[''],
            secretary:[''],
            sol_id:[''],
            total_loanAccs:[''],
            total_loanBalance:[''],
            total_members:[''],
            total_savingBalance:[''],
            total_savingsAccs:[''],
            treasurer:[''],
            postedBy:["user"],
            postedFlag:['Y'],
            postedTime:[new Date()],
            modifiedBy:['user'],
            modifiedTime:[new Date()],
            deleteFlag: ['N'],
            deletedBy: ['user'],
            deletedTime: [new Date()],
            verifiedBy:['user'],
            verifiedFlag:['N'],
            verifiedTime: [new Date()],
            groupMembers: new FormArray([])

          });
        } else if(this.function_type == "I-Inquire"){
          this.loading = true
          this.disabledFormControl()
          
          this.subscription = this.subService.getSubGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.loading = false
              this.results = res
               console.log(this.results);
               
              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                maingroup_sn:[this.results.maingroup_sn],
                subgroup_formation_date:[this.results.subgroup_formation_date],
                subgroup_location:[this.results.subgroup_location],
                subgroup_name:[this.results.subgroup_name],
                subgroup_phone:[this.results.subgroup_phone],
                maxAllowedMembers:[this.results.maxAllowedMembers],
                // maxAllowedSubGroups:[this.results.maxAllowedSubGroups],
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
              });
              for(let i = 0; i<this.results.groupMembers.length; i++){
                    this.onReadFile(this.results.groupMembers[i]);
              }          }
          )
        } else if(this.function_type == "M-Modify"){
          this.loading = true
          this.isSubmitted = true;
          this.subscription = this.subService.getSubGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.loading = false
              this.results = res

              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                maingroup_sn:[this.results.maingroup_sn],
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
              for(let i = 0; i < this.results.groupMembers.length; i++){
                this.onReadFile(this.results.groupMembers[i]);
          }
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
          this.loading = true
          this.isDeleted = true;
          this.subscription = this.subService.getSubGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.loading = false
              this.results = res

              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                maingroup_sn:[this.results.maingroup_sn],
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
              for(let i = 0; i<this.results.groupMembers.length; i++){
                this.onReadFile(this.results.groupMembers[i]);
          }
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
        }else if(this.function_type == "V-Verify"){
          this.loading = true
          this.isDeleted = true;
          this.subscription = this.subService.getSubGroupByCode(this.subgroup_code).subscribe(
            res =>{
              this.loading = false
              this.results = res

              this.formData = this.fb.group({
                branch_name: [this.results.branch_name],
                chairperson: [this.results.chairperson],
                first_meeting_date: [this.results.first_meeting_date],
                subGroupCode:[this.results.subGroupCode],
                subgroupManager_ID: [this.results.subgroupManager_ID],
                groupStatus:[this.results.groupStatus],
                maingroup_sn:[this.results.maingroup_sn],
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
                verifiedBy:["user"],
                verifiedFlag:["Y"],
                verifiedTime: [new Date()],
                groupMembers: new FormArray([])
              });
              for(let i = 0; i<this.results.groupMembers.length; i++){
                this.onReadFile(this.results.groupMembers[i]);
          }
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
    if(this.formData.valid){

      if(this.function_type == "A-Add"){
        this.isEnabled = true;
        this.subscription = this.subService.createSubGroup(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/GLS/sub-group/maintenance")
          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )
      } else if(this.function_type == "M-Modify"){
        this.subscription = this.subService.updateSubGroups(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/GLS/sub-group/maintenance")
          },
          err =>{
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
        this.subscription = this.subService.updateSubGroups(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Deleted  Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigateByUrl("system/GLS/sub-group/maintenance")
          },
          err =>{
            this.error = err
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )
      }else if(this.function_type == "V-Verify"){
        this.subscription = this.subService.updateSubGroups(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Verified Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']
            });
            this.router.navigateByUrl("system/GLS/sub-group/maintenance")

          }
        )
      }
    }
  }

  }

