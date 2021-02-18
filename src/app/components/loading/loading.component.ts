import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
	@Input() option: any;
	// show;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
  	// this.show = this.option.show;
  	// this.changeDetectorRef.detectChanges();
  	console.log(this.option.show);
  	
  }


}
