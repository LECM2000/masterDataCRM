import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyshareComponent } from './myshare/myshare.component';
import { share } from 'rxjs';

const routes: Routes = [
  { path:'', component: MyshareComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareRoutingModule { }