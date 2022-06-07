import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent {
  @Input()
  word$!: Observable<string | null>;
  rows: number[] = [].constructor(5);
  boxes: number[] = [].constructor(5);
  inputWords$ = this.gameService.inputWords$;
  totalAttempts$: Observable<number> = this.gameService.inputWords$.pipe(
    map((words) => words.length)
  );

  constructor(private readonly gameService: GameService) {}

  // getRandomWordArrayWithSplit(word: string | null) {
  //   if (word) return word.split('').map((letter) => letter);
  //   else return;
  // }

  // getColor(word, letter, color) : return the color based on the position of the letter in the word
  // getHit return true, false, partial or decide the approach
}
