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
import { ExitMemberComponent } from './exit-member/exit-member.component';
import { SubGroupService } from './sub-group.service';
import { TransferMemberComponent } from './transfer-member/transfer-member.component';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent implements OnInit {
  horizontalPosition:'end'
  verticalPosition:'top'
  operationArray:any = [
    'Transfer Member', 'Exit Member', 'Reinstate Member'
  ]
  displayedColumns : string[]= ['customerCode', 'customerName','Operations']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  mainGroupCode: any;
  mainGroupName: any;
  subGroupName: any;
  mainGroupId: any;
  dialogData: any;
  message: any;
  function_type: any;
  subGroupCode: any;
  isSubmitted: boolean;
  loading: boolean;
  error: string;
  subGroupMembersArrays = new Array();

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isEnabled =  false
  subscription:Subscription
  results: any
  submitted = false
  constructor(private subService:SubGroupService,
    private _snackbar:MatSnackBar,
     private router:Router,
     private fb:FormBuilder,
    private dialog:MatDialog) { }
  ngOnInit(): void {
    this.getPage()
  }
  getMembers(dataArray:any){
      this.subService.getSubGroups().subscribe(
        data =>{
          this.results = data
          this.dataSource = new MatTableDataSource(dataArray)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 
        }
      )
  }
  formData = this.fb.group({
      id:[''],
      subGroupCode:['',Validators.required],
      subGroupName:['',Validators.required],
      mainGroupCode:['',Validators.required],
      mainGroupId:['',Validators.required],
      subGroupSolCode:['',Validators.required],
      subGroupBranchName:['',Validators.required],
      subGroupManagerId:['',Validators.required],
      subGroupRegNo:['',Validators.required],
      subGroupLocation:['',Validators.required],
      subGroupPhone:['',Validators.required],
      subGroupFormationDate:['',Validators.required],
      subGroupStatus:['',Validators.required],
      subGroupFirstMeetingDate:['',Validators.required],
      subGroupNextMeetingDate:['',Validators.required],
      subGroupChairperson:['',Validators.required],
      subGroupSecretary:['',Validators.required],
      subGroupTreasurer:['',Validators.required],
      subGroupTotalMembers:['',Validators.required],
      subGroupMeetingFrequency:['',Validators.required],
      subGroupSavingsAc:['',Validators.required],
      subGroupTotalSavingBalance:['',Validators.required],
      subGroupLoanAc:['',Validators.required],
      subGroupLoanBalance:['',Validators.required],
      verifiedBy:['',Validators.required],
      verifiedFlag:['',Validators.required],
      verifiedTime: ['',Validators.required],
      deletedBy:['',Validators.required],
      deletedFlag:['',Validators.required],
      deletedTime:['',Validators.required],
      modifiedBy:['',Validators.required],
      modifiedTime:['',Validators.required],
      postedBy:['',Validators.required],
      postedFlag:['',Validators.required],
      postedTime:['',Validators.required],
      subGroupMembers: new FormArray([]),
  })
  get f() { return this.formData.controls; }
  get s(){ return this.f.subGroupMembers as FormArray;}
  disabledFormControl(){
    this.formData.disable()
  }

  branchLookup(): void {
    const dialogRef = this.dialog.open(BranchesLookupComponent, {
    });
    dialogRef.afterClosed().subscribe(results => {
      this.dialogData = results.data;
      this.formData.controls.subGroupSolCode.setValue(results.data.solCode)
      this.formData.controls.subGroupBranchName.setValue(this.dialogData.solDescription)
    })
  }


  getPage(){
    this.subscription = this.subService.currentMessage.subscribe(
      message =>{
        this.message = message     
        this.function_type = this.message.function_type,   
        this.mainGroupCode = this.message.mainGroupCode,
        this.mainGroupId = this.message.mainGroupId,
        this.mainGroupName = this.message.mainGroupName,
        this.subGroupCode = this.message.subGroupCode,
        this.subGroupName = this.message.subGroupName,
        this.mainGroupName = this.message.mainGroupName
        if(this.function_type == "A-Add"){
          this.isEnabled = true;
          this.isSubmitted = true;
          this.formData = this.fb.group({
            id:[''],
            subGroupCode:[this.subGroupCode],
            subGroupName:[this.subGroupName],
            mainGroupCode:[this.mainGroupCode ],
            mainGroupId:[this.mainGroupId],
            mainGroupName:[this.mainGroupName],
            subGroupSolCode:[''],
            subGroupBranchName:[''],
            subGroupManagerId:[''],
            subGroupRegNo:[''],
            subGroupLocation:[''],
            subGroupPhone:[''],
            subGroupFormationDate:[''],
            subGroupStatus:[''],
            subGroupFirstMeetingDate:[''],
            subGroupNextMeetingDate:[''],
            subGroupChairperson:[''],
            subGroupSecretary:[''],
            subGroupTreasurer:[''],
            subGroupTotalMembers:[''],
            subGroupMeetingFrequency:[''],
            subGroupSavingsAc:[''],
            subGroupTotalSavingBalance:[''],
            subGroupLoanAc:[''],
            subGroupLoanBalance:[''],
            verifiedBy:["user"],
            verifiedFlag:['N'],
            verifiedTime: [new Date()],
            deletedBy:["user"],
            deletedFlag:['N'],
            deletedTime:[new Date()],
            modifiedBy:["user"],
            modifiedTime:[new Date()],
            postedBy:["user"],
            postedFlag:['Y'],
            postedTime:[new Date()],
            subGroupMembers: new FormArray([]),
          });
        } else if(this.function_type == "I-Inquire"){
          this.loading = true;
          this.subscription = this.subService.getSubGroupByCode(this.subGroupCode).subscribe(res=>{
            this.loading = false;
            this.results = res;
            this.isEnabled = true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              id:[this.results.id],
              subGroupCode:[this.results.subGroupCode],
              subGroupName:[this.results.subGroupName],
              mainGroupCode:[this.results.mainGroupCode],
              mainGroupId:[this.results.mainGroupId],
              mainGroupName:[this.results.mainGroupName],
              subGroupSolCode:[this.results.subGroupSolCode],
              subGroupBranchName:[this.results.subGroupBranchName],
              subGroupManagerId:[this.results.subGroupManagerId],
              subGroupRegNo:[this.results.subGroupRegNo],
              subGroupLocation:[this.results.subGroupLocation],
              subGroupPhone:[this.results.subGroupPhone],
              subGroupFormationDate:[this.results.subGroupFormationDate],
              subGroupStatus:[this.results.subGroupStatus],
              subGroupFirstMeetingDate:[this.results.subGroupFirstMeetingDate],
              subGroupNextMeetingDate:[this.results.subGroupNextMeetingDate],
              subGroupChairperson:[this.results.subGroupChairperson],
              subGroupSecretary:[this.results.subGroupSecretary],
              subGroupTreasurer:[this.results.subGroupTreasurer],
              subGroupTotalMembers:[this.results.subGroupTotalMembers],
              subGroupMeetingFrequency:[this.results.subGroupMeetingFrequency],
              subGroupSavingsAc:[this.results.subGroupSavingsAc],
              subGroupTotalSavingBalance:[this.results.subGroupTotalSavingBalance],
              subGroupLoanAc:[this.results.subGroupLoanAc],
              subGroupLoanBalance:[this.results.subGroupLoanBalance],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime: [this.results.verifiedTime],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime:[this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              subGroupMembers: new FormArray([]),
            });
            this.subGroupMembersArrays = this.results.subGroupMembers;
            this.getMembers(this.subGroupMembersArrays);
            for(let i=0;i<this.subGroupMembersArrays.length;i++){
              this.s.push(this.fb.group(this.subGroupMembersArrays[i]));
            }
          })
        } else if(this.function_type == "M-Modify"){
          this.loading = true;
          this.subscription = this.subService.getSubGroupByCode(this.subGroupCode).subscribe(res=>{
            this.loading = false;
            this.results = res;
            this.isEnabled = true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              id:[this.results.id],
              subGroupCode:[this.results.subGroupCode],
              subGroupName:[this.results.subGroupName],
              mainGroupCode:[this.results.mainGroupCode],
              mainGroupId:[this.results.mainGroupId],
              mainGroupName:[this.results.mainGroupName],
              subGroupSolCode:[this.results.subGroupSolCode],
              subGroupBranchName:[this.results.subGroupBranchName],
              subGroupManagerId:[this.results.subGroupManagerId],
              subGroupRegNo:[this.results.subGroupRegNo],
              subGroupLocation:[this.results.subGroupLocation],
              subGroupPhone:[this.results.subGroupPhone],
              subGroupFormationDate:[this.results.subGroupFormationDate],
              subGroupStatus:[this.results.subGroupStatus],
              subGroupFirstMeetingDate:[this.results.subGroupFirstMeetingDate],
              subGroupNextMeetingDate:[this.results.subGroupNextMeetingDate],
              subGroupChairperson:[this.results.subGroupChairperson],
              subGroupSecretary:[this.results.subGroupSecretary],
              subGroupTreasurer:[this.results.subGroupTreasurer],
              subGroupTotalMembers:[this.results.subGroupTotalMembers],
              subGroupMeetingFrequency:[this.results.subGroupMeetingFrequency],
              subGroupSavingsAc:[this.results.subGroupSavingsAc],
              subGroupTotalSavingBalance:[this.results.subGroupTotalSavingBalance],
              subGroupLoanAc:[this.results.subGroupLoanAc],
              subGroupLoanBalance:[this.results.subGroupLoanBalance],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime: [this.results.verifiedTime],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime:[this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              subGroupMembers: new FormArray([]),
            });
            this.subGroupMembersArrays = this.results.subGroupMembers;
            this.getMembers(this.subGroupMembersArrays);
            for(let i=0;i<this.subGroupMembersArrays.length;i++){
              this.s.push(this.fb.group(this.subGroupMembersArrays[i]));
            }
          })

        } else if(this.function_type == "X-Delete"){
          this.loading = true;
          this.subscription = this.subService.getSubGroupByCode(this.subGroupCode).subscribe(res=>{
          this.loading = false;
            this.results = res;
            this.isEnabled = true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              id:[this.results.id],
              subGroupCode:[this.results.subGroupCode],
              subGroupName:[this.results.subGroupName],
              mainGroupCode:[this.results.mainGroupCode],
              mainGroupId:[this.results.mainGroupId],
              mainGroupName:[this.results.mainGroupName],
              subGroupSolCode:[this.results.subGroupSolCode],
              subGroupBranchName:[this.results.subGroupBranchName],
              subGroupManagerId:[this.results.subGroupManagerId],
              subGroupRegNo:[this.results.subGroupRegNo],
              subGroupLocation:[this.results.subGroupLocation],
              subGroupPhone:[this.results.subGroupPhone],
              subGroupFormationDate:[this.results.subGroupFormationDate],
              subGroupStatus:[this.results.subGroupStatus],
              subGroupFirstMeetingDate:[this.results.subGroupFirstMeetingDate],
              subGroupNextMeetingDate:[this.results.subGroupNextMeetingDate],
              subGroupChairperson:[this.results.subGroupChairperson],
              subGroupSecretary:[this.results.subGroupSecretary],
              subGroupTreasurer:[this.results.subGroupTreasurer],
              subGroupTotalMembers:[this.results.subGroupTotalMembers],
              subGroupMeetingFrequency:[this.results.subGroupMeetingFrequency],
              subGroupSavingsAc:[this.results.subGroupSavingsAc],
              subGroupTotalSavingBalance:[this.results.subGroupTotalSavingBalance],
              subGroupLoanAc:[this.results.subGroupLoanAc],
              subGroupLoanBalance:[this.results.subGroupLoanBalance],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime: [this.results.verifiedTime],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime:[this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              subGroupMembers: new FormArray([]),
            });
            this.subGroupMembersArrays = this.results.subGroupMembers;
            this.getMembers(this.subGroupMembersArrays);
            for(let i=0;i<this.subGroupMembersArrays.length;i++){
              this.s.push(this.fb.group(this.subGroupMembersArrays[i]));
            }
          })

        }else if(this.function_type == "V-Verify"){
          this.subscription = this.subService.getSubGroupByCode(this.subGroupCode).subscribe(res=>{
            this.results = res;
            this.isEnabled = true;
            this.isSubmitted = true;
            this.formData = this.fb.group({
              id:[this.results.id],
              subGroupCode:[this.results.subGroupCode],
              subGroupName:[this.results.subGroupName],
              mainGroupCode:[this.results.mainGroupCode],
              mainGroupId:[this.results.mainGroupId],
              mainGroupName:[this.results.mainGroupName],
              subGroupSolCode:[this.results.subGroupSolCode],
              subGroupBranchName:[this.results.subGroupBranchName],
              subGroupManagerId:[this.results.subGroupManagerId],
              subGroupRegNo:[this.results.subGroupRegNo],
              subGroupLocation:[this.results.subGroupLocation],
              subGroupPhone:[this.results.subGroupPhone],
              subGroupFormationDate:[this.results.subGroupFormationDate],
              subGroupStatus:[this.results.subGroupStatus],
              subGroupFirstMeetingDate:[this.results.subGroupFirstMeetingDate],
              subGroupNextMeetingDate:[this.results.subGroupNextMeetingDate],
              subGroupChairperson:[this.results.subGroupChairperson],
              subGroupSecretary:[this.results.subGroupSecretary],
              subGroupTreasurer:[this.results.subGroupTreasurer],
              subGroupTotalMembers:[this.results.subGroupTotalMembers],
              subGroupMeetingFrequency:[this.results.subGroupMeetingFrequency],
              subGroupSavingsAc:[this.results.subGroupSavingsAc],
              subGroupTotalSavingBalance:[this.results.subGroupTotalSavingBalance],
              subGroupLoanAc:[this.results.subGroupLoanAc],
              subGroupLoanBalance:[this.results.subGroupLoanBalance],
              verifiedBy:[this.results.verifiedBy],
              verifiedFlag:[this.results.verifiedFlag],
              verifiedTime: [this.results.verifiedTime],
              deletedBy:[this.results.deletedBy],
              deletedFlag:[this.results.deletedFlag],
              deletedTime:[this.results.deletedTime],
              modifiedBy:[this.results.modifiedBy],
              modifiedTime:[this.results.modifiedTime],
              postedBy:[this.results.postedBy],
              postedFlag:[this.results.postedFlag],
              postedTime:[this.results.postedTime],
              subGroupMembers: new FormArray([]),
            });
            this.subGroupMembersArrays = this.results.subGroupMembers;
            this.getMembers(this.subGroupMembersArrays);
            for(let i=0;i<this.subGroupMembersArrays.length;i++){
              this.s.push(this.fb.group(this.subGroupMembersArrays[i]));
            }
          })
 
        }
      }
    )
  }
  /****************************************************************************************************************************/
  // Adding Members To Group
