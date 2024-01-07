import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyPerfilComponent } from './my-perfil/my-perfil.component';

const routes: Routes = [
  { path: '', component: MyPerfilComponent },
  // Agrega más rutas según sea necesario
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PerfilRoutingModule { }
