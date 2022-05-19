import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent {
  @Input()
  word$!: Observable<string | null>;
  rows: number[] = [].constructor(5);
  boxes: number[] = [].constructor(5);
  inputWord$ = this.gameService.inputWord$;

  constructor(private readonly gameService: GameService) {}

  getArrayWithSplit(word: string | null) {
    if (word) return word.split('').map((letter) => letter);
    else return;
  }
}
