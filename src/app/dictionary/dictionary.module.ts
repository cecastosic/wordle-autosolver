import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table';
import { DictionaryService } from './dictionary.service';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, DictionaryRoutingModule, MatTableModule],
  providers: [DictionaryService],
})
export class DictionaryModule {
  constructor() {}
}
