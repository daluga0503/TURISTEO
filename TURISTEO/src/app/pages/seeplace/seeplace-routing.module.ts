import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeplacePage } from './seeplace.page';

const routes: Routes = [
  {
    path: '',
    component: SeeplacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeplacePageRoutingModule {}
