import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  @Input()
  word: string | null | undefined;
  @Input()
  hints: string[] | undefined;

  constructor() {}

  ngOnInit(): void {
    console.log(this.hints);
  }
}
