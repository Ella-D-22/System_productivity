import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns : string[]= ['index','subGroupCode','subGroupName','subGroupFormationDate','totalMembers','totalSavingBalance','chairperson','subGroupPhone','groupStatus']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  dialogData: any;
  function_type: any;
  group_code: any;
  isEnabled: boolean;
  results: any;
  dataExist = false;
  error: any;
  loading = false;
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 subscription:Subscription
 message:any
  user = "Nobody"
  constructor(private fb:FormBuilder,
    private _snackbar:MatSnackBar,
    private dialog:MatDialog,
    private mainService:MainGroupService,
    private router:Router) { }
  ngOnInit(): void {
    this.getPage()
  }
  getSubGroups(mainGroupCode:any){
    this.subscription = this.mainService.getMainGroupByCode(mainGroupCode).subscribe(res=>{
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    })
  }
  formData = this.fb.group({
    mainGroupCode:['',Validators.required],
    mainGroupName:['',Validators.required],
    mainGroupFormationDate:['',Validators.required],
    mainGroupSolCode:['',Validators.required],
    mainGroupBranchName:['',Validators.required],
    mainGroupManagerID:['',Validators.required],
    mainGroupRegNo:['',Validators.required],
    mainGroupLocation:['',Validators.required],
    mainGroupPhone:['',Validators.required],
    mainGroupFirstMeetingDate:['',Validators.required],
    mainGroupNextMeetingDate:['',Validators.required],
    mainGroupMaxAllowedMembers:['',Validators.required],
    mainGroupMaxAllowedSubGroups:['',Validators.required],
    mainGroupChairperson:['',Validators.required],
    mainGroupSecretary:['',Validators.required],
    mainGroupTreasurer:['',Validators.required],
    mainGroupStatus:['',Validators.required],
    mainGroupTotalMembers:['',Validators.required],
    mainGroupMeetingFrequency:['',Validators.required],
    mainGroupSavingAc:['',Validators.required],
    mainGroupTotalSavingsBalance:[''],
    mainGroupTotalLoanAc:['',Validators.required],
    mainGroupTotalLoanBalance:[''],
    deletedBy:[this.user],
    deletedFlag:['N'],
    deletedTime: [new Date()],
    modifiedBy:[this.user],
    modifiedTime:[new Date()],
    postedBy:[this.user],
    postedFlag:['Y'],
    postedTime:[new Date()],
    verifiedBy:[this.user],
    verifiedFlag:['N'],
    verifiedTime:[new Date()],
  }) 
  get f() { return this.formData.controls; }
    branchLookup():void{
      const dialogRef =  this.dialog.open(BranchesLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.sol_id.setValue(results.data.solCode)
        this.formData.controls.branch_name.setValue(this.dialogData.solDescription)
      })}
    customerLookup():void{
      const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.cust_code.setValue(results.data.customer_code)
      }) }

    getPage(){
      this.subscription = this.mainService.currentMessage.subscribe(
        message =>{
          this.message = message
          this.function_type = this.message.function_type
          this.group_code = this.message.groupCode
          if(this.function_type == "A-Add"){
            this.dataExist = false;
            this.isEnabled =  true;
            this.formData = this.fb.group({
              mainGroupCode:[this.group_code],
              mainGroupName:['',Validators.required],
              mainGroupFormationDate:['',Validators.required],
              mainGroupSolCode:['',Validators.required],
              mainGroupBranchName:['',Validators.required],
              mainGroupManagerID:['',Validators.required],
              mainGroupRegNo:['',Validators.required],
              mainGroupLocation:['',Validators.required],
              mainGroupPhone:['',Validators.required],
              mainGroupFirstMeetingDate:['',Validators.required],
              mainGroupNextMeetingDate:['',Validators.required],
              mainGroupMaxAllowedMembers:['',Validators.required],
              mainGroupMaxAllowedSubGroups:['',Validators.required],
              mainGroupChairperson:['',Validators.required],
              mainGroupSecretary:['',Validators.required],
              mainGroupTreasurer:['',Validators.required],
              mainGroupStatus:['',Validators.required],
              mainGroupTotalMembers:['',Validators.required],
              mainGroupMeetingFrequency:['',Validators.required],
              mainGroupSavingAc:['',Validators.required],
              mainGroupTotalSavingsBalance:[''],
              mainGroupTotalLoanAc:['',Validators.required],
              mainGroupTotalLoanBalance:[''],
              deletedBy:[this.user],
              deletedFlag:['N'],
              deletedTime: [new Date()],
              modifiedBy:[this.user],
              modifiedTime:[new Date()],
              postedBy:[this.user],
              postedFlag:['Y'],
              postedTime:[new Date()],
              verifiedBy:[this.user],
              verifiedFlag:['N'],
              verifiedTime:[new Date()],
            });
          } else if(this.function_type == "I-Inquire"){
            this.dataExist = true;
            this.loading = true
            this.formData.disable
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
                this.results = res
          this.formData = this.fb.group({
              id:[this.results.id],
              mainGroupCode:[this.results.group_code],
              mainGroupName:[this.results.mainGroupName],
              mainGroupFormationDate:[this.results.mainGroupFormationDate],
              mainGroupSolCode:[this.results.mainGroupSolCode],
              mainGroupBranchName:[this.results.mainGroupBranchName],
              mainGroupManagerID:[this.results.mainGroupManagerID],
              mainGroupRegNo:[this.results.mainGroupRegNo],
              mainGroupLocation:[this.results.mainGroupLocation],
              mainGroupPhone:[this.results.mainGroupPhone],
              mainGroupFirstMeetingDate:[this.results.mainGroupFirstMeetingDate],
              mainGroupNextMeetingDate:[this.results.mainGroupNextMeetingDate],
              mainGroupMaxAllowedMembers:[this.results.mainGroupMaxAllowedMembers],
              mainGroupMaxAllowedSubGroups:[this.results.mainGroupMaxAllowedSubGroups],
              mainGroupChairperson:[this.results.mainGroupChairperson],
              mainGroupSecretary:[this.results.mainGroupSecretary],
              mainGroupTreasurer:[this.results.mainGroupTreasurer],
              mainGroupStatus:[this.results.mainGroupStatus],
              mainGroupTotalMembers:[this.results.mainGroupTotalMembers],
              mainGroupMeetingFrequency:[this.results.mainGroupMeetingFrequency],
              mainGroupSavingAc:[this.results.mainGroupSavingAc],
              mainGroupTotalSavingsBalance:[this.results.mainGroupTotalSavingsBalance],
              mainGroupTotalLoanAc:[this.results.mainGroupTotalLoanAc],
              mainGroupTotalLoanBalance:[this.results.mainGroupTotalLoanBalance],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime: [this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime:[this.results.verifiedTime],
                });         }
            )
          } else if(this.function_type == "M-Modify"){

            this.formData.disable();
            this.dataExist = true;
            this.loading = true
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
                this.results = res
          this.formData = this.fb.group({
              id:[this.results.id],
              mainGroupCode:[this.results.group_code],
              mainGroupName:[this.results.mainGroupName],
              mainGroupFormationDate:[this.results.mainGroupFormationDate],
              mainGroupSolCode:[this.results.mainGroupSolCode],
              mainGroupBranchName:[this.results.mainGroupBranchName],
              mainGroupManagerID:[this.results.mainGroupManagerID],
              mainGroupRegNo:[this.results.mainGroupRegNo],
              mainGroupLocation:[this.results.mainGroupLocation],
              mainGroupPhone:[this.results.mainGroupPhone],
              mainGroupFirstMeetingDate:[this.results.mainGroupFirstMeetingDate],
              mainGroupNextMeetingDate:[this.results.mainGroupNextMeetingDate],
              mainGroupMaxAllowedMembers:[this.results.mainGroupMaxAllowedMembers],
              mainGroupMaxAllowedSubGroups:[this.results.mainGroupMaxAllowedSubGroups],
              mainGroupChairperson:[this.results.mainGroupChairperson],
              mainGroupSecretary:[this.results.mainGroupSecretary],
              mainGroupTreasurer:[this.results.mainGroupTreasurer],
              mainGroupStatus:[this.results.mainGroupStatus],
              mainGroupTotalMembers:[this.results.mainGroupTotalMembers],
              mainGroupMeetingFrequency:[this.results.mainGroupMeetingFrequency],
              mainGroupSavingAc:[this.results.mainGroupSavingAc],
              mainGroupTotalSavingsBalance:[this.results.mainGroupTotalSavingsBalance],
              mainGroupTotalLoanAc:[this.results.mainGroupTotalLoanAc],
              mainGroupTotalLoanBalance:[this.results.mainGroupTotalLoanBalance],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime: [this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime:[this.results.verifiedTime],
                });         }
            )
          } else if(this.function_type == "X-Delete"){
            this.dataExist = true;
            this.loading = true
            this.formData.disable
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
                this.results = res
          this.formData = this.fb.group({
              id:[this.results.id],
              mainGroupCode:[this.results.group_code],
              mainGroupName:[this.results.mainGroupName],
              mainGroupFormationDate:[this.results.mainGroupFormationDate],
              mainGroupSolCode:[this.results.mainGroupSolCode],
              mainGroupBranchName:[this.results.mainGroupBranchName],
              mainGroupManagerID:[this.results.mainGroupManagerID],
              mainGroupRegNo:[this.results.mainGroupRegNo],
              mainGroupLocation:[this.results.mainGroupLocation],
              mainGroupPhone:[this.results.mainGroupPhone],
              mainGroupFirstMeetingDate:[this.results.mainGroupFirstMeetingDate],
              mainGroupNextMeetingDate:[this.results.mainGroupNextMeetingDate],
              mainGroupMaxAllowedMembers:[this.results.mainGroupMaxAllowedMembers],
              mainGroupMaxAllowedSubGroups:[this.results.mainGroupMaxAllowedSubGroups],
              mainGroupChairperson:[this.results.mainGroupChairperson],
              mainGroupSecretary:[this.results.mainGroupSecretary],
              mainGroupTreasurer:[this.results.mainGroupTreasurer],
              mainGroupStatus:[this.results.mainGroupStatus],
              mainGroupTotalMembers:[this.results.mainGroupTotalMembers],
              mainGroupMeetingFrequency:[this.results.mainGroupMeetingFrequency],
              mainGroupSavingAc:[this.results.mainGroupSavingAc],
              mainGroupTotalSavingsBalance:[this.results.mainGroupTotalSavingsBalance],
              mainGroupTotalLoanAc:[this.results.mainGroupTotalLoanAc],
              mainGroupTotalLoanBalance:[this.results.mainGroupTotalLoanBalance],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime: [this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime:[this.results.verifiedTime],
                });         }
            )
          }else if(this.function_type == "V-Verify"){
            this.dataExist = true;
            this.loading = true
            this.formData.disable
            this.subscription = this.mainService.getMainGroupByCode(this.group_code).subscribe(
              res =>{
                this.loading = false
                this.results = res
          this.formData = this.fb.group({
              id:[this.results.id],
              mainGroupCode:[this.results.group_code],
              mainGroupName:[this.results.mainGroupName],
              mainGroupFormationDate:[this.results.mainGroupFormationDate],
              mainGroupSolCode:[this.results.mainGroupSolCode],
              mainGroupBranchName:[this.results.mainGroupBranchName],
              mainGroupManagerID:[this.results.mainGroupManagerID],
              mainGroupRegNo:[this.results.mainGroupRegNo],
              mainGroupLocation:[this.results.mainGroupLocation],
              mainGroupPhone:[this.results.mainGroupPhone],
              mainGroupFirstMeetingDate:[this.results.mainGroupFirstMeetingDate],
              mainGroupNextMeetingDate:[this.results.mainGroupNextMeetingDate],
              mainGroupMaxAllowedMembers:[this.results.mainGroupMaxAllowedMembers],
              mainGroupMaxAllowedSubGroups:[this.results.mainGroupMaxAllowedSubGroups],
              mainGroupChairperson:[this.results.mainGroupChairperson],
              mainGroupSecretary:[this.results.mainGroupSecretary],
              mainGroupTreasurer:[this.results.mainGroupTreasurer],
              mainGroupStatus:[this.results.mainGroupStatus],
              mainGroupTotalMembers:[this.results.mainGroupTotalMembers],
              mainGroupMeetingFrequency:[this.results.mainGroupMeetingFrequency],
              mainGroupSavingAc:[this.results.mainGroupSavingAc],
              mainGroupTotalSavingsBalance:[this.results.mainGroupTotalSavingsBalance],
              mainGroupTotalLoanAc:[this.results.mainGroupTotalLoanAc],
              mainGroupTotalLoanBalance:[this.results.mainGroupTotalLoanBalance],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime: [this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime:[this.results.verifiedTime],
                });         }
            )
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
              this._snackbar.open("Successfull", "X",{
                horizontalPosition:'end',
                verticalPosition:'top',
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
              });
              this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:'end',
                verticalPosition:'top',
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
        } else if(this.function_type != "Add"){
          this.subscription = this.mainService.updateMainGroup(this.formData.value).subscribe(
            res =>{
              this.results = res
              this._snackbar.open("Successfull", "X",{
                horizontalPosition:'end',
                verticalPosition:'top',
                duration:3000,
                panelClass:['green-snackbar', 'login-snackbar']
              });
              this.router.navigate([`/system/GLS/main-group/maintenance`], { skipLocationChange: true });
            },
            err =>{
              this.error = err
              this._snackbar.open(this.error, "Try Again",{
                horizontalPosition:'end',
                verticalPosition:'top',
                duration:3000,
                panelClass:['red-snackbar', 'login-snackbar']
              })
            }
          )
        } 
         
      }
    }
}