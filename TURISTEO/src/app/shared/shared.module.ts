import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SingupFormComponent } from './components/singup-form/singup-form.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/translate/translate';
import { HttpClient, HttpClientModule } from '@angular/common/http';


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
    RouterModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
  ],
  exports:[
    CommonModule,
    IonicModule,
    //Components
    NavbarComponent,
    LoginFormComponent,
    SingupFormComponent,
    TranslateModule
  ]
})
export class SharedModule { }
