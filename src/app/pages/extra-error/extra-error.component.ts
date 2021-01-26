import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-extra-error',
  templateUrl: './extra-error.component.html',
  styleUrls: ['./extra-error.component.scss']
})
export class ExtraErrorComponent implements OnInit {

  pageSettings = pageSettings;

  constructor(private router: Router) {
    this.pageSettings.pageEmpty = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

}
