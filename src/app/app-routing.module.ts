import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {CustomPreloadingService} from './shared/services/custom-preloading.service';

const routes: Routes = [
  { path: 'list', loadChildren: './modules/items/items.module#ListItemsModule',
    data: {preload: true}, canActivate: [AuthGuard]},
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule',
    data: {preload: true}, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule',
    data: {preload: true}},
  { path: '**', redirectTo: '/list' },
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
