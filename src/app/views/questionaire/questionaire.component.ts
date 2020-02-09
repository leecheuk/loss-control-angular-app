import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class QuestionaireComponent implements OnInit, OnDestroy {
  // DOM/view properties
  sticky: boolean = false;
  loading: boolean = true;
  date: Date;
  timer;
  // facade
  questionaireFacade;
  form: FormGroup;
  // subscriptions
  subscriptions: Subscription;

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
    this.questionaireFacade.unsetForm();
  }
  /**
   * EVENT HANDLERS
   */
  handleClickNext(): void {
    let qf = this.questionaireFacade;
    if (qf.questionaire.sectionNumCurrent === 0) {
      qf.startQuestionaire();
    } else if (qf.questionaire.sectionNumCurrent === qf.questionaire.sectionCountTotal) {
      let date = Date.now();
      this.date = new Date(date);
    }
    if (qf.questionaire.sectionNumCurrent <= qf.questionaire.sectionCountTotal && 
      qf.questionaire.isCurrentSectionComplete()) {
        qf.incrementSectionNumCurrent();
        this.scrollToTop();
    }
  }
  handleClickBack(): void {
    let qf = this.questionaireFacade;
    let isSectionComplete = qf.questionaire.isCurrentSectionComplete();
    let isSectionInprogress = qf.questionaire.sectionNumCurrent === qf.questionaire.sectionNumInprogress;
    if (isSectionInprogress && qf.questionaire.sectionNumCurrent > 1) {
        qf.decrementSectionNumCurrent();
        this.scrollToTop();
    } else if (isSectionComplete && qf.questionaire.sectionNumCurrent > 1) {
        qf.decrementSectionNumCurrent();
        this.scrollToTop();
    }
  }
  handleSectionNav(section_num: number): void {
    let qf = this.questionaireFacade;
    let isCurrentSection = section_num === qf.questionaire.sectionNumCurrent;
    let isSectionInRange = section_num <= qf.questionaire.sectionStatus.count_completed + 1 && section_num >= 1;
    let isSubmissionSection = section_num === qf.questionaire.sectionCountTotal + 1;
    let isSectionComplete = qf.questionaire.isCurrentSectionComplete();
    let isSectionInprogress = qf.questionaire.sectionNumCurrent === qf.questionaire.sectionNumInprogress;
    if (isSectionInprogress && (!isCurrentSection && isSectionInRange)) {
        this.questionaireFacade.setSectionNumCurrent(section_num);
        this.scrollToTop();  
    } else if (!isCurrentSection && isSectionComplete && isSectionInRange) {
        this.questionaireFacade.setSectionNumCurrent(section_num);
        this.scrollToTop();
    }
    if (isSubmissionSection) {
      let date = Date.now();
      this.date = new Date(date);
    }
  }
  handleSticky(stickyState: boolean): void {
    this.sticky = stickyState;
  }
  handleSectionNavClicked(direction): void {
    if (direction === 'forward') {
      this.handleClickNext();
    } else if (direction === 'back') {
      this.handleClickBack();
    }
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
