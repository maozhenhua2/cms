import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  pageSettings = pageSettings;

  constructor(private router: Router) {
    this.pageSettings.pageEmpty = true;
  }

  ngOnInit(): void {
  }

  formSubmit(f:NgForm) {

  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

}
