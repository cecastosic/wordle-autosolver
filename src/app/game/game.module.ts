import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { WordComponent } from './word/word.component';
import { DictionaryService } from '../dictionary/dictionary.service';
import { MatButtonModule } from '@angular/material/button';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { PlaygroundComponent } from './playground/playground.component';

@NgModule({
  declarations: [WordComponent, AlphabetComponent, PlaygroundComponent],
  imports: [CommonModule, GameRoutingModule, MatButtonModule],
  providers: [DictionaryService],
})
export class GameModule {}
