import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ExtraErrorComponent } from './pages/extra-error/extra-error.component';
import { RegisterComponent } from './pages/register/register.component';



import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'extraError', component: ExtraErrorComponent},
  { path: '**', redirectTo: 'extraError', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
