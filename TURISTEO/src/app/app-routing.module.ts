import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'addplace',
    loadChildren: () => import('./pages/addplace/addplace.module').then( m => m.AddplacePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'seeplace',
    loadChildren: () => import('./pages/seeplace/seeplace.module').then( m => m.SeeplacePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'singup',
    loadChildren: () => import('./pages/singup/singup.module').then( m => m.SingupPageModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./pages/about-me/about-me.module').then( m => m.AboutMePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'see-favs',
    loadChildren: () => import('./pages/see-favs/see-favs.module').then( m => m.SeeFavsPageModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
