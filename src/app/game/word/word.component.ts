import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  randomWord = this.gameService.getRandomWord();

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {
    //TODO
    console.log(this.randomWord);
  }
}
