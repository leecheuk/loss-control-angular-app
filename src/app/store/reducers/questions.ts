import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Question } from '../../models/question';
import * as QuestionActions from '../actions/questions';

export type State = {
    questions: Observable<Question[]>
}

const initialState = {
    questions: of([])
}
export function questionsReducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case QuestionActions.GET_QUESTIONS:
            return Object.assign({}, state, {questions: [
            ]});
        default:
            return state;
    }
}