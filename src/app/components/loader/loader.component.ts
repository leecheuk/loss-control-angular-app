import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'whatshot',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/whatshot.svg')
    );
  }

  ngOnInit() {
  }

}
