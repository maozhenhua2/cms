import { Component, OnInit } from '@angular/core';

import * as axios from 'node_modules/axios/dist/axios.min';

@Component({
  selector: 'app-monitor-and-server',
  templateUrl: './monitor-and-server.component.html',
  styleUrls: ['./monitor-and-server.component.scss']
})
export class MonitorAndServerComponent implements OnInit {
	monitors:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  	let url1 = 'http://monitor.cleanairspaces.com/index.php/api/router?app_id=1&method=DashboardAll&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url1 = './assets/data/DashboardAll.json';

    axios.get(url1).then((res) => {
    	let {monitors, server} = res.data.data;
    	// this.monitors = monitors;
    	// console.log(monitors)
    	monitors = monitors.map((val, index) => {
    		let time:any = this.overTime(val.date_reading);
    		let timeText = `${Math.floor(time.value)} ${time.title} ago`;
    		let obj = {
    			status: val.status,
    			type: val.monitor_id,
    			name: val.name_en,
    			time: timeText,
    			timeValue: new Date(val.date_reading).getTime()
    		}
    		// console.log(obj)
    		return obj;
    	});

    	monitors = monitors.sort((a, b)=> {
    		if (a.timeValue > b.timeValue) return -1;
    		if (a.timeValue < b.timeValue) return 1;
    		if (a.timeValue === b.timeValue) return 0;
    	});

    	console.log(monitors)
    	this.monitors = monitors;

    });

  }

  overTime(date) {
  	const times:number = new Date().getTime() - new Date(date).getTime();
  	const minute:number = 60 * 1000;
  	const hour:number = minute * 60;
  	const day:number = hour * 24;
  	const month:number = day * 30;
  	const year:number = day * 365;
  	let check = [year, month, day, hour, minute];
  	let checkTitle = ['year', 'month', 'day', 'hour', 'minute'];
  	let index = check.findIndex((v, i)=>{
  		// console.log(v, times, i)
  		return v < times;
  	});
  	let obj = {};

  	if (index !== -1) {
  		obj = {
	  		title: checkTitle[index],
	  		value: times/check[index]
	  	}
  	}
  	return obj;
  }

}
