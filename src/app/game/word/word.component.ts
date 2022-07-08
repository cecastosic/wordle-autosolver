import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  @Input()
  word: string | null | undefined;

  @Input()
  attempt: number;

  currentAttempt$ = this.gameService.currentAttempt$;

  hints$: Observable<string[]> = this.currentAttempt$.pipe(
    map((currentAttempt) =>
      currentAttempt > this.attempt ? this.gameService.getHints(this.word) : []
    )
  );

  constructor(readonly gameService: GameService) {}

  ngOnInit(): void {
    console.log(this.attempt);
  }
}
