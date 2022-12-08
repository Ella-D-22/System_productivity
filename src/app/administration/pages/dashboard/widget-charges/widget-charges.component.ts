import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-widget-charges',
  templateUrl: './widget-charges.component.html',
  styleUrls: ['./widget-charges.component.scss']
})
export class WidgetChargesComponent implements OnInit {
  chartoptions: any;
  ngOnInit(): void {
    this.getYearWiseData();
  }
  getYearWiseData(){
    this.chartoptions = {
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      title : {
         text: 'Productivity Schedule'
      },
      tooltip : {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
       },
       credits: {
          enabled: false
      },
      plotOptions : {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: true,
               format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
               style: {
                  color: (Highcharts.theme)||
                  'black'
               }
            }
         }
      },
      series : [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Working days',   25.0],
            ['Non-working days',    9.5],
            ['Off days',     7.2],
            ['Field days',      1.7]
         ]
      }]
   };
    Highcharts.chart('chartOptions', this.chartoptions);

  }
}
