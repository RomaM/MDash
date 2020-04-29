import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {CustomPreloadingService} from './shared/services/custom-preloading.service';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./modules/items/items.module').then(m => m.ListItemsModule),
    data: {preload: true},
    canActivate: [AuthGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./modules/info/info.module').then(m => m.InfoModule),
    data: {preload: true},
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule),
    data: {preload: true},
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    data: {preload: true},
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    data: {preload: false}
  },
  {
    path: '**',
    redirectTo: '/list'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {preloadingStrategy: CustomPreloadingService, enableTracing: false}
      )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
