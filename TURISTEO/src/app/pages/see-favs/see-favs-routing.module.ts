import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeFavsPage } from './see-favs.page';

const routes: Routes = [
  {
    path: '',
    component: SeeFavsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeFavsPageRoutingModule {}
