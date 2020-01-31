import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import questions from '../../seed/data.json';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css']
})
export class QuestionaireComponent implements OnInit {
  questionForm = this.fb.group({
    id: '',
    num: '',
    yesNo: '',
    written: '',
    checklist: ''
  })
  questionsForm = this.fb.group({
    questions: this.fb.array(questions.map(q => this.fb.group({
      id: q.id,
      num: q.num,
      yesNo: '',
      written: '',
      checklist: ''
    })))
  })
  section_num = 1;
  questions = questions.filter((q, i) => q.section_num === this.section_num);

  constructor(private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.questionsForm.valueChanges.subscribe(console.log);
  }
  ngOnChanges(changes) {
    console.log(changes.prop)
  }
  handleClickNext() {
    console.log("next")
    if (this.section_num < 6) {
      this.section_num += 1;
      this._getQuestions();
      document.getElementById('root').scroll(0, 0);
    }

  }
  _getQuestions() {
    this.questions = questions.filter((q, i) => q.section_num === this.section_num);
  }
}
