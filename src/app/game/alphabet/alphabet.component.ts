import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent implements OnInit {
  alphabet = this.gameService.getAlphabet();

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {}

  myFunc(letter: string) {
    if (letter === 'delete' || letter === 'enter')
      alert('press delete or enter');
    else console.log(letter);
  }
}
