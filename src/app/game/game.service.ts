import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DictionaryList } from '../dictionary/types';
import { DictionaryService } from '../dictionary/dictionary.service';
import { combineLatest, first, map, Observable } from 'rxjs';
import { __values } from 'tslib';
import { KeyAction } from './types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  dictionary$: Observable<DictionaryList[]>;
  randomWord$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  inputWords$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    '',
    '',
    '',
    '',
    '',
  ]);
  currentAttempt$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private dictionaryService: DictionaryService) {
    this.dictionary$ = dictionaryService.dictionary$;
    this.getRandomWord().subscribe((word) => this.randomWord$.next(word));
  }

  getRandomWord = () => {
    return this.dictionary$.pipe(
      map((words) => {
        if (words.length) {
          const randomWord =
            words[Math.floor(Math.random() * words.length)].word;
          return randomWord;
        } else {
          return '';
        }
      })
    );
  };

  getAlphabet = () => {
    const alphabet: string[] = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      KeyAction.ENTER,
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      KeyAction.DELETE,
    ];
    return alphabet;
  };

  makeInputWord(character: string) {
    if (character === KeyAction.DELETE) {
      this.inputWords$.next(this.inputWords$.getValue().slice(0, -1));
    } else if (character === KeyAction.ENTER) {
      if (this.inputWords$.value.length < 5) {
        alert('Not enough letters');
      } else {
        if (
          this.inputWords$.value.join('').toLowerCase() ===
          this.randomWord$.value
        ) {
          alert('TADA');
        } else {
          alert('NOPE');
        }
      }
    } else {
      combineLatest([this.currentAttempt$, this.inputWords$])
        .pipe(first())
        .subscribe(([attempt, words]) => {
          const newArr = [...words];
          newArr[attempt] =
            words.length <= 5 ? words[attempt] + character : words[attempt];
          this.inputWords$.next(newArr);
        });
      // if (this.inputWords$.value.length < 5) {
      //   // this.inputWords$.next([
      //   //   ...this.inputWords$.getValue(),
      //   //   character.toUpperCase(),
      //   // ]);

      // }
    }
  }
}
