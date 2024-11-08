import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../pages/home/home.component';
import { HomeRoutes } from './home-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule, HomeRoutes
  ]
})
export class HomeModule { }
