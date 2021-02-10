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
  mapdata2:any = [{
    "Name": "Café del Mar",
    "Type": "Other",
    "Lat": 38.9749961,
    "Lon": 1.290998836
  }, {
    "Name": "Space",
    "Type": "Other",
    "Lat": 38.88499646,
    "Lon": 1.401831726
  }, {
    "Name": "Privilege",
    "Type": "Other",
    "Lat": 38.954662848,
    "Lon": 1.404831714
  }, {
    "Name": "Amnesia",
    "Type": "Other",
    "Lat": 38.941996232,
    "Lon": 1.404831714
  }, {
    "Name": "DC10",
    "Type": "Other",
    "Lat": 38.874663168,
    "Lon": 1.38833178
  }, {
    "Name": "Es Paradis",
    "Type": "Other",
    "Lat": 38.973829438,
    "Lon": 1.304832114
  }, {
    "Name": "Portinatx",
    "Type": "Hotel",
    "Lat": 39.112355,
    "Lon": 1.517744
  }, {
    "Name": "Catalonia Royal Ses Savines",
    "Type": "Hotel",
    "Lat": 38.98384,
    "Lon": 1.53709
  }, {
    "Name": "One Ibiza Suites",
    "Type": "Hotel",
    "Lat": 38.90434,
    "Lon": 1.42121
  }, {
    "Name": "Ibizazen",
    "Type": "Hotel",
    "Lat": 38.95709,
    "Lon": 1.51283
  }, {
    "Name": "The Purple Hotel",
    "Type": "Hotel",
    "Lat": 38.98142,
    "Lon": 1.30093
  }, {
    "Name": "Hard Rock Hotel Ibiza",
    "Type": "Hotel",
    "Lat": 38.87807136,
    "Lon": 1.4023447
  }, {
    "Name": "Grand Palladium White Island",
    "Type": "Hotel",
    "Lat": 38.8767684,
    "Lon": 1.40142202
  }, {
    "Name": "Hotel Mirador Dalt Vila",
    "Type": "Hotel",
    "Lat": 38.90756528,
    "Lon": 1.43785715
  }, {
    "Name": "Sir Joan Hotel",
    "Type": "Hotel",
    "Lat": 38.91731596,
    "Lon": 1.43832922
  }, {
    "Name": "Petunia Ibiza",
    "Type": "Hotel",
    "Lat": 38.8986023303789,
    "Lon": 1.22012078762054
  }, {
    "Name": "Atlas_iw_hotel",
    "Type": "Hotel",
    "Lat": 38.985591540306,
    "Lon": 1.35759399963399
  }, {
    "Name": "Apartamentos Llobet Ibiza",
    "Type": "Hotel",
    "Lat": 38.9028407749128,
    "Lon": 1.42026856541634
  }, {
    "Name": "Can Pere Lifestyle & Spa",
    "Type": "Hotel",
    "Lat": 38.961872960702,
    "Lon": 1.4952939748764
  }, {
    "Name": "Migjorn Ibiza Suites & Spa",
    "Type": "Hotel",
    "Lat": 38.8900881475533,
    "Lon": 1.40749722719193
  }, {
    "Name": "Sud Ibiza Suites",
    "Type": "Hotel",
    "Lat": 38.9051383308896,
    "Lon": 1.42585765889544
  }, {
    "Name": "Hotel La Torre del Canonigo",
    "Type": "Hotel",
    "Lat": 38.9069954782868,
    "Lon": 1.43554240465164
  }, {
    "Name": "Can Do It",
    "Type": "Hotel",
    "Lat": 38.9806637258071,
    "Lon": 1.35177500545979
  }, {
    "Name": "AluaSoul Ibiza - Adults only",
    "Type": "Hotel",
    "Lat": 39.0001842821138,
    "Lon": 1.57696455717087
  }, {
    "Name": "Petunia Ibiza",
    "Type": "Hotel",
    "Lat": 38.8986023303789,
    "Lon": 1.22012078762054
  }, {
    "Name": "Villa Can Bernadet",
    "Type": "Hotel",
    "Lat": 38.985591540306,
    "Lon": 1.35759399963399
  }, {
    "Name": "Migjorn Ibiza Suites & Spa",
    "Type": "Hotel",
    "Lat": 38.8900881475533,
    "Lon": 1.40749722719193
  }, {
    "Name": "Romeos Ibiza",
    "Type": "Hotel",
    "Lat": 38.970008,
    "Lon": 1.28415
  }, {
    "Name": "Marvell Club Hotel & Apartments",
    "Type": "Hotel",
    "Lat": 38.9707841292334,
    "Lon": 1.28114841878414
  }, {
    "Name": "Ibiza Panoramic",
    "Type": "Hotel",
    "Lat": 38.9056473918759,
    "Lon": 1.39000117778778
  }, {
    "Name": "Portinatx Beach Club Hotel",
    "Type": "Hotel",
    "Lat": 39.1097170575075,
    "Lon": 1.51119947433472
  }, {
    "Name": "THB Ocean Beach",
    "Type": "Hotel",
    "Lat": 38.9718903872837,
    "Lon": 1.30563924267335
  }, {
    "Name": "Oasis Villas",
    "Type": "Hotel",
    "Lat": 38.95203,
    "Lon": 1.517953
  }, {
    "Name": "Gran Hotel Montesol Ibiza",
    "Type": "Hotel",
    "Lat": 38.9100396016929,
    "Lon": 1.43448829650879
  }, {
    "Name": "Marble Stella Maris Ibiza",
    "Type": "Hotel",
    "Lat": 38.9956066544494,
    "Lon": 1.2925136089325
  }, {
    "Name": "Destino Pacha Ibiza",
    "Type": "Hotel",
    "Lat": 38.9162683249503,
    "Lon": 1.46836996078491
  }, {
    "Name": "W Ibiza",
    "Type": "Hotel",
    "Lat": 38.981167,
    "Lon": 1.531442
  }, {
    "Name": "Agroturismo Can Planells",
    "Type": "Hotel",
    "Lat": 39.050156,
    "Lon": 1.423568
  }, {
    "Name": "Pure House Ibiza",
    "Type": "Hotel",
    "Lat": 38.916027,
    "Lon": 1.391781
  }, {
    "Name": "Sunset Oasis Ibiza",
    "Type": "Hotel",
    "Lat": 38.963013,
    "Lon": 1.293322
  }, {
    "Name": "Ca Na Xica",
    "Type": "Hotel",
    "Lat": 39.04354,
    "Lon": 1.436236
  }, {
    "Name": "Pikes Ibiza",
    "Type": "Hotel",
    "Lat": 38.99104,
    "Lon": 1.320009
  }, {
    "Name": "The Boat House",
    "Type": "Restaurant",
    "Lat": 39.075203,
    "Lon": 1.590599
  }, {
    "Name": "Ajo Blanco Vermuteria Ibiza",
    "Type": "Restaurant",
    "Lat": 38.894398,
    "Lon": 1.408613
  }, {
    "Name": "Ohana Ibiza",
    "Type": "Restaurant",
    "Lat": 38.89595,
    "Lon": 1.414245
  }, {
    "Name": "El Bistro de Stephan San Antonio Ibiza",
    "Type": "Restaurant",
    "Lat": 38.98026,
    "Lon": 1.304652
  }, {
    "Name": "Loveat Ibiza",
    "Type": "Restaurant",
    "Lat": 38.90091,
    "Lon": 1.418457
  }, {
    "Name": "La Cabana Ibiza Restaurant",
    "Type": "Restaurant",
    "Lat": 38.89533,
    "Lon": 1.405969
  }, {
    "Name": "Mariner Ibiza",
    "Type": "Restaurant",
    "Lat": 38.969547,
    "Lon": 1.276034
  }, {
    "Name": "Caos Ibiza",
    "Type": "Restaurant",
    "Lat": 38.90538,
    "Lon": 1.422715
  }, {
    "Name": "Restaurante Sa Soca",
    "Type": "Restaurant",
    "Lat": 38.955147,
    "Lon": 1.30744
  }, {
    "Name": "La Cita ibiza",
    "Type": "Restaurant",
    "Lat": 38.978783,
    "Lon": 1.301528
  }, {
    "Name": "Sa Cova",
    "Type": "Restaurant",
    "Lat": 38.90855,
    "Lon": 1.437716
  }, {
    "Name": "Es Tragon",
    "Type": "Restaurant",
    "Lat": 38.995754,
    "Lon": 1.291633
  }, {
    "Name": "San Martino",
    "Type": "Restaurant",
    "Lat": 38.983665,
    "Lon": 1.535292
  }, {
    "Name": "Bebel",
    "Type": "Restaurant",
    "Lat": 38.908455,
    "Lon": 1.433384
  }, {
    "Name": "Restaurante Rasca Lobos",
    "Type": "Restaurant",
    "Lat": 38.891037,
    "Lon": 1.394728
  }, {
    "Name": "La Cantinella Ibiza",
    "Type": "Restaurant",
    "Lat": 38.912743,
    "Lon": 1.448204
  }, {
    "Name": "Can Nuts",
    "Type": "Restaurant",
    "Lat": 38.951977,
    "Lon": 1.518606
  }, {
    "Name": "Bottega Panevino By Osteria la taverna",
    "Type": "Restaurant",
    "Lat": 38.90127,
    "Lon": 1.394272
  }, {
    "Name": "Soleado",
    "Type": "Restaurant",
    "Lat": 38.904827,
    "Lon": 1.425584
  }, {
    "Name": "Bistro 51",
    "Type": "Restaurant",
    "Lat": 38.985683,
    "Lon": 1.534822
  }, {
    "Name": "Es Virot Restaurante",
    "Type": "Restaurant",
    "Lat": 38.968555,
    "Lon": 1.297184
  }, {
    "Name": "Casa manolo",
    "Type": "Restaurant",
    "Lat": 38.896168,
    "Lon": 1.414644
  }, {
    "Name": "Es Gerret",
    "Type": "Restaurant",
    "Lat": 38.9807,
    "Lon": 1.29822
  }, {
    "Name": "Il Carrettino Siciliano",
    "Type": "Restaurant",
    "Lat": 38.99791,
    "Lon": 1.578915
  }];

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
    axios.all([axios.get(url1), axios.get(url2)]).then(axios.spread((DashboardAll, GetALLMachinesStatus) => {
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
      this.mapdata2 = this.mapdata2.map((v)=> {
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
