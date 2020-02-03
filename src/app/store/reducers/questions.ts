import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Question } from '../../models/question';
import * as QuestionActions from '../actions/questions';

/**
 * Questions state design
 * Nesting questions inside an object allows for adding/extending properties later but 
 * right now increased complexity is unnecessary
 */
export type State = Observable<Question[]>;

const initialState = of([]);

export function questionsReducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case QuestionActions.GET_QUESTIONS:
            return of([]);
        default:
            return state;
    }
}