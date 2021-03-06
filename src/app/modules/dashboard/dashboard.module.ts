import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardRoutingModule} from './dashboard-routing.module';

import {AjaxService} from '../../services/ajax.service';

import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {DashboardComponent} from './dashboard.component';
// import {PanelComponent} from '../../components/panel/panel.component';


@NgModule({
  declarations: [
    DashboardComponent,
    // PanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd,
    DashboardRoutingModule
  ],
  providers: [AjaxService],
})
export class DashboardModule {
}
