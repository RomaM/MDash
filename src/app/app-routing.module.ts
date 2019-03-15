import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule'},
  { path: 'list', loadChildren: './modules/items/items.module#ListItemsModule', canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'list' },
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
