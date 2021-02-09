import { Component, OnInit } from '@angular/core';
import * as axios from 'node_modules/axios/dist/axios.min';
@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {
	option:any = {};
	useageList:any = [];
  min: any = false;
  top10count = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  	let url1 = 'http://monitor.cleanairspaces.com/index.php/api/router?app_id=1&method=DashboardAll&nonce=aa&user=cleanair&pwd=cleanair&type=1';
    url1 = './assets/data/DashboardAll.json';
    axios.get(url1).then((res) => {
    	let {usage} = res.data.data;
    	// console.log(usage);

	  	this.option = {
	      title: {
	        text: 'Usage',
	        right: '5%',
	        top: '5%',
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
	          name: 'usage',
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
	            {value: usage.app_count, name: 'app', itemStyle: {color: 'green'}},
	            {value: usage.web_count, name: 'web', itemStyle: {color: 'red'}},
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

	    let week_data = [].concat(usage.week_data);

	    week_data.sort((a, b) => {
	    	if (Number(a.count) > Number(b.count)) return -1;
	    	if (Number(a.count) < Number(b.count)) return 1;
	    	if (Number(a.count) === Number(b.count)) return 0;
	    });
	    week_data.length = 10;
	    this.useageList = week_data;
      this.top10count = week_data.reduce((sum = 0, cur) => {
      	if (typeof sum === 'number') {
      		return Number(sum) + Number(cur.count);
      	} else {
      		return Number(sum.count) + Number(cur.count);
      	}
      	
      })


    });

  }

}
