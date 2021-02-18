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
  loading = {show: true};
  mapdata2:any = [];

  map;
  heightSmall: boolean = true;
  events;
  urls;
  links;
  equipments;
  option;
  subject;

  dropdownPos = 'bottom-left';

  mapdata = {};
  min: any = false;
  status: any = {
    // all_status: undefined,
    // device_status: undefined,
    // mon_status: undefined,
    // outdoor_status: undefined
  };

  pct:any = 0;

  dropdown = [
    {text: 'All'},
    {text: 'Hotels'},
    {text: 'Restaurants'},
    {text: 'Other'},
  ];

  dropdownSelect = this.dropdown[0].text;


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
    this.setDropdownPos();
    this.changeDetectorRef.detectChanges();
    window.addEventListener('resize', () => {
      this.setDropdownPos();
      // console.log(document.querySelector('body').clientWidth)
    });

    getMinified().subscribe(m => {
      // 随便改个值，触发app-chart的ngOnChanges
      this.min = m;
    });

    // let urls = this.router.url.split(('/')).filter((v) => !!v);
    // axios.get('./assets/i18n/en.json').then((data) => {
    //   // console.log(data);
    //   this.links = urls;
    //   this.urls = urls.map((v) => data[v]);
    // });

    let host = 'http://monitor.cleanairspaces.com/index.php';
    let url1 = '/api/router?app_id=1&method=DashboardAll&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url1 = './assets/data/DashboardAll.json';

    let url2 = '/api/router?app_id=1&method=GetALLMachinesStatus&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url2 = './assets/data/GetALLMachinesStatus.json';
    let _this = this;

    let url3 = './assets/data/customersMapData.json';
    axios.all([axios.get(url1), axios.get(url2), axios.get(url3)]).then(axios.spread((DashboardAll, GetALLMachinesStatus, mapData) => {
      let status = {
        hotels: {nok: 1, ok: 1236},
        restaurants: {nok: 3, ok: 793},
        other: {nok: 5, ok: 862},
      };

      // _this.initAll(DashboardAll.data.data, GetALLMachinesStatus.data.data);
      // mock data
      _this.initAll(DashboardAll.data.data, status);
      /*{
        "Name": "Il Carrettino Siciliano",
        "Type": "Restaurant",
        "Lat": 38.99791,
        "Lon": 1.578915
      }*/

      this.mapdata2 = mapData.data.data.map((v)=> {
        return {
          name_en: v.Name,
          lat: String(v.Lat),
          lon: String(v.Lon),
        }
      });
      this.mapdata = DashboardAll.data.data.locs.concat(this.mapdata2);
      // this.mapdata = this.mapdata2;
      // console.log(this.mapdata)

      let issues = 0;
      let ok = 0;
      for (let key in status) {
        issues += status[key].nok;
        ok += status[key].ok;
      }

      let pct = ok / (ok + issues);
      // console.log(pct)
      this.pct = Number(pct * 100).toFixed(2);

      this.option = {
        title: {
          text: 'Device Utilization',
          right: '5%',
          bottom: '5%',
          textStyle: {
            color: '#fff'
          },
        },
        tooltip: {
          trigger: 'item'
        },
        toolbox: {
          show: false
        },
        legend: {
          show: false,
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#fff'
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['30%', '70%'],
            top: '0',
            left: '5%',
            center: ['50%', '40%'],
            label: {
              position: 'inside',
              formatter: '{c}\n{b}'
            },
            data: [
              {value: ok, name: 'Ok', itemStyle: {color: 'green'}},
              {value: issues, name: 'Issues', itemStyle: {color: 'red'}},
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


      // this.loading = {
      //   show: false
      // };

      this.loading.show = false;
    }));
  }

  setDropdownPos() {
    this.dropdownPos = document.querySelector('body').clientWidth < 768 ? 'bottom-right' : 'bottom-left';
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
      // let {all_status, device_status, mon_status, outdoor_status} = data2;
      // this.status = {all_status, device_status, mon_status, outdoor_status};
      this.status = data2;

    });
  }

  ngModelChange(e) {
  }

  isHaskey(key, obj) {
    return key in obj;
  }

  selectItem(value, index) {
    console.log(value, index);
    this.dropdownSelect = this.dropdown[index].text;
  }

}
