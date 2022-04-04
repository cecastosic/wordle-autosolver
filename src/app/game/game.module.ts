import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { WordComponent } from './word/word.component';
import { DictionaryService } from '../dictionary/dictionary.service';

@NgModule({
  declarations: [WordComponent],
  imports: [CommonModule, GameRoutingModule],
  providers: [DictionaryService],
})
export class GameModule {}
