import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { createTranslateLoader } from './core/translate/translate';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { SharedModule } from './shared/shared.module';
import { JwtService } from './core/service/jwt.service';
import { ApiService } from './core/service/api/api.service';
import { AuthStrapiService } from './core/service/api/strapi/auth.strapi.service';
import { AuthService } from './core/service/api/auth.service';
import { DataService } from './core/service/api/data.service';
import { StrapiDataService } from './core/service/api/strapi/strapi-data.service';
import { HttpClientWebProvider } from './core/service/http/http-client-web.provider';
import { MediaStrapiService } from './core/service/api/strapi/media.strapi.service';
import { HttpClientProvider } from './core/service/http/http-client.provider';
import { MediaService } from './core/service/api/media.service';
import { PlaceService } from './core/service/api/place.service';

export function MediaServiceFactory(
  api:ApiService){
    return new MediaStrapiService(api);
}

export function DataServiceFactory(
  api:ApiService){
    return new StrapiDataService(api);
} 

export function httpProviderFactory(
  http:HttpClient,
  platform:Platform) {
  return new HttpClientWebProvider(http);
}

export function AuthServiceFactory(
  jwt:JwtService,
  api:ApiService
) {
  return new AuthStrapiService(jwt, api);
}



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    AppRoutingModule,],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HttpClientProvider,
      deps: [HttpClient, Platform],
      useFactory: httpProviderFactory,  
    },
    {
    provide: AuthService,
    deps: [JwtService, ApiService],
    useFactory: AuthServiceFactory,  
    },
    {
      provide: DataService,
      deps: [ApiService],
      useFactory: DataServiceFactory,  
    },
    {
      provide: MediaService,
      deps: [ApiService],
      useFactory: MediaServiceFactory,  
    },
    PlaceService
],
  bootstrap: [AppComponent],
})
export class AppModule {}
