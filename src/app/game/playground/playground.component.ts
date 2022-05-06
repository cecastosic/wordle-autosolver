import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent implements OnInit {
  randomWord$ = this.gameService.randomWord$;

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {}
}
