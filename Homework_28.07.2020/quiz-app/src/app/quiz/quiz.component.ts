import { Component, OnInit } from '@angular/core';
import { Question } from '../interfaces/question';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  correct: number;
  incorrect: number;
  count: number;
  ind: number;
  checked: boolean;
  bool: boolean;
  questions: Array<Question>;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.questions = this.storageService.getQestions();
    this.count = this.questions.length;
    this.ind = 0;
    this.correct = 0;
    this.incorrect = 0;
  }

  setIndex(i: number): number {
    this.ind = i;
    this.checked = false;
    return this.ind;
  }

  setResult(bool: boolean): void {
    this.bool = bool;
    this.checked = true;
  }

  saveResult(): void {
    if (this.bool) {
      this.correct++;
    } else {
      this.incorrect++;
    }
    console.log(this.correct + ',' + this.incorrect);
  }

  getResults(): void {
    this.ind = -1;
  }

  clearResults(): void {
    this.ind = 1;
    this.checked = false;
    this.incorrect = 0;
    this.correct = 0;
  }
}
