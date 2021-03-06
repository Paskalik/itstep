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
  color = 'red';
  arrColors: string[] = [
    'red',
    'yellow',
    'green',
    'pink'
  ];
  intervalType: string[] = [
    'Pomodoro',
    'Short break',
    'Long break'
  ];
  isChoice: boolean;
  isError: boolean;


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

  setInterval(time: string, type: string): void {
    const timeString = time.split(':');
    const min = timeString[0];
    const sec = timeString[1];
    const newTime = Number(min) * 60 + Number(sec);
    if (newTime > 0) {
      this.isError = false;
      if (type === 'Pomodoro') {
        this.timeLeftPomodoro = newTime;
      } else {
        if (type === 'Short break') {
          this.timeLeftShort = newTime;
        } else {
          if (type === 'Long break') {
            this.timeLeftLong = newTime;
          }
        }
      }
      clearInterval(this.interval);
      this.timeLeft = this.timeLeftPomodoro;
      this.isChoice = false;
    } else {
      this.isError = true;
    }
  }

  ngOnInit(): void {
  }

}
