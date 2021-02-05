import { Component, OnInit } from '@angular/core';

import * as echarts from 'echarts';
import * as langEN from 'echarts/lib/i18n/langEN';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
