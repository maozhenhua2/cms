import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
	@Input() option:any;

  constructor() { }

  ngOnInit(): void {
  }

  getStatus(status) {
  	status = Number(status);
  	return {
  		blue: status === 1,
  		green: status === 0,
  		yellow: status === -1,
  		red: status === -2
  	}
  }

}
