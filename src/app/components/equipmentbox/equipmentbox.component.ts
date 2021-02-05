import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-equipmentbox',
  templateUrl: './equipmentbox.component.html',
  styleUrls: ['./equipmentbox.component.scss']
})
export class EquipmentboxComponent implements OnInit {
	@Input() option:any;

  constructor() { }

  ngOnInit(): void {
  }

}
