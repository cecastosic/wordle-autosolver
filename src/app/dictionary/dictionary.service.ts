import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DictionaryList } from './types';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  dictionary$ =  new BehaviorSubject<DictionaryList[]>([]);
  constructor() {
    console.log('created');
    this.fetchTxt();
  }


  private fetchTxt = () =>
  fetch('../assets/wordle_dictionary.txt')
    .then((response) => response.text())
    .then((data) => {
     this.dictionary$.next(data.split(/\r?\n/).map((word, index) => {
        return { index: index + 1, word };
      }));
    });

  //getDictionary = () => this.fetchTxt();
}
