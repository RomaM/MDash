import {NgModule} from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {ItemsRoutingModule} from './items-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {ItemsComponent} from './items.component';
import {ItemComponent} from './item/item.component';
import {DetailsComponent} from './details/details.component';
import {ListComponent} from './list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {pagesReducer} from './store/pages.reducer';
import {PagesEffects} from './store/pages.effects';
import {FilterPipe} from '../../shared/pipes/filter.pipe';
import {SharedModule} from '../../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {ReversePipe} from '../../shared/pipes/reverse.pipe';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent,
    DetailsComponent,
    ListComponent,
    FilterPipe,
    ReversePipe
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    StoreModule.forFeature('pagesState', pagesReducer),
    EffectsModule.forFeature([PagesEffects]),
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ItemsRoutingModule
  ]
})

export class ListItemsModule {}
