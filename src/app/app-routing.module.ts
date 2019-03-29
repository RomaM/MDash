import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DataGuard} from './shared/guards/data.guard';

const routes: Routes = [
  { path: 'list', loadChildren: './modules/items/items.module#ListItemsModule', canActivate: [DataGuard]},
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule', canActivate: [DataGuard]},
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule'},
  { path: '**', redirectTo: '/list' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {preloadingStrategy: PreloadAllModules, enableTracing: false}
      )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
