import { NgModule } from '@angular/core';

import { AboutMePageRoutingModule } from './about-me-routing.module';

import { AboutMePage } from './about-me.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    AboutMePageRoutingModule,
    SharedModule
  ],
  declarations: [AboutMePage]
})
export class AboutMePageModule {}
