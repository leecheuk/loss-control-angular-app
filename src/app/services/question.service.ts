import { Injectable } from '@angular/core';
import data from '../seed/data.json';
import {Question} from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestions(): Observable<Question[]> {
    return of(data);
  }
}
