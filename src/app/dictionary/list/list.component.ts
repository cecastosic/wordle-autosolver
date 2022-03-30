import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

type DictionaryList = {
  index: number;
  word: string;
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor() {}

  displayedColumns = ['id', 'word'];
  dataSource = new MatTableDataSource<DictionaryList>();
  title = 'Dictionary';

  ngOnInit(): void {
    this.fetchTxt();
  }

  dictionary: DictionaryList[] = [];
  fetchTxt = () =>
    fetch('../assets/wordle_dictionary.txt')
      .then((response) => response.text())
      .then((data) => {
        this.dictionary = data.split(/\r?\n/).map((word, index) => {
          return { index: index + 1, word };
        });
        this.dataSource.connect().next(this.dictionary);
        this.dataSource.data = this.dictionary;
        //console.log(this.dictionary);
      });
}
