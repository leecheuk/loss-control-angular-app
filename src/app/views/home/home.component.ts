import { Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  timer: ReturnType<typeof setTimeout>;

  constructor() { }

  ngOnInit() {
  }

  hasLoaded() {
    this.timer = setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
