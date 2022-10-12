import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service'
//import { ReportDefination } from '../interfaces/report-defination'
import { Router } from '@angular/router';
import { LoanRepaymentComponent } from './loan-repayment/loan-repayment.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { LOanStatementComponent } from './loan-statement/loan-statement.component';
import { OfficeAccountsComponent } from './office-accounts/office-accounts.component';
import { ARREARSGENERALSTATEMENTComponent } from './arrearsgeneralstatement/arrearsgeneralstatement.component';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  reports!: any

  constructor(
    private reportservice: ReportService,
    private dialog: MatDialog,
     private router:Router) { }

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


//   acct() {
//     window.open('/assets/account_statement.pdf', '_blank');
//  }
//  loanstatement() {
//   window.open('/assets/loan_portifolio.pdf', '_blank');
// }

// loanrepayment() {
//   window.open('/assets/classified_assets.pdf', '_blank');
// }



acct(): void {
  const dialogRef = this.dialog.open(AccountStatementComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {

  });
}

loanstatement(): void {
  const dialogRef = this.dialog.open(LOanStatementComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {

  });
}


loanrepayment(): void {
  const dialogRef = this.dialog.open(LoanRepaymentComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {

  });
}

officeaccounts(): void {
  const dialogRef = this.dialog.open(OfficeAccountsComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {

  });
}

arrearsgenstatement(): void {
  const dialogRef = this.dialog.open(ARREARSGENERALSTATEMENTComponent, {
  });
  dialogRef.afterClosed().subscribe(result => {

  });
}




}
