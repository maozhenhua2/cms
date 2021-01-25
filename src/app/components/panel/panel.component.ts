import {Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-panel',
  // inputs: ['title', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements AfterViewInit {
  // @Input() evts: any;
  // @Input() evtChart: any;
  @Input() title: any;
  @Input() variant: any;
  @Input() noBody: any;
  @Input() noButton: any;
  @Input() bodyClass: any;
  @Input() footerClass: any;
  @Input() panelClass: any;

  @Output() newItemEvent = new EventEmitter<any>();
  @ViewChild('panelFooter', {static: false}) panelFooter;
  expand = false;
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;


  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.changeDetectorRef.detach();
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
  }


  ngOnChanges(changes): void {
  //   console.log('---1-2 ngOnChanges---');
  }

  // 监视@input变化
  ngDoCheck(): void {
    // console.log(this.title)
    // this.changeDetectorRef.detectChanges();
    // console.log('---3,7 ngDoCheck---');
  }

  // ngAfterContentInit(): void {
    // console.log('---4 ngAfterContentInit---');
  // }

  // ngAfterContentChecked(): void {
  //   console.log('---5,8 ngAfterContentChecked---');
  // }

  // ngAfterViewChecked(): void {
  //   console.log('---9 ngAfterViewChecked---');
  // }

  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy');
  // }

  panelExpand() {
    console.log('child expand');
    this.expand = !this.expand;
    this.newItemEvent.emit(this.expand);
    // this.changeDetectorRef.detectChanges();
    // this.evtChart.render();
  }

  panelReload() {
    this.reload = true;

    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }

  panelCollapse() {
    this.collapse = !this.collapse;
  }

  panelRemove() {
    this.remove = !this.remove;
  }
}
