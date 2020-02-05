import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { QuestionService } from '../../services/question.service';
import { Question } from 'src/app/models';
import * as QuestionsActions from '../actions/questions.action';

@Injectable()
export class QuestionsEffects {

    @Effect()
    loadQuestions$: Observable<Action> = this.actions$.pipe(
        ofType('[Questions] Get'),
        switchMap(() => this.questionService.getQuestions()
                        .pipe(
                            map(questions => {
                                return new QuestionsActions.SetQuestions(questions)
                            }),
                            catchError(() => EMPTY)
                        )
                )
        );

    constructor(
        private actions$: Actions, 
        private questionService: QuestionService
    ) {}
}