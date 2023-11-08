import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SingupFormComponent } from './components/singup-form/singup-form.component';






@NgModule({
  declarations: [
    //components
    NavbarComponent,
    LoginFormComponent,
    SingupFormComponent
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
    NavbarComponent,
    LoginFormComponent,
    SingupFormComponent
  ]
})
export class SharedModule { }
