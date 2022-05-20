import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent implements OnInit {
  alphabet = this.gameService.getAlphabet();
  inputWord$ = this.gameService.inputWords$;
  randomWord$ = this.gameService.randomWord$;

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {}

  makeInputWord(letter: string) {
    this.gameService.makeInputWord(letter);
  }
}
