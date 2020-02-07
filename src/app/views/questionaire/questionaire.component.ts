import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// utils
import utils from '../../utils';
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
  date: Date;
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
        utils.scrollToTop();
    }
  }
  handleClickBack(): void {
    let qf = this.questionaireFacade;
    if (qf.questionaire.sectionStatus.num_current > 1) {
      qf.decrementSectionNumCurrent();
      utils.scrollToTop();
    }
  }
  handleSectionNav(section_num: number): void {
    let qf = this.questionaireFacade;
    if (section_num !== qf.questionaire.sectionStatus.num_current 
      && section_num <= qf.questionaire.sectionStatus.count_completed + 1 && section_num >= 1) {
      this.questionaireFacade.setSectionNumCurrent(section_num);
      utils.scrollToTop();
    }
    if (section_num === qf.questionaire.sectionStatus.count_total + 1) {
      let date = Date.now();
      this.date = new Date(date);
    }
  }
  handleSticky(stickyState: boolean): void {
    this.sticky = stickyState;
  }
}
