import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
  { path: 'dashboard', loadChildren: () => import('../../features/dashboard/dashboard.module').then(m => m.DashboardModule) },
 { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
 { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) }, 
 { path: 'share', loadChildren: () => import('./share/share.module').then(m => m.ShareModule) }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
