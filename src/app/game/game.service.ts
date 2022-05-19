import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DictionaryList } from '../dictionary/types';
import { DictionaryService } from '../dictionary/dictionary.service';
import { map, Observable } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  dictionary$: Observable<DictionaryList[]>;
  randomWord$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  inputWord$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

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
      'enter',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'delete',
    ];
    return alphabet;
  };
}
