import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-membership',
  templateUrl: './widget-membership.component.html',
  styleUrls: ['./widget-membership.component.scss']
})
export class WidgetMembershipComponent implements OnInit {
  highcharts = Highcharts;
  subscription!: Subscription;
  yearsSubscription!:Subscription;
  year: any;
  params: any;
  resData: any;
  options: any;
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
    private fb: FormBuilder
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
  this.options = {
    accessibility: {
        description: '',
    },
    title: {
       text: 'Average No of Members Annually'
    },
    subtitle: {
        text: 'Sources: API'
    },
    xAxis: {
        categories: this.monthsArray,
        tickmarkPlacement: 'on',
        title: {
          text: 'Years'
        }
    },

    yAxis: {
        min: 0,
        title: {
            text: 'Per MOnth',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    credits: {
      enabled: false
  },
    tooltip: {
        valueSuffix: ' Members'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Active ',
        data: [10, 58, 3556, 2897, 3434,4693, 4014, 4254, 3332, 4844,4122,4222],
      type: 'spline'
    }]
  }
  Highcharts.chart('Overal-Perfomance', this.options);

}
}