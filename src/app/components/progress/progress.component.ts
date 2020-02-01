import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() section_num;
  @Input() section_cur;
  @Input() question_count;
  @Input() question_done;
  loop_arr;
  progress;
  hover_section;

  constructor() { 

  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    let {section_num, question_done, question_count} = changes;
    // change in section_num
    if (section_num.previousValue !== section_num.currentValue) {
      this.loop_arr = Array(this.section_num).fill(0);
    }
    // change in question_done or question_count
    if (question_done.previousValue !== question_done.currentValue || 
      question_count.previousValue !== question_count.currentValue) {
        this.progress = this.question_done / this.question_count;
    }
  }

}