/*************************************************************************************************************************/
customerName:any;
customerCode:any;
customerData:any;

groupMember = this.fb.group({
  id:[''],
  customerCode: ['', Validators.required],
  customerName: ['', Validators.required],
  mainGroupCode:['', Validators.required],
  subGroupCode: ['', Validators.required],
})

initGroupMembers(){
  this.groupMember = this.fb.group({
    id:[''],
    customerCode: [''],
    customerName: [''],
    mainGroupCode:[''],
    subGroupCode: [''],
  })
}
customerLookup():void{
  const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data;
    this.customerName = this.dialogData.firstName +" "+ this.dialogData.middleName+" "+this.dialogData.surname
    this.customerCode = this.dialogData.customerCode
    this.customerData = this.dialogData
    this.groupMember.controls.customerName.setValue(this.customerName);
    this.groupMember.controls.customerCode.setValue(this.customerCode);
    this.groupMember.controls.mainGroupCode.setValue(this.mainGroupCode);
    this.groupMember.controls.subGroupCode.setValue(this.subGroupCode);
  })
}

subGroupChairpersonLookup():void{
  const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
  });
  dialogRef.afterClosed().subscribe(results =>{
    this.dialogData = results.data;
    this.formData.controls.subGroupChairperson.setValue(results.data.customerCode)
  }) }
  subGroupSecretaryLookup():void{
    const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
    });
    dialogRef.afterClosed().subscribe(results =>{
      this.dialogData = results.data;
      this.formData.controls.subGroupSecretary.setValue(results.data.customerCode)
    }) }
    subGroupTreasurerLookup():void{
      const dialogRef =  this.dialog.open(RetailCustomerLookupComponent,{
      });
      dialogRef.afterClosed().subscribe(results =>{
        this.dialogData = results.data;
        this.formData.controls.subGroupTreasurer.setValue(results.data.customerCode)
      }) }

