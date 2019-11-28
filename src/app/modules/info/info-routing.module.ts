import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {DetailsComponent} from './details/details.component';
import {InfoComponent} from './info.component';
import {RegisterComponent} from '../profile/register/register.component';
import {RegisterGuard} from '../../shared/guards/register.guard';

const infoRoutes: Routes = [
  {path: '', component: InfoComponent,
    children: [
      {path: '', component: ListComponent},
      {path: 'edit/:id', component: DetailsComponent},
      {path: 'new', component: DetailsComponent, canActivate: [RegisterGuard]},
      {path: '**', redirectTo: ''}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(infoRoutes)],
  exports: [RouterModule]
})

export class InfoRoutingModule {}
