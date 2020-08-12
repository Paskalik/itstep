import {Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { Poems } from '../poems';
import { Subscription } from 'rxjs';
import { mainInterval } from '../../environments/environment.time';

@Component({
  selector: 'app-poem',
  templateUrl: './poem.component.html',
  styleUrls: ['./poem.component.scss']
})

export class PoemComponent implements OnInit {
  authors: [];
  author: string;
  authorData: Subscription;
  poems: Poems[];
  poem: Poems;
  randomAuthorIndex: number;
  randomPoemIndex: number;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): any {
    this.getPoem();
    setInterval(() => {this.getPoem(); }, mainInterval);
    }

  getPoem(): any {
    this.authorData = this.apiService.getAuthors().subscribe( (data: []) => {
      this.authors = data[`authors`];
      this.randomAuthorIndex = Math.floor((Math.random() * this.authors.length) + 1);
      return this.author = this.authors[this.randomAuthorIndex];
    });
    this.apiService.getRandomPoem(this.authorData).subscribe((data: Poems[]) => {
      this.poems = data;
      this.randomPoemIndex = Math.floor((Math.random() * this.poems.length) + 1);
      this.poem = this.poems[this.randomPoemIndex];
    });
  }

}
