import { Component, OnInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import axios from 'axios';

import * as L from 'node_modules/leaflet/dist/leaflet';
// leaflet 热点聚合插件
import 'leaflet.markercluster';
// 很重要，不然缩放的时候这2张图片会报404
import 'node_modules/leaflet/dist/images/marker-icon-2x.png';
import 'node_modules/leaflet/dist/images/marker-shadow.png';

import { CommfnService } from '../../services/commfn.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  @ViewChild('map') mapid: ElementRef;
  // @ViewChild('chart3') chart3: ElementRef;

  map;
  heightSmall: boolean = true;
  events;
  urls;
  links;
  equipments;


  status = {};

  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    
  }

  ngOnInit() {
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

  ngAfterViewInit() {
    let urls = this.router.url.split(('/')).filter((v) => !!v);
    axios.get('/assets/i18n/en.json').then((data) => {
      this.links = urls;
      this.urls = urls.map((v) => data[v]);
    });

    console.log('all_status' in this.status)

    let url1 = 'http://monitor.cleanairspaces.com/index.php/api/router?app_id=1&method=DashboardAll&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url1 = '/assets/data/DashboardAll.json';

    let url2 = 'http://monitor.cleanairspaces.com/index.php/api/router?app_id=1&method=GetALLMachinesStatus&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url2 = '/assets/data/GetALLMachinesStatus.json';
    let _this = this;
    axios.all([axios.get(url1), axios.get(url2)]).then(axios.spread((DashboardAll, GetALLMachinesStatus) => {
    	_this.initAll(DashboardAll.data.data, GetALLMachinesStatus.data.data);
    }))

  }

  initAll(data1, data2) {
  	this.zone.runOutsideAngular(() => {
      this.initMap(data1.locs);
      let {all_status, device_status, mon_status, outdoor_status} = data2;
      this.status = {all_status, device_status, mon_status, outdoor_status};
      // console.log(this.status);
      // echarts.registerLocale('EN', langEN);​
      // this.charts3 = echarts.init(document.getElementById('chart3'), null, { renderer: 'svg', /*locale: 'EN'*/ });
      // this.charts3.setOption(this.option3);
    });
  }
  
  initMap(loc:any): void {
    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let map = L.map('mapid').setView([0, 60], 0);
    L.tileLayer(url).addTo(map);
    let markers = L.markerClusterGroup();
    for (let i = 0; i < loc.length; i++) {
      let datas = loc[i];
      let title = datas.name_en;
      let marker = L.marker(new L.LatLng(datas.lat, datas.lon), {
        title: title
      });
      marker.bindPopup(title);
      markers.addLayer(marker);
    }
    map.addLayer(markers);

    map.on('click', function(...data) {
    	console.log(data)
    })
  }

  ngModelChange(e) {
  }

	iskey(key, obj){
		return key in obj;
	}

}
