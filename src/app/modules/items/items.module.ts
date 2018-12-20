import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsRoutingModule} from './items-routing.module';
import {
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule} from '@angular/material';
import {CoreModule} from '../../core/core.module';

import {ItemsComponent} from './items.component';
import {ItemComponent} from './item/item.component';
import {DetailsComponent} from './details/details.component';
import {ListComponent} from './list/list.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    DetailsComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ItemsRoutingModule
  ]
})

export class ListItemsModule { }
