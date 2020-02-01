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
  section_cur = 1;
  section_cur_done = 1;
  section_num = (new Set(questions.map(q => q.section))).size;
  section_titles = Array.from(new Set(questions.map(q => q.section)));
  questions = questions.filter((q, i) => q.section_num === this.section_cur); // number of questions in current section
  questions_done = 0;
  total_question_count = questions.length;
  sticky = false;

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.questionsForm.valueChanges.subscribe(data => {
      this._getQuestionsDone(data.questions);
    });
  }
  handleClickNext() {
    // allow next only if all questions answered
    if (this.section_cur < 5 && this.questions.length === this.questions_done) {
      this.section_cur += 1;
      this.section_cur_done += 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  handleClickBack() {
    if (this.section_cur > 1) {
      this.section_cur -= 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
      window.scroll(0, 0);
    }
  }
  _getQuestions() {
    this.questions = questions.filter((q, i) => q.section_num === this.section_cur);
    this._getQuestionsDone(this.questionsForm.value.questions);
  }
  // get count of number of questions done in current section from form questions
  _getQuestionsDone(questions_input) {
    let arr = questions_input.filter(q => {
      return (q.section_num === this.section_cur_done) && (q.yesNo !== "" || q.written !== "")
    });
    this.questions_done = arr.length;
  }
  handleSticky(stickyState: boolean) {
    this.sticky = stickyState;
  }
  handleSectionNav(section_num: number) {
    this.section_cur = section_num;
    this._getQuestions();
    document.getElementById('root').scroll(0, 0);
    window.scroll(0, 0);
  }
}
