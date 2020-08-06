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
  startTime: number;
  finishTime: number;
  questionStartTime: number;
  questionFinishTime: number;
  questionsTime: number[];
  fullTime: string;
  averageTime: string;
  maxTime: string;
  minTime: string;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.questions = this.storageService.getQestions();
    this.count = this.questions.length;
    this.ind = 0;
    this.correct = 0;
    this.incorrect = 0;
    this.questionsTime = [];
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
    this.startTime = Date.now();
    this.checked = false;
    this.incorrect = 0;
    this.correct = 0;
    this.startTime = 0;
    this.finishTime = 0;
    this.questionsTime = [];
  }

  startTimer(): void {
    this.startTime = Date.now();
    this.questionStartTime = this.startTime;
  }

  questionTimer(): void {
    this.questionFinishTime = Date.now();
    this.questionsTime.push(this.questionFinishTime - this.questionStartTime);
    this.questionStartTime = this.questionFinishTime;
  }

  stopTimer(): void {
    this.finishTime = Date.now();
    this.questionsTime.push(this.finishTime - this.questionStartTime);
    this.fullTime = ((this.finishTime - this.startTime) / 1000).toFixed(2);
    this.averageTime = (this.getAverage(this.questionsTime) / 1000).toFixed(2);
    this.maxTime = (Math.max.apply(null, this.questionsTime) / 1000).toFixed(2);
    this.minTime = (Math.min.apply(null, this.questionsTime) / 1000).toFixed(2);
    console.log(this.questionsTime);
  }

  getAverage(nums): number {
    const sum = nums.reduce((res, num) => {
      return res + num;
    });
    return sum / nums.length;
  }
}
