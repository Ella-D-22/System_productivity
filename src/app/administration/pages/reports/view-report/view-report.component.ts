import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service'
//import { ReportDefination } from '../interfaces/report-defination'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  reports!: any

  constructor(private reportservice: ReportService, private router:Router) { }

  ngOnInit(): void {
    this.reportservice.allReports().subscribe(
      data =>{
        console.log(data)
        this.reports=data
      }
      )
  }
  specific(report: any){
    console.log(report);
    // this.router.navigate(['specific-report'],
    //   {
    //     state:
    //
    //       {
    //         message: report,
    //
    //        }
    //
    //   }
    // )
    this.router.navigate(['specific-report'],
      {
        state: {message: report}
      }
      )

  }

}
