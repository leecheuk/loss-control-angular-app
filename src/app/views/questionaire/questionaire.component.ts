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
    yesNo: '',
    written: '',
    checklist: ''
  });
  questions;
  section_num = 1;

  constructor(private fb: FormBuilder) { 
    this.questions = questions.filter((q, i) => q.section_num === this.section_num);
    this.section_num = 1;
  }

  ngOnInit() {
    this.questionForm.valueChanges.subscribe(console.log);
  }
}
