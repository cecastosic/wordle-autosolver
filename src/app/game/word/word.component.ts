import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  alphabet = this.gameService.getAlphabet();
  randomWord$ = this.gameService.randomWord$;

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {
    //TODO
    //this.gameService.getRandomWord().subscribe((word) => (this.word = word));
  }
}
