import { Action } from '@ngrx/store';
import { Question } from '../../models/question';
import * as QuestionActions from '../actions/questions';

export type State = {
    questions: Question[]
}

const initialState = {
    questions: []
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