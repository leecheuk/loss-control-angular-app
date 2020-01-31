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
  questions;
  section_num = 1;

  constructor(private fb: FormBuilder) { 
    this.questions = questions.filter((q, i) => q.section_num === this.section_num);
    this.section_num = 1;
  }

  ngOnInit() {
    this.questionsForm.valueChanges.subscribe(console.log);
  }
}
