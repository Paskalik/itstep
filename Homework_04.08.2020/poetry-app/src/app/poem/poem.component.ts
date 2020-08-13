import {Component, Injectable, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { Poems } from '../poems';
import { mainInterval } from '../../environments/environment.time';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss']
})

@Injectable()
export class PoemComponent implements OnInit {
  authors: [];
  authorData: string;
  poems: Poems[];
  poem: Poems;
  randomAuthorIndex: number;
  randomPoemIndex: number;
  color: string;
  interval: number;
  intId: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getPoem();
    this.interval = mainInterval;
    this.intId = setInterval(() => {this.getPoem(); }, this.interval);
    }

  setCustomInterval(interval: string): void {
    this.interval = Number(interval);
    clearInterval(this.intId);
    this.intId = setInterval(() => {this.getPoem(); }, this.interval);
  }

  getPoem(): void {
     this.apiService.getAuthors().subscribe( (data: []) => {
      this.authors = data[`authors`];
      this.randomAuthorIndex = Math.floor((Math.random() * this.authors.length) + 1);
      this.authorData = this.authors[this.randomAuthorIndex];
      console.log(this.authorData);
      this.apiService.getRandomPoem(this.authorData).subscribe((dataPoem: Poems[]) => {
        this.poems = dataPoem;
        this.randomPoemIndex = Math.floor((Math.random() * this.poems.length) + 1);
        this.poem = this.poems[this.randomPoemIndex];
      });
     });
  }
}
