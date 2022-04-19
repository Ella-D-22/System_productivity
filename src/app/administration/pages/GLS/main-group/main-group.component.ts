import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchesLookupComponent } from '../../branches/branches-lookup/branches-lookup.component';
import { RetailCustomerLookupComponent } from '../../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { MainGroupService } from './main-group.service';

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
 loading = false
 group_code:any
 results:any
 error:any
 dialogData:any
 groupCode:any
 isSubmitted = false;
 isDeleted = false

  horizontalPosition:MatSnackBarHorizontalPosition
  verticalPosition:MatSnackBarVerticalPosition

  user = "Nobody"
  constructor(private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private mainService:MainGroupService,
    private router:Router) { }

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
        
        this.formData.controls.sol_id.setValue(results.data.solCode)
        this.formData.controls.branch_name.setValue(this.dialogData.solDescription)
       
      })}


    customerLookup():void{
      const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{

      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        console.log(this.dialogData);
        
        this.formData.controls.cust_code.setValue(results.data.customer_code)
        this.formData.controls.chairperson.setValue(this.dialogData.customer_code)
        this.formData.controls.secretary.setValue(this.dialogData.customer_code)
        this.formData.controls.treasurer.setValue(this.dialogData.customer_code)
        this.formData.controls.groupMembers['cust_name'].setValue(this.dialogData.firstName)
       
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

    onReadField(e:any){
      this.g.push(this.fb.group({
        cust_code: [e.cust_code],
        cust_name: [e.cust_name],
        deletedBy:[e.deletedBy],
        deletedFlag:[e.deletedFlag],
        deletedTime:[e.deletedTime],
        // main_group_id:[this.groupCode],
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

    getPage(){
      this.subscription = this.mainService.currentMessage.subscribe(
        message =>{
          this.message = message
          this.function_type = this.message.function_type
          this.group_code = this.message.groupCode
           console.log(this.group_code);
           console.log(this.message);
          if(this.function_type == "A-Add"){
            this.isEnabled =  true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              branch_name: [''],
              chairperson: [''],
              first_meeting_date: [''],
              groupCode:[this.group_code],
              groupManager_ID: [''],
              groupStatus:[''],
              group_formation_date:[''],
              group_location:[''],
              group_name:[''],
              group_phone:[''],
              maxAllowedMembers:[''],
              maxAllowedSubGroups:[''],
              meeting_frequency:[''],
              modifiedBy:[this.user],
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
              postedBy:[this.user],
              postedFlag:['Y'],
              postedTime:[new Date()],
              deleteFlag: ['N'],
              deletedBy: [this.user],
              deletedTime: [new Date()],
              verifiedBy:['N'],
              verifiedFlag:['N'],
              verifiedTime: [new Date()],
              groupMembers: new FormArray([])

            });
          } else if(this.function_type == "I-Inquire"){
            this.loading = true
            this.disabledFormControl()
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
                this.results = res
                this.formData = this.fb.group({
                  branch_name: [this.results.branch_name],
                  chairperson: [this.results.chairperson],
                  first_meeting_date: [this.results.first_meeting_date],
                  groupCode:[this.results.group_code],
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
                });
                for(let i = 0; i < this.results.groupMembers.length; i++){
                  this.onReadField(this.results.groupMembers[i])
                }
    
              }
            )
          } else if(this.function_type == "M-Modify"){
            this.loading = true
            this.isSubmitted = true
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
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
                  
                  modifiedBy:[this.user],
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
                for(let i = 0; i < this.results.groupMembers.length; i++){
                  this.onReadField(this.results.groupMembers[i])
                }
              },
              err =>{

        this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });

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
             this.disabledFormControl()
            this.isDeleted = true
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
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
                  deletedBy: [this.user],
                  deletedTime: [new Date()],
                  verifiedBy:[this.results.verifiedBy],
                  verifiedFlag:[this.results.verifiedFlag],
                  verifiedTime: [this.results.verifiedTime],
                  groupMembers: new FormArray([])
                });
                for(let i = 0; i < this.results.groupMembers.length; i++){
                  this.onReadField(this.results.groupMembers[i])
                }
              },
              err =>{
               this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
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
            this.isSubmitted = true;
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = true
                this.results = res;
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
                  deleteFlag: [this.results.deletedFlag],
                  deletedBy: [this.results.deletedBy],
                  deletedTime: [this.results.deletedTime],
                  verifiedBy:[this.user],
                  verifiedFlag:[this.results.verifiedFlag],
                  verifiedTime: [this.results.verifiedTime],
                  groupMembers: new FormArray([])
                });
                for(let i = 0; i < this.results.groupMembers.length; i++){
                  this.onReadField(this.results.groupMembers[i])
                }

              },
              err =>{
               this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
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
              this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
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
          this.subscription = this.mainService.updateMainGroup(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
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
          this.subscription = this.mainService.updateMainGroup(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Executed Successfully", "X",{
                horizontalPosition:this.horizontalPosition,
                verticalPosition:this.verticalPosition,
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
  
              });
              this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
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