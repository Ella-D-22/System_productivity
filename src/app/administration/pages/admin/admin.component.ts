import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  NgModule,
} from '@angular/core';

import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { OrganizationService } from '../../Service/SystemConfigs/Organisation/organization.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { AddEmployeeComponent } from './collage/add-employee/add-employee.component';
import { EditEmployeeComponent } from './collage/edit-employee/edit-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'email',
    'appUserRole',
     'designation',
    'password',
    'action',
  ];
emData: any;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  empDetails: any;

  constructor(public dialog: MatDialog, 
    private api: OrganizationService,
    private router: Router) {
      if (this.router.getCurrentNavigation() != null) {
        this.emData = this.router.getCurrentNavigation()?.extras.queryParams;
      }
    }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.api.get();

    this.api.get().subscribe({
      next: (res) => {
        this.empDetails = res;

        console.log('Emp Details' , this.empDetails);

        this.dataSource = new MatTableDataSource(this.empDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      // error: (err)=>{
      //   alert("Could not fetch Data");
      // }
    });
  }

  addEmployee() {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '35%',
      })
      .afterClosed()
      .subscribe((val) => {});
  }
  
  editEmployee(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(EditEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {});
  }

  

  deleteEmployee(id: number) {
    this.api.delete(id).subscribe({
      next: (res) => {
        alert('Employee Deleted Successfuly');
        this.getAllEmployees();
      },
      error: (res) => {
        alert('Error in Deleting the Record');
        this.getAllEmployees();
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
