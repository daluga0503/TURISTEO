import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddplacePage } from './addplace.page';

const routes: Routes = [
  {
    path: '',
    component: AddplacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddplacePageRoutingModule {}
