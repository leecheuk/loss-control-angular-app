import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Question } from '../../models';
import * as QuestionsActions from '../actions/questions.action';

/**
 * Questions state design
 * Nesting questions inside an object allows for adding/extending properties later but 
 * right now increased complexity is unnecessary
 */
export type State = Question[];

const initialState = [];

export function questionsReducer(state: State = initialState, action: QuestionsActions.QuestionsActions): State {
    switch (action.type) {
        case QuestionsActions.GET_QUESTIONS:
            return state;
        case QuestionsActions.SET_QUESTIONS:
            return action.payload;
        default:
            return state;
    }
}