import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
import questions from '../../seed/data.json';
// models
import {Question} from '../../models/question';
import {Response} from '../../models/response';
// service
import {QuestionService} from '../../services/question.service';
// store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as QuestionsActions from '../../store/actions/questions';

interface AppState {
  questions: Observable<Question[]>
}

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent implements OnInit {
  qs$: Observable<Question[]>;
  // change naming convention, too confusing, be consistent, camelCase or not
  questionsForm: FormGroup = this.fb.group({
    questions: this.fb.array(questions.map(q => this.fb.group({
      id: q.id,
      num: q.num,
      section_num: q.section_num,
      yesNo: null,
      written: null,
      checklist: this.fb.array(Array(q.checklist.length).fill(false))
    })))
  });
  // please refactor this into a new object
  section_cur: number = 0;
  section_cur_done: number = 0;
  section_num: number = (new Set(questions.map(q => q.section))).size; // number of sections
  section_titles: string[] = Array.from(new Set(questions.map(q => q.section)));
  questions: Question[] = questions.filter((q, i) => q.section_num === this.section_cur); // questions in section
  questions_count: number = 0; // number of questions in latest section
  questions_done: number = 0; // questions done of latest section
  questions_done_cur: number = 0; // questions done in current section
  total_questions_done: number = 0; // number of questions done in total
  total_question_count: number = questions.length; 
  sticky: boolean = false;

  constructor(private fb: FormBuilder, private store: Store<AppState>, private questionService: QuestionService) { 
    store.select('questions').subscribe(s => this.qs$ = s);
    this.getQuestions();
  }

  getQuestions(): void {
    this.store.dispatch(new QuestionsActions.GetQuestions());
    this.qs$ = this.questionService.getQuestions();
  }

  ngOnInit(): void {
    this.getQuestions();
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    this._getQuestionsDone(this.questionsForm.value.questions);
    this._getQuestionsDoneCur(this.questionsForm.value.questions);
    this._getQuestionsDoneTotal(this.questionsForm.value.questions);
    this.questionsForm.valueChanges.subscribe(data => {
      this._getQuestionsDone(data.questions);
      this._getQuestionsDoneCur(data.questions);
      this._getQuestionsDoneTotal(data.questions);
    });
  }
  handleClickNext(): void {
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    // allow next only if all questions answered
    if (this.section_cur <= this.section_num && this.questions.length === this.questions_done_cur) {
      this.section_cur += 1;
      // this.section_cur_done += 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  handleClickBack(): void {
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    if (this.section_cur > 1) {
      this.section_cur -= 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  _getQuestions(): void {
    this.questions = questions.filter((q, i) => q.section_num === this.section_cur);
    this._getQuestionsDoneCur(this.questionsForm.value.questions);
    this._getQuestionsDone(this.questionsForm.value.questions);
  }
  // get count of number of questions done in lates section from form questions
  _getQuestionsDone(questions_input: Response[]): void {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur_done + 1) && (q.yesNo !== null || q.written !== null)
    });
    this.questions_done = arr.length;
  }
  _getQuestionsDoneCur(questions_input: Response[]): void {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur) && (q.yesNo !== null || q.written !== null)
    });
    this.questions_done_cur = arr.length;
  }
  _getQuestionsDoneTotal(questions_input: Response[]): void {
    let arr = questions_input.filter(q => {
      return (q.yesNo !== null || q.written !== null)
    });
    this.total_questions_done = arr.length;
  }
  // get questions count of latest section
  _getLatestQuestionsCount(): void {
    let arr = questions.filter(q => {
      return q.section_num === this.section_cur_done + 1;
    })
    this.questions_count = arr.length;
  }
  _getSectionsDone(questions_input: Response[]): void {
    // get number of unfinished sections
    // filter out questions that have input, then map to section number and map to sets
    let arr = questions_input.filter(input => {
      let qs = questions[input.num - 1]
      if (qs.yes_no === true) {
        return input.yesNo === null;
      } else {
        return input.written === null;
      }
    });
    let section_nums = arr.map(q => q.section_num);
    this.section_cur_done = this.section_num - (new Set(section_nums)).size;
  }
  handleSticky(stickyState: boolean): void {
    this.sticky = stickyState;
  }
  handleSectionNav(section_num: number): void {
    if (section_num !== this.section_cur && section_num <= this.section_num + 1 && section_num >= 1) {
      this.section_cur = section_num;
      this._getQuestions();
      this._getSectionsDone(this.questionsForm.value.questions);
      this._getLatestQuestionsCount();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  getDate(): string {
    return moment().format("MM-DD-YYYY");
  }
  getTime(): string {
    return moment().format("h:mm a")
  }
}
