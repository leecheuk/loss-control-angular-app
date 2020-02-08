import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
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
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {
  // DOM/view properties
  sticky: boolean = false;
  loading: boolean = true;
  date: Date;
  timer;
  // facade
  questionaireFacade;
  form: FormGroup;
  // subscriptions
  subscriptions: SubscriptionLike;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { 
    let storeSubscription = store.select('questions').subscribe(s => {
        this.questionaireFacade = new QuestionaireFacade(s);
        this.questionaireFacade.initialize();
        this.form = this.questionaireFacade.createForm(fb);
        this.loading = false;
      });
    this.subscriptions = storeSubscription;
    // fetch questions
    this.getQuestions();
  }

  getQuestions(): void {
    this.store.dispatch(new QuestionsActions.GetQuestions());
  }

  ngOnInit(): void {
    let formSubscription = this.form.valueChanges.subscribe(data => {
      this.questionaireFacade.updateQuestionsCountCompletedInprogressDuring();
      this.questionaireFacade.updateQuestionsCountCompletedCurrent();
      this.questionaireFacade.updateQuestionsCountCompleted();
    });
    this.subscriptions.add(formSubscription);
  }

  // unsubscribe and clearTimeout to prevent memory leaks
  ngOnDestroy(): void {
    clearTimeout(this.timer);
    this.subscriptions.unsubscribe();
  }
  /**
   * EVENT HANDLERS
   */
  handleClickNext(): void {
    let qf = this.questionaireFacade;
    if (qf.questionaire.sectionStatus.num_current === 0) {
      qf.startQuestionaire();
    } else if (qf.questionaire.sectionStatus.num_current === qf.questionaire.sectionStatus.count_total) {
      let date = Date.now();
      this.date = new Date(date);
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
    if (section_num === qf.questionaire.sectionStatus.count_total + 1) {
      let date = Date.now();
      this.date = new Date(date);
    }
  }
  handleSticky(stickyState: boolean): void {
    this.sticky = stickyState;
  }

  /**
   * Scroll to page top
   * @returns {void}
   */
  // we should wrap window as service
  scrollToTop(): void {
    this.timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
}
