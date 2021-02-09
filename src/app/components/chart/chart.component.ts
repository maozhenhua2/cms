import {ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';

import {CommfnService} from '../../services/commfn.service';
import {fromEvent, Observable, Subject} from 'rxjs';
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

  constructor(
    private zone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if ('series' in this.option.option) {
      console.log('ngOnChange');
      // console.log(this.option);
      if (!this.chart1) {
        console.log('ngOnChange--------');
        this.initChart();
      } else {
        this.chart1.clear();
        this.chart1.setOption(this.option.option);
      }
    }
  }


  // ngAfterViewChecked() {
  // console.log('ngAfterViewChecked');
  // console.log(this.chart.nativeElement.clientWidth);
  // }

  ngAfterViewInit() {
    // console.log(this.chart.nativeElement.clientWidth);
  }

  initChart() {
    // console.log(this.chart.nativeElement.clientWidth);
    let count = 0;
    let viewCheck = setInterval(() => {
      this.chart1.resize();
      count++;
      // console.log('viewCheck-------------------------');
      if (count > 5) {
        clearInterval(viewCheck);
      }
    }, 200);

    // console.log(this.option);
    this.zone.runOutsideAngular(() => {
      this.chart1 = CommfnService.renderEchart({
        dom: this.chart.nativeElement,
        id: 'chart',
        option: this.option.option
      });

    });


    // resize 防抖
    const resize = fromEvent(window, 'resize');
    const result = resize.pipe(debounceTime(50));
    result.subscribe(x => {
      this.chart1.resize();
    });
  }

}
