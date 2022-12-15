import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  NgModule,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { OrganizationService } from '../../Service/SystemConfigs/Organisation/organization.service';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ReportsComponent } from '../reports/reports.component';
import { AddReportComponent } from './dialogs/add-report/add-report.component';
import { EditReportComponent } from './dialogs/edit-report/edit-report.component';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss'],
})
export class ViewReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'creationDate',
    'departmentEnum',
    'reportCategory',
    'ticketId',
    'timeTaken',
    'clientNameEnum',
    'productNameEnum',
    'action',
  ];
  fmData: any;
  userNameArray: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  reportForm: any;
  reportDetails: any;

  constructor(
    public dialog: MatDialog,
    private Api: OrganizationService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation() != null) {
      this.fmData = this.router.getCurrentNavigation()?.extras.queryParams;
    }
  }

  ngOnInit(): void {
    // console.log('this.fmData: ', this.fmData);
    this.getAllReports();
  }

  getAllReports() {
    this.Api.getReport().subscribe({
      next: (res) => {
        this.reportDetails = res;
        //
        console.log('this.reportDetails ', this.reportDetails);
        // console.log('this.userNameArray ', this.userNameArray);
        this.dataSource = new MatTableDataSource(this.reportDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      // error: (err)=>{
      //   alert("Could not fetch Data");
      // }
    });
  }

  addReport() {
    this.dialog
      .open(AddReportComponent, {
        width: '800px',
        
      })
      .afterClosed()
      .subscribe(val => {
        console.log('close add-dialog');
        this.reportForm = val;
      });
  }

  viewReport(row: any) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: row,
    };
    const dialogRef = this.dialog.open(EditReportComponent, dialogConfig);
    dialogRef.afterClosed()
    .subscribe(result => {
      console.log('closed dialog');
      this.reportForm = result;
    });
    
  }
  // deleteReport(id: number){
  //   this.Api.deleteReport(id)
  //   .subscribe({
  //     next: (res) => {
  //       alert(" Report deleted successfully!");
  //       this.getAllReports();
  //     },
  //     error: (res) => {
  //       alert(" Error deleting record!");
  //       this.getAllReports();
  //     }
  //   })
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // getAllReports() {
  //   // this.Api.get()

  //   this.Api.get().subscribe({
  //     next: (res) => {
  //       this.userNameArray = res;
  //       //
  //       console.log('this.userNameArray ', this.userNameArray);
  //       this.dataSource = new MatTableDataSource(this.userNameArray);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  // error: (err)=>{
  //   alert("Could not fetch Data");
  // }
  //   });
  // }
}
