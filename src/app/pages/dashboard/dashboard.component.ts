import {Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef, HostListener} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
// import moment from 'moment';
// import {DaterangepickerComponent, DaterangepickerDirective} from 'ngx-daterangepicker-material';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import * as axios from 'node_modules/axios/dist/axios.min';


import {getMinified} from '../../services/commfn.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  map;
  heightSmall: boolean = true;
  events;
  urls;
  links;
  equipments;
  option;
  subject;

  mapdata = {};
  min: any = false;
  status: any = {
    // all_status: undefined,
    // device_status: undefined,
    // mon_status: undefined,
    // outdoor_status: undefined
  };


  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.subject = new Subject();
    this.option = {};
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    getMinified().subscribe(m => {
      // 随便改个值，触发app-chart的ngOnChanges
      this.min = m;
    });

    let urls = this.router.url.split(('/')).filter((v) => !!v);
    axios.get('/assets/i18n/en.json').then((data) => {
      this.links = urls;
      this.urls = urls.map((v) => data[v]);
    });

    let url1 = 'http://monitor.cleanairspaces.com/index.php/api/router?app_id=1&method=DashboardAll&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url1 = './assets/data/DashboardAll.json';

    let url2 = 'http://monitor.cleanairspaces.com/index.php/api/router?app_id=1&method=GetALLMachinesStatus&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url2 = './assets/data/GetALLMachinesStatus.json';
    let _this = this;
    axios.all([axios.get(url1), axios.get(url2)]).then(axios.spread((DashboardAll, GetALLMachinesStatus) => {
      _this.initAll(DashboardAll.data.data, GetALLMachinesStatus.data.data);
      this.mapdata = DashboardAll.data.data;

      this.option = {
        backgroundColor: '#fff',
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    }));

  }

  loadChart(data) {
    console.log(data);
  }

  getb(urls) {
    let arr = Array.from(urls);
    let urls2 = arr.map((v, i) => {
      let r = this.getp(i, arr);
      return r;
    });
    return urls2;
  }

  getp(i, arr) {
    let narr = arr.slice(0, i);
    let pre = narr.join('/');
    pre = pre !== '' ? '/' + pre : pre;
    return pre;
  }

  initAll(data1, data2) {
    this.zone.runOutsideAngular(() => {
      let {all_status, device_status, mon_status, outdoor_status} = data2;
      this.status = {all_status, device_status, mon_status, outdoor_status};
    });
  }

  ngModelChange(e) {
  }

  isHaskey(key, obj) {
    return key in obj;
  }

}
