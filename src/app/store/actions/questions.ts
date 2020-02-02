import { Action } from '@ngrx/store';

// action constants
export const GET_QUESTIONS = '[Questions] Get';

// action classes
export class GetQuestions implements Action {
    readonly type = GET_QUESTIONS;
}