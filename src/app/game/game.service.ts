import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  hints$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  message$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

  constructor(
    private dictionaryService: DictionaryService,
    private snackBar: MatSnackBar
  ) {
    this.dictionary$ = dictionaryService.dictionary$;
    this.getRandomWord().subscribe((word) => this.randomWord$.next(word));
  }

  getHints = (word: string | null | undefined): string[] => {
    const hintsList: string[] = [];

    if (!word) {
      return [];
    }

    word.split('').forEach((element) => {
      if (this.randomWord$.value?.includes(element)) {
        if (this.randomWord$.value.indexOf(element) == word.indexOf(element)) {
          console.log(`${element} is on right place`);
          hintsList.push('correct');
        } else {
          console.log(`${element} is not on the right place`);
          hintsList.push('present');
        }
      } else {
        console.log(`${element} is not in the random word`);
        hintsList.push('absent');
      }
    });

    return hintsList;
  };

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

  // check letters if more same letters, letter position
  // gamw win and the rest of issues that doesn't work

  submitWord = () => {
    combineLatest([this.currentAttempt$, this.inputWords$])
      .pipe(first())
      .subscribe(([attempt, words]) => {
        if (words[attempt].length < 5) {
          this.message$.next('Not enough letters');
          this.message$.value && this.openSnackBar(this.message$.value);
        } else if (!this.checkWord(words[attempt])) {
          this.message$.next('Not in word list');
          //doesn't work
          this.message$.value && this.openSnackBar(this.message$.value);
        } else {
          if (words[attempt] === this.randomWord$.value) {
            //alert('TADA');
          } else {
            if (attempt == 4) {
              this.message$.next('The game is over');
              //doesn't work
              this.message$.value && this.openSnackBar(this.message$.value);
            } else {
              //alert('NOPE');
              this.currentAttempt$.next(attempt + 1);
              // this.checkLetters(words, attempt);
            }
          }
        }
      });
  };

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  checkWord = (inputWord: String) => {
    return this.dictionary$.pipe(
      map((words) => {
        if (words.length) {
          return words.some((w) => w.word === inputWord);
        }
        return false;
      })
    );
  };
}
