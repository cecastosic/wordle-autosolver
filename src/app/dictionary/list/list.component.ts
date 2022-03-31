import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';
import { DictionaryList } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  dictionary$ = this.dictionaryService.dictionary$;
  dictionarySubscription: any; //Subscription

  constructor(private readonly dictionaryService: DictionaryService) {}

  displayedColumns = ['id', 'word'];
  dataSource = new MatTableDataSource<DictionaryList>();
  title = 'Dictionary';

  ngOnInit(): void {
    // this.dictionaryService
    //   .getDictionary()
    //   .then((data) => (this.dataSource.data = data));
    this.dictionarySubscription = this.dictionary$.subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy(): void {
      this.dictionarySubscription.unsubscribe();
  }
}
