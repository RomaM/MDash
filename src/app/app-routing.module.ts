import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  { path: 'list', loadChildren: './modules/items/items.module#ListItemsModule' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
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
