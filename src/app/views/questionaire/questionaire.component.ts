import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
// models
import {Question} from '../../models/question';
import {Response} from '../../models/response';
// store
import { Store } from '@ngrx/store';
import * as QuestionsActions from '../../store/actions/questions';

interface AppState {
  questions: Question[]
}

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent implements OnInit {
  allQuestions;
  // change naming convention, too confusing, be consistent, camelCase or not
  questionsForm: FormGroup;
  // please refactor this into a new object
  section_cur: number;
  section_cur_done: number;
  section_num: number; // number of sections
  section_titles: string[];
  questions: Question[]; // questions in section
  questions_count: number; // number of questions in latest section
  questions_done: number; // questions done of latest section
  questions_done_cur: number; // questions done in current section
  total_questions_done: number; // number of questions done in total
  total_question_count: number; 
  // DOM/view properties
  sticky: boolean = false;
  loading: boolean = true;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { 
    store.select('questions').subscribe(s => {
        this.allQuestions = s;
        this.questionsForm = this.fb.group({
          questions: this.fb.array(this.allQuestions.map(q => this.fb.group({
            id: q.id,
            num: q.num,
            section_num: q.section_num,
            yesNo: null,
            written: null,
            checklist: this.fb.array(Array(q.checklist.length).fill(false))
          })))
        });
        this.section_cur = 0;
        this.section_cur_done = 0;
        this.section_num = (new Set(this.allQuestions.map(q => q.section))).size; // number of sections
        this.section_titles = Array.from(new Set(this.allQuestions.map(q => q.section)));
        this.questions = this.allQuestions.filter((q, i) => q.section_num === this.section_cur); // questions in section
        this.questions_count = 0; // number of questions in latest section
        this.questions_done = 0; // questions done of latest section
        this.questions_done_cur = 0; // questions done in current section
        this.total_questions_done = 0; // number of questions done in total
        this.total_question_count = this.allQuestions.length;
        this.loading = false;
      });
      
    this.getQuestions();
  }

  getQuestions(): void {
    this.store.dispatch(new QuestionsActions.GetQuestions());
  }

  ngOnInit(): void {
    this.getQuestions();
    // this is too complicated, create Facade
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
      this.scrollToTop();
    }
  }
  handleClickBack(): void {
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    if (this.section_cur > 1) {
      this.section_cur -= 1;
      this._getQuestions();
      this.scrollToTop();
    }
  }
  _getQuestions(): void {
    this.questions = this.allQuestions.filter((q, i) => q.section_num === this.section_cur);
    this._getQuestionsDoneCur(this.questionsForm.value.questions);
    this._getQuestionsDone(this.questionsForm.value.questions);
  }
  // get count of number of questions done in lates section from form questions
  _getQuestionsDone(questions_input: Response[]): void {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur_done + 1) && this.hasResponded(q);
    });
    this.questions_done = arr.length;
  }
  _getQuestionsDoneCur(questions_input: Response[]): void {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur) && this.hasResponded(q);
    });
    this.questions_done_cur = arr.length;
  }
  _getQuestionsDoneTotal(questions_input: Response[]): void {
    let arr = questions_input.filter(q => {
      return this.hasResponded(q);
    });
    this.total_questions_done = arr.length;
  }
  // get questions count of latest section
  _getLatestQuestionsCount(): void {
    let arr = this.allQuestions.filter(q => {
      return q.section_num === this.section_cur_done + 1;
    })
    this.questions_count = arr.length;
  }
  _getSectionsDone(questions_input: Response[]): void {
    // get number of unfinished sections
    // filter out questions that have input, then map to section number and map to sets
    let arr = questions_input.filter(input => {
      let qs = this.allQuestions[input.num - 1]
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
      this.scrollToTop();
    }
  }
  /**
   * Object-specific Methods
   * Methods coupled with question properties, should be included in response class
   */

  /**
   * Returns whether question is answered. 
   * @param questionObj {Response} - Response to corresponding question
   * @returns {boolean} - Whether corresponding question is answered
   */
  hasResponded(questionObj: Response): boolean {
    return (questionObj.yesNo !== null && questionObj.yesNo !== '' && 
      this.validateYesNoResponse(questionObj.yesNo)) || 
      (questionObj.written !== null && questionObj.written !== '');
  }
  /**
   * Validate user's response to yes/no option
   * @param yesNoStr {string} - User response to yes/no option
   * @returns {boolean} - Whether user has a void response to yes/no option
   */
  validateYesNoResponse(yesNoStr: string): boolean {
    return (yesNoStr === 'yes') || (yesNoStr === 'no');
  }

  /**
   * Helper Methods
   * Can be refactored into util module
   */
  getDate(): string {
    return moment().format("MM-DD-YYYY");
  }
  getTime(): string {
    return moment().format("h:mm a")
  }
  /**
   * Scroll to page top
   * @returns {void}
   */
  scrollToTop(): void {
    document.getElementById('root').scroll(0, 0);
    window.scroll(0, 0);
  }
}
