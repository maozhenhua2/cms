import { BrowserModule } from '@angular/platform-browser';
// import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// 结构组建
import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatSubMenuComponent } from './components/float-sub-menu/float-sub-menu.component';
import { PanelComponent } from './components/panel/panel.component';
import { EquipmentboxComponent } from './components/equipmentbox/equipmentbox.component';
import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { ServersComponent } from './components/servers/servers.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ExtraErrorComponent } from './pages/extra-error/extra-error.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MonitorAndServerComponent } from './pages/monitor-and-server/monitor-and-server.component';
import { UsageComponent } from './pages/usage/usage.component';
import { NotiticationsComponent } from './pages/notitications/notitications.component';

import { CommfnService } from './services/commfn.service';


@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    FooterComponent,
    FloatSubMenuComponent,
    LoginComponent,
    RegisterComponent,
    ExtraErrorComponent,
    PanelComponent,
    DashboardComponent,
    EquipmentboxComponent,
    ChartComponent,
    MapComponent,
    MonitorAndServerComponent,
    MonitorComponent,
    ServersComponent,
    UsageComponent,
    NotiticationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    LoadingBarRouterModule,
    NgbModule,
    PerfectScrollbarModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    CommfnService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
