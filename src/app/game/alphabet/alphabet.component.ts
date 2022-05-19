import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent implements OnInit {
  alphabet = this.gameService.getAlphabet();
  inputWord$ = this.gameService.inputWord$;
  randomWord$ = this.gameService.randomWord$;

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {}

  makeInputWord(letter: string) {
    if (letter === 'delete') {
      this.inputWord$.next(this.inputWord$.getValue().slice(0, -1));
    } else if (letter === 'enter') {
      if (this.inputWord$.value.length < 5) alert('Not enough letters');
      else {
        if (
          this.inputWord$.value.join('').toLowerCase() ===
          this.randomWord$.value
        ) {
          alert('TADA');
        } else {
          alert('NOPE');
        }
      }
    } else {
      if (this.inputWord$.value.length < 5)
        this.inputWord$.next([
          ...this.inputWord$.getValue(),
          letter.toUpperCase(),
        ]);
    }
  }
}
