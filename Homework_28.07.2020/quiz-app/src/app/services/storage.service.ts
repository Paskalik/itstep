import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { questions } from '../questions.mock';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getQestions(): Array<Question> {
    return questions;
  }
}
