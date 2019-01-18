import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {ItemsComponent} from './items.component';
import {ListComponent} from './list/list.component';

const itemsRoutes: Routes = [
  {path: '', component: ItemsComponent,
    children: [
      {path: '', component: ListComponent},
      {path: 'item/:id', component: DetailsComponent},
      {path: 'new', component: DetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(itemsRoutes)],
  exports: [RouterModule]
})

export class ItemsRoutingModule {}
