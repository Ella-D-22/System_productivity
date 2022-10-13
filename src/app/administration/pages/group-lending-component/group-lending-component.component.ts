import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchesLookupComponent } from '../branches/branches-lookup/branches-lookup.component';
import { RetailCustomerLookupComponent } from '../CustomersComponent/retail-customer/retail-customer-lookup/retail-customer-lookup.component';
import { ExitMemberComponent } from './exit-member/exit-member.component';
import { GroupLendingService } from './group-lending.service';
import { TransferMemberComponent } from './transfer-member/transfer-member.component';

@Component({
  selector: 'app-group-lending-component',
  templateUrl: './group-lending-component.component.html',
  styleUrls: ['./group-lending-component.component.scss'],
})
export class GroupLendingComponentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  operationArray: any = ['Transfer Member', 'Exit Member', 'Reinstate Member'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'customerCode',
    'customerName',
    'groupName',
    'Operations',
  ];
  dataSource!: MatTableDataSource<any>;
  groupDisplayedColumns: string[] = [
    'index',
    'groupCode',
    'groupName',
    'Operations',
  ];
  groupDataSource!: MatTableDataSource<any>;
  groupIndex: any;
  newgroup = true;
  newMember = true;
  filtergroup(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.groupDataSource.filter = filterValue.trim().toLowerCase();
    if (this.groupDataSource.paginator) {
      this.groupDataSource.paginator.firstPage();
    }
  }
  groupCode: any;
  groupName: any;
  groupId: any;
  dialogData: any;
  message: any;
  function_type: any;
  isSubmitted: boolean;
  loading: boolean;
  error: string;
  groupArrays = new Array();
  groupMembersArrays = new Array();
  havegroups = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isEnabled = false;
  subscription: Subscription;
  results: any;
  submitted = false;
  constructor(
    private groupLendingAPI: GroupLendingService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getPage();
  }
  formData = this.fb.group({
    id: [''],
    groupCode: ['', Validators.required],
    groupName: ['', Validators.required],
    groupId: ['', Validators.required],
    groupSolCode: ['', Validators.required],
    groupBranchName: ['', Validators.required],
    groupManagerId: ['', Validators.required],
    groupRegNo: ['', Validators.required],
    groupLocation: ['', Validators.required],
    groupPhone: ['', Validators.required],
    groupFormationDate: ['', Validators.required],
    groupStatus: ['', Validators.required],
    groupFirstMeetingDate: ['', Validators.required],
    groupNextMeetingDate: ['', Validators.required],
    groupChairperson: ['', Validators.required],
    groupSecretary: ['', Validators.required],
    groupTreasurer: ['', Validators.required],
    groupTotalMembers: ['', Validators.required],
    groupMeetingFrequency: ['', Validators.required],
    groupSavingsAc: ['', Validators.required],
    groupTotalSavingBalance: ['', Validators.required],
    groupLoanAc: ['', Validators.required],
    groupLoanBalance: ['', Validators.required],
    havegroups: ['', Validators.required],
    maxNogroups: ['10', Validators.required],
    maxNogroupMembers: ['5', Validators.required],
    verifiedBy: ['', Validators.required],
    verifiedFlag: ['', Validators.required],
    verifiedTime: ['', Validators.required],
    deletedBy: ['', Validators.required],
    deletedFlag: ['', Validators.required],
    deletedTime: ['', Validators.required],
    modifiedBy: ['', Validators.required],
    modifiedTime: ['', Validators.required],
    postedBy: ['', Validators.required],
    postedFlag: ['', Validators.required],
    postedTime: ['', Validators.required],
    groups: new FormArray([]),
    groupMembers: new FormArray([]),
  });
  get f() {
    return this.formData.controls;
  }
  get g() {
    return this.f.groups as FormArray;
  }
  get s() {
    return this.f.groupMembers as FormArray;
  }
  disabledFormControl() {
    this.formData.disable();
  }
  /*
   * group Maintenance
   */

  getgroup(groupArrays: any) {
    // group Array
    this.groupDataSource = new MatTableDataSource(groupArrays);
    this.groupDataSource.paginator = this.paginator;
    this.groupDataSource.sort = this.sort;
  }

  onHavegroups() {
    this.havegroups = true;
  }
  onNogroups() {
    this.havegroups = false;
  }
  groupForm = this.fb.group({
    groupCode: ['', Validators.required],
    groupName: ['', Validators.required],
  });
  initgroupForm() {
    this.groupForm = this.fb.group({
      groupCode: ['', Validators.required],
      groupName: ['', Validators.required],
    });
  }
  updategroupForm(i: any) {
    this.groupForm = this.fb.group({
      groupCode: [i.groupCode, Validators.required],
      groupName: [i.groupName, Validators.required],
    });
  }

  onAddgroup() {
    this.newgroup = true;
    // Check if it has reach max
    if (this.groupArrays.length >= this.formData.controls.maxNogroups.value) {
      this._snackbar.open(
        'Already Have a Max No of groups Allowed',
        'Try Again',
        {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        }
      );
    } else {
      if (this.groupForm.valid) {
        // this.g.push(this.fb.group(this.groupForm.value));
        this.groupArrays.push(this.groupForm.value);
        this.getgroup(this.groupArrays);
        this.initgroupForm();
      } else {
        this._snackbar.open('Invalid group Form', 'Try Again', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      }
    }
  }

  onUpdategroup(i: any) {
    this.groupIndex = i;
    this.newgroup = false;
    this.updategroupForm(this.groupArrays[i]);
  }
  updategroup(i: any) {
    this.groupArrays[i] = this.groupForm.value;
    this.getgroup(this.groupArrays);
    this.newgroup = true;
    this.initgroupForm();
  }
  onRemovegroup(i: any) {
    this.groupArrays.splice(i, 1);
    this.getgroup(this.groupArrays);
  }

  // End of group Operations

  /****************************************************************************************************************************/
  // Adding Members To Group
  /*************************************************************************************************************************/
  customerName: any;
  customerCode: any;
  customerData: any;

  groupMember = this.fb.group({
    id: [''],
    customerCode: ['', Validators.required],
    customerName: ['', Validators.required],
    groupCode: ['001', Validators.required],
    groupName: ['Main Group', Validators.required],
  });
  initGroupMembers() {
    this.groupMember = this.fb.group({
      id: [''],
      customerCode: ['', Validators.required],
      customerName: ['', Validators.required],
      groupCode: ['001', Validators.required],
      groupName: ['Main Group', Validators.required],
    });
  }
  customerLookup(): void {
    const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {});
    dialogRef.afterClosed().subscribe((results) => {
      this.dialogData = results.data;
      this.customerName =
        this.dialogData.firstName +
        ' ' +
        this.dialogData.middleName +
        ' ' +
        this.dialogData.surname;
      this.customerCode = this.dialogData.customerCode;
      this.customerData = this.dialogData;
      this.groupMember.controls.customerName.setValue(this.customerName);
      this.groupMember.controls.customerCode.setValue(this.customerCode);
      this.groupMember.controls.groupCode.setValue(this.groupCode);
      this.groupMember.controls.groupCode.setValue(this.groupCode);
    });
  }
  getMembers(dataArray: any) {
    this.dataSource = new MatTableDataSource(dataArray);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addGroupMember() {
    console.log('Hey form', this.groupMember.value);

    this.newMember = true;
    if (this.groupMember.valid) {
      if (
        this.groupMembersArrays.filter(
          (data) => data.groupName === this.groupMember.controls.groupName.value
        ).length >= this.formData.controls.maxNogroupMembers.value
      ) {
        this._snackbar.open('You have Maximum NO.Of Sub Group Members', 'X', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
        });
      } else {
        this.groupMembersArrays.push(this.groupMember.value);
        this.getMembers(this.groupMembersArrays);
        this.initGroupMembers();
      }
    } else {
      this._snackbar.open('Invalid Group Member Form', 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }
  onRemoveGroupMember(i: any) {
    this.newMember = true;
    this.groupMembersArrays.splice(i, 1);
    this.getMembers(this.groupMembersArrays);
  }
  onTransferMember(rowData: any) {
    const dialogRef = this.dialog.open(TransferMemberComponent, {
      data: {
        groupCode: this.groupCode,
        groupName: this.groupName,
        customerData: rowData,
      },
    });
  }
  onExitMember(rowData: any) {
    if (window.confirm('Are you sure you want to Exit This Member?')) {
      const dialogRef = this.dialog.open(ExitMemberComponent, {
        data: {
          groupCode: this.groupCode,
          groupName: this.groupName,
          customerData: rowData,
        },
      });
    }
  }

  // groupMember

  branchLookup(): void {
    const dialogRef = this.dialog.open(BranchesLookupComponent, {});
    dialogRef.afterClosed().subscribe((results) => {
      this.dialogData = results.data;
      this.formData.controls.groupSolCode.setValue(results.data.solCode);
      this.formData.controls.groupBranchName.setValue(
        this.dialogData.solDescription
      );
    });
  }
  getPage() {
    this.subscription = this.groupLendingAPI.currentMessage.subscribe(
      (message) => {
        this.message = message;
        (this.function_type = this.message.function_type),
          (this.groupCode = this.message.groupCode),
          (this.groupId = this.message.groupId),
          (this.groupName = this.message.groupName),
          (this.groupCode = this.message.groupCode),
          (this.groupName = this.message.groupName),
          (this.groupName = this.message.groupName);
        if (this.function_type == 'A-Add') {
          this.isEnabled = true;
          this.isSubmitted = true;
          this.formData = this.fb.group({
            id: [''],
            groupCode: [this.groupCode],
            groupName: [this.groupName],
            groupId: [this.groupId],
            groupSolCode: [''],
            groupBranchName: [''],
            groupManagerId: [''],
            groupRegNo: [''],
            groupLocation: [''],
            groupPhone: [''],
            groupFormationDate: [''],
            groupStatus: [''],
            groupFirstMeetingDate: [''],
            groupNextMeetingDate: [''],
            groupChairperson: [''],
            groupSecretary: [''],
            groupTreasurer: [''],
            groupTotalMembers: [''],
            groupMeetingFrequency: [''],
            groupSavingsAc: [''],
            groupTotalSavingBalance: [''],
            havegroups: [''],
            maxNogroups: ['10'],
            maxNogroupMembers: ['5'],
            groupLoanAc: [''],
            groupLoanBalance: [''],
            verifiedBy: ['user'],
            verifiedFlag: ['N'],
            verifiedTime: [new Date()],
            deletedBy: ['user'],
            deletedFlag: ['N'],
            deletedTime: [new Date()],
            modifiedBy: ['user'],
            modifiedTime: [new Date()],
            postedBy: ['user'],
            postedFlag: ['Y'],
            postedTime: [new Date()],
            groups: new FormArray([]),
            groupMembers: new FormArray([]),
          });
        } else if (this.function_type == 'I-Inquire') {
          this.loading = true;
          this.subscription = this.groupLendingAPI
            .getGroupByCode(this.groupCode)
            .subscribe((res) => {
              this.loading = false;
              this.results = res;
              this.isEnabled = true;
              this.isSubmitted = true;
              this.formData = this.fb.group({
                id: [this.results.id],
                groupCode: [this.results.groupCode],
                groupName: [this.results.groupName],
                groupId: [this.results.groupId],
                groupSolCode: [this.results.groupSolCode],
                groupBranchName: [this.results.groupBranchName],
                groupManagerId: [this.results.groupManagerId],
                groupRegNo: [this.results.groupRegNo],
                groupLocation: [this.results.groupLocation],
                groupPhone: [this.results.groupPhone],
                groupFormationDate: [this.results.groupFormationDate],
                groupStatus: [this.results.groupStatus],
                groupFirstMeetingDate: [this.results.groupFirstMeetingDate],
                groupNextMeetingDate: [this.results.groupNextMeetingDate],
                groupChairperson: [this.results.groupChairperson],
                groupSecretary: [this.results.groupSecretary],
                groupTreasurer: [this.results.groupTreasurer],
                groupTotalMembers: [this.results.groupTotalMembers],
                groupMeetingFrequency: [this.results.groupMeetingFrequency],
                groupSavingsAc: [this.results.groupSavingsAc],
                groupTotalSavingBalance: [this.results.groupTotalSavingBalance],
                groupLoanAc: [this.results.groupLoanAc],
                groupLoanBalance: [this.results.groupLoanBalance],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                groupMembers: new FormArray([]),
              });
              this.groupMembersArrays = this.results.groupMembers;
              this.getMembers(this.groupMembersArrays);
              for (let i = 0; i < this.groupMembersArrays.length; i++) {
                this.s.push(this.fb.group(this.groupMembersArrays[i]));
              }
            });
        } else if (this.function_type == 'M-Modify') {
          this.loading = true;
          this.subscription = this.groupLendingAPI
            .getGroupByCode(this.groupCode)
            .subscribe((res) => {
              this.loading = false;
              this.results = res;
              this.isEnabled = true;
              this.isSubmitted = true;
              this.formData = this.fb.group({
                id: [this.results.id],
                groupCode: [this.results.groupCode],
                groupName: [this.results.groupName],
                groupId: [this.results.groupId],
                groupSolCode: [this.results.groupSolCode],
                groupBranchName: [this.results.groupBranchName],
                groupManagerId: [this.results.groupManagerId],
                groupRegNo: [this.results.groupRegNo],
                groupLocation: [this.results.groupLocation],
                groupPhone: [this.results.groupPhone],
                groupFormationDate: [this.results.groupFormationDate],
                groupStatus: [this.results.groupStatus],
                groupFirstMeetingDate: [this.results.groupFirstMeetingDate],
                groupNextMeetingDate: [this.results.groupNextMeetingDate],
                groupChairperson: [this.results.groupChairperson],
                groupSecretary: [this.results.groupSecretary],
                groupTreasurer: [this.results.groupTreasurer],
                groupTotalMembers: [this.results.groupTotalMembers],
                groupMeetingFrequency: [this.results.groupMeetingFrequency],
                groupSavingsAc: [this.results.groupSavingsAc],
                groupTotalSavingBalance: [this.results.groupTotalSavingBalance],
                groupLoanAc: [this.results.groupLoanAc],
                groupLoanBalance: [this.results.groupLoanBalance],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                groupMembers: new FormArray([]),
              });
              this.groupMembersArrays = this.results.groupMembers;
              this.getMembers(this.groupMembersArrays);
              for (let i = 0; i < this.groupMembersArrays.length; i++) {
                this.s.push(this.fb.group(this.groupMembersArrays[i]));
              }
            });
        } else if (this.function_type == 'X-Delete') {
          this.loading = true;
          this.subscription = this.groupLendingAPI
            .getGroupByCode(this.groupCode)
            .subscribe((res) => {
              this.loading = false;
              this.results = res;
              this.isEnabled = true;
              this.isSubmitted = true;
              this.formData = this.fb.group({
                id: [this.results.id],
                groupCode: [this.results.groupCode],
                groupName: [this.results.groupName],
                groupId: [this.results.groupId],
                groupSolCode: [this.results.groupSolCode],
                groupBranchName: [this.results.groupBranchName],
                groupManagerId: [this.results.groupManagerId],
                groupRegNo: [this.results.groupRegNo],
                groupLocation: [this.results.groupLocation],
                groupPhone: [this.results.groupPhone],
                groupFormationDate: [this.results.groupFormationDate],
                groupStatus: [this.results.groupStatus],
                groupFirstMeetingDate: [this.results.groupFirstMeetingDate],
                groupNextMeetingDate: [this.results.groupNextMeetingDate],
                groupChairperson: [this.results.groupChairperson],
                groupSecretary: [this.results.groupSecretary],
                groupTreasurer: [this.results.groupTreasurer],
                groupTotalMembers: [this.results.groupTotalMembers],
                groupMeetingFrequency: [this.results.groupMeetingFrequency],
                groupSavingsAc: [this.results.groupSavingsAc],
                groupTotalSavingBalance: [this.results.groupTotalSavingBalance],
                groupLoanAc: [this.results.groupLoanAc],
                groupLoanBalance: [this.results.groupLoanBalance],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                groupMembers: new FormArray([]),
              });
              this.groupMembersArrays = this.results.groupMembers;
              this.getMembers(this.groupMembersArrays);
              for (let i = 0; i < this.groupMembersArrays.length; i++) {
                this.s.push(this.fb.group(this.groupMembersArrays[i]));
              }
            });
        } else if (this.function_type == 'V-Verify') {
          this.subscription = this.groupLendingAPI
            .getGroupByCode(this.groupCode)
            .subscribe((res) => {
              this.results = res;
              this.isEnabled = true;
              this.isSubmitted = true;
              this.formData = this.fb.group({
                id: [this.results.id],
                groupCode: [this.results.groupCode],
                groupName: [this.results.groupName],
                groupId: [this.results.groupId],
                groupSolCode: [this.results.groupSolCode],
                groupBranchName: [this.results.groupBranchName],
                groupManagerId: [this.results.groupManagerId],
                groupRegNo: [this.results.groupRegNo],
                groupLocation: [this.results.groupLocation],
                groupPhone: [this.results.groupPhone],
                groupFormationDate: [this.results.groupFormationDate],
                groupStatus: [this.results.groupStatus],
                groupFirstMeetingDate: [this.results.groupFirstMeetingDate],
                groupNextMeetingDate: [this.results.groupNextMeetingDate],
                groupChairperson: [this.results.groupChairperson],
                groupSecretary: [this.results.groupSecretary],
                groupTreasurer: [this.results.groupTreasurer],
                groupTotalMembers: [this.results.groupTotalMembers],
                groupMeetingFrequency: [this.results.groupMeetingFrequency],
                groupSavingsAc: [this.results.groupSavingsAc],
                groupTotalSavingBalance: [this.results.groupTotalSavingBalance],
                groupLoanAc: [this.results.groupLoanAc],
                groupLoanBalance: [this.results.groupLoanBalance],
                verifiedBy: [this.results.verifiedBy],
                verifiedFlag: [this.results.verifiedFlag],
                verifiedTime: [this.results.verifiedTime],
                deletedBy: [this.results.deletedBy],
                deletedFlag: [this.results.deletedFlag],
                deletedTime: [this.results.deletedTime],
                modifiedBy: [this.results.modifiedBy],
                modifiedTime: [this.results.modifiedTime],
                postedBy: [this.results.postedBy],
                postedFlag: [this.results.postedFlag],
                postedTime: [this.results.postedTime],
                groupMembers: new FormArray([]),
              });
              this.groupMembersArrays = this.results.groupMembers;
              this.getMembers(this.groupMembersArrays);
              for (let i = 0; i < this.groupMembersArrays.length; i++) {
                this.s.push(this.fb.group(this.groupMembersArrays[i]));
              }
            });
        }
      }
    );
  }

  groupChairpersonLookup(): void {
    const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {});
    dialogRef.afterClosed().subscribe((results) => {
      this.dialogData = results.data;
      this.formData.controls.groupChairperson.setValue(
        results.data.customerCode
      );
    });
  }
  groupSecretaryLookup(): void {
    const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {});
    dialogRef.afterClosed().subscribe((results) => {
      this.dialogData = results.data;
      this.formData.controls.groupSecretary.setValue(results.data.customerCode);
    });
  }
  groupTreasurerLookup(): void {
    const dialogRef = this.dialog.open(RetailCustomerLookupComponent, {});
    dialogRef.afterClosed().subscribe((results) => {
      this.dialogData = results.data;
      this.formData.controls.groupTreasurer.setValue(results.data.customerCode);
    });
  }
  onSubmit() {
    this.g.push(this.fb.group(this.groupArrays));
    this.s.push(this.fb.group(this.groupMember.value));
    console.log('after', this.formData.value);
    if (this.formData.valid) {
      if (this.function_type == 'A-Add') {
        this.isEnabled = true;
        this.subscription = this.groupLendingAPI
          .createGroup(this.formData.value)
          .subscribe(
            (res) => {
              this.results = res;
              this._snackbar.open('Executed Successfully', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              // this.router.navigate([`/system/GLS/sub-group/maintenance`], { skipLocationChange: true });
            },
            (err) => {
              this.error = err.error.message;
              this._snackbar.open(this.error, 'Try Again', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
            }
          );
      } else if (this.function_type != 'A-Add') {
        this.subscription = this.groupLendingAPI
          .updateGroups(this.formData.value)
          .subscribe(
            (res) => {
              this.results = res;
              this._snackbar.open('Executed Successfully', 'X', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
              // this.router.navigate([`/system/GLS/sub-group/maintenance`], { skipLocationChange: true });
            },
            (err) => {
              this.error = err;
              this._snackbar.open(this.error, 'Try Again', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
                panelClass: ['red-snackbar', 'login-snackbar'],
              });
            }
          );
      }
    } else {
      this._snackbar.open('Invalid Form', 'Try Again', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 3000,
        panelClass: ['red-snackbar', 'login-snackbar'],
      });
    }
  }
}
