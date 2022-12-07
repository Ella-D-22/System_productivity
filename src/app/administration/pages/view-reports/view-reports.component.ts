import { Component, OnInit,ViewChild,
  AfterViewInit,
  NgModule} from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatToolbar } from '@angular/material/toolbar';
  import { MatIcon } from '@angular/material/icon';
  import { Router } from '@angular/router';
  import { OrganizationService } from '../../Service/SystemConfigs/Organisation/organization.service';
  import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
})
export class ViewReportsComponent implements OnInit {

  displayedColumns: string[] = [
    'creationDate',
    'departmentEnum',
    'reportCategory',
    'ticketId',
    'timeTaken',
    'clientNameEnum',
    'productNameEnum',
    'report_description',
  ];
  fmData: any;
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog,
    private api: OrganizationService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation() != null) {
      this.fmData = this.router.getCurrentNavigation()?.extras.queryParams;
    }
  } 

  ngOnInit(): void {
    console.log("this.fmData: ", this.fmData)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
