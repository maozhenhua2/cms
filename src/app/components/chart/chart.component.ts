import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';

import {CommfnService} from '../../services/commfn.service';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() option: any;
  @ViewChild('chart') chart: ElementRef;

  chart1;

  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.chart1 = CommfnService.renderEchart({
        dom: this.chart.nativeElement,
        id: 'chart',
        option: this.option
      });

      setTimeout(()=> {
        this.chart1.resize()
      }, 100);
    });



    // resize 防抖
    const resize = fromEvent(window, 'resize');
    const result = resize.pipe(debounceTime(300));
    result.subscribe(x => { this.chart1.resize() });

  }

}
