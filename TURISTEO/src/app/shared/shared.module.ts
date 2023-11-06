import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';






@NgModule({
  declarations: [
    //components
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    CommonModule,
    IonicModule,
    //Components
    NavbarComponent
  ]
})
export class SharedModule { }
