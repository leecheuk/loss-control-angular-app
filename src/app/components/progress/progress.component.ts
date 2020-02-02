import { Component, QueryList, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements AfterViewInit {

  @Input() section_num: number;
  @Input() section_cur: number;
  @Input() section_cur_done: number;
  @Input() question_count: number;
  @Input() question_done: number;
  @Input() section_titles: string[];
  @Input() total_question_count: number;
  @Input() total_questions_done: number;
  @Output() stickyChanged: EventEmitter<boolean> = new EventEmitter();
  @Output() sectionCurChanged: EventEmitter<number> = new EventEmitter();
  @ViewChildren("label") labelEls: QueryList<ElementRef>;
  loop_arr: number[]; // array holder for loops
  progress: string;
  total_progress: string;
  hover_section: number;
  sticky: boolean; // which sticky state of banner

  constructor() { 

  }
  // can't use HostListener, material angular conflicting it?
  onScroll(e) {
    let el = document.getElementById('root');
    let w = window.pageYOffset;
    // 60 is the threshold
    if ((el.scrollTop >= 60 || w >= 60) && (this.section_cur <= this.section_num && this.section_cur !== 0)) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    
    this.stickyChanged.emit(this.sticky);
  }

  ngAfterViewInit() {
    if (this.labelEls) {
      this.labelEls.forEach(e => {
        e.nativeElement.style.left = e.nativeElement.offsetWidth / 2 - 17 + 'px';
      });
    }
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this), true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
 
  ngOnChanges(changes) {
    let {
          section_num, 
          question_done, 
          question_count, 
          total_question_count, 
          total_questions_done
        } = changes;
    // change in section_num
    if (section_num && section_num.previousValue !== section_num.currentValue) {
      this.loop_arr = Array(this.section_num).fill(0);
    }
    // change in total_questions_done or total_question_count for total progress
    if ((total_questions_done && total_questions_done.previousValue !== total_questions_done.currentValue) || 
      (total_question_count && total_question_count.previousValue !== total_question_count.currentValue)) {
        this.total_progress = `${Math.floor(this.total_questions_done*100 / this.total_question_count)}%`;
    }
    // change in question_done or question_count for section progress
    if ((question_done && question_done.previousValue !== question_done.currentValue) || 
      (question_count && question_count.previousValue !== question_count.currentValue)) {
        this.progress = `${Math.floor(this.question_done*100 / this.question_count)}%`;
    }
  }

  handleSectionClick(section_num) {
    if (section_num <= this.section_cur_done + 1) {
      this.sectionCurChanged.emit(section_num);
    }
  }

}
