import { Component, QueryList, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements AfterViewInit {

  @Input() section_count_total: number;
  @Input() section_num_current: number;
  @Input() section_count_completed: number;
  @Input() question_count_in_progress: number;
  @Input() question_count_completed_in_progress: number;
  @Input() section_titles: string[];
  @Input() question_count_total: number;
  @Input() question_count_completed: number;
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
  onScroll(e): void {
    let el = document.getElementById('root');
    let w = window.pageYOffset;
    // 60 is the threshold
    if ((el.scrollTop >= 60 || w >= 60) && (this.section_num_current <= this.section_count_total && this.section_num_current !== 0)) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    
    this.stickyChanged.emit(this.sticky);
  }

  ngAfterViewInit(): void {
    if (this.labelEls) {
      this.labelEls.forEach(e => {
        e.nativeElement.style.left = e.nativeElement.offsetWidth / 2 - 17 + 'px';
      });
    }
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this), true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, true);
  }
  // refactor this with a util function hasValueChanged
  ngOnChanges(changes): void {
    let {
          section_count_total, 
          question_count_completed_in_progress, 
          question_count_in_progress, 
          question_count_total, 
          question_count_completed
        } = changes;
    // change in section_count_total
    if (section_count_total && section_count_total.previousValue !== section_count_total.currentValue) {
      this.loop_arr = Array(this.section_count_total).fill(0);
    }
    // change in question_count_completed or question_count_total for total progress
    if ((question_count_completed && question_count_completed.previousValue !== question_count_completed.currentValue) || 
      (question_count_total && question_count_total.previousValue !== question_count_total.currentValue)) {
        this.total_progress = `${Math.floor(this.question_count_completed*100 / this.question_count_total)}%`;
    }
    // change in question_count_completed_in_progress or question_count_in_progress for section progress
    if ((question_count_completed_in_progress && question_count_completed_in_progress.previousValue !== question_count_completed_in_progress.currentValue) || 
      (question_count_in_progress && question_count_in_progress.previousValue !== question_count_in_progress.currentValue)) {
        this.progress = `${Math.floor(this.question_count_completed_in_progress*100 / this.question_count_in_progress)}%`;
    }
  }

  handleSectionClick(section_count_total): void {
    if (section_count_total <= this.section_count_completed + 1) {
      this.sectionCurChanged.emit(section_count_total);
    }
  }

}
