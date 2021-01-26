import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  bg;
  bgList;
  app;
  pageSettings = pageSettings;

  user = {
    mail: '',
    password: '',
    remember: false
  }

  constructor(private router: Router) {
    this.pageSettings.pageEmpty = true;
  }

  ngOnInit(): void {
  	this.bg = '../../../assets/img/login-bg/login-bg-17.jpg';
    this.bgList = [
      { 'bg': '../../../assets/img/login-bg/login-bg-17.jpg', active: true },
      { 'bg': '../../../assets/img/login-bg/login-bg-16.jpg' },
      { 'bg': '../../../assets/img/login-bg/login-bg-15.jpg' },
      { 'bg': '../../../assets/img/login-bg/login-bg-14.jpg' },
      { 'bg': '../../../assets/img/login-bg/login-bg-13.jpg' },
      { 'bg': '../../../assets/img/login-bg/login-bg-12.jpg' }
    ];
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }

  changeBg(list) {
    this.bg = list.bg;
    list.active = true;

    for (let bList of this.bgList) {
			if (bList !== list) {
				bList.active = false;
			}
		}
  }

  formSubmit(f: NgForm) {
    document.getElementById('page-loader').classList.add('show');
    sessionStorage.setItem( 'user', JSON.stringify(this.user) );
    this.router.navigate(['home/dashboard']);
  }

}
