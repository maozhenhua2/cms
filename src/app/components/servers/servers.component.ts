import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
	@Input() option:any;

  constructor() { }

  ngOnInit(): void {
  }

  getUsage(value) {
  	let bg = 'blue';
  	switch (true) {
  		case value > 40 && value < 70:
  			bg = 'yellow';
  			break;
  		case value > 70 && value < 100:
  			bg = 'yellow';
  			break;
  	}
  	return bg;
  }

}
