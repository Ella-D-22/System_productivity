import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchesLookupComponent } from '../../branches/branches-lookup/branches-lookup.component';
import { CustomerLookupComponent } from '../../CustomersComponent/customer-lookup/customer-lookup.component';
import { MainGroupService } from '../main-group.service';

@Component({
  selector: 'app-main-group',
  templateUrl: './main-group.component.html',
  styleUrls: ['./main-group.component.scss']
})
export class MainGroupComponent implements OnInit {
  isEnabled = false;
  submitted = false;
 subscription:Subscription
 message:any
 function_type:any
 group_code:any
 results:any
 error:any
 dialogData:any
 groupCode:any

  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition

  constructor(private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private mainService:MainGroupService,private router:Router) { }

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

 
  get f() { 
    return this.formData.controls; }

  get g(){return this.f.groupMembers as FormArray}
  
    branchLookup():void{
      const dialogRef =  this.dialog.open(BranchesLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(this.dialogData);
        
        this.formData.controls.sol_id.setValue(results.data.sol_id)
       
      })}


    customerLookup():void{
      const dialogRef =  this.dialog.open(CustomerLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(this.dialogData);
        
        this.formData.controls.cust_code.setValue(results.data.cust_code)
       
      }) }

    onAddField(){

      this.g.push(this.fb.group({
        cust_code: [''],
        cust_name: [''],
        deletedBy:[''],
        deletedFlag:['N'],
        deletedTime:[new Date()],
        // main_group_id:[this.groupCode],
        modifiedBy:["user"],
        modifiedTime:[new Date()],
        postedBy:['You'],
        postedFlag:['Y'],
        postedTime:[new Date()],
        present_on_mainGroup:['Y'],
        present_on_subGroup:['N'],
        sub_group_id:[''],
        verifiedBy:["You"],
        verifiedFlag:['Y'],
        verifiedTime:[new Date()]
      }))
      
    }
    onRemoveField(i:any){
      this.g.removeAt(i)
    }
    disabledFormControl(){
      this.formData.disable()
    }

    getPage(){
      this.subscription = this.mainService.currentMessage.subscribe(
        message =>{
          this.message = message
          this.function_type = this.message.function_type
          this.groupCode = this.message.groupCode

          if(this.function_type == "A-Add"){
            this.isEnabled =  true;
            this.formData = this.fb.group({
              branch_name: [''],
              chairperson: [''],
              first_meeting_date: [''],
              groupCode:[this.groupCode],
              groupManager_ID: [''],
              groupStatus:[''],
              group_formation_date:[''],
              group_location:[''],
              group_name:[''],
              group_phone:[''],
              maxAllowedMembers:[''],
              maxAllowedSubGroups:[''],
              meeting_frequency:[''],
              modifiedBy:['user'],
              modifiedTime:[new Date()],
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
              postedBy:['user'],
              postedFlag:['Y'],
              postedTime:[new Date()],
              deleteFlag: ['N'],
              deletedBy: ['None'],
              deletedTime: [new Date()],
              verifiedBy:['N'],
              verifiedFlag:['N'],
              verifiedTime: [new Date()],
              groupMembers: new FormArray([])

            });
          } else if(this.function_type == "I-Inquire"){
            this.disabledFormControl()
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.results = res

                this.formData = this.fb.group({
                  branch_name: [this.results.branch_name],
                  chairperson: [this.results.chairperson],
                  first_meeting_date: [this.results.first_meeting_date],
                  groupCode:[this.results.groupCode],
                  groupManager_ID: [this.results.groupManager_ID],
                  groupStatus:[this.results.groupStatus],
                  group_formation_date:[this.results.group_formation_date],
                  group_location:[this.results.group_location],
                  group_name:[this.results.group_name],
                  group_phone:[this.results.group_phone],
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
                  deleteFlag: [this.results.deleteFlag],
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
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.results = res

                this.formData = this.fb.group({
                  branch_name: [this.results.branch_name],
                  chairperson: [this.results.chairperson],
                  first_meeting_date: [this.results.first_meeting_date],
                  groupCode:[this.results.groupCode],
                  groupManager_ID: [this.results.groupManager_ID],
                  groupStatus:[this.results.groupStatus],
                  group_formation_date:[this.results.group_formation_date],
                  group_location:[this.results.group_location],
                  group_name:[this.results.group_name],
                  group_phone:[this.results.group_phone],
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
                  deleteFlag: [this.results.deleteFlag],
                  deletedBy: [this.results.deletedBy],
                  deletedTime: [this.results.deletedTime],
                  verifiedBy:[this.results.verifiedBy],
                  verifiedFlag:[this.results.verifiedFlag],
                  verifiedTime: [this.results.verifiedTime],
                  groupMembers: new FormArray([])
                });
              },
              err =>{

                this.router.navigateByUrl("system/GLS/main-group/maintenance")
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
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.results = res

                this.formData = this.fb.group({
                  branch_name: [this.results.branch_name],
                  chairperson: [this.results.chairperson],
                  first_meeting_date: [this.results.first_meeting_date],
                  groupCode:[this.results.groupCode],
                  groupManager_ID: [this.results.groupManager_ID],
                  groupStatus:[this.results.groupStatus],
                  group_formation_date:[this.results.group_formation_date],
                  group_location:[this.results.group_location],
                  group_name:[this.results.group_name],
                  group_phone:[this.results.group_phone],
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

                this.router.navigateByUrl("system/GLS/main-group/maintenance")
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
          this.subscription = this.mainService.createMainGroup(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("system/GLS/main-group/maintenance")
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
          this.subscription = this.mainService.updateMainGroups(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("system/GLS/main-group/maintenance")
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
          this.subscription = this.mainService.updateMainGroups(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigateByUrl("system/GLS/main-group/maintenance")
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
        }
      }
    }
}
