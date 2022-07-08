import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit {
  @Input()
  letter: string | undefined;
  @Input()
  hint: string = '';

  constructor(private readonly gameService: GameService) {}

  ngOnInit(): void {}
}
