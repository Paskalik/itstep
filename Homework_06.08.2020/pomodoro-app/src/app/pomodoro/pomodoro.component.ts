import { Component, OnInit } from '@angular/core';
import * as intervals from '../../environments/environment.interval';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit {
  timeLeft: number = intervals.pomodoro;
  timeLeftPomodoro: number = intervals.pomodoro;
  timeLeftShort: number = intervals.short;
  timeLeftLong: number = intervals.long;
  interval: number;
  count = 0;
  show: boolean;
  color = 'red';
  arrColors = [
    'red',
    'yellow',
    'green',
    'pink'
  ];
  intervalType = [
    'Pomodoro',
    'Short break',
    'Long break'
  ];


  constructor() { }
  startTimer(): void {
    this.timeLeft = this.timeLeftPomodoro;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.count++;
        if (this.count < 4) {
          clearInterval(this.interval);
          this.startShortBreak();
        } else {
          this.count = 0;
          clearInterval(this.interval);
          this.startLongBreak();
        }
      }
    }, 1000);
  }

  startShortBreak(): void {
    this.timeLeft = this.timeLeftShort;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.startTimer();
      }
    }, 1000);
  }

  startLongBreak(): void {
    this.timeLeft = this.timeLeftLong;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.startTimer();
      }
    }, 1000);
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }

  setColor(color: string): void {
    this.color = color;
  }

  chooseInterval(type: string): void {
    this.show = true;
  }

  ngOnInit(): void {
  }

}
