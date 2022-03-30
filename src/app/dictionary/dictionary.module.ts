import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionaryRoutingModule } from './dictionary-routing.module';
import { ListComponent } from './list/list.component';
import { MatTableModule } from '@angular/material/table'  



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    MatTableModule
  ]
})
export class DictionaryModule { }
