import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsRoutingModule} from './items-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