addGroupMember(){
  if(this.groupMember.valid){
    if(this.subGroupMembersArrays.length>=5){
      this._snackbar.open("You have Maximum NO.Of Sub Group Members", "X",{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }else{
      this.subGroupMembersArrays.push(this.groupMember.value)
      this.s.push(this.fb.group(this.groupMember.value));
      this.getMembers(this.subGroupMembersArrays);
      this.initGroupMembers();
    }
  }
}
onRemoveGroupMember(i:any){
  // const index: number = this.subGroupMembersArrays.indexOf(this.subGroupMembersArrays.values);
  this.subGroupMembersArrays.splice(this.subGroupMembersArrays[i]);
  this.subGroupMembersArrays = this.subGroupMembersArrays;
  this.getMembers(this.subGroupMembersArrays);
}
onTransferMember(rowData:any){
  const dialogRef =  this.dialog.open(TransferMemberComponent,{
    data:{
      mainGroupCode:this.mainGroupCode,
      mainGroupName:this.mainGroupName,
      subGroupCode:this.subGroupCode,
      subGroupName:this.subGroupName,
      customerData:rowData
    }
  });
}
onExitMember(rowData:any){
  if (window.confirm('Are you sure you want to Exit This Member?')){
    const dialogRef =  this.dialog.open(ExitMemberComponent,{
      data:{
        mainGroupCode:this.mainGroupCode,
        mainGroupName:this.mainGroupName,
        subGroupCode:this.subGroupCode,
        subGroupName:this.subGroupName,
        customerData:rowData
      }
    });
  }
}
  onSubmit(){ 
    console.log("Data", this.formData.value)
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
            this.router.navigate([`/system/GLS/sub-group/maintenance`], { skipLocationChange: true });
          },
          err =>{
            this.error = err.error.message
            this._snackbar.open(this.error, "Try Again",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['red-snackbar', 'login-snackbar']
            })
          }
        )
      } else if(this.function_type != "A-Add"){
        this.subscription = this.subService.updateSubGroups(this.formData.value).subscribe(
          res =>{
            this.results = res
            this._snackbar.open("Executed Successfully", "X",{
              horizontalPosition:this.horizontalPosition,
              verticalPosition:this.verticalPosition,
              duration:3000,
              panelClass:['green-snackbar', 'login-snackbar']

            });
            this.router.navigate([`/system/GLS/sub-group/maintenance`], { skipLocationChange: true });
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
    }else{
      this._snackbar.open("Invalid Form", "Try Again",{
        horizontalPosition:this.horizontalPosition,
        verticalPosition:this.verticalPosition,
        duration:3000,
        panelClass:['red-snackbar', 'login-snackbar']
      })
    }
  }

  }

