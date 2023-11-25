import { NgModule } from '@angular/core';


import { AddplacePageRoutingModule } from './addplace-routing.module';

import { AddplacePage } from './addplace.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    AddplacePageRoutingModule,
    SharedModule
  ],
  declarations: [AddplacePage]
})
export class AddplacePageModule {}
