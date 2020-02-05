import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import moment from 'moment';
// models
import {Question, Response} from '../../models';
// store
import { Store } from '@ngrx/store';
import * as QuestionsActions from '../../store/actions/questions.action';
// facade
import { QuestionaireFacade } from "../../facade/questionaire.facade";

interface AppState {
  questions: Question[]
}

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent implements OnInit {
  // DOM/view properties
  sticky: boolean = false;
  loading: boolean = true;
  // facade
  questionaireFacade;
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { 
    store.select('questions').subscribe(s => {
        this.questionaireFacade = new QuestionaireFacade(s);
        this.questionaireFacade.initialize();
        this.form = this.questionaireFacade.createForm(fb);
        this.loading = false;
      });
    // fetch questions
    this.getQuestions();
  }

  getQuestions(): void {
    this.store.dispatch(new QuestionsActions.GetQuestions());
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(data => {
      this.questionaireFacade.updateQuestionsCountCompletedInprogressDuring();
      this.questionaireFacade.updateQuestionsCountCompletedCurrent();
      this.questionaireFacade.updateQuestionsCountCompleted();
    });
  }
  handleClickNext(): void {
    let qf = this.questionaireFacade;
    if (qf.questionaire.sectionStatus.num_current === 0) {
      qf.startQuestionaire();
    }
    if (qf.questionaire.sectionStatus.num_current <= qf.questionaire.sectionStatus.count_total && 
      qf.questionaire.isCurrentSectionComplete()) {
        qf.incrementSectionNumCurrent();
        this.scrollToTop();
    }
  }
  handleClickBack(): void {
    let qf = this.questionaireFacade;
    if (qf.questionaire.sectionStatus.num_current > 1) {
      qf.decrementSectionNumCurrent();
      this.scrollToTop();
    }
  }
  handleSectionNav(section_num: number): void {
    let qf = this.questionaireFacade;
    if (section_num !== qf.questionaire.sectionStatus.num_current 
      && section_num <= qf.questionaire.sectionStatus.count_completed + 1 && section_num >= 1) {
      this.questionaireFacade.setSectionNumCurrent(section_num);
      this.scrollToTop();
    }
  }
  handleSticky(stickyState: boolean): void {
    this.sticky = stickyState;
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
