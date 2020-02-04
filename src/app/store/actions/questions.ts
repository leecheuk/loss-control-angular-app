import { Action } from '@ngrx/store';
import { Question } from 'src/app/models/question';

// action constants
export const GET_QUESTIONS = '[Questions] Get';
export const SET_QUESTIONS = '[Questions] Set';

// action classes
export class GetQuestions implements Action {
    readonly type = GET_QUESTIONS;
}

export class SetQuestions implements Action {
    readonly type = SET_QUESTIONS;

    constructor(public payload: Question[]) {

    }
}

export type QuestionsActions = GetQuestions | SetQuestions;