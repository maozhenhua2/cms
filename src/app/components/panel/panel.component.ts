import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})

export class PanelComponent implements AfterViewInit {
  // @Input() evts: any;
  // @Input() evtChart: any;
  @Output() newItemEvent = new EventEmitter<any>();
  @ViewChild('panelFooter', { static: false }) panelFooter;
  expand = false;
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;


  constructor () { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0;
    });
  }

  panelExpand() {
    console.log('child expand')
    this.expand = !this.expand;
    this.newItemEvent.emit(this.expand);
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