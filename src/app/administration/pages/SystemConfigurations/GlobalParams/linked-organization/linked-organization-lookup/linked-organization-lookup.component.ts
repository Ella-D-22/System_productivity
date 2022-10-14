import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/@core/AuthService/auth.service';
import { OrganizationService } from 'src/app/administration/Service/SystemConfigs/Organisation/organization.service';
import { GlCodeLookupComponent } from '../../gl-code/gl-code-lookup/gl-code-lookup.component';
import { LinkedorganizationService } from '../linkedorganization.service';




@Component({
  selector: 'app-linked-organization-lookup',
  templateUrl: './linked-organization-lookup.component.html',
  styleUrls: ['./linked-organization-lookup.component.scss']
})
export class LinkedOrganizationLookupComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['index', 'organization_name', 'organization_mail', 'organization_address', 'organization_country', 'organization_main_office'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  respData: any;


  constructor(
    public dialogRef: MatDialogRef<GlCodeLookupComponent>,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    private authAPI: AuthService,
    public fb: FormBuilder,
    private linkedOrgAPI: LinkedorganizationService,
    private organizationService: OrganizationService) { }
  ngOnInit() {
    this.getData();
  }
  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
  getData() {
    this.organizationService.read().subscribe(res => {
      this.respData = res;
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.respData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("Organization details", this.respData);

    })
  }
  onSelect(data: any) {
    this.dialogRef.close({ event: 'close', data: data });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
