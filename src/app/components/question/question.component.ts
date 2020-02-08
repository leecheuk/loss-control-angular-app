import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models';
import { FormBuilder, ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit(): void {
  }
}
