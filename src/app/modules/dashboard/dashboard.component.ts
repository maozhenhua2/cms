import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as echarts from 'echarts';

// // 引入 echarts 主模块。
// import * as echarts from 'echarts/lib/echarts';
// // 引入折线图。
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// // 引入提示框组件、标题组件、工具箱组件。
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/toolbox';


import * as L from 'node_modules/leaflet/dist/leaflet';
// leaflet 热点聚合插件
import 'leaflet.markercluster';
// 很重要，不然缩放的时候这2张图片会报404
import "node_modules/leaflet/dist/images/marker-icon-2x.png";
import "node_modules/leaflet/dist/images/marker-shadow.png";

// mock data
import { addressPoints } from '../../../assets/data/addressPoints';

import ApexCharts from 'apexcharts';
import en from 'node_modules/apexcharts/dist/locales/en.json';
import es from 'node_modules/apexcharts/dist/locales/es.json';
import cn from 'node_modules/apexcharts/dist/locales/zh-cn.json';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: true }) pickerDirective: DaterangepickerDirective;
  @ViewChild('map') mapid: ElementRef;
  @ViewChild('chart1') chart1: ElementRef;
  @ViewChild('chart2') chart2: ElementRef;
  @ViewChild('chart3') chart3: ElementRef;

  selected: {
    startDate: moment.Moment,
    endDate: moment.Moment
  };

  en: any = en;
  alwaysShowCalendars: boolean;
  inlineDate: any;
  inlineDateTime: any;
  picker: DaterangepickerComponent;
  prevDate: any = moment().subtract('days', 15).format('D MMMM') + ' - ' + moment().subtract('days', 8).format('D MMMM YYYY');

  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month')
    ]
  };

  locale: any = {
    format: 'D MMMM YYYY',
    displayFormat: 'D MMMM YYYY',
    separator: ' - ',
    cancelLabel: 'Cancel',
    applyLabel: 'Apply'
  }

  map;
  heightSmall: boolean = true;
  charts1;
  charts2;
  charts3;
  option3;
  events;


  constructor() {
    this.alwaysShowCalendars = true;
    this.selected = {
      startDate: moment().subtract('days', 7),
      endDate: moment()
    };

  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initMap();


    var options = {
      series: [{
        name: 'Website Blog',
        type: 'bar',
        data: [440, 505, 414, 671, 227]
      }, {
        name: 'Social Media',
        type: 'line',
        data: [23, 42, 35, 27, 43]
      },],
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 5,
      },
      colors: [function ({
        value,
        seriesIndex,
        w
      }) {
        if (value < 400) {
          return '#7E36AF'
        } else {
          return '#D9534F'
        }
      },],
      grid: {
        show: true,
        borderColor: '#90A4AE',
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
        row: {
          colors: ['#000000', '#333333', '#666666', '#999999', '#101010', '#111111']
        },
        strokeDashArray: 1,
      },
      chart: {
        width: '100%',
        height: '100%',
        type: 'line',
        locales: [en],
        defaultLocale: 'en',
      },
      title: {
        text: 'Traffic Sources'
      },
      labels: ['2001', '2002', '2003', '2004', '2005'],
      xaxis: {
        type: 'datetime'
      },
      yaxis: [{
        title: {
          text: 'Website Blog',
        },
      }, {
        opposite: true,
        title: {
          text: 'Social Media'
        }
      }],
    };
    this.charts1 = this.setChart1(this.chart1.nativeElement, options);
    this.charts2 = this.setChart1(this.chart2.nativeElement, options);
    // this.charts3 = this.setChart1(this.chart3.nativeElement, options);
    // fromEvent(window, 'resize').pipe(debounceTime(500)).subscribe(val => {
    //     console.log(`Debounced`);
    // });

    this.option3 = {
      toolbox: {
        show: true,
        feature: {
          restore: {
            show: true
          }
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };

    this.charts3 = echarts.init(document.getElementById('chart3'), null, { renderer: 'svg' });

    this.charts3.setOption(this.option3);


    window.onresize = () => {
      this.charts3.resize();
    };
  }

  addItem(e) {
    console.log('parent expand')
    this.heightSmall = !e;
    setTimeout(() => {
      this.charts3.resize();
    })

  }

  setChart1(el: any, option: any) {

    var chart = new ApexCharts(el, option);

    chart.render();

    return chart;
  }

  initMap(): void {
    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let map = L.map('mapid').setView([-37.82, 175.24], 12);
    L.tileLayer(url).addTo(map);
    let markers = L.markerClusterGroup();
    for (let i = 0; i < addressPoints.length; i++) {
      let a = addressPoints[i];
      let title = a[2];
      let marker = L.marker(new L.LatLng(a[0], a[1]), {
        title: title
      });
      marker.bindPopup(title);
      markers.addLayer(marker);
    }
    map.addLayer(markers);
  }

  ngModelChange(e) {
    let gap = (e.endDate).diff((e.startDate), 'days');
    this.prevDate = moment(e.startDate).subtract('days', gap).format('D MMMM') + ' - ' + moment(e.startDate).subtract('days', 1).format('D MMMM YYYY');
  }

  choosedDate(e) {
    this.inlineDate = e;
  }

  choosedDateTime(e) {
    this.inlineDateTime = e;
  }

  open(e) {
    this.pickerDirective.open(e);
  }

  clear(e) {
    this.selected = null;
  }

}