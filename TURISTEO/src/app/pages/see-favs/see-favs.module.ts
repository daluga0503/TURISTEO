import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SeeFavsPageRoutingModule } from './see-favs-routing.module';

import { SeeFavsPage } from './see-favs.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    SeeFavsPageRoutingModule
  ],
  declarations: [SeeFavsPage]
})
export class SeeFavsPageModule {}
