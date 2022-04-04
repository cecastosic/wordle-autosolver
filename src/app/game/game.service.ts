import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DictionaryList } from '../dictionary/types';
import { DictionaryService } from '../dictionary/dictionary.service';
import { map, Observable, Subscription } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  dictionary$: Observable<DictionaryList[]>;

  constructor(private dictionaryService: DictionaryService) {
    this.dictionary$ = dictionaryService.dictionary$;
    this.getRandomWord();
  }

  getRandomWord = () => {
    return this.dictionary$.subscribe((words) => {
      if (words.length)
        return words[Math.floor(Math.random() * words.length)].word;
      else return '';
    });
  };
}
