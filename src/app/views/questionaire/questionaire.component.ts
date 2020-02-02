import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import questions from '../../seed/data.json';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent implements OnInit {
  questionsForm = this.fb.group({
    questions: this.fb.array(questions.map(q => this.fb.group({
      id: q.id,
      num: q.num,
      section_num: q.section_num,
      yesNo: '',
      written: '',
      checklist: this.fb.array(Array(q.checklist.length).fill(false))
    })))
  })
  section_cur = 0;
  section_cur_done = 0;
  section_num = (new Set(questions.map(q => q.section))).size;
  section_titles = Array.from(new Set(questions.map(q => q.section)));
  questions = questions.filter((q, i) => q.section_num === this.section_cur); // number of questions in current section
  questions_count = 0; // number of questions in latest section
  questions_done = 0; // questions done of latest section
  questions_done_cur = 0; // questions done in current section
  total_questions_done = 0; // number of questions done in total
  total_question_count = questions.length; 
  sticky = false;

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
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
  handleClickNext() {
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    // allow next only if all questions answered
    if (this.section_cur < 5 && this.questions.length === this.questions_done_cur) {
      this.section_cur += 1;
      // this.section_cur_done += 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  handleClickBack() {
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    if (this.section_cur > 1) {
      this.section_cur -= 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  _getQuestions() {
    this.questions = questions.filter((q, i) => q.section_num === this.section_cur);
    this._getQuestionsDoneCur(this.questionsForm.value.questions);
    this._getQuestionsDone(this.questionsForm.value.questions);
  }
  // get count of number of questions done in lates section from form questions
  _getQuestionsDone(questions_input) {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur_done + 1) && (q.yesNo !== "" || q.written !== "")
    });
    this.questions_done = arr.length;
  }
  _getQuestionsDoneCur(questions_input) {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur) && (q.yesNo !== "" || q.written !== "")
    });
    this.questions_done_cur = arr.length;
  }
  _getQuestionsDoneTotal(questions_input) {
    let arr = questions_input.filter(q => {
      return (q.yesNo !== "" || q.written !== "")
    });
    this.total_questions_done = arr.length;
  }
  // get questions count of latest section
  _getLatestQuestionsCount() {
    let arr = questions.filter(q => {
      return q.section_num === this.section_cur_done + 1;
    })
    this.questions_count = arr.length;
  }
  _getSectionsDone(questions_input) {
    // get number of unfinished sections
    // filter out questions that have input, then map to section number and map to sets
    let arr = questions_input.filter(input => {
      let qs = questions[input.num - 1]
      if (qs.yes_no === 'true') {
        return input.yesNo === '';
      } else {
        return input.written === '';
      }
    });
    let section_nums = arr.map(q => q.section_num);
    this.section_cur_done = this.section_num - (new Set(section_nums)).size;
  }
  handleSticky(stickyState: boolean) {
    this.sticky = stickyState;
  }
  handleSectionNav(section_num: number) {
    this.section_cur = section_num;
    this._getQuestions();
    this._getSectionsDone(this.questionsForm.value.questions);
    this._getLatestQuestionsCount();
    document.getElementById('root').scroll(0, 0);
    window.scroll(0, 0);
  }
}
