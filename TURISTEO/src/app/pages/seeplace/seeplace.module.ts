import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeplacePageRoutingModule } from './seeplace-routing.module';

import { SeeplacePage } from './seeplace.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeplacePageRoutingModule,
    SharedModule
  ],
  declarations: [SeeplacePage]
})
export class SeeplacePageModule {}
