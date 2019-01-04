import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ItemsRoutingModule} from './items-routing.module';
import {
MatCardModule,
MatCheckboxModule,
MatInputModule,
MatSelectModule} from '@angular/material';

import {ItemsComponent} from './items.component';
import {ItemComponent} from './item/item.component';
import {DetailsComponent} from './details/details.component';
import {ListComponent} from './list/list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {pagesReducer} from './store/pages.reducers';
import {PagesEffects} from './store/pages.effects';

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
    StoreModule.forFeature('pagesState', pagesReducer),
    EffectsModule.forFeature([PagesEffects]),
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ItemsRoutingModule
  ]
})

export class ListItemsModule { }
