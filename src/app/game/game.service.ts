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

  //split functionality
  makeInputWord(character: string) {
    if (character === KeyAction.DELETE) {
      this.deleteCharacter();
    } else if (character === KeyAction.ENTER) {
      this.submitWord();
    } else this.makeWord(character);
  }

  makeWord = (character: string) => {
    combineLatest([this.currentAttempt$, this.inputWords$])
      .pipe(first())
      .subscribe(([attempt, words]) => {
        const newArr = [...words];
        newArr[attempt] =
          words[attempt].length < 5
            ? words[attempt] + character
            : words[attempt];
        this.inputWords$.next(newArr);
      });
  };

  deleteCharacter = () => {
    combineLatest([this.currentAttempt$, this.inputWords$])
      .pipe(first())
      .subscribe(([attempt, words]) => {
        const newArr = [...words];
        newArr[attempt] =
          words[attempt].length > 0
            ? words[attempt].slice(0, -1)
            : words[attempt];
        this.inputWords$.next(newArr);
      });
  };

  submitWord = () => {
    combineLatest([this.currentAttempt$, this.inputWords$])
      .pipe(first())
      .subscribe(([attempt, words]) => {
        if (words[attempt].length < 5) {
          alert('Not enough letters');
        } else {
          if (words[attempt] === this.randomWord$.value) {
            alert('TADA');
          } else {
            if (attempt == 4) {
              alert('the game is over');
            } else {
              alert('NOPE');
              this.currentAttempt$.next(attempt + 1);
              this.checkLetters(words[attempt]);
            }
          }
        }
      });
  };

  checkLetters = (word: string) => {
    // check if the letter is in the random
    // check if the letter is on the right position
    const obj = word.split('').forEach((element) => {
      if (this.randomWord$.value?.includes(element)) {
        if (this.randomWord$.value.indexOf(element) == word.indexOf(element)) {
          return console.log(`${element} is on right place`);
        } else {
          return console.log(`${element} is not on the right place`);
        }
      } else {
        return console.log(`${element} is not in the random word`);
      }
    });
  };
}
