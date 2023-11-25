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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceFormComponent } from './components/place-form/place-form.component';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';
import { TypePlaceSelectorComponent } from './components/type-place-selector/type-place-selector.component';
import { PlaceInfoComponent } from './components/place-info/place-info.component';



@NgModule({
  declarations: [
    //components
    LoginFormComponent,
    SingupFormComponent,
    NavbarComponent,
    PlaceFormComponent,
    PictureSelectableComponent,
    TypePlaceSelectorComponent,
    PlaceInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    //Components
    LoginFormComponent,
    SingupFormComponent,
    NavbarComponent,
    PlaceFormComponent,
    PictureSelectableComponent,
    TypePlaceSelectorComponent,
    PlaceInfoComponent
  ]
})
export class SharedModule { }
