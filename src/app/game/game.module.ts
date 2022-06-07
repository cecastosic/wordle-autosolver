import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { WordsComponent } from './words/words.component';
import { DictionaryService } from '../dictionary/dictionary.service';
import { MatButtonModule } from '@angular/material/button';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { PlaygroundComponent } from './playground/playground.component';
import { WordComponent } from './word/word.component';
import { LetterComponent } from './letter/letter.component';

@NgModule({
  declarations: [WordsComponent, AlphabetComponent, PlaygroundComponent, WordComponent, LetterComponent],
  imports: [CommonModule, GameRoutingModule, MatButtonModule],
  providers: [DictionaryService],
})
export class GameModule {}
