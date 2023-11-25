import { NgModule } from '@angular/core';
import { SeeplacePageRoutingModule } from './seeplace-routing.module';

import { SeeplacePage } from './seeplace.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SeeplacePageRoutingModule,
    SharedModule
  ],
  declarations: [SeeplacePage],
})
export class SeeplacePageModule {}
