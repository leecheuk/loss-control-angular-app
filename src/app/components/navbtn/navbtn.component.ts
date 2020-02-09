import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbtn',
  templateUrl: './navbtn.component.html',
  styleUrls: ['./navbtn.component.scss']
})
export class NavbtnComponent implements OnInit {

  @Input() type: string;

  constructor() {
  }

  ngOnInit() {
  }

}
