import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {DetailsComponent} from './details/details.component';
import {RegisterComponent} from './register/register.component';
import {RegisterGuard} from '../../shared/guards/register.guard';

const routes: Routes = [
  {path: '', component: ProfileComponent,
    children: [
      {path: '', component: DetailsComponent},
      {path: 'edit', component: DetailsComponent},
      {path: 'edit/:id', component: DetailsComponent},
      {path: 'new', component: RegisterComponent, canActivate: [RegisterGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
