import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyshareComponent } from './myshare/myshare.component';
import { ShareRoutingModule } from './share-routing.module';



@NgModule({
  declarations: [
    MyshareComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule
  ]
})
export class ShareModule { }
