import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-lending',
  templateUrl: './widget-lending.component.html',
  styleUrls: ['./widget-lending.component.scss']
})
export class WidgetLendingComponent implements OnInit {
  highcharts = Highcharts;
  year: any;
  params: any;
  yearsSubscription!:Subscription;
  resData: any;
  options: any;
  barChartoptions: any;
  years: Object | undefined;
  needYear = false;
  needMonth = false;
  chartDispType: any = ['Year-wise','Month-wise','Date-wise']
  monthsArray: any = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  currentYear = new Date().getFullYear()
  currentMonth = this.monthsArray[new Date().getMonth()];
  month: any;
  yearArray: any;
  selectedYear: any;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getYears();
    this.getYearWiseData(2021);
  }
datewiseForm = this.fb.group({
  period:[''],
  year:[this.currentYear],
  month:[this.currentMonth],
})
getYears(){
  this.yearArray = ['2020','2021','2022']

}
onSelectPeriod(event:any){
    this.getYearWiseData(event.value)
}
getYearWiseData(year:any){
  this.barChartoptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Average Lending Paid per Month',
    },
    subtitle: {
      text: 'API Server',
    },
    xAxis: {
      categories: this.monthsArray,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Paid',
      },
    },
    credits: {
      enabled: false
  },
    tooltip: {
      headerFormat:
        '<span style = "font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
        '<td style = "padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Total Amount Paid',
        data: [973, 914, 4054, 732, 34,973, 914, 4054, 732, 34,2,22],
      },
    ],
  };
  Highcharts.chart('barChartOptions', this.barChartoptions);
}
}