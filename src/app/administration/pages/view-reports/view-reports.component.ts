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
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportsComponent } from '../reports/reports.component';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss'],
})
export class ViewReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'appUserRole',
    'designation',
    // 'password',
    'enabled',
    // 'action',
  ];
  fmData: any;
  userNameArray: any[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
reportForm: any;

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
    console.log('this.fmData: ', this.fmData);
    this.getAllReports();
  }

editReport(row: any){
  this.dialog.open(ReportsComponent,{
    data: row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllReports();
    }
  })
}
deleteReport(id: number){
  this.Api.deleteReport(id)
  .subscribe({
    next: (res) => {
      alert(" Report deleted successfully!");
      this.getAllReports();
    },
    error: (res) => {
      alert(" Error deleting record!");
      this.getAllReports();
    }
  })
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllReports() {
    // this.Api.get()

    this.Api.get().subscribe({
      next: (res) => {
        this.userNameArray = res;
        //
        console.log('this.userNameArray ', this.userNameArray);
        this.dataSource = new MatTableDataSource(this.userNameArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      // error: (err)=>{
      //   alert("Could not fetch Data");
      // }
    });
  }
}
