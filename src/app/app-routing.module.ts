import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routes, RouterModule, CanActivate} from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import {ExtraErrorComponent} from './pages/extra-error/extra-error.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {MonitorAndServerComponent} from './pages/monitor-and-server/monitor-and-server.component';
import {UsageComponent} from './pages/usage/usage.component';
import {NotiticationsComponent} from './pages/notitications/notitications.component';



import {LoginGuard} from './guards/login.guard';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: DashboardComponent, data: {animation: 'home', keep: true}},
  {path: 'monitorAndServer', component: MonitorAndServerComponent, data: {animation: 'monitorAndServer', keep: true}},
  {path: 'usage', component: UsageComponent, data: {animation: 'usage', keep: true}},
  {path: 'notitications', component: NotiticationsComponent, data: {animation: 'notitications', keep: true}},
  // { path: 'home', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [LoginGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'extraError', component: ExtraErrorComponent},
  {path: '**', redirectTo: 'extraError', pathMatch: 'full'},
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
