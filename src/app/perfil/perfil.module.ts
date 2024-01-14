import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPerfilComponent } from './my-perfil/my-perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../pages/home/home.module';

@NgModule({
  declarations: [
    MyPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule, 
    ReactiveFormsModule,
    HomeModule
  ]
})
export class PerfilModule { }
